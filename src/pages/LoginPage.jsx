import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignIn } from '@clerk/clerk-react'
import Layout from '../components/Layout'
import { isClerkConfigured, useCurrentUser } from '../lib/auth'
import { Home, ChevronRight, LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useCurrentUser()
  const [showPassword, setShowPassword] = React.useState(false)

  // Redirect if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/account')
    }
  }, [isSignedIn, navigate])

  // If Clerk is configured, use Clerk's SignIn component
  if (isClerkConfigured()) {
    return (
      <Layout>
        <section className="bg-navy-blue py-8 px-4 lg:px-16 text-center text-white">
          <h1 className="text-2xl lg:text-3xl font-bold">Đăng nhập</h1>
        </section>

        <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4 text-light-text" />
            <span className="font-medium text-dark-text">Đăng nhập</span>
          </div>
        </nav>

        <section className="px-4 lg:px-16 py-12 flex justify-center">
          <SignIn 
            routing="path" 
            path="/login"
            signUpUrl="/register"
            afterSignInUrl="/"
          />
        </section>
      </Layout>
    )
  }

  // Fallback UI when Clerk not configured (demo mode)
  return (
    <Layout>
      <section className="bg-navy-blue py-8 px-4 lg:px-16 text-center text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">Đăng nhập</h1>
      </section>

      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-light-text hover:text-primary-red"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Đăng nhập</span>
        </div>
      </nav>

      <section className="px-4 lg:px-16 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-primary-red" />
              </div>
              <h2 className="text-xl font-bold text-dark-text">Chào mừng trở lại!</h2>
              <p className="text-sm text-light-text mt-1">Đăng nhập để tiếp tục mua sắm</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
              <p className="text-sm text-yellow-800">
                ⚠️ Chế độ Demo - Clerk chưa được cấu hình<br />
                <span className="text-xs">Thêm VITE_CLERK_PUBLISHABLE_KEY vào .env để kích hoạt</span>
              </p>
            </div>

            <form className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-red focus:ring-primary-red" />
                  <span className="text-gray-text">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-primary-red hover:underline">Quên mật khẩu?</a>
              </div>

              <button type="button" className="w-full btn btn--primary h-12" disabled>
                Đăng nhập (Demo)
              </button>
            </form>

            <p className="text-center text-sm text-gray-text mt-6">
              Chưa có tài khoản? <Link to="/register" className="text-primary-red font-bold hover:underline">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage
