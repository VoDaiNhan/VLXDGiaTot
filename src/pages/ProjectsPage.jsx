import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { projects, projectCategories } from '../data/projects'
import { Home, ChevronRight, MapPin, Calendar, ArrowRight, Building2 } from 'lucide-react'

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredProjects = activeCategory === 'Tất cả' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-navy-blue py-16 px-4 lg:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/80 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Building2 className="w-4 h-4" />
            Dự án tiêu biểu
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">DỰ ÁN HOÀN THIỆN</h1>
          <p className="text-white/60 max-w-xl mx-auto">Những công trình tiêu biểu mà chúng tôi đã đồng hành cung cấp vật liệu xây dựng</p>
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
          <span className="font-medium text-dark-text">Dự án</span>
        </div>
      </nav>

      {/* Category Filter */}
      <section className="bg-white px-4 lg:px-16 py-6 border-b border-border-color sticky top-20 z-40">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {projectCategories.map((cat) => (
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

      {/* Projects Grid */}
      <section className="px-4 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-dark-text text-xs font-bold rounded-full">
                  {project.category}
                </span>

                {/* Hover Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 text-white text-sm font-bold">
                    Xem chi tiết <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-text mb-2 group-hover:text-primary-red transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-light-text">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-text mb-2">Không có dự án</h3>
            <p className="text-light-text">Chưa có dự án nào trong danh mục này.</p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-navy-blue px-4 lg:px-16 py-16 text-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: '500+', label: 'Dự án hoàn thành' },
            { val: '10,000+', label: 'Tỷ VNĐ giá trị' },
            { val: '50+', label: 'Đối tác xây dựng' },
            { val: '15+', label: 'Năm kinh nghiệm' },
          ].map((stat, i) => (
            <div key={i}>
              <span className="block text-4xl lg:text-5xl font-bold text-primary-red mb-2">{stat.val}</span>
              <span className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default ProjectsPage
