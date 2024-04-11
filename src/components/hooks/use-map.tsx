import {useEffect, useState, useRef, MutableRefObject} from 'react';
import leaflet, { TileLayer } from 'leaflet';
import {Map} from 'leaflet';
import { TCity } from '../../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TCity
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const layer = new TileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    {
      attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    });
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom,
      });
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city, layer]);

  return map;
}

export default useMap;
