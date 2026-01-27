import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { CheckCircle2, Package, Truck, ArrowRight, Home, Copy } from 'lucide-react'

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const orderNumber = orderId ? `VL${orderId.padStart(6, '0')}` : 'VL' + Date.now().toString().slice(-8);
  
  const orderDate = new Date().toLocaleDateString('vi-VN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-dark-text mb-4">
            Đặt hàng thành công!
          </h1>
          <p className="text-light-text mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
          </p>

          {/* Order Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 text-left">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-color">
              <div>
                <span className="text-xs text-light-text uppercase tracking-widest block mb-1">Mã đơn hàng</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary-red">{orderNumber}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(orderNumber)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                    title="Copy mã đơn hàng"
                  >
                    <Copy className="w-4 h-4 text-gray-text" />
                  </button>
                </div>
              </div>
              <Package className="w-10 h-10 text-gray-300" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-light-text block">Ngày đặt</span>
                <span className="font-bold text-dark-text">{orderDate}</span>
              </div>
              <div>
                <span className="text-light-text block">Trạng thái</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                  Đang xử lý
                </span>
              </div>
              <div>
                <span className="text-light-text block">Thanh toán</span>
                <span className="font-bold text-dark-text">COD</span>
              </div>
              <div>
                <span className="text-light-text block">Dự kiến giao</span>
                <span className="font-bold text-dark-text">2-3 ngày</span>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="bg-light-gray rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-dark-text">Đặt hàng</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300 mx-2 rounded">
                <div className="w-1/3 h-full bg-green-600 rounded"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white mb-2">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-text">Đóng gói</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300 mx-2 rounded"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white mb-2">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-text">Giao hàng</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn btn--primary h-12 px-8">
              <Home className="w-5 h-5" />
              Tiếp tục mua sắm
            </Link>
            <button className="btn btn--outline h-12 px-8">
              <Package className="w-5 h-5" />
              Theo dõi đơn hàng
            </button>
          </div>

          {/* Contact Info */}
          <p className="text-xs text-light-text mt-8">
            Nếu có thắc mắc, vui lòng liên hệ hotline <strong className="text-primary-red">1900.1234</strong> hoặc email <strong>support@vlxdgiatot.com</strong>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default OrderSuccessPage
