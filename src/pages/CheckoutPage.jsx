import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { products } from '../data/products'
import { 
  Home, ChevronRight, CreditCard, Banknote, Landmark, 
  Truck, ShieldCheck, MapPin, Phone, User, FileText, ArrowRight
} from 'lucide-react'

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    notes: ''
  });

  // Mock cart items (same as CartPage for demo)
  const cartItems = [
    { ...products[0], quantity: 2 },
    { ...products[1], quantity: 5 },
    { ...products[3], quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, would submit order to backend
    navigate('/order-success');
  };

  const paymentMethods = [
    { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: Banknote, desc: 'Thanh toán bằng tiền mặt khi nhận hàng' },
    { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: Landmark, desc: 'Chuyển khoản trước khi giao hàng' },
    { id: 'card', name: 'Thẻ tín dụng / Ghi nợ', icon: CreditCard, desc: 'Visa, Mastercard, JCB' },
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
          <Link to="/cart" className="text-light-text hover:text-primary-red transition-colors">Giỏ hàng</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Thanh toán</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        <h1 className="text-3xl font-bold text-dark-text mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="flex-1 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-red" />
                Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">
                    <User className="w-4 h-4 inline mr-1" /> Họ và tên *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">
                    <Phone className="w-4 h-4 inline mr-1" /> Số điện thoại *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0901 234 567"
                    className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-dark-text mb-2">Địa chỉ *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Số nhà, tên đường..."
                    className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">Tỉnh/Thành phố *</label>
                  <select 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors bg-white"
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hn">Hà Nội</option>
                    <option value="dn">Đà Nẵng</option>
                    <option value="bd">Bình Dương</option>
                    <option value="dn">Đồng Nai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">Quận/Huyện *</label>
                  <select 
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors bg-white"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="q1">Quận 1</option>
                    <option value="q2">Quận 2</option>
                    <option value="q7">Quận 7</option>
                    <option value="td">Thủ Đức</option>
                    <option value="bt">Bình Thạnh</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-dark-text mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-red" />
                Phương thức thanh toán
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label 
                    key={method.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? 'border-primary-red bg-red-50' 
                        : 'border-border-color hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="mt-1 w-5 h-5 accent-primary-red"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <method.icon className="w-5 h-5 text-gray-text" />
                        <span className="font-bold text-dark-text">{method.name}</span>
                      </div>
                      <p className="text-xs text-light-text mt-1">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-dark-text mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-red" />
                Ghi chú đơn hàng
              </h2>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn..."
                rows={4}
                className="w-full p-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors resize-none"
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-dark-text mb-6 pb-4 border-b border-border-color">
                Đơn hàng của bạn
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-bold text-dark-text line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-light-text">SL: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-dark-text shrink-0">
                      {(item.salePrice * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-border-color">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-text">Tạm tính</span>
                  <span className="font-bold text-dark-text">{subtotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-text">Phí vận chuyển</span>
                  <span className="font-bold text-dark-text">
                    {shipping === 0 ? <span className="text-green-600">Miễn phí</span> : `${shipping.toLocaleString()}đ`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-border-color mb-6">
                <span className="text-lg font-bold text-dark-text">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary-red">{total.toLocaleString()}đ</span>
              </div>

              <button type="submit" className="btn btn--primary w-full h-14 text-base">
                Đặt hàng
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border-color flex justify-center gap-6">
                <div className="flex items-center gap-2 text-xs text-gray-text">
                  <Truck className="w-4 h-4 text-primary-red" />
                  <span>Giao nhanh</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-text">
                  <ShieldCheck className="w-4 h-4 text-primary-red" />
                  <span>Bảo mật</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default CheckoutPage
