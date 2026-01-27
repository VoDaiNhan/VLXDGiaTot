import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { brands } from '../data/brands'
import { products } from '../data/products'
import { 
  Home, ChevronRight, Grid3X3, List, 
  SlidersHorizontal, Tag, Check, Award, Package 
} from 'lucide-react'

const BrandDetailPage = () => {
  const { name } = useParams();
  const [view, setView] = useState('grid');

  // Find brand info
  const brand = brands.find(b => b.name.toLowerCase() === name.toLowerCase()) || {
    name: name,
    description: 'Thương hiệu chất lượng cao',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200'
  };

  // Filter products by brand
  const brandProducts = products.filter(p => p.brand.toLowerCase() === name.toLowerCase());

  return (
    <Layout>
      {/* Brand Banner */}
      <section className="bg-gradient-to-br from-navy-blue to-[#1a3a7a] py-16 px-4 lg:px-16 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-24 -mb-24"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex items-center gap-8 text-center lg:text-left">
            <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-xl shrink-0 mx-auto lg:mx-0 p-4">
              <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/80 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
                <Award className="w-3 h-3" />
                Thương hiệu chính hãng
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">{brand.name}</h1>
              <p className="text-white/60 max-w-xl">{brand.description}</p>
            </div>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {[
              { label: 'Sản phẩm', val: brandProducts.length || brand.productCount },
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

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color sticky top-20 z-40">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <Link to="/brands" className="text-light-text hover:text-primary-red transition-colors">Thương hiệu</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">{brand.name}</span>
        </div>
      </nav>

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

            {/* Price Filter */}
            <div className="mb-8">
              <h4 className="flex items-center gap-2 text-sm font-bold text-dark-text mb-4">
                <Tag className="w-4 h-4" />
                Khoảng giá
              </h4>
              <div className="space-y-3">
                {['Tất cả giá', 'Dưới 100.000đ', '100.000đ - 500.000đ', 'Trên 500.000đ'].map((label, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" defaultChecked={idx === 0} className="w-4 h-4 accent-primary-red" />
                    <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{label}</span>
                  </label>
                ))}
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
            <span className="text-sm text-light-text">Hiển thị <strong>{brandProducts.length}</strong> sản phẩm từ <strong>{brand.name}</strong></span>
            
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
                <option>Mới nhất</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {brandProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-16 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-text mb-2">Chưa có sản phẩm</h3>
              <p className="text-light-text mb-6">Thương hiệu này hiện chưa có sản phẩm trong kho.</p>
              <Link to="/products" className="btn btn--primary">Xem tất cả sản phẩm</Link>
            </div>
          )}

          {/* Grid */}
          {brandProducts.length > 0 && (
            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
              {brandProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination (show only if there are products) */}
          {brandProducts.length > 0 && (
            <div className="mt-12 flex justify-center gap-2">
              <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text disabled:opacity-50" disabled>&lt;</button>
              <button className="w-10 h-10 bg-primary-red text-white rounded-lg font-bold">1</button>
              <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-gray-text hover:border-primary-red hover:text-primary-red transition-all">&gt;</button>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}

export default BrandDetailPage
