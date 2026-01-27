import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { 
  Home, ChevronRight, Building2, Target, Eye, Users, 
  Award, Truck, ShieldCheck, Clock, CheckCircle2
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { value: '15+', label: 'Năm kinh nghiệm', icon: Clock },
    { value: '500+', label: 'Dự án hoàn thành', icon: Building2 },
    { value: '50+', label: 'Đối tác chiến lược', icon: Users },
    { value: '10,000+', label: 'Khách hàng tin tưởng', icon: Award },
  ];

  const values = [
    { 
      icon: ShieldCheck, 
      title: 'Chất lượng hàng đầu', 
      desc: 'Cam kết cung cấp vật liệu xây dựng chính hãng từ các thương hiệu uy tín hàng đầu.' 
    },
    { 
      icon: Truck, 
      title: 'Giao hàng nhanh chóng', 
      desc: 'Hệ thống vận chuyển chuyên nghiệp, giao hàng đúng hẹn đến tận công trình.' 
    },
    { 
      icon: Award, 
      title: 'Giá cả cạnh tranh', 
      desc: 'Nhập hàng trực tiếp từ nhà máy, loại bỏ trung gian, giá tốt nhất thị trường.' 
    },
  ];

  const milestones = [
    { year: '2010', event: 'Thành lập công ty VLXD Giá Tốt' },
    { year: '2015', event: 'Mở rộng kho bãi 10,000m² tại Bình Dương' },
    { year: '2018', event: 'Trở thành đại lý cấp 1 của Viglacera, Hà Tiên' },
    { year: '2020', event: 'Ra mắt hệ thống đặt hàng online' },
    { year: '2024', event: 'Phục vụ hơn 10,000 khách hàng, 500 dự án lớn' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-20 px-4 lg:px-16 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-red/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Building2 className="w-4 h-4" />
            Về chúng tôi
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            VẬT LIỆU XÂY DỰNG <span className="text-primary-red">GIÁ TỐT</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Đối tác tin cậy của hàng nghìn công trình xây dựng trên cả nước. 
            Chất lượng - Uy tín - Giá tốt nhất thị trường.
          </p>
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
          <span className="font-medium text-dark-text">Giới thiệu</span>
        </div>
      </nav>

      {/* Mission & Vision */}
      <section className="px-4 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10 border-l-4 border-primary-red">
            <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary-red" />
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-4">Sứ mệnh</h2>
            <p className="text-gray-text leading-relaxed">
              Cung cấp vật liệu xây dựng chất lượng cao với giá cả hợp lý nhất, 
              góp phần xây dựng những công trình vững chắc và bền đẹp cho người Việt.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10 border-l-4 border-navy-blue">
            <div className="w-14 h-14 bg-navy-blue/10 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-navy-blue" />
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-4">Tầm nhìn</h2>
            <p className="text-gray-text leading-relaxed">
              Trở thành nhà phân phối vật liệu xây dựng hàng đầu Việt Nam, 
              với mạng lưới phủ sóng toàn quốc và tiêu chuẩn dịch vụ quốc tế.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-red px-4 lg:px-16 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center text-white">
              <stat.icon className="w-10 h-10 mx-auto mb-4 opacity-80" />
              <span className="block text-4xl lg:text-5xl font-bold mb-2">{stat.value}</span>
              <span className="text-sm text-white/70 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-4 lg:px-16 py-16 bg-light-gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-text mb-4">Giá trị cốt lõi</h2>
          <p className="text-gray-text max-w-xl mx-auto">Những cam kết không thay đổi của chúng tôi với khách hàng</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <val.icon className="w-8 h-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-3">{val.title}</h3>
              <p className="text-gray-text">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 lg:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-text mb-4">Hành trình phát triển</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {milestones.map((item, i) => (
            <div key={i} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-red text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {item.year}
                </div>
                {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-2"></div>}
              </div>
              <div className="pb-8">
                <p className="text-lg text-dark-text font-medium">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-blue px-4 lg:px-16 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng hợp tác?</h2>
        <p className="text-white/70 mb-8 max-w-xl mx-auto">Liên hệ ngay để nhận báo giá tốt nhất cho dự án của bạn!</p>
        <Link to="/contact" className="btn btn--primary px-10 h-14 text-base">
          Liên hệ ngay
        </Link>
      </section>
    </Layout>
  )
}

export default AboutPage
