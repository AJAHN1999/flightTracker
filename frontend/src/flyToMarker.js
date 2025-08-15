import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function FlyToMarker({ position }) {
    const map = useMap(); // ✅ This is now inside MapContainer context
  
    useEffect(() => {
      if (position) {
        map.flyTo(position, 11);
      }
    }, [position]);
  
    return null;
  }