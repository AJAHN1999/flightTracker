import { useContext, useEffect, useState } from "react";
import {Marker, Popup, useMap } from "react-leaflet";
import { boundsContext } from "./map"; // adjust this import path
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from "leaflet";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function Airports() {
  const bounds = useContext(boundsContext);
  const map = useMap();
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/AllAirports/")
      .then((response) => response.json())
      .then((json) => {
        const results = JSON.parse(json);
        setAirports(results);
      })
      .catch((error) => console.error(error));
  }, []);

  function isWithinBounds(airport) {
    if (!bounds) return false;
    const [lomin, lamin, lomax, lamax] = bounds;
    return (
      airport.latitude >= lamin &&
      airport.latitude <= lamax &&
      airport.longitude >= lomin &&
      airport.longitude <= lomax
    );
  }

  const zoom = map.getZoom();
  if (zoom < 8) return null;

  const visibleAirports = airports.filter(isWithinBounds);

  return (
    <>
      {visibleAirports.map((airport, idx) => (
        <Marker
          key={idx}
          position={[airport.latitude, airport.longitude]}
          
        >
          <Popup>{airport.airport}</Popup>
        </Marker>
      ))}
    </>
  );
}
