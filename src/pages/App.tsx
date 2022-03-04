import { useState } from "react";

import "../styles/App.scss";
import MovingBox from "../components/Box/MovingBox";
import MovingBoxContainer from "../components/Box/MovingBoxContainer";
import Layout from "../layouts/Layout";
function App() {
  return (
    <Layout>
      <MovingBoxContainer />
    </Layout>
  );
}

export default App;
