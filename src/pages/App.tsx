import { useState } from "react";

import "../styles/App.css";
import MovingBox from "../components/Box/MovingBox";
import MovingBoxContainer from "../components/Box/MovingBoxContainer";
function App() {
  return (
    <div className="App">
      <h1>Moving Box App</h1>
      <MovingBoxContainer />
    </div>
  );
}

export default App;
