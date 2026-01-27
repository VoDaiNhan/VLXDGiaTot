import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CategoryPage from './pages/CategoryPage'
import BrandsPage from './pages/BrandsPage'
import BrandDetailPage from './pages/BrandDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import ShippingPolicyPage from './pages/ShippingPolicyPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import PaymentMethodsPage from './pages/PaymentMethodsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import SearchResultsPage from './pages/SearchResultsPage'
import SalePage from './pages/SalePage'
import NotFoundPage from './pages/NotFoundPage'

import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-light-gray">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/detail/:id" element={<ProductDetailPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand/:slug" element={<BrandDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/login/*" element={<LoginPage />} />
          <Route path="/register/*" element={<RegisterPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>









      </div>
    </Router>
  )
}



export default App
