import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Pages/Navbar/Navbar'
import Profile from './Pages/Profile/Profile'
import Basket from './Pages/Basket/Basket'
import Address from './Pages/Address/Address'
import Formalization from './Pages/Formalization/Formalization'
import Home from './Pages/Home/Home'
import Notification from './Pages/Notification/Notification'
import Order from './Pages/Order/Order'
import Product from './Pages/Product/Product'
import Search from './Pages/Search/Search'
import Public_offer from './Pages/Public_offer/Public_offer'
import Privacy_policy from './Pages/Privacy_policy/Privacy_policy'
import Category from './Pages/Category/Category'
import Location from './Pages/Formalization/Location'

const App = () => {
  return (
    <div className="w-full bg-white h-screen">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/location" element={<Location />} />
        <Route path="/category" element={<Category />} />
        <Route path="/address" element={<Address />} />
        <Route path="/formalization" element={<Formalization />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/product/*" element={<Product />} />
        <Route path="/search" element={<Search />} />
        <Route path="/public_offer" element={<Public_offer />} />
        <Route path="/privacy_policy" element={<Privacy_policy />} />
      </Routes>
    </div>
  )
}

export default App
