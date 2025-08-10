import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import SearchBar from "./searchBar";
import { createContext, useEffect, useState, useContext } from "react";
import FlyToMarker from "./flyToMarker";
import MapBoundsProvider from "./mapBoundsProvider";
import RetrieveFlights from "./retrieveFlights";
import Airports from "./airports";
import React from 'react';

export const boundsContext = createContext()

export default function Map() {
    const [position, setPosition] = useState([48.8566, 2.3522]);
    const [bounds,setBounds] = useState()

    return (
        <>
            <boundsContext.Provider value={bounds}>
                <MapContainer center={[48.8566, 2.3522]} zoom={11}  >
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
                    <MapBoundsProvider setBounds={setBounds} />
                    <Airports />
                </MapContainer>

                <SearchBar position={setPosition} />
            </boundsContext.Provider>

        </>


    );
}