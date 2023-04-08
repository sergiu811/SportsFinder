import Classes from "./map.module.css";
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const position = (latitude, longitude) => {
  return { lat: latitude, lng: longitude };
};

const MapComponent = ({ court }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBaQvPISImw9GBbzb_bq3vzvBvCsmYywO4",
  });
  const [longitude, setlongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    setLatitude(parseFloat(court.court_latitude));
    setlongitude(parseFloat(court.court_longitude));
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "80vh" }}
      zoom={13}
      options={{
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
      center={{ lat: 45.657974, lng: 25.601198 }}
    >
      <MarkerF position={position(latitude, longitude)} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
