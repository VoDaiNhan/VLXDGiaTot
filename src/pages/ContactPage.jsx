import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, MapPin, Phone, Mail, Clock, 
  Send, MessageSquare, User, FileText
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
  };

  const contactInfo = [
    { 
      icon: MapPin, 
      title: 'Địa chỉ', 
      content: '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
      sub: 'Kho hàng: KCN Bình Dương, Dĩ An'
    },
    { 
      icon: Phone, 
      title: 'Hotline', 
      content: '1900 1234',
      sub: 'Hỗ trợ 24/7'
    },
    { 
      icon: Mail, 
      title: 'Email', 
      content: 'info@vlxdgiatot.com',
      sub: 'sales@vlxdgiatot.com'
    },
    { 
      icon: Clock, 
      title: 'Giờ làm việc', 
      content: 'Thứ 2 - Thứ 7: 7:30 - 18:00',
      sub: 'Chủ nhật: 8:00 - 12:00'
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-16 px-4 lg:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <MessageSquare className="w-4 h-4" />
            Liên hệ
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p className="text-white/60 max-w-xl mx-auto">Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 30 phút!</p>
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
          <span className="font-medium text-dark-text">Liên hệ</span>
        </div>
      </nav>

      {/* Contact Info Cards */}
      <section className="px-4 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary-red" />
              </div>
              <h3 className="font-bold text-dark-text mb-2">{item.title}</h3>
              <p className="text-gray-text text-sm">{item.content}</p>
              {item.sub && <p className="text-light-text text-xs mt-1">{item.sub}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section className="px-4 lg:px-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-dark-text mb-6">Gửi yêu cầu báo giá</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              </div>
              <div>
                <label className="block text-sm font-bold text-dark-text mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark-text mb-2">
                  <FileText className="w-4 h-4 inline mr-1" /> Tiêu đề
                </label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Báo giá xi măng cho công trình..."
                  className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark-text mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" /> Nội dung *
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Mô tả yêu cầu của bạn..."
                  className="w-full p-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors resize-none"
                />
              </div>
              <button type="submit" className="btn btn--primary w-full h-14 text-base">
                <Send className="w-5 h-5" />
                Gửi yêu cầu
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.024430800832!2d106.69744411533428!3d10.731889692347076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3b251%3A0x4b4b4b4b4b4b4b4b!2zUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1700000000000"
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '500px' }}
              allowFullScreen 
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="bg-primary-red px-4 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-white text-center lg:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-2">Cần tư vấn gấp?</h3>
            <p className="text-white/80">Gọi ngay hotline để được hỗ trợ 24/7</p>
          </div>
          <a href="tel:19001234" className="flex items-center gap-3 bg-white text-primary-red px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
            <Phone className="w-6 h-6" />
            1900 1234
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage
