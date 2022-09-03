import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'components/map/map.css';
import SearchControl from 'components/search-control/search-control';
import UseMapCenter from 'hooks/useMapCenter/useMapCenter';
import { Coord, WeatherCard } from 'types/card';
import { useEffect, useState } from 'react';
import { currentCustomIcon, defaultCustomIcon, DEFAULT_LAT, DEFAULT_LON, DEFAULT_ZOOM } from 'const/map';

type MapProps = {
  cards: WeatherCard[]
  isActive: number | null
  isFull: number | null
  setActive: (id: number | null) => void
  setFull: (id: number | null) => void
}

export default function Map({ cards, isActive, isFull, setActive, setFull }: MapProps): JSX.Element {
  const [mapCenter, setMapCenter] = useState<Coord>({ lat: DEFAULT_LAT, lon: DEFAULT_LON });


  const setMarkers = (card: WeatherCard) => {
    const { lat, lon } = card.city.coord;
    return (
      <Marker
        position={[lat, lon]}
        icon={card.city.id === isActive ? currentCustomIcon : defaultCustomIcon}
        eventHandlers={{
          mouseover: () => {
            setActive(card.city.id);
          },
          mouseout: () => {
            setActive(null);
          },
          mousedown: () => {
            isFull ? setFull(null) : setFull(card.city.id);
          }
        }}
      >
      </Marker>
    );
  };

  useEffect(() => {
    if (isFull === null) {
      return;
    }

    if (isFull !== null) {
      const fullCard = cards.find((card) => card.city.id === isFull);
      const { lat, lon } = fullCard?.city.coord as Coord;
      setMapCenter({ lat, lon });
    }
  }, [isFull, cards]);

  return (
    <div className="weather-app__map weather-map">
      <MapContainer
        center={[DEFAULT_LAT, DEFAULT_LON]}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <SearchControl setMapCenter={setMapCenter} />
        {cards.length !== 0 ? cards.map((card) => setMarkers(card)) : ''}
        <UseMapCenter center={mapCenter} />
      </MapContainer>
    </div>
  );
}
