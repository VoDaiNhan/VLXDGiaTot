import React, { useState } from 'react'
import Layout from '../components/Layout'
import { 
  Star, Heart, ShoppingCart, Truck, ShieldCheck, 
  RotateCcw, Home, ChevronRight, Minus, Plus, 
  CheckCircle2, Share2, Award, Zap
} from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Link, useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = products.find(p => p.id === parseInt(id)) || products[0];


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
          <Link to="/products" className="text-light-text hover:text-primary-red transition-colors">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10 flex flex-col lg:flex-row gap-12 mb-12">
          {/* Gallery */}
          <div className="w-full lg:w-[480px] shrink-0">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 border border-border-color relative group">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary-red text-white text-sm font-bold px-4 py-1.5 rounded z-10 shadow-sm">{product.badge}</span>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === 0 ? 'border-primary-red' : 'border-transparent hover:border-border-color'}`}>
                  <img src={product.image} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary-red/10 text-primary-red px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{product.category}</span>
              <span className="text-xs text-light-text font-medium">SKU: HT-400{product.id}</span>
            </div>
            <h1 className="text-3xl font-bold text-dark-text leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-yellow-400/10 px-2.5 py-1 rounded text-yellow-600">
                <Star className="w-4 h-4 fill-yellow-600" />
                <span className="text-sm font-bold">{product.rating}</span>
              </div>
              <span className="text-sm text-light-text border-l border-border-color pl-4 font-medium">{product.reviews} Đánh giá</span>
              <span className="text-sm text-light-text border-l border-border-color pl-4 font-medium">2.4k Đã bán</span>
            </div>

            <div className="bg-light-gray p-6 rounded-xl mb-8 flex items-center gap-6">
              <span className="text-4xl font-bold text-primary-red">{product.salePrice.toLocaleString()}đ</span>
              {product.originalPrice && (
                <span className="text-lg text-light-text line-through font-medium">{product.originalPrice.toLocaleString()}đ</span>
              )}
              {product.badge && <span className="bg-primary-red text-white text-xs font-bold px-2 py-1 rounded">{product.badge}</span>}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.name} là dòng sản phẩm vật liệu xây dựng chất lượng cao, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất. Phù hợp cho mọi loại công trình từ dân dụng đến công nghiệp.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center mb-8 pb-8 border-b border-border-color">
              <div className="flex border border-border-color rounded-lg overflow-hidden shrink-0">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  value={qty} 
                  onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                  className="w-16 h-12 text-center border-x border-border-color font-bold focus:outline-none" 
                />
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm">
                <span className="text-green-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Sẵn hàng tại kho
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <button className="btn btn--primary h-14 px-10 flex-1 sm:flex-none min-w-[200px]">
                <ShoppingCart className="w-5 h-5" /> Mua ngay
              </button>
              <button className="btn btn--outline h-14 px-6">
                <Heart className="w-5 h-5" />
              </button>
              <button className="btn btn--outline h-14 px-6">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Feature small cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-border-color">
               <div className="flex items-center gap-3">
                 <Truck className="w-8 h-8 text-primary-red/20" />
                 <div><span className="block text-xs font-bold">Giao hàng</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">Toàn quốc</span></div>
               </div>
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-8 h-8 text-primary-red/20" />
                 <div><span className="block text-xs font-bold">Bảo hành</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">Chính hãng</span></div>
               </div>
               <div className="flex items-center gap-3">
                 <RotateCcw className="w-8 h-8 text-primary-red/20" />
                 <div><span className="block text-xs font-bold">Đổi trả</span><span className="text-[10px] text-gray-500 uppercase tracking-widest">Trong 7 ngày</span></div>
               </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden text-left">
          <div className="flex border-b border-border-color px-6 sm:px-10">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 px-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-primary-red' : 'text-gray-400 hover:text-dark-text'}`}
              >
                {tab === 'description' ? 'Mô tả' : tab === 'specifications' ? 'Thông số' : 'Đánh giá'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-red"></div>}
              </button>
            ))}
          </div>
          <div className="p-6 sm:p-10">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                <p className="mb-4">{product.name} là sự lựa chọn hoàn hảo cho công trình của bạn. Với công nghệ sản xuất hiện đại, sản phẩm đảm bảo độ bền tối ưu và khả năng chịu lực vượt trội.</p>
                <h4 className="text-dark-text font-bold text-lg mb-4">Ưu điểm nổi bật:</h4>
                <ul className="list-disc pl-5 space-y-2 mb-6 text-sm">
                  <li>Chất lượng đạt chuẩn quốc tế.</li>
                  <li>Khả năng chống chịu thời tiết tốt.</li>
                  <li>Dễ dàng thi công và sử dụng.</li>
                  <li>Giá cả cạnh tranh nhất thị trường.</li>
                </ul>
              </div>
            )}
            {activeTab === 'specifications' && (
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Thương hiệu', 'Chính hãng'],
                    ['Loại sản phẩm', product.category],
                    ['Trọng lượng', 'Tùy chọn'],
                    ['Tiêu chuẩn', 'TCVN'],
                  ].map(([label, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-light-gray/50' : 'bg-white'}>
                      <td className="py-4 px-6 font-bold text-dark-text w-1/3 border-b border-border-color">{label}</td>
                      <td className="py-4 px-6 text-gray-600 border-b border-border-color">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-10">
                <div className="text-5xl font-bold text-primary-red mb-4">{product.rating}/5</div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-[#FFC107] text-[#FFC107]" />)}
                </div>
                <p className="text-light-text mb-8">Dựa trên {product.reviews} đánh giá thực tế</p>
                <button className="btn btn--outline mx-auto font-bold uppercase tracking-wider text-xs">Viết đánh giá của bạn</button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-dark-text mb-10 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary-red rounded-full"></span>
            SẢN PHẨM LIÊN QUAN
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ProductDetailPage
