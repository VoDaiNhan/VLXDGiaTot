import React, { useState } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { 
  SlidersHorizontal, Grid3X3, List, Home, ChevronRight, 
  Search, Tag, Award, Check, CheckCircle2 
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [view, setView] = useState('grid');
  
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Tất cả sản phẩm</h1>
        <p className="text-white/60">Khám phá danh mục vật liệu xây dựng đầy đủ nhất cho công trình của bạn</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Sản phẩm</span>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-16 py-10">
        {/* Filter Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
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
                {['Tất cả giá', 'Dưới 80.000đ', '80.000đ - 100.000đ', 'Trên 100.000đ'].map((label, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" defaultChecked={idx === 0} className="w-4 h-4 accent-primary-red" />
                    <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-8">
              <h4 className="flex items-center gap-2 text-sm font-bold text-dark-text mb-4">
                <Award className="w-4 h-4" />
                Thương hiệu
              </h4>
              <div className="space-y-3">
                {['Hà Tiên', 'Nghi Sơn', 'INSEE', 'Holcim', 'Vicem'].map((brand, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-primary-red rounded border-border-color" />
                    <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full btn btn--primary py-3 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Áp dụng
            </button>
          </div>
        </aside>

        {/* Products Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-light-text">Hiển thị <strong>{products.length}</strong> sản phẩm</span>
            
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
                <option>Phổ biến nhất</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text disabled:opacity-50" disabled>&lt;</button>
            <button className="w-10 h-10 bg-primary-red text-white rounded-lg font-bold">1</button>
            <button className="w-10 h-10 border border-border-color rounded-lg font-bold text-gray-text hover:border-primary-red hover:text-primary-red transition-all">2</button>
            <button className="w-10 h-10 border border-border-color rounded-lg font-bold text-gray-text hover:border-primary-red hover:text-primary-red transition-all">3</button>
            <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-gray-text hover:border-primary-red hover:text-primary-red transition-all">&gt;</button>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default ProductsPage
