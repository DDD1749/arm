import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, ShoppingBag, Heart, Settings, LogOut, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
  email: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  order_items: OrderItem[];
  profiles: {
    full_name: string | null;
    address: string | null;
    phone_number: string | null;
  };
}

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders' && profile?.user_id) {
      fetchOrders(profile.user_id);
    }
  }, [activeTab, profile?.user_id]);

  const handleAuthError = (error: any) => {
    if (error?.message?.includes('JWT expired') || error?.status === 401) {
      navigate('/auth');
      return true;
    }
    return false;
  };

  const checkSession = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }

      if (!session?.user) {
        navigate('/auth');
        return;
      }

      await fetchProfile(session.user.id);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (handleAuthError(error)) return;
        throw error;
      }

      if (data) {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          if (handleAuthError(userError)) return;
          throw userError;
        }

        setProfile({
          ...data,
          email: userData.user?.email || ''
        });
        setFormData(prev => ({
          ...prev,
          fullName: data.full_name || '',
          phoneNumber: data.phone_number || '',
          address: data.address || '',
          email: userData.user?.email || ''
        }));
      }
    } catch (error: any) {
      if (!handleAuthError(error)) {
        setError('Failed to fetch profile');
        console.error('Profile fetch error:', error);
      }
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            quantity,
            price
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) {
        if (handleAuthError(ordersError)) return;
        throw ordersError;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, address, phone_number')
        .eq('user_id', userId)
        .single();

      if (profileError) {
        if (handleAuthError(profileError)) return;
        throw profileError;
      }

      const ordersWithProfiles = ordersData?.map(order => ({
        ...order,
        profiles: profileData
      }));

      setOrders(ordersWithProfiles || []);
    } catch (error: any) {
      if (!handleAuthError(error)) {
        console.error('Error fetching orders:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    if (!profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          address: formData.address
        })
        .eq('user_id', profile.user_id);

      if (error) {
        if (handleAuthError(error)) return;
        throw error;
      }

      setSuccessMessage('Profile updated successfully');
      setProfile(prev => prev ? {
        ...prev,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        address: formData.address
      } : null);
    } catch (error: any) {
      if (!handleAuthError(error)) {
        setError('Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('New passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) {
        if (handleAuthError(error)) return;
        throw error;
      }

      setSuccessMessage('Password updated successfully');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err: any) {
      if (!handleAuthError(err)) {
        setPasswordError('Failed to update password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const OrdersTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.account.orders.title}</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t.account.orders.empty}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">{t.account.orders.orderId}: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    {t.account.orders.placedOn}: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {t.account.orders.status[order.status as keyof typeof t.account.orders.status]}
                </span>
              </div>

              <div className="border-t border-b py-4 mb-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">{t.account.orders.deliveryAddress}</p>
                    <p className="text-gray-600">{order.profiles.full_name}</p>
                    <p className="text-gray-600">{order.profiles.address}</p>
                    <div className="flex items-center mt-2">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-gray-600">{order.profiles.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Product ID: {item.product_id}</p>
                      <p className="text-gray-600">{t.cart.quantity}: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₽{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{t.cart.total}</p>
                  <p className="font-medium">₽{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.account.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                {t.account.sections.profile}
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'orders'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                {t.account.sections.orders}
              </button>

              

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'settings'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                {t.account.sections.settings}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
              >
                <LogOut className="mr-3 h-5 w-5" />
                {t.account.signOut}
              </button>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-3">
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.account.profile.title}</h2>
                
                {successMessage && (
                  <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {successMessage}
                  </div>
                )}
                
                {error && (
                  <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {t.account.profile.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      disabled
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      {t.account.profile.fullName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      {t.account.profile.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      {t.account.profile.address}
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                    >
                      {isLoading ? t.account.profile.saving : t.account.profile.saveChanges}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.account.settings.title}</h2>
                
                {successMessage && (
                  <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {successMessage}
                  </div>
                )}
                
                {passwordError && (
                  <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      {t.account.settings.newPassword}
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      minLength={6}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      {t.account.settings.confirmPassword}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      minLength={6}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                    >
                      {isLoading ? t.account.settings.updating : t.account.settings.update}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.account.wishlist.title}</h2>
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">{t.account.wishlist.empty}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;