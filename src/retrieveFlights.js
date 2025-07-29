import { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import DisplayFlights from "./displayFlights";

export default function RetrieveFlights() {
    const map = useMap();
    const [coord, setCoord] = useState([45.8389, 5.9962, 47.8229, 10.5226]);
    const [token, setToken] = useState(null);
    const [flights, setFlights] = useState(null);
    const refDebounce = useRef(null)
    const coordRef = useRef(coord);
    const tokenRef = useRef(token);


    
    // Step 1: Get token once when component mounts
    useEffect(() => {
        fetch("http://127.0.0.1:8000/login")
            .then((response) => response.json())
            .then((json) => {
                setToken(json); // or whatever field the token is in


            })
            .catch((error) => {
                console.error("Token fetch error:", error);
            });
    }, []);

    

    useEffect(() => {
        if (!token) return;
        refDebounce.current = debounce(getStates, 3000);
    }, [token]);

    useEffect(() => {
        coordRef.current = coord;
    }, [coord]);



    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    function getStates() {
        //console.log("reached before token", token)
        const token = tokenRef.current;
        const coord = coordRef.current;
        if (!token) return;
        console.log("reached here")
        const [lomin, lamin, lomax, lamax] = coord;
        console.log(lamax, lamin, lomax, lomin)

        fetch(
            `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((json) => {
                console.log("Flight data:", json);
                const parsed = json.states?.map(state => ({
                    icao24: state[0],
                    callsign: state[1]?.trim(),
                    originCountry: state[2],
                    longitude: state[5],
                    latitude: state[6],
                    altitude: state[7],
                    velocity: state[9],
                    trueTrack: state[10],
                })).filter(f => f.latitude && f.longitude); // Filter out bad coords

                setFlights(parsed);
            })
            .catch((error) => console.error("Flight fetch error:", error));
    }

    //debounce function: https://stackoverflow.com/questions/75988682/debounce-in-javascript
    function debounce(callback, delay) {

        let timer
        console.log("Debounced wrapper called"); // track when it's triggered
        return function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback();
            }, delay)
        }
    }



    // Step 2: Set map moveend listener ONCE
    useEffect(() => {
        const onMoveEnd = () => {
            const bounds = map.getBounds().toBBoxString(); // returns string like "southWestLng,southWestLat,northEastLng,northEastLat"
            const bboxArray = bounds.split(',').map(Number);
            setCoord(bboxArray);
        };

        map.on("moveend", onMoveEnd);

        return () => {
            map.off("moveend", onMoveEnd); // clean up
        };
    }, [map]);

    // Step 3: Fetch flights when coords or token change
    useEffect(() => {
        if (!token) return;
        console.log("🔁 useEffect triggered by coord/token change");
        console.log("📦 refDebounce.current:", refDebounce.current);
        getStates()
        const fetchStatesWithDelay = refDebounce.current;
        if (fetchStatesWithDelay) {
            fetchStatesWithDelay();
        } else {
            console.warn("⚠️ Debounced function not set yet");
        }

    }, [coord, token]);

    return (<DisplayFlights flights={flights} />);
}