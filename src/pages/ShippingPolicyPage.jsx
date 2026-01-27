import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, Truck, Clock, MapPin, 
  Package, AlertCircle, CheckCircle2, Phone
} from 'lucide-react'

const ShippingPolicyPage = () => {
  const sections = [
    {
      icon: MapPin,
      title: 'Phạm vi giao hàng',
      items: [
        'Giao hàng toàn quốc 63 tỉnh thành',
        'Nội thành TP.HCM: Giao trong ngày với đơn đặt trước 14h',
        'Các tỉnh miền Nam: 1-2 ngày làm việc',
        'Miền Trung và miền Bắc: 2-5 ngày làm việc',
        'Vùng sâu, vùng xa có thể kéo dài thêm 1-2 ngày'
      ]
    },
    {
      icon: Clock,
      title: 'Thời gian giao hàng',
      items: [
        'Đơn hàng được xử lý trong giờ hành chính (8:00 - 17:30)',
        'Đơn đặt sau 17h30 sẽ được xử lý vào ngày làm việc tiếp theo',
        'Giao hàng từ Thứ 2 đến Thứ 7 (8:00 - 18:00)',
        'Chủ nhật và ngày lễ: Có thể hẹn giao theo yêu cầu'
      ]
    },
    {
      icon: Package,
      title: 'Phí vận chuyển',
      items: [
        'MIỄN PHÍ giao hàng cho đơn từ 500.000đ trong nội thành',
        'Đơn dưới 500.000đ: Phí 30.000đ/đơn (nội thành)',
        'Các tỉnh: Phí tính theo khoảng cách và khối lượng',
        'Vật liệu cồng kềnh (thép, xi măng lớn): Báo giá riêng',
        'Liên hệ hotline để được báo giá chính xác'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Lưu ý quan trọng',
      items: [
        'Kiểm tra hàng kỹ trước khi nhận, ký biên bản nếu có hư hỏng',
        'Chuẩn bị người nhận và phương tiện bốc dỡ tại công trình',
        'Thông báo trước 24h nếu muốn đổi địa điểm/thời gian giao',
        'Hàng không được nhận sẽ lưu kho và tính phí phát sinh'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <Truck className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Chính sách vận chuyển</h1>
        <p className="text-white/60 text-sm">Cập nhật: 01/01/2026</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Chính sách vận chuyển</span>
        </div>
      </nav>

      {/* Content */}
      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-800 mb-1">Cam kết giao hàng đúng hẹn</h3>
              <p className="text-green-700 text-sm">Chúng tôi cam kết giao hàng đúng thời gian đã hẹn. Nếu trễ hẹn do lỗi của chúng tôi, quý khách sẽ được giảm 5% giá trị đơn hàng.</p>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-red/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-red" />
                  </div>
                  <h2 className="text-xl font-bold text-dark-text">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-text">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-8 bg-light-gray rounded-xl p-6 text-center">
            <p className="text-gray-text mb-4">Có thắc mắc về vận chuyển? Liên hệ ngay!</p>
            <a href="tel:19001234" className="btn btn--primary h-11 px-6">
              <Phone className="w-5 h-5" /> 1900 1234
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ShippingPolicyPage
