import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, CreditCard, Banknote, Building2, 
  Smartphone, ShieldCheck, CheckCircle2, Phone
} from 'lucide-react'

const PaymentMethodsPage = () => {
  const methods = [
    {
      icon: Banknote,
      title: 'Thanh toán khi nhận hàng (COD)',
      desc: 'Thanh toán bằng tiền mặt khi nhận hàng tại địa chỉ giao.',
      details: [
        'Áp dụng cho đơn hàng dưới 50 triệu đồng',
        'Kiểm tra hàng trước khi thanh toán',
        'Nhận biên lai ngay sau khi thanh toán'
      ]
    },
    {
      icon: Building2,
      title: 'Chuyển khoản ngân hàng',
      desc: 'Chuyển khoản trực tiếp vào tài khoản công ty.',
      details: [
        'Ngân hàng: Vietcombank - CN Hồ Chí Minh',
        'Số TK: 0071 0012 3456 789',
        'Chủ TK: CÔNG TY TNHH VLXD GIÁ TỐT',
        'Nội dung: [Mã đơn hàng] - [Số điện thoại]'
      ]
    },
    {
      icon: CreditCard,
      title: 'Thẻ tín dụng / Ghi nợ',
      desc: 'Thanh toán an toàn qua cổng thanh toán trực tuyến.',
      details: [
        'Hỗ trợ Visa, Mastercard, JCB',
        'Bảo mật 3D Secure',
        'Xử lý tức thì, không mất phí'
      ]
    },
    {
      icon: Smartphone,
      title: 'Ví điện tử',
      desc: 'Thanh toán nhanh chóng qua các ví điện tử phổ biến.',
      details: [
        'MoMo - Quét mã QR hoặc chuyển số điện thoại',
        'ZaloPay - Tích hợp trực tiếp trên website',
        'VNPay - Hỗ trợ hầu hết ngân hàng nội địa'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Phương thức thanh toán</h1>
        <p className="text-white/60 text-sm">Đa dạng hình thức, tiện lợi cho mọi khách hàng</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Phương thức thanh toán</span>
        </div>
      </nav>

      {/* Content */}
      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800 mb-1">Thanh toán an toàn & bảo mật</h3>
              <p className="text-green-700 text-sm">Mọi giao dịch được bảo vệ bởi công nghệ mã hóa SSL 256-bit. Thông tin thanh toán của bạn được bảo mật tuyệt đối.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methods.map((method, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-xl flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-primary-red" />
                  </div>
                  <h2 className="text-lg font-bold text-dark-text">{method.title}</h2>
                </div>
                <p className="text-gray-text text-sm mb-4">{method.desc}</p>
                <ul className="space-y-2">
                  {method.details.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-text">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* B2B */}
          <div className="mt-8 bg-navy-blue rounded-xl p-6 lg:p-8 text-white">
            <h2 className="text-xl font-bold mb-4">Dành cho doanh nghiệp & đại lý</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">Công nợ theo hợp đồng</h4>
                <p className="text-white/70 text-sm">Chính sách công nợ linh hoạt 15-30 ngày cho đối tác có hợp đồng.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Chiết khấu theo sản lượng</h4>
                <p className="text-white/70 text-sm">Ưu đãi đặc biệt cho đơn hàng lớn và khách hàng thân thiết.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-light-gray rounded-xl p-6 text-center">
            <p className="text-gray-text mb-4">Cần hỗ trợ thanh toán? Liên hệ ngay!</p>
            <a href="tel:19001234" className="btn btn--primary h-11 px-6">
              <Phone className="w-5 h-5" /> 1900 1234
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PaymentMethodsPage
