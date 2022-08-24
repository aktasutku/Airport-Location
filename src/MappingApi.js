import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import "./Mapping.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

const MappingApi = ({ resultFirst, resultSecond }) => {
  const [center, setCenter] = useState([41.2768, 28.73]);
  const [zoom, setZoom] = useState(2);

//   let firstlat = resultFirst.lat;
//   let firstlong = resultFirst.long;
//   let secondlat = resultSecond.lat;
//   let secondlong = resultSecond.long;

    console.log(resultFirst.lat, resultFirst.long);
    console.log(resultSecond.lat, resultSecond.long);
    // console.log(resultFirst.lat)

  useEffect(() => {
    setCenter([resultFirst.lat, resultFirst.long]);
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
        {/* <Marker width={30} anchor={[resultFirst.lat, resultFirst.long]} />
        <Marker width={30} anchor={[resultSecond.lat, resultSecond.long]} /> */}
        <Overlay anchor={[resultFirst.lat, resultFirst.long]} offset={[0, 0]}>
          <FlightTakeoffIcon />
        </Overlay> 

        <Overlay anchor={[resultSecond.lat, resultSecond.long]} offset={[0, 0]}>
          <FlightLandIcon />
        </Overlay>

        <div className="mapping__zoomcontrol">
          <ZoomControl />
        </div>
      </Map>
    </div>
  );
};

export default MappingApi;
