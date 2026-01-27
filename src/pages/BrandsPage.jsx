import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { brands } from '../data/brands'
import { Building2, ArrowRight, Award, ChevronRight, Home } from 'lucide-react'

const BrandsPage = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-navy-blue py-12 px-4 lg:px-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Thương Hiệu Đối Tác</h1>
        <p className="text-white/60">Danh sách các nhà cung cấp vật liệu xây dựng uy tín hàng đầu</p>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Thương hiệu</span>
        </div>
      </nav>

      {/* Brands Grid */}
      <section className="py-16 px-4 lg:px-16 bg-light-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/brand/${brand.slug}`}
              className="group bg-white rounded-2xl p-8 border border-transparent shadow-sm hover:shadow-lg hover:border-primary-red/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-red/5 transition-colors">
                 <Building2 className="w-10 h-10 text-gray-400 group-hover:text-primary-red transition-colors" />
                 {/* Ideally use img for logo if available, falling back to icon */}
                 {/* <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-contain" /> */} 
              </div>
              
              <h2 className="text-2xl font-bold text-dark-text mb-3 group-hover:text-primary-red transition-colors">
                {brand.name}
              </h2>
              
              <p className="text-gray-text text-sm mb-6 line-clamp-2">
                {brand.description}
              </p>

              <div className="mt-auto w-full pt-6 border-t border-border-color flex justify-between items-center text-sm font-medium">
                <span className="flex items-center gap-2 text-primary-red bg-primary-red/5 px-3 py-1 rounded-full">
                  <Award className="w-4 h-4" />
                  {brand.productCount} sản phẩm
                </span>
                <span className="flex items-center gap-1 text-light-text group-hover:translate-x-1 transition-transform">
                  Xem chi tiết <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default BrandsPage
