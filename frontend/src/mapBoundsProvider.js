import { useEffect } from "react";
import { useMap } from "react-leaflet";
export default function MapBoundsProvider({ setBounds }) {
    const map = useMap();

    useEffect(() => {
        const handleMove = () => {
            const bounds = map.getBounds().toBBoxString();
            const bboxArray = bounds.split(',').map(Number);
            setBounds(bboxArray);
        };

        handleMove(); // initial
        map.on('moveend', handleMove);
        return () => map.off('moveend', handleMove);
    }, [map]);

    return null;
}
