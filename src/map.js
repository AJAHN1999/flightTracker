import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import SearchBar from "./searchBar";
import { useEffect, useState } from "react";
import FlyToMarker from "./flyToMarker";
import { useMap } from "react-leaflet";

import RetrieveFlights from "./retrieveFlights";

export default function Map() {

    const[position, setPosition] = useState([48.8566,2.3522]);
    
    return (
        <>
        <MapContainer center={[48.8566,2.3522]} zoom={11}  > 
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <FlyToMarker position={position} />
            <RetrieveFlights/>
        </MapContainer>
        
        <SearchBar position = {setPosition} />
        </>
        
        
    );
}