import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, RefreshCw, Clock, Package, 
  XCircle, CheckCircle2, AlertTriangle, Phone
} from 'lucide-react'

const ReturnPolicyPage = () => {
  const sections = [
    {
      icon: Clock,
      title: 'Thời hạn đổi trả',
      items: [
        'Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng',
        'Sản phẩm hư hỏng do vận chuyển: Thông báo trong 24 giờ',
        'Sản phẩm lỗi nhà sản xuất: Đổi trả theo chính sách bảo hành',
        'Quá thời hạn trên, chúng tôi không hỗ trợ đổi trả'
      ]
    },
    {
      icon: CheckCircle2,
      title: 'Điều kiện đổi trả',
      items: [
        'Sản phẩm còn nguyên đai, nguyên kiện, chưa qua sử dụng',
        'Còn đầy đủ tem, nhãn mác của nhà sản xuất',
        'Có hóa đơn mua hàng hoặc phiếu giao hàng',
        'Sản phẩm không thuộc danh mục không được đổi trả'
      ]
    },
    {
      icon: XCircle,
      title: 'Sản phẩm KHÔNG được đổi trả',
      items: [
        'Vật liệu đã qua sử dụng hoặc đã trộn/pha chế',
        'Xi măng đã mở bao hoặc bị ẩm',
        'Sơn đã mở nắp hoặc đã pha màu',
        'Sản phẩm đặt riêng theo yêu cầu khách hàng',
        'Hàng khuyến mãi, thanh lý'
      ]
    },
    {
      icon: Package,
      title: 'Quy trình đổi trả',
      items: [
        'Bước 1: Liên hệ hotline 1900 1234 hoặc email info@vlxdgiatot.com',
        'Bước 2: Cung cấp mã đơn hàng, hình ảnh sản phẩm lỗi',
        'Bước 3: Nhân viên xác nhận và hướng dẫn gửi trả',
        'Bước 4: Hoàn tiền hoặc gửi sản phẩm thay thế trong 3-5 ngày'
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Chính sách đổi trả</h1>
        <p className="text-white/60 text-sm">Cập nhật: 01/01/2026</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Chính sách đổi trả</span>
        </div>
      </nav>

      {/* Content */}
      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-1">Lưu ý quan trọng</h3>
              <p className="text-yellow-700 text-sm">Vui lòng kiểm tra kỹ hàng hóa ngay khi nhận. Mọi khiếu nại về số lượng, chủng loại cần được thông báo trong vòng 24 giờ.</p>
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
                      <span className="w-2 h-2 bg-primary-red rounded-full mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Refund Info */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-dark-text mb-4">Phương thức hoàn tiền</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-light-gray rounded-lg p-4">
                <h4 className="font-bold text-dark-text mb-1">Thanh toán COD</h4>
                <p className="text-sm text-gray-text">Hoàn tiền qua chuyển khoản trong 3-5 ngày làm việc</p>
              </div>
              <div className="bg-light-gray rounded-lg p-4">
                <h4 className="font-bold text-dark-text mb-1">Thanh toán online</h4>
                <p className="text-sm text-gray-text">Hoàn tiền về tài khoản gốc trong 5-7 ngày làm việc</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-light-gray rounded-xl p-6 text-center">
            <p className="text-gray-text mb-4">Cần hỗ trợ đổi trả? Liên hệ ngay!</p>
            <a href="tel:19001234" className="btn btn--primary h-11 px-6">
              <Phone className="w-5 h-5" /> 1900 1234
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ReturnPolicyPage
