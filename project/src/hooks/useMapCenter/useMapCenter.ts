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

  map.setView([lat, lon], 10);

  return null;
}

export default memo(UseMapCenter);
