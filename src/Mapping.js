import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import "./Mapping.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const Mapping = ({ resultFirst, resultSecond }) => {
  const [center, setCenter] = useState([41.2768, 28.73]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    setCenter([resultFirst.latitude, resultFirst.longitude]);
  }, [resultFirst]);
  return (
    <div className="mapping">
      <Map
        animate={true}
        provider={osm}
        height={800}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        {/* {resultFirst && (
          <Marker
            width={50}
            anchor={[resultFirst.latitude, resultFirst.longitude]}
          />
        )}
        {resultSecond && (
          <Marker
            width={50}
            anchor={[resultSecond.latitude, resultSecond.longitude]}
          />
        )} */}
        <Overlay
          anchor={[resultFirst.latitude, resultFirst.longitude]}
          offset={[0, 0]}
        >
          <FlightTakeoffIcon />
        </Overlay>

        <Overlay
          anchor={[resultSecond.latitude, resultSecond.longitude]}
          offset={[0, 0]}
        >
          <FlightLandIcon />
        </Overlay>

        <div className="mapping__zoomcontrol">
          <ZoomControl />
        </div>
      </Map>
    </div>
  );
};

export default Mapping;
