import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/box.module.scss";
export default function MovingBox() {
  const [pressed, setPressed] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  function handleMouseDown() {
    console.log("mouse down");
    setPressed(true);
  }

  function handleMouseMove(e: any) {
    console.log("Mouse move");
  }
  function handleMouseUp() {
    console.log("mouse up");
    setPressed(false);
  }
  useEffect(() => {
    if (pressed) {
      console.log("moving");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed]);
  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      className={styles.movingBox}
    >
      Moving box
    </div>
  );
}
