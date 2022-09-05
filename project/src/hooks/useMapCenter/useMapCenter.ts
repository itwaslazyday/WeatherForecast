import { LatLng } from 'leaflet';
import { memo } from 'react';
import { useMap } from 'react-leaflet';

type UseMapCenterProps = {
  center: {
    lat: number
    lon: number
  }
}

function UseMapCenter({ center }: UseMapCenterProps) {
  const { lat, lon } = center;
  const map = useMap();

  map.flyTo([lat, lon], 10, { animate: true, duration: 0.4 });

  return null;
}

export default memo(UseMapCenter);
