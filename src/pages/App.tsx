import { useState } from "react";

import "../styles/App.css";
import MovingBox from "../components/MovingBox";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
    <h1>Moving Box App</h1>
      <MovingBox/>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}

export default App;
