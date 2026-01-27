import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { projects } from '../data/projects'
import { 
  Home, ChevronRight, MapPin, Calendar, Ruler, 
  Banknote, Clock, ArrowLeft, ChevronLeft, ChevronRight as ChevronRightIcon,
  X, Building2
} from 'lucide-react'

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const project = projects.find(p => p.id === parseInt(id)) || projects[0];
  const relatedProjects = projects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 3);

  const openLightbox = (index) => {
    setActiveImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % project.gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 lg:px-16 pb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-red text-white text-xs font-bold rounded-full mb-4">
            {project.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Hoàn thành {project.year}
            </span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <Link to="/projects" className="text-light-text hover:text-primary-red transition-colors">Dự án</Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text line-clamp-1">{project.title}</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-12">
        {/* Back Button */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-gray-text hover:text-primary-red mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
              <h2 className="text-xl font-bold text-dark-text mb-4">Giới thiệu dự án</h2>
              <p className="text-gray-text leading-relaxed">{project.description}</p>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
              <h2 className="text-xl font-bold text-dark-text mb-6">Hình ảnh dự án</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className="aspect-square rounded-xl overflow-hidden group relative"
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Xem</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-dark-text mb-6">Thông tin dự án</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-light-gray rounded-xl">
                  <Ruler className="w-6 h-6 text-primary-red" />
                  <div>
                    <span className="text-xs text-light-text block">Diện tích</span>
                    <span className="font-bold text-dark-text">{project.stats.area}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-light-gray rounded-xl">
                  <Banknote className="w-6 h-6 text-primary-red" />
                  <div>
                    <span className="text-xs text-light-text block">Giá trị cung cấp</span>
                    <span className="font-bold text-dark-text">{project.stats.value}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-light-gray rounded-xl">
                  <Clock className="w-6 h-6 text-primary-red" />
                  <div>
                    <span className="text-xs text-light-text block">Thời gian</span>
                    <span className="font-bold text-dark-text">{project.stats.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-red rounded-2xl p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">Bạn có dự án cần báo giá?</h3>
              <p className="text-white/80 text-sm mb-4">Liên hệ ngay để nhận tư vấn miễn phí!</p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary-red font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-dark-text mb-8">Dự án liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  to={`/project/${proj.id}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-dark-text group-hover:text-primary-red transition-colors">{proj.title}</h4>
                    <p className="text-sm text-light-text">{proj.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-4 lg:left-8 text-white/80 hover:text-white p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img 
            src={project.gallery[activeImage]} 
            alt="Gallery"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          <button 
            onClick={nextImage}
            className="absolute right-4 lg:right-8 text-white/80 hover:text-white p-2"
          >
            <ChevronRightIcon className="w-10 h-10" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {project.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === activeImage ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProjectDetailPage
