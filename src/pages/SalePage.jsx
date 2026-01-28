import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import sql from '../lib/db'
import { 
  Home, ChevronRight, Percent, Clock, Zap, 
  Gift, Tag, ArrowRight, Flame, Loader2
} from 'lucide-react'

const SalePage = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        // Fetch products where sale_price < price (on sale)
        const res = await sql`
          SELECT * FROM products 
          WHERE sale_price < price 
          ORDER BY (price - sale_price) DESC
        `;
        
        // Normalize products
        const normalizedProducts = res.map(p => ({
          ...p,
          salePrice: p.sale_price,
          originalPrice: p.price,
          image: Array.isArray(p.images) && p.images.length > 0 
            ? p.images[0] 
            : 'https://via.placeholder.com/400',
          isNew: p.is_new,
          isSale: p.is_sale,
          badge: p.badge || `Giảm ${Math.round((1 - p.sale_price / p.price) * 100)}%`,
          category: p.category || 'Sản phẩm'
        }));
        
        setSaleProducts(normalizedProducts);
      } catch (error) {
        console.error('Error fetching sale products:', error);
        // Fallback to static data
        const staticSaleProducts = products.filter(p => p.originalPrice > p.salePrice);
        setSaleProducts(staticSaleProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSaleProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDeals = saleProducts.slice(0, 4);
  const moreDeals = saleProducts.slice(4, 12);

  const promos = [
    { 
      icon: Percent, 
      title: 'Giảm đến 50%', 
      desc: 'Áp dụng cho xi măng, thép xây dựng' 
    },
    { 
      icon: Gift, 
      title: 'Quà tặng hấp dẫn', 
      desc: 'Mua nhiều tặng nhiều' 
    },
    { 
      icon: Tag, 
      title: 'Freeship từ 500K', 
      desc: 'Giao hàng toàn quốc' 
    },
  ];

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-red" />
        </div>
      ) : (
        <>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-red to-red-600 py-12 px-4 lg:px-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4" />
            Khuyến mãi hot
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            SALE <span className="text-yellow-300">KHỦNG</span> THÁNG 1
          </h1>
          <p className="text-white/80 text-lg mb-8">Giảm giá sốc lên đến 50% cho tất cả sản phẩm!</p>

          {/* Countdown */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <Clock className="w-6 h-6" />
            <span className="text-sm font-medium">Kết thúc sau:</span>
            <div className="flex gap-2">
              {[
                { val: timeLeft.hours, label: 'Giờ' },
                { val: timeLeft.minutes, label: 'Phút' },
                { val: timeLeft.seconds, label: 'Giây' },
              ].map((item, i) => (
                <div key={i} className="bg-white text-primary-red px-3 py-2 rounded-lg text-center min-w-[60px]">
                  <span className="text-2xl font-bold block">{String(item.val).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Khuyến mãi</span>
        </div>
      </nav>

      {/* Promos */}
      <section className="px-4 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map((promo, i) => (
            <div key={i} className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center shrink-0">
                <promo.icon className="w-7 h-7 text-primary-red" />
              </div>
              <div>
                <h3 className="font-bold text-dark-text">{promo.title}</h3>
                <p className="text-sm text-gray-text">{promo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="px-4 lg:px-16 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold text-dark-text">Flash Deals</h2>
          </div>
          <Link to="/products" className="text-primary-red font-bold text-sm flex items-center gap-1 hover:underline">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* More Deals */}
      <section className="px-4 lg:px-16 py-8 bg-light-gray">
        <h2 className="text-2xl font-bold text-dark-text mb-6">Giảm giá sâu</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moreDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 lg:px-16 py-12">
        <div className="bg-navy-blue rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Đăng ký nhận thông tin khuyến mãi</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">Nhập email để nhận thông báo về các chương trình giảm giá và ưu đãi độc quyền!</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email của bạn"
              className="flex-1 h-12 px-4 rounded-lg text-dark-text focus:outline-none"
            />
            <button type="submit" className="btn btn--primary h-12 px-8">
              Đăng ký
            </button>
          </form>
        </div>
      </section>
        </>
      )}
    </Layout>
  )
}

export default SalePage
