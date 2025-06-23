import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Profile {
  user_id: string;
  full_name: string | null;
  address: string | null;
  phone_number: string | null;
  email: string;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: 'pending' | 'delivering' | 'delivered';
  user_id: string;
  order_items: OrderItem[];
  profile?: Profile;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}

const ORDER_STATUSES = ['pending', 'delivering', 'delivered'] as const;

const STATUS_LABELS: Record<string, string> = {
  pending: 'В ожидании',
  delivering: 'В доставке',
  delivered: 'Доставлен',
};

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (password !== 'Qwer1qwer') {
        throw new Error('Неверный пароль');
      }
      setIsAuthenticated(true);
      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    setStatusUpdateLoading(orderId);
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (updateError) throw updateError;

      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      ));
    } catch (err) {
      console.error('Ошибка при обновлении статуса заказа:', err);
      setError('Ошибка при обновлении статуса');
    } finally {
      setStatusUpdateLoading(null);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setError('');

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
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData) {
        setOrders([]);
        return;
      }

      const userIds = [...new Set(ordersData.map(order => order.user_id))];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, full_name, address, phone_number')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      const profilesMap = (profilesData || []).reduce((acc, profile) => {
        acc[profile.user_id] = profile;
        return acc;
      }, {} as Record<string, any>);

      const transformedOrders = ordersData.map(order => ({
        ...order,
        profile: profilesMap[order.user_id] ? {
          ...profilesMap[order.user_id],
          email: order.user_id
        } : {
          user_id: order.user_id,
          full_name: null,
          address: null,
          phone_number: null,
          email: order.user_id
        }
      }));

      setOrders(transformedOrders);
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err);
      setError('Ошибка загрузки заказов');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Кнопка "Товары" просто переводит на /adminu
  useEffect(() => {
    if (isAuthenticated && activeTab === 'products') {
      navigate('/adminu');
    }
  }, [activeTab, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Вход для администратора</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Выйти
          </button>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-md ${activeTab === 'orders'
                ? 'bg-amber-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Заказы
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-md ${activeTab === 'products'
                ? 'bg-amber-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Товары
            </button>
          </nav>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Заказы */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Все заказы</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Загрузка...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Заказов нет
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Заказ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Данные покупателя
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Товары
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Заказ #{order.id.slice(0, 8)}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">ID пользователя: {order.profile?.user_id}</div>
                        <div className="text-sm text-gray-900">{order.profile?.full_name || 'Нет имени'}</div>
                        <div className="text-sm text-gray-500">{order.profile?.address || 'Нет адреса'}</div>
                        <div className="text-sm text-gray-500">{order.profile?.phone_number || 'Нет телефона'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="mb-1">
                              {item.product_id} × {item.quantity} шт. по {item.price} ₽
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.total.toFixed(2)} ₽</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                          disabled={statusUpdateLoading === order.id}
                          className={`rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 ${
                            order.status === 'delivered'
                              ? 'bg-green-50 text-green-800'
                              : order.status === 'delivering'
                              ? 'bg-yellow-50 text-yellow-800'
                              : 'bg-gray-50 text-gray-800'
                          }`}
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {STATUS_LABELS[status]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
