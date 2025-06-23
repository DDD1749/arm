import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import { supabase } from '../lib/supabase';
import { Trash2, ShoppingBag } from 'lucide-react';
import PaymentForm from './PaymentForm';

const PART_NAMES = {
  'First type': 'Первый тип',
  'Second type': 'Второй тип',
  'Third type': 'Третий тип',
};
const STONE_NAMES = {
  Onyx: 'Оникс',
  Travertine: 'Травертин',
  Terrazzo: 'Терраццо',
};
const HORN_NAMES = {
  whole: 'цёлый',
  broken: 'сломаный',
};
const COLOR_NAMES = {
  red: 'красный',
  purple: 'фиолетовый',
  yellow: 'жёлтый',
};

// Универсальный обработчик для русской локализации опций
function getCustomizationDetails(item) {
  const c = item.product.customization;
  if (!c || typeof c !== 'object') return '';

  // Для кольца
  if ('firstPart' in c && 'stone' in c && 'size' in c) {
    return [
      PART_NAMES[c.firstPart] || c.firstPart,
      PART_NAMES[c.secondPart] || c.secondPart,
      PART_NAMES[c.thirdPart] || c.thirdPart,
      STONE_NAMES[c.stone] || c.stone,
      c.size
    ].join(', ');
  }

  // Для маски
  if ('rightHorn' in c && 'leftHorn' in c && 'color' in c) {
    return [
      HORN_NAMES[c.rightHorn] || c.rightHorn,
      HORN_NAMES[c.leftHorn] || c.leftHorn,
      COLOR_NAMES[c.color] || c.color
    ].join(', ');
  }

  // Остальные товары
  return Object.values(c)
    .map(val => (typeof val === 'object' && val !== null && 'name' in val ? val.name : String(val)))
    .join(', ');
}

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    phone: ''
  });
  const [showPayment, setShowPayment] = useState(false);

  const getProductImage = (item: any) => {
    if (item.product.image_url) {
      return item.product.image_url;
    }
    if (item.product.image && item.product.image.startsWith('17')) {
      return `/images/${item.product.image}`;
    }
    if (item.product.category === 'mask') {
      return '/FCC_SPECULAR (1).jpg';
    }
    if (item.product.category === 'ring') {
      return '/FCC_NORMAL (1).jpg';
    }
    return item.product.image;
  };

  const handleSubmitOrder = async () => {
    if (!user) {
      setError('Please sign in to place an order');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', user.id)
        .single();

      if (existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: shippingInfo.fullName,
            phone_number: shippingInfo.phone,
            address: shippingInfo.address
          })
          .eq('user_id', user.id);

        if (profileError) throw profileError;
      } else {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            full_name: shippingInfo.fullName,
            phone_number: shippingInfo.phone,
            address: shippingInfo.address
          });

        if (profileError) throw profileError;
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: getTotalPrice(),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8 font-montserrat">{t.cart.title}</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-black" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-4 font-montserrat">{t.cart.emptyCart.title}</h2>
            <p className="text-black mb-6 font-montserrat">{t.cart.emptyCart.description}</p>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-black text-white font-montserrat rounded-md hover:bg-gray-900 transition-colors duration-300"
            >
              {t.cart.emptyCart.startShopping}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-montserrat font-medium text-black uppercase tracking-wider">
                        {t.cart.product}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-montserrat font-medium text-black uppercase tracking-wider">
                        {t.cart.quantity}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-montserrat font-medium text-black uppercase tracking-wider">
                        {t.cart.price}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-montserrat font-medium text-black uppercase tracking-wider">
                        {t.cart.action}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={getProductImage(item)} 
                                alt={item.product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-montserrat font-medium text-black">
                                {item.product.name}
                              </div>
                              {getCustomizationDetails(item) && (
                                <div className="text-sm font-montserrat text-gray-500">
                                  {getCustomizationDetails(item)}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border rounded-md">
                            <button 
                              className="px-3 py-1 text-black hover:bg-gray-100 font-montserrat"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-black font-montserrat">{item.quantity}</span>
                            <button 
                              className="px-3 py-1 text-black hover:bg-gray-100 font-montserrat"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black font-montserrat">₽{item.product.price.toFixed(2)}</div>
                          <div className="text-sm text-black font-montserrat">
                            {t.cart.subtotal}: ₽{(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <button 
                            className="text-black hover:text-gray-900"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Order Summary and Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-montserrat font-semibold text-black mb-6">{t.cart.orderSummary}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-black font-montserrat">{t.cart.subtotal}</span>
                    <span className="text-black font-montserrat font-medium">₽{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-montserrat">{t.cart.shipping}</span>
                    <span className="text-black font-montserrat font-medium">₽0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-montserrat">{t.cart.tax}</span>
                    <span className="text-black font-montserrat font-medium">₽{(getTotalPrice() * 0.0).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-montserrat font-semibold">
                      <span className="text-black">{t.cart.total}</span>
                      <span className="text-black">
                        ₽{(getTotalPrice() + 0.00 + (getTotalPrice() * 0.0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md font-montserrat">
                    {error}
                  </div>
                )}

                {/* Открываем окно оплаты! */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-black mb-1">
                      {t.cart.shippingInfo.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-montserrat"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-black mb-1">
                      {t.cart.shippingInfo.address}
                    </label>
                    <textarea
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-montserrat"
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-black mb-1">
                      {t.cart.shippingInfo.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-montserrat"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full px-6 py-3 bg-black text-white font-montserrat rounded-md hover:bg-gray-900 transition-colors duration-300 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? t.cart.processing : t.cart.placeOrder}
                  </button>
                </form>
                {/* ---- Модальное окно оплаты ---- */}
                {showPayment && (
                  <PaymentForm
                    amount={getTotalPrice()}
                    onClose={() => setShowPayment(false)}
                    onPayment={async () => {
                      await handleSubmitOrder();
                      setShowPayment(false);
                    }}
                  />
                )}
                {/* ---- / ---- */}
                <div className="mt-6 text-center">
                  <a href="/" className="text-black hover:text-gray-900 text-sm font-montserrat font-medium">
                    {t.cart.continueShopping}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
