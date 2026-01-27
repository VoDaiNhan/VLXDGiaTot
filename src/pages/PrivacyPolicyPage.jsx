import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, Shield, Database, Eye, 
  Lock, UserCheck, Mail, Phone
} from 'lucide-react'

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: Database,
      title: '1. Thông tin chúng tôi thu thập',
      content: `Chúng tôi thu thập các thông tin sau khi bạn sử dụng dịch vụ:
      
• **Thông tin cá nhân**: Họ tên, email, số điện thoại, địa chỉ giao hàng
• **Thông tin đơn hàng**: Lịch sử mua hàng, sản phẩm đã xem
• **Thông tin kỹ thuật**: Địa chỉ IP, loại trình duyệt, thiết bị sử dụng
• **Cookie và dữ liệu theo dõi**: Để cải thiện trải nghiệm người dùng`
    },
    {
      icon: Eye,
      title: '2. Mục đích sử dụng thông tin',
      content: `Thông tin của bạn được sử dụng để:

• Xử lý đơn hàng và giao hàng đến địa chỉ yêu cầu
• Liên hệ xác nhận đơn hàng, thông báo trạng thái giao hàng
• Gửi thông tin khuyến mãi, ưu đãi (nếu bạn đồng ý)
• Cải thiện chất lượng dịch vụ và trải nghiệm website
• Hỗ trợ khách hàng và giải quyết khiếu nại`
    },
    {
      icon: Lock,
      title: '3. Bảo mật thông tin',
      content: `Chúng tôi cam kết bảo vệ thông tin của bạn:

• Sử dụng mã hóa SSL 256-bit cho mọi giao dịch
• Lưu trữ dữ liệu trên máy chủ bảo mật cao
• Giới hạn quyền truy cập dữ liệu cho nhân viên được ủy quyền
• Không bán hoặc chia sẻ thông tin cho bên thứ ba vì mục đích thương mại
• Tuân thủ Luật An ninh mạng và các quy định bảo vệ dữ liệu`
    },
    {
      icon: UserCheck,
      title: '4. Quyền của bạn',
      content: `Bạn có quyền:

• **Truy cập**: Yêu cầu xem thông tin cá nhân chúng tôi lưu trữ
• **Chỉnh sửa**: Cập nhật thông tin không chính xác
• **Xóa**: Yêu cầu xóa dữ liệu cá nhân (trừ trường hợp pháp luật yêu cầu lưu giữ)
• **Từ chối**: Hủy đăng ký nhận email marketing bất cứ lúc nào
• **Khiếu nại**: Liên hệ chúng tôi nếu có lo ngại về quyền riêng tư`
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Chính sách bảo mật</h1>
        <p className="text-white/60 text-sm">Cập nhật: 01/01/2026</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Chính sách bảo mật</span>
        </div>
      </nav>

      {/* Content */}
      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8">
            <p className="text-gray-text leading-relaxed">
              Công ty TNHH Vật Liệu Xây Dựng Giá Tốt ("chúng tôi") cam kết bảo vệ quyền riêng tư 
              của khách hàng. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ 
              thông tin cá nhân của bạn khi sử dụng website vlxdgiatot.com.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-red/10 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary-red" />
                  </div>
                  <h2 className="text-xl font-bold text-dark-text">{section.title}</h2>
                </div>
                <div className="text-gray-text leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-light-gray rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-bold text-dark-text mb-4">Liên hệ về quyền riêng tư</h3>
            <p className="text-gray-text mb-4">
              Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến chính sách bảo mật, 
              vui lòng liên hệ:
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:privacy@vlxdgiatot.com" className="flex items-center gap-2 text-primary-red font-bold">
                <Mail className="w-5 h-5" /> privacy@vlxdgiatot.com
              </a>
              <a href="tel:19001234" className="flex items-center gap-2 text-primary-red font-bold">
                <Phone className="w-5 h-5" /> 1900 1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default PrivacyPolicyPage
