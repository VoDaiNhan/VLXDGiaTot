import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { products } from '../data/products'
import { 
  Home, ChevronRight, Package, Truck, CheckCircle2, 
  MapPin, Phone, User, CreditCard, Calendar, ArrowLeft
} from 'lucide-react'

const OrderDetailPage = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id || 'VL24010001',
    date: '27/01/2026 10:30',
    status: 'shipping',
    statusText: 'Đang giao hàng',
    shipping: {
      name: 'Nguyễn Văn A',
      phone: '0901 234 567',
      address: '123 Đường ABC, Phường XYZ, Quận 7, TP. Hồ Chí Minh'
    },
    payment: 'COD',
    items: [
      { ...products[0], quantity: 2 },
      { ...products[1], quantity: 5 },
    ],
    subtotal: 175000,
    shippingFee: 30000,
    total: 205000
  };

  const timeline = [
    { step: 1, label: 'Đặt hàng', date: '27/01 10:30', done: true },
    { step: 2, label: 'Xác nhận', date: '27/01 10:45', done: true },
    { step: 3, label: 'Đang giao', date: '27/01 14:00', done: true, active: true },
    { step: 4, label: 'Hoàn thành', date: '', done: false },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <Link to="/orders" className="text-light-text hover:text-primary-red transition-colors">Đơn hàng</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">{order.id}</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        {/* Back Button */}
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm font-bold text-gray-text hover:text-primary-red mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-dark-text">Đơn hàng #{order.id}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  {order.statusText}
                </span>
              </div>
              <p className="text-sm text-light-text flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Đặt ngày {order.date}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-light-text block">Tổng thanh toán</span>
              <span className="text-2xl font-bold text-primary-red">{Number(order.total).toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-dark-text mb-6">Trạng thái đơn hàng</h2>
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
              <div className="h-full bg-green-500 transition-all" style={{ width: '66%' }}></div>
            </div>

            {timeline.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  item.done 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                } ${item.active ? 'ring-4 ring-green-200' : ''}`}>
                  {item.done ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                </div>
                <span className={`text-xs font-bold ${item.done ? 'text-dark-text' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {item.date && (
                  <span className="text-[10px] text-light-text mt-1">{item.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-dark-text mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-red" />
              Địa chỉ giao hàng
            </h2>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-dark-text">{order.shipping.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-text">{order.shipping.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-text">{order.shipping.address}</span>
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-dark-text mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-red" />
              Thanh toán
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-text">Phương thức</span>
                <span className="font-bold text-dark-text">{order.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-text">Tạm tính</span>
                <span className="text-dark-text">{Number(order.subtotal).toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-text">Phí vận chuyển</span>
                <span className="text-dark-text">{Number(order.shippingFee).toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border-color">
                <span className="font-bold text-dark-text">Tổng cộng</span>
                <span className="font-bold text-primary-red">{Number(order.total).toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-light-gray rounded-2xl p-6">
            <h2 className="text-lg font-bold text-dark-text mb-4">Cần hỗ trợ?</h2>
            <p className="text-sm text-gray-text mb-4">Liên hệ hotline hoặc chat với chúng tôi để được hỗ trợ nhanh nhất.</p>
            <a href="tel:19001234" className="btn btn--primary w-full h-11 text-sm">
              <Phone className="w-4 h-4" />
              Gọi 1900.1234
            </a>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-red" />
            Sản phẩm ({order.items.length})
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-light-gray rounded-xl">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <Link to={`/detail/${item.id}`} className="font-bold text-dark-text hover:text-primary-red transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-xs text-light-text">SL: {item.quantity} {item.unit || 'cái'}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-dark-text">{(Number(item.salePrice) * item.quantity).toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OrderDetailPage
