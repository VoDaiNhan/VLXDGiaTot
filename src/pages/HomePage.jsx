import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { 
  ArrowRight, Phone, ShoppingBag, Zap, 
  Package, Grid3X3, Construction, PaintBucket, 
  Mountain, Warehouse, Flame, MessageCircle, 
  CheckCircle2 
} from 'lucide-react'

const HomePage = () => {
  // Filter products by type for different sections
  const newProducts = products.filter(p => p.isNew);
  const saleProducts = products.filter(p => p.isSale);
  const bestSellers = products.filter(p => p.isBestSeller);

  const categories = [
    { name: 'Xi Măng', icon: Package, count: 120 },
    { name: 'Gạch Xây', icon: Grid3X3, count: 85 },
    { name: 'Sắt Thép', icon: Construction, count: 156 },
    { name: 'Sơn Nước', icon: PaintBucket, count: 92 },
    { name: 'Cát Đá', icon: Mountain, count: 45 },
    { name: 'Vật Liệu Lợp', icon: Warehouse, count: 78 },
  ];

  const projects = [
    { title: 'Nhà Phố Hiện Đại 3 Tầng', loc: 'Quận 7, TP.HCM', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
    { title: 'Biệt Thự Sân Vườn', loc: 'Thủ Đức, TP.HCM', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600' },
    { title: 'Căn Hộ Cao Cấp', loc: 'Quận 2, TP.HCM', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
    { title: 'Nhà Phố Tân Cổ Điển', loc: 'Bình Thạnh, TP.HCM', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center px-4 lg:px-16 overflow-hidden bg-[#f8f9fa]">
        <div className="relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-red/10 text-primary-red rounded-full text-xs font-bold uppercase tracking-tight mb-6">
            <Zap className="w-4 h-4 fill-primary-red" />
            Ưu đãi đặc biệt tháng này
          </div>
          <h1 className="text-4xl lg:text-7xl font-bold leading-tight mb-6 text-dark-text">
            Vật Liệu Xây Dựng <br />
            <span className="text-primary-red">Chất Lượng Cao</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg">
            Đối tác tin cậy của hàng nghìn nhà thầu và gia đình. Giao hàng nhanh - Giá cạnh tranh - Bảo hành uy tín.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn btn--primary h-14 px-10">
              <ShoppingBag className="w-5 h-5" /> Mua ngay
            </Link>
            <button className="btn btn--outline h-14 px-10">
              <Phone className="w-5 h-5" /> Liên hệ tư vấn
            </button>
          </div>
          
          {/* Scroll Indicator (Mockup) */}
          <div className="mt-16 flex gap-2">
            <span className="w-8 h-2 bg-primary-red rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1591966815206-93ded96ee841?w=800" 
            alt="Hero" 
            className="w-full h-full object-cover clip-path-hero"
            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white px-4 lg:px-16 text-center">
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-text mb-4 uppercase tracking-wider">DANH MỤC VẬT LIỆU XÂY DỰNG</h2>
          <p className="text-light-text text-sm">Khám phá đa dạng sản phẩm chất lượng cao cho mọi công trình</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link key={i} to={`/category/${cat.name}`} className="group bg-white p-8 rounded-2xl border border-transparent shadow-sm hover:shadow-md hover:border-primary-red hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-light-gray rounded-2xl flex items-center justify-center text-gray-text mx-auto mb-6 group-hover:bg-primary-red group-hover:text-white transition-colors">
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-dark-text mb-2 group-hover:text-primary-red transition-colors">{cat.name}</h3>
              <span className="text-[10px] text-light-text uppercase tracking-widest">({cat.count} sản phẩm)</span>
            </Link>
          ))}
        </div>

      </section>

      {/* New Products Section */}
      <section className="py-24 bg-light-gray px-4 lg:px-16">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-dark-text mb-4 uppercase tracking-wider">VẬT LIỆU XÂY DỰNG MỚI</h2>
            <p className="text-light-text text-sm">Cập nhật sản phẩm mới nhất với giá tốt nhất</p>
          </div>
          <Link to="/products" className="text-primary-red font-bold text-sm hover:underline flex items-center gap-2">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Sale Section */}
      <section className="py-24 bg-primary-red px-4 lg:px-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -mr-32 -mb-32"></div>

        <div className="relative z-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Flame className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white uppercase tracking-widest">SALE VLXD GIÁ SỐC</h2>
            <Flame className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-white/80 mb-12">Giảm giá cực sốc - Số lượng có hạn!</p>

          {/* Countdown Mockup */}
          <div className="flex justify-center gap-4 mb-20 text-white">
            {[['02', 'Ngày'], ['14', 'Giờ'], ['32', 'Phút'], ['45', 'Giây']].map(([val, label], idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold mb-2">
                    {val}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{label}</span>
                </div>
                {idx < 3 && <span className="text-3xl font-bold mt-3 opacity-30">:</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {saleProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-white px-4 lg:px-16">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-dark-text mb-4 uppercase tracking-wider">VLXD BÁN CHẠY</h2>
            <p className="text-light-text text-sm">Sản phẩm được khách hàng tin dùng nhất</p>
          </div>
          <Link to="/products" className="text-primary-red font-bold text-sm hover:underline flex items-center gap-2">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-light-gray px-4 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-text mb-4 uppercase tracking-wider">DỰ ÁN HOÀN THIỆN</h2>
          <p className="text-light-text text-sm">Những công trình tiêu biểu sử dụng vật liệu từ VLXD Giá Tốt</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {['Nhà phố', 'Biệt thự', 'Công trình', 'Khác'].map((tab, i) => (
            <button key={i} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-primary-red text-white' : 'bg-white text-gray-text hover:bg-gray-100'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, i) => (
            <div key={i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold mb-1">{proj.title}</h3>
                <p className="text-white/60 text-xs">{proj.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-blue px-4 lg:px-16 text-center text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Sẵn Sàng Bắt Đầu Dự Án?</h2>
          <p className="text-white/60 mb-12 text-lg">Liên hệ ngay để được tư vấn miễn phí và báo giá tốt nhất cho công trình của bạn</p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button className="btn btn--primary h-14 px-10">
              <MessageCircle className="w-5 h-5" /> Liên hệ ngay
            </button>
            <a href="tel:19001234" className="btn btn--outline border-white/20 text-white hover:bg-white/10 h-14 px-10">
              <Phone className="w-5 h-5" /> Gọi 1900.1234
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {[
              { icon: CheckCircle2, text: 'Giao hàng miễn phí' },
              { icon: CheckCircle2, text: 'Bảo hành chính hãng' },
              { icon: CheckCircle2, text: 'Hỗ trợ 24/7' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-primary-red" />
                <span className="font-bold text-sm uppercase tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
