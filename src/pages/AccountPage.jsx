import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, UserProfile } from '@clerk/clerk-react'
import Layout from '../components/Layout'
import { useCurrentUser, useAuthActions, isClerkConfigured } from '../lib/auth'
import sql from '../lib/db'
import { 
  User, Mail, Phone, MapPin, Edit2, Save, X, 
  Package, Settings, LogOut, Home, ChevronRight, Camera, Loader2
} from 'lucide-react'

const AccountPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, user: currentUser } = useCurrentUser();
  const { signOut } = useAuthActions();
  const clerkConfigured = isClerkConfigured();
  
  // Get Clerk user if available
  let clerkUser = null;
  if (clerkConfigured) {
    try {
      const { user } = useUser();
      clerkUser = user;
    } catch (e) {}
  }
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Profile data (from DB or default)
  const [profileData, setProfileData] = useState({
    phone: '',
    address: '',
    city: '',
    district: ''
  });

  // Get user info from Clerk
  const userName = clerkUser?.fullName || clerkUser?.firstName || currentUser?.name || 'Khách';
  const userEmail = clerkUser?.primaryEmailAddress?.emailAddress || currentUser?.email || '';
  const userAvatar = clerkUser?.imageUrl || currentUser?.imageUrl || '';
  const clerkUserId = clerkUser?.id || '';

  // Load profile from database
  useEffect(() => {
    if (clerkUserId) {
      loadProfile();
    }
  }, [clerkUserId]);

  const loadProfile = async () => {
    if (!clerkUserId) return;
    
    try {
      setLoading(true);
      // Try to get user profile from database using Clerk ID
      const result = await sql`
        SELECT phone, address 
        FROM users 
        WHERE email = ${userEmail}
        LIMIT 1
      `;
      
      if (result && result[0]) {
        const addr = result[0].address || '';
        const parts = addr.split(', ');
        setProfileData({
          phone: result[0].phone || '',
          address: parts[0] || '',
          city: parts[parts.length - 1] || '',
          district: parts[1] || ''
        });
      }
    } catch (error) {
      console.log('Profile not found in DB, using defaults');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!clerkUserId || !userEmail) {
      setMessage('Vui lòng đăng nhập để lưu thông tin');
      return;
    }

    try {
      setSaving(true);
      const fullAddress = [profileData.address, profileData.district, profileData.city].filter(Boolean).join(', ');
      
      // Upsert user profile
      await sql`
        INSERT INTO users (email, name, phone, address, password_hash)
        VALUES (${userEmail}, ${userName}, ${profileData.phone}, ${fullAddress}, 'clerk_auth')
        ON CONFLICT (email) 
        DO UPDATE SET 
          name = ${userName},
          phone = ${profileData.phone},
          address = ${fullAddress}
      `;
      
      setMessage('Đã lưu thông tin thành công!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setMessage('Lỗi khi lưu. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (clerkConfigured) {
      await signOut();
    }
    navigate('/');
  };

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && clerkConfigured) {
      navigate('/login');
    }
  }, [isLoaded, isSignedIn, navigate, clerkConfigured]);

  const menuItems = [
    { id: 'profile', icon: User, label: 'Thông tin cá nhân' },
    { id: 'orders', icon: Package, label: 'Đơn hàng của tôi', link: '/orders' },
    { id: 'settings', icon: Settings, label: 'Cài đặt' },
  ];

  if (!isLoaded) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-red" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bg-white px-4 lg:px-16 py-4 border-b border-border-color">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="flex items-center gap-1.5 text-light-text hover:text-primary-red transition-colors">
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-light-text" />
          <span className="font-medium text-dark-text">Tài khoản</span>
        </div>
      </nav>

      <div className="px-4 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Avatar */}
              <div className="text-center mb-6 pb-6 border-b border-border-color">
                <div className="relative inline-block">
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt={userName}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary-red/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary-red">
                        {userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {clerkConfigured && (
                    <button className="absolute bottom-4 right-0 w-8 h-8 bg-primary-red text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-lg font-bold text-dark-text">{userName}</h2>
                <p className="text-sm text-light-text">{userEmail}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  item.link ? (
                    <Link 
                      key={item.id}
                      to={item.link}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-text hover:bg-light-gray hover:text-dark-text transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                        activeTab === item.id 
                          ? 'bg-primary-red/10 text-primary-red' 
                          : 'text-gray-text hover:bg-light-gray hover:text-dark-text'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                ))}

                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-gray-text hover:bg-red-50 hover:text-primary-red transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Đăng xuất</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
              {activeTab === 'profile' && (
                <>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-color">
                    <h1 className="text-xl font-bold text-dark-text">Thông tin cá nhân</h1>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="btn btn--outline h-10 px-5 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="btn btn--outline h-10 px-5 text-sm"
                          disabled={saving}
                        >
                          <X className="w-4 h-4" />
                          Hủy
                        </button>
                        <button 
                          onClick={saveProfile}
                          className="btn btn--primary h-10 px-5 text-sm"
                          disabled={saving}
                        >
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {saving ? 'Đang lưu...' : 'Lưu'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Success/Error Message */}
                  {message && (
                    <div className={`mb-6 p-4 rounded-lg text-sm ${
                      message.includes('thành công') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {message}
                    </div>
                  )}

                  {loading ? (
                    <div className="py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-red mx-auto" />
                      <p className="text-light-text mt-2">Đang tải...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name - Read only from Clerk */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <User className="w-4 h-4 text-gray-400" />
                          Họ và tên
                        </label>
                        <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">{userName}</p>
                        {clerkConfigured && (
                          <p className="text-xs text-light-text mt-1">Quản lý tại tab Cài đặt</p>
                        )}
                      </div>

                      {/* Email - Read only from Clerk */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          Email
                        </label>
                        <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">{userEmail}</p>
                      </div>

                      {/* Phone - Editable */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Số điện thoại
                        </label>
                        {isEditing ? (
                          <input 
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            placeholder="0901234567"
                            className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red"
                          />
                        ) : (
                          <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">
                            {profileData.phone || 'Chưa cập nhật'}
                          </p>
                        )}
                      </div>

                      {/* City - Editable */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Tỉnh/Thành phố
                        </label>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={profileData.city}
                            onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                            placeholder="TP. Hồ Chí Minh"
                            className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red"
                          />
                        ) : (
                          <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">
                            {profileData.city || 'Chưa cập nhật'}
                          </p>
                        )}
                      </div>

                      {/* District */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Quận/Huyện
                        </label>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={profileData.district}
                            onChange={(e) => setProfileData({...profileData, district: e.target.value})}
                            placeholder="Quận 7"
                            className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red"
                          />
                        ) : (
                          <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">
                            {profileData.district || 'Chưa cập nhật'}
                          </p>
                        )}
                      </div>

                      {/* Address - Editable */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-dark-text mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Địa chỉ chi tiết
                        </label>
                        {isEditing ? (
                          <input 
                            type="text"
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            placeholder="Số nhà, tên đường, phường/xã"
                            className="w-full h-12 px-4 border border-border-color rounded-lg text-sm focus:outline-none focus:border-primary-red"
                          />
                        ) : (
                          <p className="h-12 px-4 flex items-center bg-light-gray rounded-lg text-dark-text">
                            {profileData.address || 'Chưa cập nhật'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'settings' && clerkConfigured && (
                 <div className="clerk-user-profile-wrapper">
                    <UserProfile 
                      path="/account"
                      routing="path"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "w-full shadow-none p-0",
                          navbar: "hidden", 
                          navbarMobileMenuButton: "hidden",
                          headerTitle: "text-xl font-bold text-dark-text",
                          headerSubtitle: "text-sm text-light-text",
                        }
                      }}
                    />
                 </div>
              )}

              {activeTab === 'settings' && !clerkConfigured && (
                <div className="text-center py-12 text-light-text">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Cài đặt tài khoản (Demo Mode)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AccountPage
