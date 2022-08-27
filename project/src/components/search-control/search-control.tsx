import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import {GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

function SearchControl () {
  const map = useMap();

  useEffect(() => {
    const prov = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider: prov,
      autoClose: true,
      showMarker: true,
      animateZoom: true,
      retainZoomLevel: true
    });
    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
}

export default SearchControl;
