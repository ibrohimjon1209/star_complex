import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ onLocationSelected, initialCoords }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const uzbekCities = [
    { name: 'Tashkent Center - Amir Temur Square', lat: 41.2995, lng: 69.2401, address: 'Tashkent, Amir Temur maydoni' },
    { name: 'Chilonzor District', lat: 41.267, lng: 69.14, address: 'Chilonzor, Halqlar Do\'stligi maydoni' },
    { name: 'Olmazor District', lat: 41.356, lng: 69.231, address: 'Olmazor, Universitet ko\'chasi' },
    { name: 'Yunus Abad District', lat: 41.32, lng: 69.34, address: 'Yunusabad, Nukus ko\'chasi' },
    { name: 'Shaykhonohur District', lat: 41.28, lng: 69.27, address: 'Shaykhonohur, Mirabad ko\'chasi' },
    { name: 'Bektemir District', lat: 41.22, lng: 69.38, address: 'Bektemir, Bodomzor ko\'chasi' },
  ];

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestCity = (lat, lng) => {
    let nearest = uzbekCities[0];
    let minDistance = getDistance(lat, lng, nearest.lat, nearest.lng);

    uzbekCities.forEach((city) => {
      const distance = getDistance(lat, lng, city.lat, city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = city;
      }
    });

    return nearest;
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = () => {
      initMap();
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.L) return;

    // Create map
    const map = window.L.map(mapRef.current).setView(
      [initialCoords.lat, initialCoords.lng],
      11
    );

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add marker at center
    const marker = window.L.marker([initialCoords.lat, initialCoords.lng], {
      draggable: true,
    }).addTo(map);

    // Update address on marker drag
    marker.on('dragend', () => {
      const { lat, lng } = marker.getLatLng();
      const nearestCity = findNearestCity(lat, lng);
      onLocationSelected(nearestCity.address, { lat, lng });
    });

    // Handle map click
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      const nearestCity = findNearestCity(lat, lng);
      onLocationSelected(nearestCity.address, { lat, lng });
    });

    mapInstance.current = map;
    markerInstance.current = marker;

    // Add custom controls
    const controlDiv = document.createElement('div');
    controlDiv.style.cssText = `
      padding: 10px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      font-size: 12px;
      text-align: center;
    `;
    controlDiv.innerHTML = `
      <div style="padding: 8px; border-bottom: 1px solid #ddd; margin-bottom: 8px; font-weight: 600;">
        Tashkent, Uzbekistan
      </div>
      <div style="font-size: 11px; color: #666;">
        Click or drag marker to select location
      </div>
    `;
    map.getContainer().appendChild(controlDiv);
  };

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: "60vh",
        backgroundColor: '#e0f2f1',
      }}
    />
  );
};

export default MapComponent;
