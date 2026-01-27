import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'

const ProductCard = ({ product }) => {
  // Support both old static format and new DB format
  const id = product.id;
  const name = product.name;
  const originalPrice = product.originalPrice || product.price;
  const salePrice = product.salePrice || product.sale_price;
  const badge = product.badge || (product.is_new ? 'Mới' : product.is_sale ? 'Sale' : null);
  const image = product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/400';
  const unit = product.unit;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden group border border-transparent hover:border-primary-red transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/detail/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-primary-red text-white text-xs font-bold rounded z-10">
            {badge}
          </span>
        )}

        <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-text shadow-md opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hover:text-primary-red z-10">
          <Heart className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1 text-left">
        <h3 className="text-sm font-bold text-dark-text line-clamp-2 min-h-[40px] group-hover:text-primary-red transition-colors mb-2">
          <Link to={`/detail/${id}`}>{name}</Link>
        </h3>

        
        <div className="flex flex-col mb-4">
          <span className="text-xs text-light-text line-through h-4">
            {originalPrice && originalPrice > salePrice ? `${originalPrice.toLocaleString()}đ${unit ? `/${unit}` : ''}` : ''}
          </span>
          <span className="text-lg font-bold text-primary-red">
            {salePrice?.toLocaleString()}đ{unit ? `/${unit}` : ''}
          </span>
        </div>

        <button className="mt-auto w-full h-11 border border-border-color bg-white text-gray-text rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-red hover:border-primary-red hover:text-white transition-all duration-200 active:scale-95">
          <ShoppingCart className="w-4 h-4" />
          Thêm vào giỏ
        </button>
      </div>
    </article>
  )
}

export default ProductCard
