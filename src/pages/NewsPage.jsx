import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { newsArticles, newsCategories } from '../data/news'
import { Home, ChevronRight, Calendar, Clock, User, ArrowRight, Newspaper } from 'lucide-react'

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredNews = activeCategory === 'Tất cả' 
    ? newsArticles 
    : newsArticles.filter(n => n.category === activeCategory);

  const featuredArticle = newsArticles.find(n => n.featured);
  const regularArticles = filteredNews.filter(n => !n.featured);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-navy-blue py-16 px-4 lg:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Newspaper className="w-4 h-4" />
            Tin tức & Bài viết
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">TIN TỨC XÂY DỰNG</h1>
          <p className="text-white/60 max-w-xl mx-auto">Cập nhật những xu hướng, kiến thức và bảng giá mới nhất trong ngành vật liệu xây dựng</p>
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
          <span className="font-medium text-dark-text">Tin tức</span>
        </div>
      </nav>

      {/* Featured Article */}
      {featuredArticle && activeCategory === 'Tất cả' && (
        <section className="px-4 lg:px-16 py-12">
          <Link 
            to={`/news/${featuredArticle.id}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="aspect-video lg:aspect-auto overflow-hidden">
              <img 
                src={featuredArticle.thumbnail} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 lg:p-10 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-bold rounded-full mb-4">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-dark-text mb-4 group-hover:text-primary-red transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-text mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-light-text">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {featuredArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {featuredArticle.readTime}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category Filter */}
      <section className="bg-white px-4 lg:px-16 py-6 border-b border-border-color sticky top-20 z-40">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary-red text-white shadow-md'
                  : 'bg-light-gray text-gray-text hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.thumbnail} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 bg-light-gray text-gray-text text-xs font-bold rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-light-text flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-dark-text mb-3 line-clamp-2 group-hover:text-primary-red transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-text line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-light-text">{article.date}</span>
                  <span className="text-primary-red font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Đọc tiếp <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {regularArticles.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-text mb-2">Không có bài viết</h3>
            <p className="text-light-text">Chưa có bài viết nào trong danh mục này.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-light-text" disabled>&lt;</button>
          <button className="w-10 h-10 bg-primary-red text-white rounded-lg font-bold">1</button>
          <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-gray-text hover:border-primary-red">2</button>
          <button className="w-10 h-10 border border-border-color rounded-lg flex items-center justify-center text-gray-text hover:border-primary-red">&gt;</button>
        </div>
      </section>
    </Layout>
  )
}

export default NewsPage
