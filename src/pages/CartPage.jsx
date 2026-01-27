import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'
import { useCurrentUser } from '../lib/auth'
import { 
  Home, ChevronRight, Trash2, Minus, Plus, 
  ShoppingBag, Tag, Truck, ShieldCheck, ArrowRight, Loader2, LogIn
} from 'lucide-react'

const CartPage = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, subtotal } = useCart();
  const { isSignedIn } = useCurrentUser();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-red" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Giỏ hàng</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        <h1 className="text-3xl font-bold text-dark-text mb-8">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-dark-text mb-3">Giỏ hàng trống</h2>
            <p className="text-light-text mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link to="/products" className="btn btn--primary px-10">
              <ShoppingBag className="w-5 h-5" />
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-light-gray text-xs font-bold text-gray-text uppercase tracking-wider">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-right">Thành tiền</div>
                </div>

                {/* Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 border-b border-border-color items-center">
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <Link to={`/detail/${item.id}`} className="font-bold text-dark-text hover:text-primary-red transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-xs text-light-text mt-1">{item.category}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-xs text-light-text hover:text-primary-red mt-2 transition-colors md:hidden"
                        >
                          <Trash2 className="w-3 h-3" /> Xóa
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-sm font-bold text-primary-red">{Number(item.salePrice).toLocaleString('vi-VN')}đ</span>
                      {item.unit && <span className="text-xs text-light-text">/{item.unit}</span>}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex border border-border-color rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          readOnly
                          className="w-12 h-9 text-center border-x border-border-color font-bold text-sm focus:outline-none" 
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 text-right flex items-center justify-end gap-4">
                      <span className="text-lg font-bold text-dark-text">{(Number(item.salePrice) * item.quantity).toLocaleString('vi-VN')}đ</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="hidden md:flex w-8 h-8 items-center justify-center text-light-text hover:text-primary-red hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link to="/products" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary-red hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-dark-text mb-6 pb-4 border-b border-border-color">Tóm tắt đơn hàng</h2>

                {/* Discount Code */}
                <div className="mb-6">
                  <label className="text-sm font-bold text-dark-text mb-2 block">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nhập mã giảm giá" 
                      className="flex-1 h-11 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red transition-colors"
                    />
                    <button className="h-11 px-5 bg-navy-blue text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition-colors">
                      Áp dụng
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-text">Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span className="font-bold text-dark-text">{Number(subtotal).toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-text">Phí vận chuyển</span>
                    <span className="font-bold text-dark-text">
                      {shipping === 0 ? <span className="text-green-600">Miễn phí</span> : `${Number(shipping).toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>
                  {subtotal < 500000 && (
                    <p className="text-xs text-light-text bg-light-gray rounded-lg p-3">
                      💡 Mua thêm <strong>{(500000 - Number(subtotal)).toLocaleString('vi-VN')}đ</strong> để được miễn phí vận chuyển!
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center py-4 border-t border-border-color mb-6">
                  <span className="text-lg font-bold text-dark-text">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary-red">{Number(total).toLocaleString('vi-VN')}đ</span>
                </div>

                {isSignedIn ? (
                  <Link to="/checkout" className="btn btn--primary w-full h-14 text-base">
                    Tiến hành thanh toán
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link to={`/login?redirect=/checkout`} className="btn btn--primary w-full h-14 text-base">
                    Đăng nhập để thanh toán
                    <LogIn className="w-5 h-5" />
                  </Link>
                )}

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-border-color grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-text">
                    <Truck className="w-4 h-4 text-primary-red" />
                    <span>Giao hàng nhanh</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-text">
                    <ShieldCheck className="w-4 h-4 text-primary-red" />
                    <span>Bảo mật thanh toán</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default CartPage
