import { Icon } from 'leaflet';

const DEFAULT_LAT = 55.751244;
const DEFAULT_LON = 37.618423;
const DEFAULT_ZOOM = 10;

const defaultCustomIcon = new Icon({
  iconUrl: '/img/icon/pin.svg',
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/icon/pin-active.svg',
});

export { DEFAULT_LAT, DEFAULT_LON, DEFAULT_ZOOM, defaultCustomIcon, currentCustomIcon };
