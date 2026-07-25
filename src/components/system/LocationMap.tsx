import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom luxury marker
const luxuryIcon = L.divIcon({
  className: "custom-leaflet-icon",
  html: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%;">
      <div style="background-color: #c9a24c; border: 2px solid #050505; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 0 15px rgba(201,162,76,0.5); display: flex; align-items: center; justify-content: center;">
        <div style="background-color: #050505; width: 8px; height: 8px; border-radius: 50%;"></div>
      </div>
      <div style="width: 2px; height: 20px; background: linear-gradient(to bottom, #c9a24c, transparent);"></div>
    </div>
  `,
  iconSize: [30, 44],
  iconAnchor: [15, 44],
  popupAnchor: [0, -44],
});

export default function LocationMap() {
  const position: [number, number] = [34.0522, -118.2437]; // Los Angeles coordinates

  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-gold/15 shadow-[0_0_50px_rgba(201,162,76,0.05)]">
      <MapContainer 
        center={position} 
        zoom={12} 
        scrollWheelZoom={false}
        className="h-full w-full bg-[#080605]"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={luxuryIcon}>
          <Popup className="luxury-popup">
            <div className="bg-ink p-2 text-center text-ivory">
              <span className="block text-[10px] uppercase tracking-widest text-gold mb-1">Braids Doc</span>
              Los Angeles, CA
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Glass overlay info card */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-[1000] rounded-lg border border-gold/20 bg-black/60 p-4 backdrop-blur-md">
         <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gold shadow-[0_0_10px_#c9a24c]" />
            <p className="text-[9px] uppercase tracking-widest text-ivory/90">Studio Active</p>
         </div>
         <p className="mt-1 text-[8px] uppercase tracking-wider text-gold/60">Los Angeles Hub</p>
      </div>

      <style>{`
        .leaflet-container {
          background-color: #080605 !important;
          z-index: 1;
        }
        .leaflet-tile {
          /* Translates dark grey/white map features into our signature gold (#c9a24c) */
          filter: sepia(100%) hue-rotate(5deg) saturate(350%) brightness(110%) contrast(120%);
        }
        .luxury-popup .leaflet-popup-content-wrapper,
        .luxury-popup .leaflet-popup-tip {
          background: #111;
          border: 1px solid rgba(201,162,76,0.3);
          border-radius: 8px;
          color: #fff;
        }
        .luxury-popup .leaflet-popup-content {
          margin: 8px;
        }
        .leaflet-control-container {
          display: none;
        }
      `}</style>
    </div>
  );
}
