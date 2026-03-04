import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { CONFIGURATIONS } from '../../config/envConfig';
import Input from './Input';
import { twMerge } from 'tailwind-merge';
import showToast from "../../utils/toastNotifications";
import { languageTranslatorUtil } from '../../utils/languageTranslatorUtil';
import { useLanguage } from '../../context/language/language';

const AutoComplete = forwardRef(({
  key,
  index = 0,
  label = "",
  placeholder = "Business Address",
  value={ location: { address: "" } },
  // onChange = () => {},
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  error,
  prefixIcon,
  wrapperStyling,
  dropdownListWrapperStylings,
  inputStyle = "",
  labelStyle = "",
  mapContainerStyle,
  isRequired = false,
  isDisplayMap = true,
  ...rest
}, ref) => {

  const debounceTimer = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  

  const [typedValue, setTypedValue] = useState(value?.location?.address ?? "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({lng: value?.location?.location?.coordinates?.[0] || 0, lat: value?.location?.location?.coordinates?.[1] || 0});
  const [placeName, setPlaceName] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);

  const [isFetchingResult, setIsFetchingResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const map = useMap();
  const {language} = useLanguage();
  
  // NOTE: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Expose methods to parent component via ref <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  
  useImperativeHandle(ref, () => ({
      reset: () => {
          setTypedValue("");
          setSuggestions([]);
          setSelectedPosition(null);
          setPlaceName('');
          setOpenDropDown(false);
          setLoading(false);
      },
  }));

  // STATE: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SIDE EFFECTS DEFINATIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // STATE: trigger when the value get updated ( value from the outside to the component )
  useEffect(() => {
        if (value?.location?.address !== typedValue) {  
          setTypedValue(value?.location?.address);
          setSelectedPosition({
              lng: value?.location?.location?.coordinates?.[0] ?? 0,
              lat: value?.location?.location?.coordinates?.[1] ?? 0,
            });
         setIsFetchingResult(false);   // 👈 still don’t fetch
         setLoading(false);
       }
  }, [value]);

  // STATE: trigger when the value get updated ( value from the outside to the component )
  useEffect(() => {
    // NOTE: Handle initial value setting for edit mode
    if (value?.location?.address && value?.location?.address !== typedValue) {
      setTypedValue(value?.location?.address);
      setPlaceName(value?.location?.address);
    }

    // NOTE: Handle initial coordinates setting for edit mode
    if (value?.location?.location?.coordinates) {
      const coordinates = value?.location?.location?.coordinates;
      if (Array.isArray(coordinates) && coordinates.length >= 2) {
        const [lng, lat] = coordinates;
        if (lng !== 0 || lat !== 0) {
          const position = { lng, lat };
          setSelectedPosition(position);

          // NOTE: Pan map to location if map is available
          if (map) {
            setTimeout(() => {
              map.panTo(position);
              map.setZoom(15);
            }, 200);
          }
        }
      }
    }
  }, [value?.location?.address, value?.location?.location?.coordinates, map]);


  // STATE: triger on key strokes
  useEffect(() => {
    if (!typedValue) {
      setSuggestions([]);
      setOpenDropDown(false);
      setLoading(false);
      return;
    }

    if (!isFetchingResult || typedValue?.length < 3) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // if(isFetchingResult){
    //   setLoading(true);
    // }

    debounceTimer.current = setTimeout(() => {
      if(isFetchingResult){
        if(typedValue?.length >= 3){
          setLoading(true);
          fetchPredictions(typedValue);
        }
      }
    }, 500); // NOTE: 5500ms debounce delay

    return () => clearTimeout(debounceTimer.current);
  }, [typedValue]);

  // STATE: auto close dropdown when outside clicked
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FUNCTION: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTION DEFINATIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // FUNCTION: fetching predicted locations according to user typed input
  const fetchPredictions = (input) => {
    if (!input || !window.google?.maps?.places) return;

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input,
        // componentRestrictions: { country: 'lk' },
        types: ['geocode', 'establishment'],
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
          if(predictions?.length > 0){
            setOpenDropDown(true);
          }
          setLoading(false);
        } else {
          setSuggestions([]);
          setOpenDropDown(false);
          setLoading(false);
        }
        setLoading(false);
      }
    );
  };

  // FUNCTION: triggered when the user clicked on a predicted location on the dropdown
  const handleSelectSuggestion = (placeId, description) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const location = results[0].geometry.location;
        const latLng = {
          lat: location.lat(),
          lng: location.lng(),
        };
        const locationPayload = {
          address: description,
          placeId: placeId,
          location: {
            type: "Point",
            coordinates: [latLng?.lng, latLng?.lat]
          },
        }

        // onSelect(locaionPayload); 
        onSelect?.("locations", { key: index, value: locationPayload })
        setSelectedPosition(latLng);
        setPlaceName(description);
        // setSuggestions([]);
        setOpenDropDown(false);
        setLoading(loading);
        setTypedValue(description);
        setIsFetchingResult(false);

        if (map) {
          map.panTo(latLng);
          map.setZoom(11);
        }
      }
    });
  };

  // FUNCTION: handles marker pinpoint movement and fetch new locations
  const handleMarkerDragEnd = (e) => {
    setLoading(true);
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    const newPosition = { lat: newLat, lng: newLng };
    setSelectedPosition(newPosition);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newPosition }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        const updatedAddress = results[0].formatted_address;

        const updatedLocationPayload = {
          address: updatedAddress,
          placeId: results[0].place_id,
          location: {
            type: "Point",
            coordinates: [newLng, newLat],
          },
        };

        setTypedValue(updatedAddress);
        setPlaceName(updatedAddress);
        onSelect?.("locations", { key: index, value: updatedLocationPayload });
        setLoading(false)

        if (map) {
          map.panTo(newPosition);
        }
      } else {
        showToast(error, languageTranslatorUtil(language,"toastMessages","staticErrors","FailedLocationFetch"));
        setLoading(false);
      }
    });
  };

  return (
    <div key={key} className={twMerge("w-full flex flex-col justify-center items-center", isDisplayMap ? "h-[50vh]" : "")}>
      <div className={twMerge("relative w-full", wrapperStyling)}>
        <Input
          key={key}
          ref={inputRef}
          id="searchPlace"
          name="searchPlace"
          type="text"
          label={label}
          placeholder={placeholder}
          value={typedValue}
          onChange={(e) => {
              setTypedValue(e.target.value)
              if(e.target.value?.length >= 3){
                setIsFetchingResult(true);
              }
              //NOTE: resetting
              if(!e.target?.value?.length){
                setTypedValue("");
                setSuggestions([]);
                setSelectedPosition(null);
                setPlaceName('');
                setOpenDropDown(false);
                setLoading(false);
                onSelect?.("locations", { key: index, value: null })
              }
            // onChange?.(e); // ← safely call if defined
          }}
          onFocus={() => {
            setOpenDropDown(true);
            setIsFetchingResult(true);
            onFocus?.(); // ← safely call if defined
          }}
          onReset={() => {            
            setTypedValue("");
            setSuggestions([]);
            setSelectedPosition(null);
            setPlaceName('');
            setOpenDropDown(false);
            setLoading(false);
            onSelect?.("locations", { key: index, value: null });
          }}
          onBlur={onBlur}
          error={error}
          prefixIcon={prefixIcon}
          isForm={true}
          isRequired={isRequired}
          inlineLoading={loading}
          loaderColor="var(--primary-color)"
          labelStyle={twMerge(
            "font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black",
            labelStyle
          )}
          inputStyle={inputStyle}
          outerContainerStyle="rounded-[0.6px]"
          className="border-[#CBD5E0] bg-white"
          {...rest} // ← here: safely inject additional props
        />

        {suggestions.length > 0 && openDropDown && (
          <div ref={dropdownRef} className={dropdownListWrapperStylings}>
            <ul className="absolute z-[51] w-full overflow-y-auto bg-white border rounded shadow max-h-48">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    handleSelectSuggestion(suggestion.place_id, suggestion.description)
                  }
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isDisplayMap && (
          <div className="flex flex-col w-full h-full mt-4 overflow-hidden rounded-xl">
            <Map
              defaultZoom={9}
              defaultCenter={{ lat: 6.9271, lng: 79.8612 }} // Colombo
              style={{ height: '100%', width: '100%' }}
              mapId={CONFIGURATIONS.GOOGLE_MAPS_MAP_ID}
              key={key}
            >
              {selectedPosition && (
                <AdvancedMarker 
                  key={key} 
                  position={selectedPosition} 
                  title={placeName}   
                  draggable={true}
                  onDragEnd={(e) => handleMarkerDragEnd(e)}
                />
              )}
            </Map>
          </div>
        )
      }
    </div>
  );
});

export default AutoComplete;