import { useState } from "react";
import "./App.css";

import Header from "./Header";
import HeaderApi from "./HeaderApi";
import Mapping from "./Mapping";
import MappingApi from "./MappingApi";

function App() {
  // const [resultFirst, setResultFirst] = useState("");
  // const [resultSecond, setResultSecond] = useState("");

  const [latlongFirst, setlatlongFirst] = useState({});
  const [latlongSecond, setlatlongSecond] = useState({});

  const First = (location) => {
    setlatlongFirst(location);
  };

  const Second = (location) => {
    setlatlongSecond(location);
  };

  return (
    <div className="App">
      {/* <Header onResultFirst={First} onResultSecond={Second} />
      <Mapping resultFirst={latlongFirst} resultSecond={latlongSecond} /> */}
      <HeaderApi onFirst={First} onSecond={Second} />
      <MappingApi resultFirst={latlongFirst} resultSecond={latlongSecond} />
    </div>
  );
}

export default App;
