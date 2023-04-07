import Classes from "./map.module.css";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBaQvPISImw9GBbzb_bq3vzvBvCsmYywO4",
  });
  console.log(isLoaded);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100vh" }}
      zoom={13}
      center={{ lat: 45.657974, lng: 25.601198 }}
    >
      <MarkerF label={"Centru"} position={{ lat: 45.657974, lng: 25.601198 }} />

      <MarkerF position={{ lat: 45.64036760634816, lng: 25.594853247930562 }} />

      <MarkerF
        label={"Teren"}
        onClick={() => console.log("clicked")}
        position={{ lat: 45.64677106759955, lng: 25.585482650187966 }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapComponent;
