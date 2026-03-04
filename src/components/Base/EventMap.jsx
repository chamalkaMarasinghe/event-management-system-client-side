import React, { useState } from 'react'
import { Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { locationsCordinates } from '../../Data/Data';
import { CONFIGURATIONS } from '../../config/envConfig';

const PoiMarkers = ({ pois = [] }) => {

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.coordinates}
          onClick={() => setSelectedMarker(poi)}
        >
          <Pin background="#FE642E" glyphColor="#F5BCA9" borderColor="#F7F2E0" />
        </AdvancedMarker>
      ))}
      {selectedMarker && (
        <InfoWindow                                 // Descriptive text box 
          position={selectedMarker.coordinates}
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

const EventMap = ({ eventLocations = [] }) => {  
  
  const markers = eventLocations?.map((loc, index) => ({
      key: `location-${index}-${loc?.address}`,
      coordinates: {
          lat: loc?.location?.coordinates[1], // Latitude
          lng: loc?.location?.coordinates[0], // Longitude
      }
  }));
  
  return (
      <div className="App max-lg:h-80 lg:h-[100%] lg:min-h-80 flex justify-center items-center">
        <div className="border-2 w-full h-full md:h-full flex flex-col rounded-xl overflow-hidden border-gray-200">
          <Map
            defaultZoom={9}
            defaultCenter={markers[0]?.coordinates || { lat: 6.9271, lng: 79.8612 }} // Colombo
            style={{ height: '100%', width: '100%' }}
            mapId={CONFIGURATIONS.GOOGLE_MAPS_MAP_ID}
            // onCameraChanged={(ev) => {
            //   console.log('Camera changed:');
            //   console.log('New Center:', ev.detail.center);
            //   console.log('New Zoom:', ev.detail.zoom);
            // }}
          >
            <PoiMarkers pois={markers}/>
          </Map>
        </div>
      </div>
  )
}

export default EventMap