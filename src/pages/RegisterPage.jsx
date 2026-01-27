import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SignUp } from '@clerk/clerk-react'
import Layout from '../components/Layout'
import { isClerkConfigured, useCurrentUser } from '../lib/auth'
import { Home, ChevronRight, UserPlus, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useCurrentUser()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = React.useState(false)

  // Redirect if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      const redirect = searchParams.get('redirect')
      navigate(redirect || '/account')
    }
  }, [isSignedIn, navigate, searchParams])

  // If Clerk is configured, use Clerk's SignUp component
  if (isClerkConfigured()) {
    return (
      <Layout>
        <section className="bg-navy-blue py-8 px-4 lg:px-16 text-center text-white">
          <h1 className="text-2xl lg:text-3xl font-bold">Đăng ký tài khoản</h1>
        </section>

        <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4 text-light-text" />
            <span className="font-medium text-dark-text">Đăng ký</span>
          </div>
        </nav>

        <section className="px-4 lg:px-16 py-12 flex justify-center">
          <SignUp 
            routing="path" 
            path="/register"
            signInUrl="/login"
            afterSignUpUrl={searchParams.get('redirect') || "/account"}
          />
        </section>
      </Layout>
    )
  }

  // Fallback UI when Clerk not configured (demo mode)
  return (
    <Layout>
      <section className="bg-navy-blue py-8 px-4 lg:px-16 text-center text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">Đăng ký tài khoản</h1>
      </section>

      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Đăng ký</span>
        </div>
      </nav>

      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary-red" />
              </div>
              <h2 className="text-xl font-bold text-dark-text">Tạo tài khoản mới</h2>
              <p className="text-sm text-light-text mt-1">Đăng ký để nhận ưu đãi độc quyền</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-yellow-800">
                ⚠️ Chế độ Demo - Clerk chưa được cấu hình<br />
                <span className="text-xs">Thêm VITE_CLERK_PUBLISHABLE_KEY vào .env để kích hoạt</span>
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-dark-text mb-2 block">Họ tên</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    className="w-full h-12 pl-12 pr-4 border border-border-color rounded-lg focus:border-primary-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-dark-text mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full h-12 pl-12 pr-4 border border-border-color rounded-lg focus:border-primary-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-dark-text mb-2 block">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    placeholder="0901234567"
                    className="w-full h-12 pl-12 pr-4 border border-border-color rounded-lg focus:border-primary-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-dark-text mb-2 block">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-12 pl-12 pr-12 border border-border-color rounded-lg focus:border-primary-red focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-red focus:ring-primary-red" />
                <span className="text-gray-text">
                  Tôi đồng ý với <a href="#" className="text-primary-red">Điều khoản dịch vụ</a> và <a href="#" className="text-primary-red">Chính sách bảo mật</a>
                </span>
              </label>

              <button type="button" className="w-full btn btn--primary h-12" disabled>
                Đăng ký (Demo)
              </button>
            </form>

            <p className="text-center text-sm text-gray-text mt-6">
              Đã có tài khoản? <Link to="/login" className="text-primary-red font-bold hover:underline">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default RegisterPage
