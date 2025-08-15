import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet-rotatedmarker';



export default function DisplayFlights({ flights }) {
  if (flights) {
    let m = L.marker([48.8631169, 2.3708919], {
      rotationAngle: 45
    })
    console.log(flights)
    return (
      <>
        {flights.map((flight, idx) => (
          <Marker
            key={idx}
            position={[flight.latitude, flight.longitude]}
            icon={L.divIcon({
              className: 'aircraft-icon',
              html: '✈️',
              iconSize: [6, 6],
              iconAnchor: [3, 3],
            })}
          >
            <Popup>
              <b>{flight.callsign || 'Unknown'}</b><br />
              Country: {flight.originCountry}<br />
              Alt: {Math.round(flight.altitude || 0)} m<br />
              Speed: {Math.round(flight.velocity || 0)} m/s<br />
              Heading: {Math.round(flight.trueTrack || 0)}°
            </Popup>
          </Marker>
        ))}
      </>
    )
  }
  return null;
}

