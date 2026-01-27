import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import sql from '../lib/db'
import { 
  SlidersHorizontal, Grid3X3, List, Home, ChevronRight, 
  Search, Tag, Award, Check, CheckCircle2, Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [view, setView] = useState('grid');
  const [dbProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await sql`SELECT * FROM products ORDER BY created_at DESC`;
        setProducts(res);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filters & Sorting State
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  // Pagination State
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Computed Products
  const filteredProducts = dbProducts.filter(product => {
    // 1. Price Filter
    let priceMatch = true;
    const price = parseInt(product.sale_price || product.price);
    
    if (priceFilter === 'under80') priceMatch = price < 80000;
    else if (priceFilter === '80-100') priceMatch = price >= 80000 && price <= 100000;
    else if (priceFilter === 'over100') priceMatch = price > 100000;

    // 2. Brand Filter
    let brandMatch = true;
    if (selectedBrands.length > 0) {
      brandMatch = selectedBrands.includes(product.brand);
    }

    return priceMatch && brandMatch;
  }).sort((a, b) => {
    // 3. Sorting
    switch (sortOption) {
      case 'priceAsc':
        return (a.sale_price || a.price) - (b.sale_price || b.price);
      case 'priceDesc':
        return (b.sale_price || b.price) - (a.sale_price || a.price);
      case 'popular':
        return (b.reviews || 0) - (a.reviews || 0);
      case 'newest':
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceFilter, selectedBrands, sortOption]);
  
  // Calculate pagination based on FILTERED results
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceFilter('all');
    setSelectedBrands([]);
    setSortOption('newest');
  };

  return (
    <Layout>
      {/* ... (keep existing header/breadcrumb/checks) ... */}

      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-red" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-16 py-10">
          {/* ... (Sidebar kept as is) ... */}
          <aside className="w-full lg:w-72 shrink-0">
             {/* ... Sidebar content ... */}
             <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-border-color">
                 <h3 className="flex items-center gap-2 font-bold text-dark-text">
                   <SlidersHorizontal className="w-5 h-5" />
                   Bộ lọc
                 </h3>
                 <button onClick={clearFilters} className="text-xs font-bold text-primary-red hover:underline">Xóa hết</button>
               </div>
               
               <div className="mb-8">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-dark-text mb-4"><Tag className="w-4 h-4" /> Khoảng giá</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'all', label: 'Tất cả giá' },
                      { id: 'under80', label: 'Dưới 80.000đ' },
                      { id: '80-100', label: '80.000đ - 100.000đ' },
                      { id: 'over100', label: 'Trên 100.000đ' }
                    ].map((opt) => (
                      <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceFilter === opt.id}
                          onChange={() => setPriceFilter(opt.id)}
                          className="w-4 h-4 accent-primary-red" 
                        />
                        <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{opt.label}</span>
                      </label>
                    ))}
                  </div>
               </div>

                <div className="mb-8">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-dark-text mb-4"><Award className="w-4 h-4" /> Thương hiệu</h4>
                    <div className="space-y-3">
                    {['Hà Tiên', 'Nghi Sơn', 'INSEE', 'Holcim', 'Vicem'].map((brand, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="w-4 h-4 accent-primary-red rounded border-border-color" 
                        />
                        <span className="text-sm text-gray-text group-hover:text-dark-text transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full btn btn--primary py-3 text-sm"><CheckCircle2 className="w-4 h-4" /> Áp dụng</button>
             </div>
          </aside>

          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-light-text">
                Hiển thị <strong>{filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</strong> trên <strong>{filteredProducts.length}</strong> sản phẩm
              </span>
              
              <div className="flex items-center gap-6">
                <div className="flex border border-border-color rounded-lg overflow-hidden">
                  <button onClick={() => setView('grid')} className={`p-2 transition-colors ${view === 'grid' ? 'bg-light-gray text-primary-red' : 'bg-white text-light-text hover:text-dark-text'}`}><Grid3X3 className="w-5 h-5" /></button>
                  <button onClick={() => setView('list')} className={`p-2 border-l border-border-color transition-colors ${view === 'list' ? 'bg-light-gray text-primary-red' : 'bg-white text-light-text hover:text-dark-text'}`}><List className="w-5 h-5" /></button>
                </div>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-border-color rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary-red"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá: Thấp đến cao</option>
                  <option value="priceDesc">Giá: Cao đến thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
              {currentProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-red hover:text-primary-red transition-all"
                >
                  &lt;
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-primary-red text-white' 
                        : 'border border-border-color text-gray-text hover:border-primary-red hover:text-primary-red'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-red hover:text-primary-red transition-all"
                >
                  &gt;
                </button>
              </div>
            )}
          </main>
        </div>
      )}

    </Layout>
  )
}

export default ProductsPage
