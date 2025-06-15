import { createContext, useState } from "react";
export const LocationContext = createContext({
  lat: 0,
  lng: 0,
  setLat: () => {},
  setLng: () => {},
});
function LocationContextProvider({ children }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const value = {
    lat: lat,
    lng: lng,
    setLat: setLat,
    setLng: setLng,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
export default LocationContextProvider;
