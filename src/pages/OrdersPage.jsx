import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Home, ChevronRight, Package, Eye, Calendar, CreditCard } from 'lucide-react'

const OrdersPage = () => {
  // Mock orders data
  const orders = [
    { 
      id: 'VL24010001', 
      date: '27/01/2026', 
      status: 'delivered', 
      statusText: 'Đã giao', 
      total: 1250000,
      items: 3
    },
    { 
      id: 'VL24010002', 
      date: '25/01/2026', 
      status: 'shipping', 
      statusText: 'Đang giao', 
      total: 850000,
      items: 2
    },
    { 
      id: 'VL24010003', 
      date: '20/01/2026', 
      status: 'processing', 
      statusText: 'Đang xử lý', 
      total: 2100000,
      items: 5
    },
    { 
      id: 'VL24010004', 
      date: '15/01/2026', 
      status: 'cancelled', 
      statusText: 'Đã hủy', 
      total: 450000,
      items: 1
    },
  ];

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
                    <span className="text-lg font-bold text-primary-red">{order.total.toLocaleString()}đ</span>
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
