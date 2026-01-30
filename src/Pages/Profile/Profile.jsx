'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, LogOut, Trash2, Edit2, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [currentView, setCurrentView] = useState('main')
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '+998 88 371 17 47'
  })
  const [editForm, setEditForm] = useState({ ...userInfo })
  const [language, setLanguage] = useState('O\'zbekcha')
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: '#25-01-2026-0015',
      status: 'Bekor qilindi',
      statusColor: 'text-red-500',
      amount: '74 870',
      date: '25.01.2026 15:42'
    }
  ]

  const handleEditProfile = () => {
    setEditForm({ ...userInfo })
    setCurrentView('edit')
  }

  const handleSaveProfile = () => {
    setUserInfo({ ...editForm })
    setCurrentView('main')
  }

  const getInitials = () => {
    const first = userInfo.firstName ? userInfo.firstName.charAt(0) : ''
    const last = userInfo.lastName ? userInfo.lastName.charAt(0) : ''
    return (first + last).toUpperCase() || '47'
  }

  // Main Profile View
  if (currentView === 'main') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <button className="text-gray-600 hover:text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profil</h1>
          <div className="w-6"></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* User Card */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-4 flex items-start gap-4 border border-green-600">
            <div className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {getInitials()}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-lg font-semibold text-gray-900">{userInfo.phone}</p>
              <p className="text-sm text-gray-500">
                {userInfo.firstName && userInfo.lastName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : userInfo.firstName || userInfo.lastName || 'Nomi yo\'q'}
              </p>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Shaxsiy ma'lumotlar</p>
            <button
              onClick={handleEditProfile}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400">👤</span>
                <span className="text-gray-900">Profilni tahrirlash</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Addresses Section */}
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Manzillar</p>
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <Link to={'/location'}>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-gray-900">Saqlangan manzillar</span>
                </div>
              </Link>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Orders Section */}
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Buyurtmalar tarixi</p>
            <button
              onClick={() => setCurrentView('orders')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400">📋</span>
                <span className="text-gray-900">Buyurtmalar tarixi</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Social Section */}
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Sozlamalar</p>
            <button
              onClick={() => setShowLanguageModal(true)}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-400" />
                <span className="text-gray-900">Til</span>
              </div>
              <span className="text-gray-500 text-sm">{language}</span>
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-6 px-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Ilova haqida</p>
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">📬</span>
                <span className="text-gray-900">Ommaviy oferta</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition mt-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">🛡️</span>
                <span className="text-gray-900">Maxfiylik siyosati</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition mt-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">ℹ️</span>
                <span className="text-gray-900">Ilova versiyasi</span>
              </div>
              <span className="text-gray-500 text-sm">1.0.0</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="px-4 mt-6 pb-4">
            <button className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-3">
              <LogOut size={18} />
              Chiqish
            </button>
            <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-red-600 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <Trash2 size={18} />
              Hisobni o'chirish
            </button>
          </div>
        </div>

        {/* Language Modal */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-end z-50">
            <div className="bg-white w-full rounded-t-2xl p-6">
              <p className="text-lg font-semibold text-gray-900 mb-4">Til</p>
              {['O\'zbekcha', 'Русский', 'English'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang)
                    setShowLanguageModal(false)
                  }}
                  className={`w-full p-4 text-left flex items-center justify-between border-b border-gray-100 last:border-0 ${language === lang ? 'text-green-600 font-semibold' : 'text-gray-900'
                    }`}
                >
                  {lang}
                  {language === lang && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Edit Profile View
  if (currentView === 'edit') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <button onClick={() => setCurrentView('main')} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profilni tahrirlash</h1>
          <div className="w-6"></div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Ism</label>
              <input
                type="text"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600"
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Familiya</label>
              <input
                type="text"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600"
                placeholder="Familiyangizni kiriting"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Telefon raqami</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600"
                placeholder="+998 88 371 17 47"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
          <button
            onClick={handleSaveProfile}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Saqlash
          </button>
        </div>
      </div>
    )
  }

  // Orders View
  if (currentView === 'orders') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <button onClick={() => setCurrentView('main')} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Buyurtmalar tarixi</h1>
          <div className="w-6"></div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => {
                  setSelectedOrder(order)
                  setCurrentView('orderDetail')
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:bg-gray-100 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500">⚠️</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className={`text-sm font-semibold ${order.statusColor}`}>{order.status}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{order.amount} so'm</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Order Detail View
  if (currentView === 'orderDetail' && selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <button onClick={() => setCurrentView('orders')} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Buyurtmalar tarixi</h1>
          <div className="w-6"></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Status Alert */}
          <div className="bg-red-50 mx-4 mt-4 rounded-lg p-4 flex items-start gap-3 border border-red-200">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-700">Bekor qilindi</p>
              <p className="text-sm text-red-600 mt-1">Buyurtma bekor qilindi</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="h-1 bg-gray-300 flex-1 mx-1"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="h-1 bg-gray-300 flex-1 mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-1 bg-gray-300 flex-1 mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="h-1 bg-gray-300 flex-1 mx-1"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white mx-4 mt-6 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Buyurtma raqami</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Buyurtma raqami</span>
                <span className="font-semibold text-gray-900">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Buyurtma sanasi</span>
                <span className="font-semibold text-gray-900">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Yetkazib berish vaqti</span>
                <span className="font-semibold text-gray-900">26 Jan, 12:00 - 15:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">To'lov usuli</span>
                <span className="font-semibold text-green-600">Naqd pul</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Yetkazib berish manzili</p>
            <div className="flex gap-3">
              <span className="text-gray-600">📍</span>
              <p className="text-sm text-gray-900">Chilonzor, Chilonzor tumani, Bunyodkor shoh ko'chasi</p>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Mahsulotlar (1)</p>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Чёрный чай Test pleasure 100g</p>
                <p className="text-xs text-gray-500 mt-1">3 dona</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">59 370 so'm</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mahsulotlar narxi</span>
                <span>59 370 so'm</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Qadoqlash (1 dona)</span>
                <span>500 so'm</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Yetkazib berish</span>
                <span>15 000 so'm</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Jami</span>
                <span className="font-bold text-lg text-green-600">{selectedOrder.amount} so'm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
