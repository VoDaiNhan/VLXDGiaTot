import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import sql from '../lib/db'
import { 
  ArrowRight, Phone, ShoppingBag, Zap, 
  Package, Grid3X3, Construction, PaintBucket, 
  Mountain, Warehouse, Flame, MessageCircle, 
  CheckCircle2, Loader2
} from 'lucide-react'
import { projects as projectsData, projectCategories } from '../data/projects'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeProjectTab, setActiveProjectTab] = useState('Nhà phố');
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const slides = [
    {
      id: 1,
      tag: 'Ưu đãi đặc biệt tháng này',
      title: <>Vật Liệu Xây Dựng <br /><span className="text-primary-red">Chất Lượng Cao</span></>,
      desc: 'Đối tác tin cậy của hàng nghìn nhà thầu và gia đình. Giao hàng nhanh - Giá cạnh tranh - Bảo hành uy tín.',
      image: 'https://images.unsplash.com/photo-1591966815206-93ded96ee841?w=800',
      clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
    },
    {
      id: 2,
      tag: 'Sản phẩm mới nhất',
      title: <>Giải Pháp Xây Dựng <br /><span className="text-primary-red">Toàn Diện</span></>,
      desc: 'Cung cấp đầy đủ gạch, cát, đá, xi măng và thiết bị hoàn thiện cho mọi công trình lớn nhỏ.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800', // Construction
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)'
    },
    {
      id: 3,
      tag: 'Dịch vụ chuyên nghiệp',
      title: <>Thiết Kế & Thi Công <br /><span className="text-primary-red">Trọn Gói</span></>,
      desc: 'Đội ngũ kỹ sư giàu kinh nghiệm, cam kết tiến độ và chất lượng công trình tuyệt đối.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800', 
      clipPath: 'circle(70% at 70% 50%)' 
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await sql`SELECT * FROM products ORDER BY created_at DESC`;
        setProducts(res);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Sales Countdown logic
  useEffect(() => {
    // Set target date to 3 days from now for demo
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products by type for different sections
  // Note: DB columns are snake_case, but some logic might expect specific flags
  // We can infer flags or just assume all are "new" if recent?
  // Check DB columns: price, sale_price.
  
  const newProducts = products.slice(0, 4); // Top 4 recent
  const saleProducts = products.filter(p => p.sale_price < p.price).slice(0, 4);
  const bestSellers = products.slice(4, 8); // Just take next 4 for now

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-red" />
        </div>
      </Layout>
    );
  }

  const categories = [
    { name: 'Xi Măng', icon: Package, count: 120 },
    { name: 'Gạch Xây', icon: Grid3X3, count: 85 },
    { name: 'Sắt Thép', icon: Construction, count: 156 },
    { name: 'Sơn Nước', icon: PaintBucket, count: 92 },
    { name: 'Cát Đá', icon: Mountain, count: 45 },
    { name: 'Vật Liệu Lợp', icon: Warehouse, count: 78 },
  ];

  const filteredProjects = projectsData.filter(p => p.category === activeProjectTab);



  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center px-4 lg:px-16 overflow-hidden bg-[#f8f9fa]">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
             <div className="container mx-auto h-full flex items-center px-4 lg:px-0">
                <div className="relative z-10 max-w-2xl text-left pl-8 lg:pl-20">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-red/10 text-primary-red rounded-full text-xs font-bold uppercase tracking-tight mb-6 animate-fadeIn">
                    <Zap className="w-4 h-4 fill-primary-red" />
                    {slide.tag}
                  </div>
                  <h1 className="text-4xl lg:text-7xl font-bold leading-tight mb-6 text-dark-text animate-slideUp">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg animate-slideUp delay-100">
                    {slide.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 animate-slideUp delay-200">
                    <Link to="/products" className="btn btn--primary h-14 px-10">
                      <ShoppingBag className="w-5 h-5" /> Mua ngay
                    </Link>
                    <button className="btn btn--outline h-14 px-10">
                      <Phone className="w-5 h-5" /> Liên hệ tư vấn
                    </button>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                  <img 
                    src={slide.image} 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                    style={{ clipPath: slide.clipPath }}
                  />
                </div>
             </div>
          </div>
        ))}

        {/* Dots Navigation */}
        <div className="absolute bottom-10 left-8 lg:left-16 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx 
                  ? 'w-8 h-2 bg-primary-red' 
                  : 'w-2 h-2 bg-gray-300 hover:bg-primary-red/50'
              }`}
            />
          ))}
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

          {/* Countdown Dynamic */}
          <div className="flex justify-center gap-4 mb-20 text-white">
            {[
              [timeLeft.days, 'Ngày'], 
              [timeLeft.hours, 'Giờ'], 
              [timeLeft.minutes, 'Phút'], 
              [timeLeft.seconds, 'Giây']
            ].map(([val, label], idx) => (
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
          {projectCategories.map((tab, i) => (
            <button 
              key={i} 
              onClick={() => setActiveProjectTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeProjectTab === tab ? 'bg-primary-red text-white' : 'bg-white text-gray-text hover:bg-gray-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((proj) => (
            <Link key={proj.id} to={`/project/${proj.id}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold mb-1">{proj.title}</h3>
                <p className="text-white/60 text-xs">{proj.location}</p>
              </div>
            </Link>
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
