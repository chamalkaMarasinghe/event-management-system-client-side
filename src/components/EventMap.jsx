import React, { useState } from 'react'
import { Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { locationsCordinates } from '../../../Data/Data';
import { CONFIGURATIONS } from '../../../config/envConfig';

const EventMap = () => {

  return (
      <div className="App max-lg:h-80 lg:h-[100%] lg:min-h-80 flex justify-center items-center">
        <div className="border-2 w-full h-full md:h-full flex flex-col rounded-xl overflow-hidden border-gray-200">
          <Map
            defaultZoom={9}
            defaultCenter={{ lat: 6.9271, lng: 79.8612 }} // Colombo
            style={{ height: '100%', width: '100%' }}
            mapId={CONFIGURATIONS.GOOGLE_MAPS_MAP_ID}
            onCameraChanged={(ev) => {
              console.log('Camera changed:');
              console.log('New Center:', ev.detail.center);
              console.log('New Zoom:', ev.detail.zoom);
            }}
          >
            <PoiMarkers pois={locationsCordinates}/>
          </Map>
        </div>
      </div>
  )
}

export default EventMap

const PoiMarkers = ({ pois = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  console.log('Locations', pois);

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.cordinates}
          onClick={() => setSelectedMarker(poi)}
        >
          <Pin background="#FE642E" glyphColor="#F5BCA9" borderColor="#F7F2E0" />
        </AdvancedMarker>
      ))}
      {selectedMarker && (
        <InfoWindow                                 // Descriptive text box 
          position={selectedMarker.cordinates}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            {selectedMarker.key}
          </div>
        </InfoWindow>
      )}
    </>
  );
};
