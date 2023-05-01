import { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import CenteredSpinner from "../spinner";

const MapComponent = ({ court, latitude, longitude }) => {
  const [directions, setDirections] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBaQvPISImw9GBbzb_bq3vzvBvCsmYywO4",
  });

  const handleMapLoad = (map) => {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = new window.google.maps.LatLng(
      parseFloat(court.court_latitude),
      parseFloat(court.court_longitude)
    );
    const destination = new window.google.maps.LatLng(latitude, longitude);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", result);
        }
      }
    );
  };

  useEffect(() => {
    if (isLoaded) {
      handleMapLoad();
    }
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "80vh" }}
      zoom={14}
      center={{ lat: 45.657974, lng: 25.601198 }}
      onLoad={handleMapLoad}
      options={{
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ],
      }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <CenteredSpinner />
  );
};

export default MapComponent;
