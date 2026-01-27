import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { brands } from '../data/brands'
import { products } from '../data/products'
import { Home, ChevronRight, ArrowRight, Award, Package, Star } from 'lucide-react'

const BrandsPage = () => {
  // Calculate actual product count per brand from products data
  const getBrandProductCount = (brandName) => {
    return products.filter(p => p.brand === brandName).length;
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-navy-blue py-16 px-4 lg:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Award className="w-4 h-4" />
            Đối tác uy tín
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">THƯƠNG HIỆU ĐỐI TÁC</h1>
          <p className="text-white/60 max-w-xl mx-auto">Hợp tác cùng các thương hiệu vật liệu xây dựng hàng đầu Việt Nam và quốc tế</p>
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
          <span className="font-medium text-dark-text">Thương hiệu</span>
        </div>
      </nav>

      {/* Brands Grid */}
      <section className="py-16 px-4 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand) => {
            const productCount = getBrandProductCount(brand.name);
            return (
              <Link 
                key={brand.id} 
                to={`/brand/${brand.name}`}
                className="group bg-white rounded-2xl shadow-sm border border-transparent hover:border-primary-red hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Logo Area */}
                <div className="aspect-[16/10] bg-light-gray flex items-center justify-center p-8 relative overflow-hidden">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-w-[120px] max-h-[60px] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Info */}
                <div className="p-6 text-left">
                  <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-primary-red transition-colors">{brand.name}</h3>
                  <p className="text-sm text-light-text line-clamp-2 mb-4">{brand.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-text">
                      <Package className="w-4 h-4" />
                      <span>{productCount > 0 ? productCount : brand.productCount} sản phẩm</span>
                    </div>
                    <span className="text-primary-red font-bold text-xs uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Xem thêm <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 lg:px-16 bg-light-gray text-center">
        <h2 className="text-2xl font-bold text-dark-text mb-4">Tại sao chọn chúng tôi?</h2>
        <p className="text-light-text mb-12 max-w-xl mx-auto">Chúng tôi chỉ hợp tác với các thương hiệu đạt tiêu chuẩn chất lượng quốc tế</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { val: '50+', label: 'Thương hiệu đối tác' },
            { val: '10K+', label: 'Sản phẩm chính hãng' },
            { val: '99%', label: 'Khách hàng hài lòng' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
              <span className="block text-4xl font-bold text-primary-red mb-2">{stat.val}</span>
              <span className="text-sm text-gray-text uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default BrandsPage
