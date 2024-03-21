import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';

import {TCity, Points, Point} from '../../const';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap';

type MapProps = {
  activeCity: TCity;
  points: Points;
  selectedPoint: Point | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {activeCity, points, selectedPoint} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    let mounted = true;
    if (mounted){
      map?.panTo({lat: activeCity.location.latitude, lng: activeCity.location.longitude});
      map?.setZoom(activeCity.location.zoom);
    }
    return () => {
      mounted = false;
    };
  }, [map, activeCity]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== null && point.latitude === selectedPoint.latitude && point.longitude === selectedPoint.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, activeCity]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
