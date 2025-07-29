import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function DisplayFlights({ flights}) {
        if (flights){
            console.log(flights)
            return(
            <>
            {flights.map((flight, idx) => (
                <Marker
                  key={idx}
                  position={[flight.latitude, flight.longitude]}
                  icon={L.divIcon({
                    className: 'aircraft-icon',
                    html: '✈️',
                    iconSize: [200, 200],
                    iconAnchor: [100, 100],
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
            )}
            return null;
        }

