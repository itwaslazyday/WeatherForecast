import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useAppDispatch } from 'hooks';
import { fetchWeatherAction } from 'store/api-actions';
import L from 'leaflet';
import { Coord } from 'types/card';

type SearchControlProps = {
  setMapCenter: (center: Coord) => void
}

function SearchControl({ setMapCenter }: SearchControlProps) {
  const map = useMap();
  const dispatch = useAppDispatch();

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
      keepResult: false,
      marker: {
        icon: L && L.Icon ? new L.Icon.Default() : undefined,
        draggable: false,
      },
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
    map.zoomControl.setPosition('topright');

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  useEffect(() => {
    const searchEventHandler = (result: any) => {
      console.log('fuck');
      const { x, y } = result.location;
      dispatch(fetchWeatherAction({ lat: y, lon: x }));
<<<<<<< HEAD
    };

    map.on('geosearch/showlocation', searchEventHandler);
  }, [dispatch, map]);
=======
      setMapCenter({ lat: y, lon: x });
    };

    map.on('geosearch/showlocation', searchEventHandler);
  }, [dispatch, map, setMapCenter]);
>>>>>>> 13d3c9c (Настроит двухстороннюю связь между картой и карточками/1)

  return null;
}

export default SearchControl;
