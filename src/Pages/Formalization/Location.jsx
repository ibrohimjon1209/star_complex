import React, { useState, useEffect, useRef, lazy } from 'react';
import { ChevronLeft, MapPin, Plus, Edit2, Trash2, Phone, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const MapComponent = lazy(() => import('./MapComponent'));

const Location = () => {
    const [currentPage, setCurrentPage] = useState('list'); // list, add, edit, selectMap
    const [selectedMapAddress, setSelectedMapAddress] = useState('');
    const [selectedMapCoords, setSelectedMapCoords] = useState({ lat: 41.2995, lng: 69.2401 });

    const [locations, setLocations] = useState([
        {
            id: 1,
            address: 'Chilonzor, Chilonzor tumani, Bunyodkor shoh ko\'chasi',
            houseNumber: '45',
            entrance: '2',
            floor: '3',
            phone: '+998901234567',
            notes: 'Qora darvoza orqasida',
            isPrimary: true,
        },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        houseNumber: '',
        entrance: '',
        floor: '',
        phone: '',
        notes: '',
        isPrimary: false,
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            address: '',
            houseNumber: '',
            entrance: '',
            floor: '',
            phone: '',
            notes: '',
            isPrimary: false,
        });
        setEditingId(null);
    };

    // Add new location
    const handleAddLocation = () => {
        if (!formData.address || !formData.phone) {
            alert('Iltimos, manzil va telefon raqamini kiriting');
            return;
        }
        const newLocation = {
            id: Date.now(),
            ...formData,
        };
        setLocations((prev) => [...prev, newLocation]);
        resetForm();
        setCurrentPage('list');
    };

    // Edit location
    const handleEditLocation = () => {
        if (!formData.address || !formData.phone) {
            alert('Iltimos, manzil va telefon raqamini kiriting');
            return;
        }
        setLocations((prev) =>
            prev.map((loc) =>
                loc.id === editingId ? { ...loc, ...formData } : loc
            )
        );
        resetForm();
        setCurrentPage('list');
    };

    // Delete location
    const handleDeleteLocation = (id) => {
        if (confirm('Bu manzilni o\'chirmoqchimisiz?')) {
            setLocations((prev) => prev.filter((loc) => loc.id !== id));
        }
    };

    // Start editing
    const handleStartEdit = (location) => {
        setFormData({
            address: location.address,
            houseNumber: location.houseNumber,
            entrance: location.entrance,
            floor: location.floor,
            phone: location.phone,
            notes: location.notes,
            isPrimary: location.isPrimary,
        });
        setEditingId(location.id);
        setCurrentPage('edit');
    };

    // Start adding
    const handleStartAdd = () => {
        resetForm();
        setCurrentPage('add');
    };

    // Handle map location selection
    const handleMapLocationSelected = (address, coords) => {
        setSelectedMapAddress(address);
        setSelectedMapCoords(coords);
    };

    const handleConfirmMapLocation = () => {
        if (!selectedMapAddress) {
            alert('Iltimos, haritada joylashuvni belgilang');
            return;
        }
        setFormData((prev) => ({ ...prev, address: selectedMapAddress }));
        setCurrentPage('add');
    };

    const renderListPage = () => (
        <div className="min-h-screen w-f4+ull bg-gray-50">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full flex items-center justify-between mx-auto px-4 py-4">
                    <Link to={'/'}>
                        <ChevronLeft size={24} />

                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900 text-center">Saqlangan manzillar</h1>
                    <div className='w-[24px]'></div>
                </div>
            </div>  

            <div className="w-full mx-auto px-4 py-4 space-y-3">
                {locations.map((location) => (
                    <div key={location.id} className="bg-white border-2 border-yellow-600 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{location.address}</p>
                                {location.phone && (
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <Phone size={12} />
                                        {location.phone}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleStartEdit(location)}
                                    className="p-2 hover:bg-blue-50 rounded text-blue-600"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteLocation(location.id)}
                                    className="p-2 hover:bg-red-50 rounded text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-8 right-4 w-[80wv] mx-auto left-4">
                <button
                    onClick={handleStartAdd}
                    className="w-full bg-green-700 text-white font-semibold py-4 rounded-full shadow-lg hover:bg-green-800 transition flex items-center justify-center"
                >
                    <Plus size={24} className="mr-2" />
                    Yangi manzil qo'shish
                </button>
            </div>
        </div>
    );

    // Render map page
    const renderMapPage = () => (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-white w-full border-b border-gray-200 z-20">
                <div className="w-full  px-4 py-4 flex items-center justify-between">
                    <button
                        className=" text-gray-600"
                        onClick={() => {
                            setSelectedMapAddress('');
                            setCurrentPage('add');
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Joylashuvni tanlang</h1>
                    <div className="w-[24px]"></div>
                </div>
            </div>

            {/* Map component */}
            <div className="flex-1 relative bg-blue-50 overflow-hidden">
                <MapComponent
                    onLocationSelected={handleMapLocationSelected}
                    initialCoords={selectedMapCoords}
                />
            </div>

            {/* Location info and confirmation section */}
            <div className="bg-white border-t border-gray-200 px-4 py-4 space-y-4">
                {/* Selected address display */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">Tanlangan joylashuv</p>
                    <p className="text-sm font-medium text-gray-900 min-h-12 flex items-center">
                        {selectedMapAddress || 'Haritada markazga bosing...'}
                    </p>
                </div>

                {/* Delivery area confirmation */}
                {selectedMapAddress && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                        <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-medium text-green-700">Yetkazib berish hududi</p>
                            <p className="text-sm text-green-600">Tashkent shahar</p>
                        </div>
                    </div>
                )}

                {/* Confirm button */}
                <button
                    onClick={handleConfirmMapLocation}
                    disabled={!selectedMapAddress}
                    className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Joylashuvni tasdiqlash
                </button>
            </div>
        </div>
    );

    // Render form page
    const renderFormPage = () => (
        <div className="w-full min-h-screen bg-white">
            {/* Header */}
            <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="w-full mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        className="text-gray-600"
                        onClick={() => {
                            resetForm();
                            setCurrentPage('list');
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">
                        {editingId ? 'Manzilni tahrirlash' : 'Manzil qo\'shish'}
                    </h1>
                    <div className="w-6"></div>
                </div>
            </div>

            {/* Form content */}
            <div className="w-full mx-auto px-4 py-6">
                {/* Location selector */}
                <div className="mb-6">
                    <div className="bg-white border-2 border-green-700 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-green-700 flex-shrink-0 mt-1" size={24} />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Haritadan tanlang"
                                    value={formData.address}
                                    readOnly
                                    className="w-full text-sm font-medium text-gray-900 placeholder-gray-500 outline-none bg-transparent cursor-not-allowed"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedMapAddress('');
                                    setCurrentPage('selectMap');
                                }}
                                className="text-green-700 hover:text-green-800 flex-shrink-0"
                                type="button"
                            >
                                <Edit2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form fields */}
                <div className="space-y-6">
                    {/* Three column fields */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Uy raqami</label>
                            <input
                                type="text"
                                name="houseNumber"
                                value={formData.houseNumber}
                                onChange={handleInputChange}
                                placeholder="45"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Kirish</label>
                            <input
                                type="text"
                                name="entrance"
                                value={formData.entrance}
                                onChange={handleInputChange}
                                placeholder="2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Qavat</label>
                            <input
                                type="text"
                                name="floor"
                                value={formData.floor}
                                onChange={handleInputChange}
                                placeholder="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Phone number */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Qo'shimcha telefon</label>
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                            <Phone className="text-gray-400" size={20} />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+998901234567"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Izohlar</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Masalan: Qora darvoza orqasida..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            rows="3"
                        />
                    </div>

                    {/* Primary location checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isPrimary"
                            checked={formData.isPrimary}
                            onChange={handleInputChange}
                            id="isPrimary"
                            className="w-5 h-5 accent-green-700 cursor-pointer"
                        />
                        <label htmlFor="isPrimary" className="text-sm text-gray-700 cursor-pointer">
                            Asosiy manzil sifatida o'rnatish
                        </label>
                    </div>
                </div>

                {/* Action button */}
                <button
                    onClick={editingId ? handleEditLocation : handleAddLocation}
                    className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg mt-8 hover:bg-green-800 transition"
                >
                    {editingId ? 'Saqlash' : 'Qo\'shish'}
                </button>
            </div>
        </div>
    );

    // Render appropriate page
    if (currentPage === 'list') {
        return renderListPage();
    } else if (currentPage === 'selectMap') {
        return renderMapPage();
    } else {
        return renderFormPage();
    }
};

export default Location;    