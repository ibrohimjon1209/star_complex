import React from 'react'
import fruit from './Images/fruit.png'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar className="" />

      <div className='w-full px-[16px] flex flex-col  gap-y-[16px]'>

        <Link to='/category'>
          <div className='max-w-[575px] h-[180px] rounded-[20px] overflow-hidden'>
            <img src={fruit} className='object-cover w-full h-full' />
            <h1 className='mt-[-43px] ml-[16px] font-inter font-[700] text-[18px] text-white'>Mevalar</h1>
          </div>
        </Link>
        <div className='max-w-[575px] h-[180px] rounded-[20px] overflow-hidden'>
          <img src={fruit} className='object-cover w-full h-full' />
          <h1 className='mt-[-43px] ml-[16px] font-inter font-[700] text-[18px] text-white'>Mevalar</h1>
        </div>

        <div className='max-w-[575px] h-[180px] rounded-[20px] overflow-hidden'>
          <img src={fruit} className='object-cover w-full h-full' />
          <h1 className='mt-[-43px] ml-[16px] font-inter font-[700] text-[18px] text-white'>Mevalar</h1>
        </div>

        <div className='max-w-[575px] h-[180px] rounded-[20px] overflow-hidden'>
          <img src={fruit} className='object-cover w-full h-full' />
          <h1 className='mt-[-43px] ml-[16px] font-inter font-[700] text-[18px] text-white'>Mevalar</h1>
        </div>

        <div className='max-w-[575px] h-[180px] rounded-[20px] overflow-hidden'>
          <img src={fruit} className='object-cover w-full h-full' />
          <h1 className='mt-[-43px] ml-[16px] font-inter font-[700] text-[18px] text-white'>Mevalar</h1>
        </div>
      </div>

    </div>
  )
}

export default Home