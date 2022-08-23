import React, { forwardRef, useEffect, useState } from "react";

import { Button, TextField, Snackbar } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MuiAlert from "@mui/material/Alert";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import "./Header.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Header = (props) => {
  const [first, setFirst] = useState("");
  const [resultFirst, setResultFirst] = useState("");
  const [distanceKM, setDistanceKM] = useState(0);
  const [distanceNMI, setDistanceNMI] = useState(0);

  const [second, setSecond] = useState("");
  const [resultSecond, setResultSecond] = useState("");

  // Handle Info Alert
  const [openInfo, setOpenInfo] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpenInfo(true);
    props.onResultFirst(resultFirst)
    props.onResultSecond(resultSecond)
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenInfo(false);
  };

  // Handle API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "52d183cd7emsh9d8b20ccd222594p17caccjsn91939cf59cfa",
      "X-RapidAPI-Host": "airport-info.p.rapidapi.com",
    },
  };

  const fetchFirstAirport = () => {
    fetch(`https://airport-info.p.rapidapi.com/airport?iata=${first}`, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setResultFirst(response);
      })
      .catch((err) => console.error(err));
  };

  const fetchSecondAirport = () => {
    fetch(`https://airport-info.p.rapidapi.com/airport?iata=${second}`, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setResultSecond(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFirstAirport();
  }, [first]);

  useEffect(() => {
    fetchSecondAirport();
  }, [second]);

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
        resultFirst.latitude,
        resultFirst.longitude,
        resultSecond.latitude,
        resultSecond.longitude
      )
    );
    setDistanceNMI(Math.trunc(distanceKM * 0.53996));
  });

  return (
    <div className="home">
      <div className="home__first">
        <TextField
          id="outlined-basic"
          label="From"
          variant="outlined"
          value={first}
          onChange={(e) => setFirst(e.target.value.toLocaleLowerCase())}
        />
        {first.length >= 3 && <p>{resultFirst.name}</p>}
      </div>
      <ArrowRightAltIcon />
      <div className="home__second">
        <TextField
          id="outlined-basic"
          label="To"
          variant="outlined"
          value={second}
          onChange={(e) => setSecond(e.target.value.toLocaleLowerCase())}
        />
        {second.length >= 3 && <p>{resultSecond.name}</p>}
      </div>
      <Button variant="contained" onClick={handleClick}>
        DISTANCE
      </Button>
      {/* <div className="header__distance display"><FlightTakeoffIcon/>&nbsp; Distance &nbsp;<FlightLandIcon/>&nbsp; <ArrowRightAltIcon/>  &nbsp;<strong>{distance}</strong></div> */}
      {distanceKM >= 0 && (
        <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            <FlightTakeoffIcon /> &nbsp;&nbsp;Distance : &nbsp; {distanceKM}{" "}
            &nbsp;KM&nbsp; or &nbsp;{distanceNMI}&nbsp; NMi &nbsp;&nbsp;<FlightLandIcon />
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Header;
