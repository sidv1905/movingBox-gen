import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/box.module.scss";
export default function MovingBox() {
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const position = useRef({ x: 0, y: 0 });

  const boxRef = useRef<HTMLDivElement>(null);

  function handleMouseDown() {
    console.log("mouse down");
    setPressed(true);
    setSelected(!selected);
  }

  function handleMouseMove(e: any) {
    position.current = {
      x: position.current.x + e.movementX,
      y: position.current.y + e.movementY,
    };

    boxRef.current.style.transform = `translate(${position.current.x}px,${position.current.y}px)`;
    console.log("Mouse move");
  }

  function MoveTheBoxTransform(x, y) {
    boxRef.current.style.transform = `translate(${x}px,${y}px)`;
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

  function handleKeyDown(e) {
    console.log("key down");
    switch (e.keyCode) {
      case 37:
        position.current.x -= 10;
        MoveTheBoxTransform(position.current.x, position.current.y);
        break;
      case 38:
        position.current.y -= 10;
        MoveTheBoxTransform(position.current.x, position.current.y);
        break;
      case 39:
        position.current.x += 10;
        MoveTheBoxTransform(position.current.x, position.current.y);
        break;
      case 40:
        position.current.y += 10;
        MoveTheBoxTransform(position.current.x, position.current.y);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);
  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      className={
        selected
          ? styles.selectedBox + " " + styles.movingBox
          : styles.movingBox
      }
    >
      Moving box
    </div>
  );
}
