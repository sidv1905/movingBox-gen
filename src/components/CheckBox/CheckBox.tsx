import React from "react";
import "../../styles/checkbox.css";
export default function CheckBox() {
  const [checkedbox, setCheckedbox] = React.useState(false);
  function handleCheckbox() {
    console.log("checkbox clicked");
    setCheckedbox(!checkedbox);
  }
  return (
    <div className="checkbox-container">
      <p>WASD</p>
      <label className="switch">
        <input type="checkbox" checked={checkedbox} onChange={handleCheckbox} />
        <span className="slider round"></span>
      </label>
      <p>ARROW KEYS</p>
    </div>
  );
}
