import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Facebook, MessageCircle, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Xi măng', path: '/category/Xi măng' },
    { name: 'Gạch xây', path: '/category/Gạch ốp lát' },
    { name: 'Sắt thép', path: '/category/Sắt thép' },
    { name: 'Sơn nước', path: '/category/Sơn' },
    { name: 'Tất cả sản phẩm', path: '/products' },
  ];

  const supportLinks = [
    { name: 'Chính sách vận chuyển', path: '/shipping-policy' },
    { name: 'Chính sách đổi trả', path: '/return-policy' },
    { name: 'Phương thức thanh toán', path: '/payment-methods' },
    { name: 'Chính sách bảo mật', path: '/privacy-policy' },
    { name: 'Câu hỏi thường gặp', path: '/faq' },
  ];

  const aboutLinks = [
    { name: 'Giới thiệu', path: '/about' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Dự án', path: '/projects' },
    { name: 'Thương hiệu', path: '/brands' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <footer className="bg-[#111111] pt-20 px-4 lg:px-16 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Logo & Info */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <Building2 className="w-10 h-10 text-primary-red" />
            <span className="text-2xl font-bold tracking-tight uppercase">VLXD Giá Tốt</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Chuyên cung cấp vật liệu xây dựng chất lượng cao với giá cả cạnh tranh. Phục vụ hàng nghìn công trình trên toàn quốc với sự uy tín và tận tâm.
          </p>
          <div className="flex gap-4">
            {[Facebook, MessageCircle, Youtube].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-primary-red hover:border-primary-red hover:text-white transition-all duration-200">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Sản phẩm */}
        <div>
          <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-red">Sản Phẩm</h4>
          <nav className="flex flex-col gap-4">
            {productLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-400 hover:text-primary-red text-sm transition-colors">{link.name}</Link>
            ))}
          </nav>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-red">Hỗ Trợ</h4>
          <nav className="flex flex-col gap-4">
            {supportLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-400 hover:text-primary-red text-sm transition-colors">{link.name}</Link>
            ))}
          </nav>
        </div>

        {/* Về chúng tôi + Liên hệ */}
        <div>
          <h4 className="text-lg font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-12 after:h-0.5 after:bg-primary-red">Về Chúng Tôi</h4>
          <nav className="flex flex-col gap-4 mb-8">
            {aboutLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-400 hover:text-primary-red text-sm transition-colors">{link.name}</Link>
            ))}
          </nav>
          
          <h4 className="text-lg font-bold mb-4">Liên Hệ</h4>
          <div className="space-y-3">
            {[
              { Icon: MapPin, text: '123 Đường ABC, Quận 7, TP.HCM' },
              { Icon: Phone, text: '1900.1234' },
              { Icon: Mail, text: 'info@vlxdgiatot.com' }
            ].map(({ Icon, text }, idx) => (
              <div key={idx} className="flex gap-3 text-sm text-gray-400">
                <Icon className="w-5 h-5 text-primary-red shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-xs">© {currentYear} VLXD Giá Tốt. Bản quyền thuộc về Công ty TNHH Vật Liệu Xây Dựng Giá Tốt.</p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link to="/sale" className="text-xs text-yellow-400 font-bold hover:text-yellow-300">🔥 SALE</Link>
          {['VISA', 'MC', 'ATM', 'COD'].map(p => (
            <span key={p} className="text-[10px] font-bold border border-gray-700 px-2 py-1 rounded text-gray-500">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
