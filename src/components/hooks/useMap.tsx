import {useEffect, useState, useRef, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import { TCity, layer } from '../../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TCity
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: 52.3609553943508,
          lng: 4.85309666406198
        },
        zoom: 10,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
