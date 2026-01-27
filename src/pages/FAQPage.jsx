import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, HelpCircle, ChevronDown, 
  Truck, CreditCard, Package, RefreshCw, Phone
} from 'lucide-react'

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'general', label: 'Chung', icon: HelpCircle },
    { id: 'shipping', label: 'Giao hàng', icon: Truck },
    { id: 'payment', label: 'Thanh toán', icon: CreditCard },
    { id: 'product', label: 'Sản phẩm', icon: Package },
    { id: 'return', label: 'Đổi trả', icon: RefreshCw },
  ];

  const faqs = {
    general: [
      { id: 'g1', q: 'VLXD Giá Tốt là gì?', a: 'VLXD Giá Tốt là đơn vị phân phối vật liệu xây dựng hàng đầu với hơn 15 năm kinh nghiệm. Chúng tôi cung cấp xi măng, thép, gạch, sơn và các vật liệu xây dựng từ các thương hiệu uy tín với giá tốt nhất thị trường.' },
      { id: 'g2', q: 'Làm sao để đặt hàng?', a: 'Bạn có thể đặt hàng trực tiếp trên website, gọi hotline 1900 1234, hoặc liên hệ qua Zalo/Facebook. Đội ngũ tư vấn sẽ hỗ trợ bạn 24/7.' },
      { id: 'g3', q: 'Có cần đăng ký tài khoản để mua hàng không?', a: 'Không bắt buộc. Bạn có thể mua hàng với tư cách khách. Tuy nhiên, tạo tài khoản sẽ giúp bạn theo dõi đơn hàng, tích điểm và nhận ưu đãi độc quyền.' },
    ],
    shipping: [
      { id: 's1', q: 'Thời gian giao hàng là bao lâu?', a: 'Nội thành TP.HCM: 1-2 ngày. Các tỉnh miền Nam: 2-3 ngày. Miền Trung và Bắc: 3-5 ngày. Đơn hàng lớn có thể được ưu tiên giao sớm hơn.' },
      { id: 's2', q: 'Phí vận chuyển được tính như thế nào?', a: 'Miễn phí giao hàng cho đơn từ 500,000đ. Đơn dưới 500,000đ tính phí 30,000đ/đơn trong nội thành. Vật liệu cồng kềnh (thép, xi măng số lượng lớn) được báo giá riêng.' },
      { id: 's3', q: 'Có giao hàng vào cuối tuần không?', a: 'Có. Chúng tôi giao hàng cả thứ 7 và Chủ nhật theo lịch đã hẹn với khách hàng.' },
    ],
    payment: [
      { id: 'p1', q: 'Có những phương thức thanh toán nào?', a: 'Thanh toán khi nhận hàng (COD), chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), và ví điện tử (Momo, ZaloPay).' },
      { id: 'p2', q: 'Có xuất hóa đơn VAT không?', a: 'Có. Chúng tôi xuất hóa đơn VAT 10% theo yêu cầu. Vui lòng cung cấp thông tin công ty khi đặt hàng.' },
      { id: 'p3', q: 'Có chính sách công nợ cho đại lý không?', a: 'Có. Đại lý và khách hàng doanh nghiệp có thể đăng ký chính sách công nợ sau khi ký hợp đồng. Liên hệ hotline để được tư vấn chi tiết.' },
    ],
    product: [
      { id: 'pr1', q: 'Sản phẩm có bảo hành không?', a: 'Tất cả sản phẩm đều là hàng chính hãng và được bảo hành theo chính sách của nhà sản xuất. Thời gian bảo hành tùy thuộc từng loại sản phẩm.' },
      { id: 'pr2', q: 'Làm sao để phân biệt hàng thật/giả?', a: 'Mọi sản phẩm đều có tem chính hãng, mã QR kiểm tra. Chúng tôi cung cấp chứng từ đầy đủ từ nhà máy.' },
    ],
    return: [
      { id: 'r1', q: 'Chính sách đổi trả như thế nào?', a: 'Đổi trả trong 7 ngày nếu sản phẩm lỗi do nhà sản xuất. Sản phẩm phải còn nguyên đai, nguyên kiện, chưa qua sử dụng.' },
      { id: 'r2', q: 'Ai chịu phí vận chuyển khi đổi trả?', a: 'Nếu lỗi do nhà sản xuất hoặc do chúng tôi giao sai, chúng tôi chịu hoàn toàn phí vận chuyển. Các trường hợp khác, khách hàng chịu phí.' },
    ],
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-16 px-4 lg:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">CÂU HỎI THƯỜNG GẶP</h1>
          <p className="text-white/60 max-w-xl mx-auto">Tìm câu trả lời nhanh cho những thắc mắc phổ biến</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">FAQ</span>
        </div>
      </nav>

      {/* Category Tabs */}
      <section className="bg-white px-4 lg:px-16 py-6 border-b border-border-color sticky top-20 z-40">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary-red text-white shadow-md'
                  : 'bg-light-gray text-gray-text hover:bg-gray-200'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs[activeCategory]?.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-dark-text pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-text shrink-0 transition-transform ${openItems.includes(faq.id) ? 'rotate-180' : ''}`} />
              </button>
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-text leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 lg:px-16 pb-16">
        <div className="max-w-3xl mx-auto bg-light-gray rounded-2xl p-8 text-center">
          <HelpCircle className="w-12 h-12 text-gray-text mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-text mb-2">Không tìm thấy câu trả lời?</h3>
          <p className="text-gray-text mb-6">Liên hệ đội ngũ hỗ trợ, chúng tôi sẵn sàng giúp bạn 24/7!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn btn--primary h-12 px-8">
              Liên hệ hỗ trợ
            </Link>
            <a href="tel:19001234" className="btn btn--outline h-12 px-8">
              <Phone className="w-5 h-5" />
              1900 1234
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default FAQPage
