import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Home, ChevronRight, Package, Eye, Calendar, CreditCard } from 'lucide-react'
import { useCurrentUser } from '../lib/auth'
import sql from '../lib/db'

const OrdersPage = () => {
  const { isSignedIn, user } = useCurrentUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isSignedIn || !user?.email) {
        setLoading(false);
        return;
      }

      try {
        // 1. Get user ID
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          
          // 2. Get orders with item count
          const ordersRes = await sql`
            SELECT 
              o.*,
              COUNT(oi.id) as item_count
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ${userId}
            GROUP BY o.id
            ORDER BY o.created_at DESC
          `;
          
          setOrders(ordersRes.map(o => ({
            id: o.id,
            date: new Date(o.created_at).toLocaleDateString('vi-VN'),
            status: o.status,
            statusText: getStatusText(o.status),
            total: Number(o.total),
            items: Number(o.item_count)
          })));
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user?.email]);

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Đã giao';
      case 'shipping': return 'Đang giao';
      case 'processing': return 'Đang xử lý';
      case 'cancelled': return 'Đã hủy';
      case 'pending': return 'Chờ xử lý';
      default: return status;
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipping':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <Link to="/account" className="text-light-text hover:text-primary-red transition-colors">Tài khoản</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Đơn hàng</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-dark-text">Lịch sử đơn hàng</h1>
          <div className="flex items-center gap-2 text-sm text-gray-text">
            <Package className="w-5 h-5" />
            <span>{orders.length} đơn hàng</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-light-gray rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-gray-text" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-dark-text">{order.id}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusStyle(order.status)}`}>
                        {order.statusText}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-light-text">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {order.date}
                      </span>
                      <span>{order.items} sản phẩm</span>
                    </div>
                  </div>
                </div>

                {/* Total & Action */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-light-text block">Tổng tiền</span>
                    <span className="text-lg font-bold text-primary-red">{Number(order.total).toLocaleString('vi-VN')}đ</span>
                  </div>
                  <Link 
                    to={`/order/${order.id}`}
                    className="btn btn--outline h-10 px-5 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-dark-text mb-2">Chưa có đơn hàng</h2>
            <p className="text-light-text mb-6">Bạn chưa có đơn hàng nào.</p>
            <Link to="/products" className="btn btn--primary px-8">
              Mua sắm ngay
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default OrdersPage
