import React, { useContext } from "react";
import { ToggleContext } from "../../contexts/ToggleContext";
import "../../styles/checkbox.css";
export default function CheckBox() {
  const { checkboxCheck, setCheckboxCheck } = useContext(ToggleContext);
  function handleCheckbox() {
    console.log("checkbox clicked");
    setCheckboxCheck(!checkboxCheck);
  }
  return (
    <div className="checkbox-container">
      <p>WASD</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={checkboxCheck}
          onChange={handleCheckbox}
        />
        <span className="slider round"></span>
      </label>
      <p>ARROW KEYS</p>
    </div>
  );
}
