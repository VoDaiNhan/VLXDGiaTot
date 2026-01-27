import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { newsArticles } from '../data/news'
import { 
  Home, ChevronRight, Calendar, Clock, User, 
  ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon, Newspaper
} from 'lucide-react'

const NewsDetailPage = () => {
  const { id } = useParams();
  
  const article = newsArticles.find(n => n.id === parseInt(id)) || newsArticles[0];
  const relatedArticles = newsArticles.filter(n => n.category === article.category && n.id !== article.id).slice(0, 3);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link đã được sao chép!');
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img 
          src={article.thumbnail} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <Link to="/news" className="text-light-text hover:text-primary-red transition-colors">Tin tức</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text line-clamp-1">{article.title}</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-12">
        {/* Back Button */}
        <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-gray-text hover:text-primary-red mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại tin tức
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Article Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10 -mt-24 relative z-10 mb-8">
              <span className="inline-block px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-bold rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-2xl lg:text-4xl font-bold text-dark-text mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-light-text pb-6 border-b border-border-color">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} đọc
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10">
              <div 
                className="prose prose-lg max-w-none text-gray-text
                  prose-headings:text-dark-text prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-4 prose-li:my-1
                  prose-a:text-primary-red prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Buttons */}
              <div className="mt-10 pt-6 border-t border-border-color">
                <h4 className="text-sm font-bold text-dark-text mb-4">Chia sẻ bài viết</h4>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-[#1877F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={copyLink}
                    className="w-10 h-10 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-dark-text mb-4">Tác giả</h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-red/10 rounded-full flex items-center justify-center text-primary-red font-bold text-xl">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-dark-text block">{article.author}</span>
                  <span className="text-sm text-light-text">Biên tập viên</span>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-dark-text mb-6">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <Link 
                      key={rel.id}
                      to={`/news/${rel.id}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-dark-text line-clamp-2 group-hover:text-primary-red transition-colors">
                          {rel.title}
                        </h4>
                        <span className="text-xs text-light-text mt-1 block">{rel.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-primary-red rounded-2xl p-6 text-white text-center">
              <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
              <p className="text-white/80 text-sm mb-4">Nhận bài viết mới nhất qua email!</p>
              <input 
                type="email" 
                placeholder="Email của bạn"
                className="w-full h-11 px-4 rounded-lg text-dark-text text-sm mb-3"
              />
              <button className="w-full h-11 bg-navy-blue text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors">
                Đăng ký
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default NewsDetailPage
