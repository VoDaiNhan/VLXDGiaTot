import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import sql from '../lib/db'
import { 
  SlidersHorizontal, Grid3X3, List, Home, ChevronRight, 
  Search, Tag, Award, Check, Box, Info, Loader2
} from 'lucide-react'

import { Link, useParams } from 'react-router-dom'

const CategoryPage = () => {
  const { name } = useParams();
  const [view, setView] = useState('grid');
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch products from database by category name
        const res = await sql`
          SELECT p.* 
          FROM products p
          JOIN categories c ON p.category_id = c.id
          WHERE LOWER(c.name) = LOWER(${name})
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
          badge: p.badge || (p.is_new ? 'Mới' : p.is_sale ? 'Sale' : null),
          category: p.category || name
        }));
        
        setCategoryProducts(normalizedProducts);
      } catch (error) {
        console.error('Error fetching category products:', error);
        // Fallback to static data
        const staticProducts = products.filter(p => p.category.toLowerCase() === name.toLowerCase());
        setCategoryProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [name]);


  const categoryMap = {
    'Xi Măng': {
      desc: 'Cung cấp các loại xi măng chất lượng cao từ các thương hiệu hàng đầu như Hà Tiên, INSEE, Nghi Sơn...',
      types: [
        { name: 'PCB40 Đa Dụng', count: 45 },
        { name: 'PCB40 Xây Tô', count: 32 },
        { name: 'PCB50 Thủy Điện', count: 12 },
        { name: 'Xi măng trắng', count: 8 },
      ]
    },
    'Gạch Xây': {
      desc: 'Cung cấp các loại gạch xây dựng đa dạng: gạch ống, gạch đinh, gạch block với độ bền cao, đạt chuẩn kỹ thuật.',
      types: [
        { name: 'Gạch ống 4 lỗ', count: 28 },
        { name: 'Gạch đinh', count: 15 },
        { name: 'Gạch không nung', count: 22 },
        { name: 'Gạch block', count: 20 },
      ]
    },
    'Sắt Thép': {
      desc: 'Phân phối sắt thép xây dựng chính hãng từ Hòa Phát, Miền Nam, Việt Nhật... Đầy đủ quy cách và chủng loại cho mọi công trình.',
      types: [
        { name: 'Thép cuộn', count: 42 },
        { name: 'Thép cây (vằn)', count: 56 },
        { name: 'Thép hình', count: 32 },
        { name: 'Lưới thép', count: 26 },
      ]
    },
    'Sơn Nước': {
      desc: 'Hệ thống sơn nội thất, ngoại thất từ Dulux, Jotun, Nippon. Đa dạng màu sắc và tính năng bảo vệ công trình bền đẹp.',
      types: [
        { name: 'Sơn nội thất', count: 34 },
        { name: 'Sơn ngoại thất', count: 28 },
        { name: 'Sơn lót', count: 15 },
        { name: 'Bột trét', count: 15 },
      ]
    },
    'Cát Đá': {
      desc: 'Cung cấp cát đá xây dựng sạch, đúng tiêu chuẩn kỹ thuật: cát tô, cát đúc, đá 1x2, đá xanh san lấp mặt bằng.',
      types: [
        { name: 'Cát xây tô', count: 12 },
        { name: 'Cát bê tông', count: 10 },
        { name: 'Đá 1x2', count: 8 },
        { name: 'Đá 4x6', count: 8 },
        { name: 'Cát san lấp', count: 7 },
      ]
    },
    'Vật Liệu Lợp': {
      desc: 'Các loại tôn lợp, ngói màu, tấm lợp đúc sẵn với khả năng chống nóng, chống ồn và chịu lực vượt trội.',
      types: [
        { name: 'Tôn lạnh', count: 24 },
        { name: 'Tôn màu', count: 18 },
        { name: 'Ngói màu', count: 22 },
        { name: 'Tấm lợp thông minh', count: 14 },
      ]
    }
  };

  const currentCategory = categoryMap[name] || {
    desc: `Cung cấp các loại ${name} chất lượng cao, đáp ứng mọi nhu cầu xây dựng và hoàn thiện công trình.`,
    types: []
  };

  return (
    <Layout>
      {/* Category Banner */}
      <section className="bg-gradient-to-br from-navy-blue to-[#1a3a7a] py-16 px-4 lg:px-16 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-8 text-center lg:text-left">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white shrink-0 mx-auto lg:mx-0">
              <Box className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase">{name}</h1>
              <p className="text-white/60 max-w-xl">{currentCategory.desc}</p>
            </div>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {[
              { label: 'Sản phẩm', val: categoryProducts.length > 0 ? `${categoryProducts.length}+` : '---' },
              { label: 'Thương hiệu', val: [...new Set(categoryProducts.map(p => p.brand))].length || '8' },
              { label: 'Đánh giá', val: '4.8/5' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-3xl font-bold mb-1">{stat.val}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subcategories Navigation */}
      {currentCategory.types.length > 0 && (
        <nav className="bg-white px-4 lg:px-16 py-6 border-b border-border-color sticky top-20 z-40">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-dark-text whitespace-nowrap">
              <Info className="w-4 h-4 text-primary-red" />
              Phân loại:
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
              <button className="px-5 py-2 bg-primary-red text-white rounded-full text-sm font-medium whitespace-nowrap">Tất cả</button>
              {currentCategory.types.map((sub, i) => (
                <button key={i} className="px-5 py-2 bg-light-gray text-gray-text hover:bg-[#FFF0F0] hover:text-primary-red rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2">
                  {sub.name}
                  <span className="text-[10px] opacity-60">({sub.count})</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-16 py-10">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-44">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-color">
              <h3 className="flex items-center gap-2 font-bold text-dark-text">
                <SlidersHorizontal className="w-5 h-5" />
                Bộ lọc
              </h3>
              <button className="text-xs font-bold text-primary-red hover:underline">Xóa hết</button>
            </div>

            {/* Brand Filter */}
            <div className="mb-8">
              <h4 className="flex items-center gap-2 text-sm font-bold text-dark-text mb-4">
                <Award className="w-4 h-4" />
                Thương hiệu
              </h4>
              <div className="space-y-3">
                {[...new Set(categoryProducts.map(p => p.brand))].filter(Boolean).length > 0 ? (
                  [...new Set(categoryProducts.map(p => p.brand))].filter(Boolean).map((brand, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-primary-red rounded border-border-color" />
                      <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{brand}</span>
                    </label>
                  ))
                ) : (
                  ['Hòa Phát', 'Việt Nhật', 'Pomina', 'Hoa Sen'].map((brand, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 accent-primary-red rounded border-border-color" />
                      <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{brand}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <button className="w-full btn btn--primary py-3 text-sm">
              <Check className="w-4 h-4" />
              Áp dụng
            </button>
          </div>
        </aside>

        {/* Products Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-light-text hover:text-primary-red transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-light-text" />
              <span className="font-medium text-dark-text capitalize">{name}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex border border-border-color rounded-lg overflow-hidden">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors ${view === 'grid' ? 'bg-light-gray text-primary-red' : 'bg-white text-light-text hover:text-dark-text'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 border-l border-border-color transition-colors ${view === 'list' ? 'bg-light-gray text-primary-red' : 'bg-white text-light-text hover:text-dark-text'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <select className="bg-white border border-border-color rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary-red">
                <option>Sắp xếp: Mới nhất</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary-red" />
            </div>
          ) : categoryProducts.length > 0 ? (
            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
              {categoryProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text disabled:opacity-50" disabled>&lt;</button>
            <button className="w-10 h-10 bg-primary-red text-white rounded-lg font-bold">1</button>
            <button className="w-10 h-10 border border-border-color rounded-lg font-bold text-gray-text hover:border-primary-red hover:text-primary-red transition-all">2</button>
            <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-gray-text hover:border-primary-red hover:text-primary-red transition-all">&gt;</button>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default CategoryPage
