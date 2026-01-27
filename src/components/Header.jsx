import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Building2, Search, Phone, ShoppingCart, Menu, X, Percent, User, LogOut, Package, Settings } from 'lucide-react'
import { useCurrentUser, useAuthActions, isClerkConfigured } from '../lib/auth'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clerkConfigured = isClerkConfigured();
  const { isSignedIn, user } = useCurrentUser();
  const { signOut } = useAuthActions();
  
  const navLinks = [
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Thương hiệu', path: '/brands' },
    { name: 'Dự án', path: '/projects' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Giới thiệu', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    if (clerkConfigured) {
      await signOut();
    }
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-navy-blue flex items-center justify-between px-4 lg:px-16 z-[1000] border-b border-white/10">
      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline group shrink-0">
        <Building2 className="w-7 h-7 sm:w-9 sm:h-9 text-primary-red transition-transform group-hover:scale-110" />
        <span className="text-sm sm:text-xl font-bold tracking-tight text-white uppercase">VLXD Giá Tốt</span>
      </Link>

      <nav className="hidden md:flex gap-4 lg:gap-6 xl:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-medium transition-colors duration-200 no-underline whitespace-nowrap ${
              location.pathname === link.path ? 'text-primary-red' : 'text-white/80 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/sale"
          className="flex items-center gap-1 text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <Percent className="w-4 h-4" />
          Sale
        </Link>
      </nav>

      <div className="flex items-center gap-2 lg:gap-4">
        <form onSubmit={handleSearch} className="hidden lg:relative lg:block group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-40 xl:w-56 h-10 bg-white/10 border-none rounded-lg px-4 pr-10 text-white text-sm focus:bg-white/20 focus:outline-none transition-all duration-200 placeholder:text-white/40"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-white/50 cursor-pointer p-0 group-hover:text-white">
            <Search className="w-4 h-4" />
          </button>
        </form>

        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-red/20 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary-red" />
          </div>
          <span className="hidden xl:inline text-sm font-bold text-white tracking-widest">1900.1234</span>
        </div>

        {/* User Menu - Custom dropdown */}
        <div className="hidden sm:relative sm:block">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors p-2"
          >
            {isSignedIn && user?.imageUrl ? (
              <img src={user.imageUrl} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white/20" />
            ) : (
              <User className="w-6 h-6" />
            )}
          </button>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50">
                {isSignedIn ? (
                  <>
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-bold text-dark-text truncate">{user?.name || 'Người dùng'}</p>
                      <p className="text-xs text-light-text truncate">{user?.email}</p>
                    </div>
                    
                    <Link to="/account" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-text hover:bg-light-gray">
                      <User className="w-4 h-4 text-gray-400" />
                      Tài khoản của tôi
                    </Link>
                    <Link to="/orders" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-text hover:bg-light-gray">
                      <Package className="w-4 h-4 text-gray-400" />
                      Đơn hàng
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setShowUserMenu(false)} className="block px-4 py-2.5 text-sm text-dark-text hover:bg-light-gray">Đăng nhập</Link>
                    <Link to="/register" onClick={() => setShowUserMenu(false)} className="block px-4 py-2.5 text-sm text-dark-text hover:bg-light-gray">Đăng ký</Link>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <Link to="/cart" className="relative text-white/80 hover:text-white transition-colors p-2 shrink-0">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-primary-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-navy-blue">3</span>
        </Link>
      </div>


      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-navy-blue z-[999] p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-left duration-300 overflow-y-auto">
          <form onSubmit={handleSearch} className="relative group mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full h-12 bg-white/10 border-none rounded-lg px-4 pr-10 text-white text-sm focus:bg-white/20 focus:outline-none transition-all duration-200"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-bold tracking-wide no-underline py-2 ${
                location.pathname === link.path ? 'text-primary-red' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            to="/sale"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-lg font-bold text-yellow-400 py-2"
          >
            <Percent className="w-5 h-5" />
            Khuyến mãi
          </Link>

          <div className="border-t border-white/10 pt-4 mt-2">
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3 block">Tài khoản</span>
            {clerkConfigured && isSignedIn ? (
              <>
                <Link to="/account" onClick={() => setIsMenuOpen(false)} className="text-white text-sm py-2 block">Tài khoản</Link>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-white text-sm py-2 block">Đơn hàng</Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white text-sm py-2 block">Đăng nhập</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-white text-sm py-2 block">Đăng ký</Link>
              </>
            )}
          </div>
          
          <div className="mt-auto py-6 border-t border-white/10 flex items-center gap-4">
            <Phone className="w-6 h-6 text-primary-red" />
            <div>
              <span className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Hotline tư vấn</span>
              <span className="text-white font-bold text-lg tracking-widest">1900.1234</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


export default Header
