import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Button, TextField, Snackbar, Autocomplete } from "@mui/material";
import "./HeaderApi.css";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MuiAlert from "@mui/material/Alert";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import { multi } from "air-port-codes-node";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HeaderApi = (props) => {
  const [first, setFirst] = useState("");
  const [resultFirst, setResultFirst] = useState([]);
  const [second, setSecond] = useState("");
  const [resultSecond, setResultSecond] = useState([]);

  //   const [firstlatLong, setFirstLatlong] = useState({});
  const [firstlatLong, setFirstLatlong] = useState({
    lat: "",
    long: "",
  });
  const [secondlatLong, setSecondLatlong] = useState({
    lat: "",
    long: "",
  });
  const [distanceKM, setDistanceKM] = useState(0);
  const [distanceNMI, setDistanceNMI] = useState(0);

  // Handle Info Alert
  const [openInfo, setOpenInfo] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpenInfo(true);
    props.onFirst(firstlatLong);
    props.onSecond(secondlatLong);

    setResultSecond([]);
    setResultFirst([])
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenInfo(false);
  };

  //   HANDLE API
  const apca = multi({
    key: "f7d89c5ee5",
    secret: "3b9853c3fa08a3b ", // Your API Secret Key: use this if you are not connecting from a web server
    limit: 5,
  });

  //   let term = "new yo";

  apca.onSuccess = (data) => {
    console.log("data", data);
    setResultFirst(data);

    setResultSecond(data);
  };

  useEffect(() => {
    apca.request(first);
  }, [first]);

  useEffect(() => {
    apca.request(second);
  }, [second]);

  // FAIL no airports found
  apca.onError = (data) => {
    console.log("onError", data.message);
  };

  // Calculate Distance

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

    return Math.trunc(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
  }

  useEffect(() => {
    setDistanceKM(
      getDistanceFromLatLonInKm(
        firstlatLong.lat,
        firstlatLong.long,
        secondlatLong.lat,
        secondlatLong.long
      )
    );
    setDistanceNMI(Math.trunc(distanceKM * 0.53996));
  });

  //   const handleLiClickFirst = (airport) => {
  //     setFirst(airport.target.innerHTML);
  //     console.log(airport);
  //   };
//   const handleLiClickSecond = (airport) => {
//     setSecond(airport.target.innerHTML);
//     console.log(airport.target.lat);
//   };
  return (
    <div className="header">
      {/* FIRST AIRPORT */}

      <div className="header__first">
        <TextField
          id="outlined-basic"
          label="From"
          variant="outlined"
          value={first}
          onChange={(e) => setFirst(e.target.value.toLocaleLowerCase())}
        />
        <ul>
          {resultFirst.airports?.map((airport, i) => {
            return (
              <li
                key={airport.iata}
                airport={airport}
                lat={airport.latitude}
                name={airport.name}
                long={airport.longitude}
                onClick={() => {
                  setFirst(airport.name);
                  //    setFirstLatlong([airport.latitude,airport.longitude]);
                  setFirstLatlong({
                    lat: airport.latitude,
                    long: airport.longitude,
                  });
                }}
              >
                {airport.name}
              </li>
            );
          })}
        </ul>
      </div>
      <ArrowRightAltIcon />

      {/* SECOND AIRPORT */}
      <div className="header__second">
        <TextField
          id="outlined-basic"
          label="To"
          variant="outlined"
          value={second}
          onChange={(e) => setSecond(e.target.value.toLocaleLowerCase())}
        />
        <ul>
          {resultSecond.airports?.map((airport, i) => {
            return (
              <li
                key={airport.iata}
                onClick={() => {
                  setSecond(airport.name);
                  //    setFirstLatlong([airport.latitude,airport.longitude]);
                  setSecondLatlong({
                    lat: airport.latitude,
                    long: airport.longitude,
                  });
                }}
              >
                {airport.name}
              </li>
            );
          })}
        </ul>
      </div>
      <Button variant="contained" onClick={handleClick}>
        DISTANCE
      </Button>
      {distanceKM >= 0 && (
        <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            <FlightTakeoffIcon /> &nbsp;&nbsp;Distance : &nbsp; {distanceKM}{" "}
            &nbsp;KM&nbsp; or &nbsp;{distanceNMI}&nbsp; NMi &nbsp;&nbsp;
            <FlightLandIcon />
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default HeaderApi;
