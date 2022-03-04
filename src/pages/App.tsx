import { useState } from "react";

import "../styles/App.scss";
import MovingBox from "../components/Box/MovingBox";
import MovingBoxContainer from "../components/Box/MovingBoxContainer";
function App() {
  return (
    <div className="App">
      <MovingBoxContainer />
    </div>
  );
}

export default App;
