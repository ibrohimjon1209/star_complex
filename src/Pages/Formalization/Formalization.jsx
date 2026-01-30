import image_1 from './Images/image_1.png'
import React, { useState } from 'react'
import { ChevronLeft, MapPin, ChevronRight, Check } from 'lucide-react'
import cash_logo from './Images/cash_logo.png'
import click_logo from './Images/click_logo.png'
import payme_logo from './Images/payme.png'
import { Link } from 'react-router-dom'


const Formalization = () => {
  const [selectedPayment, setSelectedPayment] = useState('naqd_pul')
  const [selectedDate, setSelectedDate] = useState('today')
  const [selectedTime, setSelectedTime] = useState('12:00 - 15:00')
  const [selectedAddress, setSelectedAddress] = useState('Chilonzor, Chilonzor tumani, Bunyodkor shoh ko\'chasi')

  const subtotal = 67960
  const packaging = 500
  const delivery = 15000
  const discount = Math.floor((subtotal + packaging + delivery) * 0.1)
  const total = subtotal + packaging + delivery - discount
  const remainingForMaxDiscount = Math.max(200000 - subtotal, 0)

  const paymentMethods = [
    {
      id: 'naqd_pul',
      name: 'Naqd pul',
      description: 'Yetkazib berishda to\'lash',
      logo: cash_logo
    },
    {
      id: 'click',
      name: 'Click',
      description: 'Onlayn to\'lov',
      logo: click_logo
    },
    {
      id: 'payme',
      name: 'Payme',
      description: 'Onlayn to\'lov',
      logo: payme_logo
    }
  ]

  const dates = [
    { label: 'Bugun', value: 'today', date: '28' },
    { label: 'Ertaga', value: 'tomorrow', date: '29' }
  ]

  const times = ['12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00']

  return (
    <div className=" bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-20">
        <button className="text-gray-600 hover:text-gray-900">
          <Link to={'/basket'}>
            <ChevronLeft size={24} />
          </Link>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Buyurtma berish</h1>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 pb-[150px]">

          <Link to={"/location"} className='mb-[50px]'>
            {/* Delivery Address */}
              <h2 className="text-base font-semibold text-gray-900 mb-3">Yetkazib berish manzili</h2>
              <button className="w-full border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between hover:border-green-600 transition">
                <div className="flex items-center gap-3 flex-1">
                  <MapPin size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900 text-left">{selectedAddress}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
              </button>
          </Link>

          {/* Delivery Date and Time */}
          <div>
            <h2 className="mt-[20px] text-base font-semibold text-gray-900 mb-3">Yetkazib berish vaqti</h2>

            {/* Dates */}
            <div className="flex gap-3 mb-4">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-center transition ${selectedDate === d.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <div className="text-lg">{d.date}</div>
                  <div className="text-xs">Jan</div>
                </button>
              ))}
            </div>

            {/* Times */}
            <div className="flex flex-wrap gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTime === time
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-green-600'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">To'lov usuli</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full border-2 rounded-lg p-4 flex items-center justify-between transition ${selectedPayment === method.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <img src={method.logo} className='w-[48px] h-[48px] object-contain' />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  {selectedPayment === method.id && <Check size={20} className="text-green-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Banner */}


          <div className=" rounded-[15px]  bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-2 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Mahsulotlar narxi</span>
                <span>{subtotal.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Qadoqlash (1 dona)</span>
                <span>{packaging} so'm</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Yetkazib berish</span>
                <span>{delivery.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200">
                <span>Jami</span>
                <span className="text-green-600 text-lg">{total.toLocaleString()} so'm</span>
              </div>
            </div>

          </div>

          <div className="px-4 py-3 border-t border-gray-200 ">
            <h3 className="font-semibold text-gray-900 text-[16px] font-[700] mb-2">Mahsulotlar (1)</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={image_1}
                  alt="Olma krepson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">Olma krepson, mahalliy</p>
                <p className="text-xs text-gray-500">4 kg</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">{subtotal.toLocaleString()} so'm</p>
            </div>
          </div>
        </div>


        <div className='w-full h-[131.5px] px-4 pt-4 fixed bottom-0 left-o right-0 flex flex-col gap-[8px] bg-white'>
          <div className="rounded-lg overflow-hidden w-full h-[35.5px] px-4 flex justify-between items-center relative bg-yellow-100">
            <div className="w-full h-full flex items-center justify-between gap-2 relative z-10">
              <div className='flex gap-[8px]'>
                <span>🎁</span>
                <p className="text-sm font-semibold text-gray-900">
                  {remainingForMaxDiscount > 0
                    ? `+${remainingForMaxDiscount.toLocaleString()} = 10% chegirma`
                    : '✓ Maksimal chegirma'}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-600 ml-auto" />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${Math.min((subtotal / 200000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-[52px] rounded-lg transition active:bg-green-800">
              Buyurtmani tasdiqlash • {total.toLocaleString()} so'm
            </button>
          </div>


        </div>
      </div>


    </div>
  )
}

export default Formalization
