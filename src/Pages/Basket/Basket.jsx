import React, { useState } from 'react'
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react'
import image_1 from './Images/image_1.png'
import image_2 from './Images/image_2.png'
import { Link } from 'react-router-dom'

const Basket = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Olma golden, mahalliy',
      price: 16990,
      quantity: 1,
      image: image_1
    },
    {
      id: 2,
      name: 'Olma krepson, mahalliy',
      price: 16990,
      quantity: 3,
      image: image_2
    }
  ])

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleQuantityChange = (id, delta) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleClearAll = () => {
    setItems([]);
    setShowConfirmModal(false);
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const packaging = 500
  const deliveryThreshold = 100000
  const freeDeliveryThreshold = 150000
  const maxDiscountThreshold = 200000

  let delivery = 15000
  if (subtotal >= freeDeliveryThreshold) {
    delivery = 0
  }

  const progressPercent = Math.min((subtotal / deliveryThreshold) * 100, 100)

  const discountProgressPercent = Math.min((subtotal / maxDiscountThreshold) * 100, 100)
  const remainingForMaxDiscount = Math.max(maxDiscountThreshold - subtotal, 0)

  const discount = Math.floor((subtotal + packaging + delivery) * 0.1)
  const total = subtotal + packaging + delivery - discount

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <button className="text-gray-600 hover:text-gray-900">
          <Link to={'/category'}>
            <ChevronLeft size={24} />
          </Link>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Savat</h1>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 flex gap-4 items-start">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-amber-600 mt-1">{item.price.toLocaleString()} so'm/kg</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-semibold text-gray-900 w-8 text-center">{item.quantity} kg</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <span className="text-xl">✕</span>
              </button>
              <p className="text-sm font-semibold text-green-600">
                {(item.price * item.quantity).toLocaleString()} so'm
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 mx-4 mb-4 rounded-lg overflow-hidden relative">
        <div className="flex items-center gap-2 relative z-10">
          <span>🎁</span>
          <p className="text-sm font-semibold text-gray-900">
            {remainingForMaxDiscount > 0
              ? `+${remainingForMaxDiscount.toLocaleString()} = 10% chegirma`
              : '✓ Maksimal chegirma'}
          </p>
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${discountProgressPercent}%` }}
          ></div>
          <div
            className="absolute inset-0 bg-yellow-100"
            style={{ width: `${100 - discountProgressPercent}%`, marginLeft: `${discountProgressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white px-4 py-4 space-y-3 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Mahsulotlar narxi</span>
          <span>{subtotal.toLocaleString()} so'm</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Qadoqlash (1 dona)</span>
          <span>{packaging} so'm</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Yetkazib berish</span>
          <span className="font-semibold transition-colors duration-300" style={{ color: delivery === 0 ? '#059669' : '#374151' }}>
            {delivery === 0 ? 'Bepul yetkazib berish' : `${delivery.toLocaleString()} so'm`}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>15 000</span>
            <span>100 000</span>
          </div>
          <div className="h-2 bg-gray-300 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div
              className="h-full bg-orange-400 transition-all duration-500 ease-out"
              style={{ width: `${100 - progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>15 000</span>
            <span>{delivery === 0 ? 'Bepul' : 'Bepul'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-4 border-t border-gray-200">
        <Link to={'/formalization'}>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
            {total.toLocaleString()} so'm • Buyurtma berish
          </button>
          </Link>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Haqiqatdan ham o'chirmoqchimisiz?
            </h3>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg"
              >
                Yo‘q
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Ha
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Basket