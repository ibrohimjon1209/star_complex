import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import photo from './Images/image.png'
import { Link } from 'react-router-dom';

const Product = () => {
  const [quantity, setQuantity] = useState(0);
  const pricePerKg = 16990;

  const updateQuantity = (delta) => {
    setQuantity(Math.max(0, quantity + delta * 500));
  };

  const totalPrice = Math.round((quantity / 1000) * pricePerKg);

  return (
    <div className='w-full h-full flex flex-col justify-between'>

      <div>

        <div className='w-full h-[68px] px-4 flex justify-between items-center bg-white border-b border-gray-200'>
          <Link to={"/category"}>
            <ChevronLeft size={24} className='text-gray-800 cursor-pointer' />
          </Link>
        </div>

        <div className='w-full max-h-[450px] aspect-square'>
          <img className='w-full h-full  object-cover' src={photo} />
        </div>

        <div className='flex flex-col p-[16px]'>

          <h1 className='font-inter font-[700] text-[20px] text-[#1c1b1f]'>Olma krepson, mahalliy</h1>
          <h1 className='font-inter font-[600] text-[18px] text-[#4f6f1e] mt-[8px]'>{pricePerKg.toLocaleString()} so'm/kg</h1>
          <p className='mt-[16px] font-inter text-[14px]'>Olma Krepson — mazali va xushbo‘y nav bo‘lib, shirali va qarsildoq tuzilishga ega.Uzoq muddat saqlanishi va tashishga chidamliligi bilan ajralib turadi. Sog</p>
        </div>

      </div>


      <div className='w-full h-[85px] border-t-gray-300 p-[16px] border-t-[1px] px-4 flex justify-between items-center bg-white border-b border-gray-200'>
        {quantity === 0 ? (
          <button
            onClick={() => setQuantity(1000)}
            className='w-full h-full bg-[#4f6f1e] rounded-[14px] text-[16px] font-[600] text-white'
          >
            {pricePerKg.toLocaleString()} so'm • Savatga qo'shish
          </button>
        ) : (
          <div className='w-full h-full flex items-center justify-between bg-[#f5f5f5] px-[16px]  rounded-[14px] text-[16px] font-[600]'>
            <h1 className='font-inter font-[700] text-[18px] text-[#4f6f1e]'>{totalPrice.toLocaleString()} so'm </h1>


            <div className='flex items-center justify-between w-[140px]'>
              <button
                onClick={() => updateQuantity(-1)}
                className='w-8 h-8 rounded-full bg-[#4f6f1e] text-white flex items-center justify-center text-lg font-bold'
              >
                −
              </button>
              <span className='text-sm text-gray-700 font-medium'>
                {quantity / 1000} kg
              </span>
              <button
                onClick={() => updateQuantity(1)}
                className='w-8 h-8 rounded-full bg-[#4f6f1e] text-white flex items-center justify-center text-lg font-bold'
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Product