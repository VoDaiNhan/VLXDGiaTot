import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { brands } from '../data/brands'
import sql from '../lib/db'
import { Home, ChevronRight, Building2, Package, Loader2, Search } from 'lucide-react'

const BrandDetailPage = () => {
  const { slug } = useParams();
  const brand = brands.find(b => b.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!brand) return;

    const fetchBrandProducts = async () => {
      try {
        setLoading(true);
        // Assuming 'brand' column in DB matches brand.name EXACTLY.
        // If inconsistent, we might need ILIKE or normalization.
        // Using straightforward match for now as per previous checks.
        const res = await sql`
          SELECT * FROM products 
          WHERE brand = ${brand.name} 
          ORDER BY created_at DESC
        `;
        setProducts(res);
      } catch (error) {
        console.error('Error fetching brand products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProducts();
  }, [brand]);

  if (!brand) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-dark-text mb-4">Không tìm thấy thương hiệu</h1>
          <p className="text-gray-text mb-8">Thương hiệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/brands" className="btn btn--primary">
            Quay lại danh sách thương hiệu
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Brand Hero */}
      <section className="bg-navy-blue text-white py-16 px-4 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-red/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 max-w-6xl mx-auto">
          <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
             <Building2 className="w-16 h-16 text-navy-blue" />
             {/* <img src={brand.logo} alt={brand.name} className="w-24 h-24 object-contain" /> */}
          </div>
          
          <div className="text-center md:text-left flex-1">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
               <span className="text-primary-red font-bold tracking-widest uppercase text-sm">Đối tác chính thức</span>
               <span className="w-1 h-1 bg-white/30 rounded-full"></span>
               <span className="text-white/60 text-sm">Vật Liệu Xây Dựng</span>
             </div>
             
             <h1 className="text-4xl lg:text-5xl font-bold mb-4">{brand.name}</h1>
             <p className="text-white/80 text-lg max-w-2xl leading-relaxed mb-6">
               {brand.description}
             </p>
             
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium">
               <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                 <Package className="w-4 h-4 text-primary-red" />
                 <span>{products.length} sản phẩm đang kinh doanh</span>
               </div>
               {/* Add more arbitrary stats if needed */}
             </div>
          </div>
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
          <Link to="/brands" className="text-light-text hover:text-primary-red transition-colors">
            Thương hiệu
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">{brand.name}</span>
        </div>
      </nav>

      {/* Products Grid */}
      <section className="py-16 px-4 lg:px-16 bg-light-gray min-h-[50vh]">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-2xl font-bold text-dark-text">Sản phẩm của {brand.name}</h2>
           {/* Maybe add sorting later */}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary-red" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-500 mb-2">Chưa có sản phẩm nào</h3>
            <p className="text-light-text">Chúng tôi đang cập nhật danh mục cho thương hiệu này.</p>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default BrandDetailPage
