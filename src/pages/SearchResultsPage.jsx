import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { Home, ChevronRight, Search, SlidersHorizontal, X, PackageSearch } from 'lucide-react'

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesQuery = query === '' || 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase());
      
      const matchesPrice = p.salePrice >= priceRange[0] && p.salePrice <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      
      return matchesQuery && matchesPrice && matchesCategory;
    });
  }, [query, priceRange, selectedCategories]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchInput });
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy-blue py-10 px-4 lg:px-16">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu..."
            className="w-full h-14 pl-12 pr-32 rounded-xl text-dark-text focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn btn--primary h-10 px-6 text-sm">
            Tìm kiếm
          </button>
        </form>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Kết quả tìm kiếm</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {query && (
              <h1 className="text-xl font-bold text-dark-text">
                Kết quả cho "{query}"
              </h1>
            )}
            <p className="text-sm text-light-text mt-1">
              Tìm thấy {filteredProducts.length} sản phẩm
            </p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden btn btn--outline h-10 px-4 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Bộ lọc
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto bg-white lg:bg-transparent w-80 lg:w-64 shrink-0 transition-transform ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="h-full lg:h-auto overflow-y-auto p-6 lg:p-0">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-bold text-dark-text">Bộ lọc</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-bold text-dark-text mb-4">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-primary-red focus:ring-primary-red"
                      />
                      <span className="text-sm text-gray-text">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-dark-text mb-4">Khoảng giá</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Dưới 100,000đ', range: [0, 100000] },
                    { label: '100,000đ - 500,000đ', range: [100000, 500000] },
                    { label: '500,000đ - 1,000,000đ', range: [500000, 1000000] },
                    { label: 'Trên 1,000,000đ', range: [1000000, 10000000] },
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio"
                        name="price"
                        onChange={() => setPriceRange(item.range)}
                        className="w-4 h-4 border-gray-300 text-primary-red focus:ring-primary-red"
                      />
                      <span className="text-sm text-gray-text">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowFilters(false)} />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center">
                <PackageSearch className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h2 className="text-xl font-bold text-dark-text mb-2">Không tìm thấy sản phẩm</h2>
                <p className="text-light-text mb-6">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
                <Link to="/products" className="btn btn--primary px-8">
                  Xem tất cả sản phẩm
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchResultsPage
