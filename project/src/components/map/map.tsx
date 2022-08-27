import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'components/map/map.css';
import SearchControl from 'components/search-control/search-control';

export default function Map(): JSX.Element {

  return (
    <div className="weather-app__map weather-map">
      <MapContainer center={[55.751244, 37.618423]} zoom={10} scrollWheelZoom>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <SearchControl />
      </MapContainer>
    </div>
  );
}
