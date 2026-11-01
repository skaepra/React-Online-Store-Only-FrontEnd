import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const STORE_POSITION: [number, number] = [40.75798, -73.98513];

const storeIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function StaticStoreMap() {
  return (
    <MapContainer
      center={STORE_POSITION}
      zoom={15}
      scrollWheelZoom={false}
      className="absolute inset-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={STORE_POSITION} icon={storeIcon} />
    </MapContainer>
  );
}
