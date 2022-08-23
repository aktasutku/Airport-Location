import { useState } from "react";
import "./App.css";

import Header from "./Header";
import Mapping from "./Mapping";


function App() {
  const [resultFirst, setResultFirst] = useState("");
  const [resultSecond, setResultSecond] = useState("");
  
  const First=(location)=>{
    setResultFirst(location)
  }
  const Second=(location)=>{
    setResultSecond(location)
  }


  return (
    <div className="App">
      <Header onResultFirst={First} onResultSecond={Second} />
      <Mapping resultFirst={resultFirst} resultSecond={resultSecond}/>
    </div>
  );
}

export default App;
