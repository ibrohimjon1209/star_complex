import { Bell, ChevronDown, MapPin, Menu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-[67.99px] px-[16px] flex justify-between items-center bg-white'>

      <Link to={'/profile'}>
        <div>
          <Menu size={"24px"} color='#1C1B1F' />
        </div>
      </Link>

      <Link to={'/location'}>
        <div className='flex'>

          <MapPin color='#1C1B1F' />

          <h1 className='font-inter text-[14px] text-[#1C1B1F]'>Chilonzor, Chilonzor tumani, ...</h1>

          <ChevronDown color='#1C1B1F' />
        </div>
      </Link>

      <div>
        <Bell size={"24px"} />
      </div>


    </div >
  )
}

export default Navbar