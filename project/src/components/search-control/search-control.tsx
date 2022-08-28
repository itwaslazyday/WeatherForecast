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
      retainZoomLevel: true,
      maxSuggestions: 8,
      searchLabel: 'Введите город...',
      classNames: {
        container: 'leaflet-bar leaflet-control leaflet-control-geosearch',
        button: 'leaflet-bar-part leaflet-bar-part-single',
        resetButton: 'reset reset--styled',
        msgbox: 'leaflet-bar message',
        form: '',
        input: '',
        resultlist: '',
        item: '',
        notfound: 'leaflet-bar-notfound',
      }
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  const searchEventHandler = (result: any) => {
    console.log(result.location);
  };

  map.on('geosearch/showlocation', searchEventHandler);

  return null;
}

export default SearchControl;
