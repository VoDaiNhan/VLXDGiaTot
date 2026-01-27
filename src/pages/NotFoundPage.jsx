import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Home, Search, ShoppingCart, Phone, ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
  const popularLinks = [
    { label: 'Trang chủ', path: '/', icon: Home },
    { label: 'Sản phẩm', path: '/products', icon: ShoppingCart },
    { label: 'Liên hệ', path: '/contact', icon: Phone },
  ];

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 lg:px-16 py-16 bg-light-gray">
        <div className="text-center max-w-lg">
          {/* 404 Big Number */}
          <div className="relative mb-8">
            <span className="text-[180px] lg:text-[240px] font-bold text-gray-100 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary-red/10 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 text-primary-red" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl lg:text-4xl font-bold text-dark-text mb-4">
            Trang không tồn tại
          </h1>
          <p className="text-gray-text mb-8">
            Xin lỗi, trang bạn đang tìm kiếm có thể đã bị xóa, 
            đổi tên hoặc tạm thời không khả dụng.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/" className="btn btn--primary h-12 px-8">
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn btn--outline h-12 px-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại
            </button>
          </div>

          {/* Popular Links */}
          <div className="pt-8 border-t border-border-color">
            <p className="text-sm text-light-text mb-4">Hoặc truy cập các trang phổ biến:</p>
            <div className="flex justify-center gap-4">
              {popularLinks.map((link, i) => (
                <Link 
                  key={i}
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-text hover:text-primary-red hover:shadow-md transition-all"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
