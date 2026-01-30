'use client';
import { ChevronLeft, Search, ShoppingCart, ChevronRight, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, updateQuantity }) {
  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-sm'>

      <div className='w-full aspect-square bg-gray-200 flex items-center justify-center'>
        <Link to={'/product'}>

          <img
            src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Ccircle cx=%2255%22 cy=%2260%22 r=%2240%22 fill=%22%23d4453e%22/%3E%3Ccircle cx=%2285%22 cy=%2275%22 r=%2235%22 fill=%22%23e85d57%22/%3E%3Ccircle cx=%2270%22 cy=%22110%22 r=%2238%22 fill=%22%23c93f39%22/%3E%3C/svg%3E'
            alt={product.name}
            className='w-full h-full object-cover'
          />
        </Link>

      </div>
      <div className='p-4'>
        <h3 className='text-sm text-gray-700 font-medium mb-2'>{product.name}</h3>
        <p className='text-green-700 font-semibold mb-3'>{product.price.toLocaleString()} so'm/kg</p>
        <div className='bg-green-50 rounded-lg py-2 px-3 text-center mb-3'>
          <p className='text-sm text-gray-600'>
            {product.quantity > 0 ? `${Math.round(product.price * product.quantity / 1000)} so'm` : '0 so\'m'}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(product.id, -1);
            }}
            className='w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold'
          >
            −
          </button>
          <span className='text-sm text-gray-700 font-medium'>
            {product.quantity > 0 ? `${product.quantity / 1000} kg` : '0 g'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(product.id, 1);
            }}
            className='w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold'
          >
            +
          </button>
        </div>

      </div>

    </div>
  );
}

export default function FruitsMarketplace() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const scrollContainerRef = useRef(null);
  const categoryRefs = {
    all: useRef(null),
    citrus: useRef(null),
    tropic: useRef(null),
  };
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Olma krepson, mahalliy',
      price: 16990,
      quantity: 0,
      category: 'all',
    },
    {
      id: 2,
      name: 'Olma golden, mahalliy',
      price: 16990,
      quantity: 0,
      category: 'all',
    },
    {
      id: 3,
      name: 'Olma qizil',
      price: 12500,
      quantity: 0,
      category: 'all',
    },
    {
      id: 4,
      name: 'Olma yashil',
      price: 14000,
      quantity: 0,
      category: 'all',
    },
    {
      id: 5,
      name: 'Olma fuji',
      price: 18000,
      quantity: 0,
      category: 'all',
    },
    {
      id: 6,
      name: 'Olma renet',
      price: 17500,
      quantity: 0,
      category: 'all',
    },
    {
      id: 7,
      name: 'Mandarin Turkiya',
      price: 24990,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 8,
      name: 'Mandarin Xitoy',
      price: 22500,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 9,
      name: 'Apelsin Valensia',
      price: 19990,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 10,
      name: 'Limon',
      price: 18500,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 11,
      name: 'Pomelo',
      price: 25000,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 12,
      name: 'Grapefruit',
      price: 23000,
      quantity: 0,
      category: 'citrus',
    },
    {
      id: 13,
      name: 'Banan',
      price: 12000,
      quantity: 0,
      category: 'tropic',
    },
    {
      id: 14,
      name: 'Ananas',
      price: 28000,
      quantity: 0,
      category: 'tropic',
    },
    {
      id: 15,
      name: 'Mango',
      price: 35000,
      quantity: 0,
      category: 'tropic',
    },
    {
      id: 16,
      name: 'Papaya',
      price: 32000,
      quantity: 0,
      category: 'tropic',
    },
    {
      id: 17,
      name: 'Kokosnuts',
      price: 15000,
      quantity: 0,
      category: 'tropic',
    },
    {
      id: 18,
      name: 'Kiwi',
      price: 20000,
      quantity: 0,
      category: 'tropic',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta * 100) } : p
    ));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const ref = categoryRefs[tab];
    if (ref?.current && scrollContainerRef?.current) {
      const container = scrollContainerRef.current;
      const element = ref.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const relativeOffset = elementRect.top - containerRect.top;
      const scrollTop = container.scrollTop + relativeOffset - 80; // Adjust -80 based on your tab bar height (e.g., ~40-50px) + any desired padding
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allProducts = products.filter(p => p.category === 'all');
  const citrusProducts = products.filter(p => p.category === 'citrus');
  const tropicProducts = products.filter(p => p.category === 'tropic');

  const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity / 1000), 0);
  const hasItems = products.some(p => p.quantity > 0);

  return (
    <div className='w-full h-screen flex flex-col bg-gray-50'>
      {!showSearch && (
        <div className='w-full h-[68px] px-4 flex justify-between items-center bg-white border-b border-gray-200'>
          <Link to={"/"}>
            <ChevronLeft size={24} className='text-gray-800 cursor-pointer' />
          </Link>
          <h1 className='text-xl font-semibold text-gray-900'>Mevalar</h1>
          <Search size={24} className='text-gray-800 cursor-pointer' onClick={() => setShowSearch(true)} />
        </div>
      )}
      {showSearch && (
        <div className='w-full px-4 py-3 flex items-center gap-2 bg-white border-b border-gray-200'>
          <ChevronLeft size={24} className='text-gray-800 cursor-pointer' onClick={() => { setShowSearch(false); setSearchQuery(''); }} />
          <input
            type='text'
            placeholder='Qidirish...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:border-green-700'
            autoFocus
          />
          {searchQuery && (
            <X size={20} className='text-gray-400 cursor-pointer' onClick={() => setSearchQuery('')} />
          )}
        </div>
      )}
      {!showSearch && (
        <div className='w-full px-4 py-4 flex gap-2 bg-white border-b border-gray-200 sticky top-0 z-10'>
          <button
            onClick={() => handleTabClick('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'all'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Mevalar
          </button>
          <button
            onClick={() => handleTabClick('citrus')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'citrus'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Sitrus mevalar
          </button>
          <button
            onClick={() => handleTabClick('tropic')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'tropic'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tropik mevalar
          </button>
        </div>
      )}
      <div className='flex-1 overflow-y-auto' ref={scrollContainerRef}>
        {showSearch ? (
          <div className='px-4 py-6'>
            {filteredProducts.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-96'>
                <Search size={48} className='text-gray-400 mb-4' />
                <p className='text-gray-500 text-center'>Hech narsa topilmadi</p>
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-4'>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} updateQuantity={updateQuantity} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className='px-4 py-6'>
            <div ref={categoryRefs.all}>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>Mevalar</h2>
              <div className='grid grid-cols-2 gap-4 mb-12'>
                {allProducts.map(product => (
                  <ProductCard key={product.id} product={product} updateQuantity={updateQuantity} />
                ))}
              </div>
            </div>
            <div ref={categoryRefs.citrus}>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>Sitrus mevalar</h2>
              <div className='grid grid-cols-2 gap-4 mb-12'>
                {citrusProducts.map(product => (
                  <ProductCard key={product.id} product={product} updateQuantity={updateQuantity} />
                ))}
              </div>
            </div>
            <div ref={categoryRefs.tropic}>
              <h2 className='text-lg font-semibold text-gray-900 mb-6'>Tropik mevalar</h2>
              <div className='grid grid-cols-2 gap-4 mb-12'>
                {tropicProducts.map(product => (
                  <ProductCard key={product.id} product={product} updateQuantity={updateQuantity} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {hasItems && (
        <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200'>
          <Link to={'/basket'}>

            <div className='flex items-center gap-2 px-4 py-3'>
              <button className='bg-green-700 rounded-full p-3 text-white hover:bg-green-800'>
                <ShoppingCart size={20} />
              </button>
              <div className='flex-1 bg-green-700 text-white rounded-full py-3 px-4 flex items-center justify-between'>
                <span className='font-semibold'>{totalPrice.toLocaleString()} so'm</span>
                <ChevronRight size={20} />
              </div>

            </div>
          </Link>

        </div>
      )}
    </div>
  );
}