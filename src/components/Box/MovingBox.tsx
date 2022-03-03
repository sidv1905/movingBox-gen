import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/box.module.scss";

interface BoxProps {
  zIndex: number;
  positionInArray: number;
  removeBox: (boxIndexToremove: number) => void;
}

export default function MovingBox({
  zIndex,
  positionInArray,
  removeBox,
}: BoxProps) {
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const parent = useRef();

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    boxRef.current.style.zIndex = zIndex.toString();
  }, []);
  function handleMouseDown() {
    console.log("mouse down");
    setPressed(true);
    setSelected(!selected);
  }

  function handleMouseMove(e: any) {
    console.log(boxRef.current?.parentElement, "parent");

    const parent = boxRef.current?.parentElement;

    const parentRect = parent?.getBoundingClientRect();
    const childRect = boxRef.current?.getBoundingClientRect();

    const leftRestriction = parentRect?.left + (e.clientX - childRect?.left);
    const rightRestriction = parentRect?.right + (e.clientX - childRect?.right);
    const topRestriction = parentRect?.top + (e.clientY - childRect?.top);
    const bottomRestriction =
      parentRect?.bottom + (e.clientY - childRect?.bottom);

    // console.log(rightRestriction, "right rESTRICTION");
    // console.log(leftRestriction, "left rESTRICTION");
    // console.log(topRestriction, "top rESTRICTION");
    // console.log(bottomRestriction, "bottom rESTRICTION");
    // console.log(e.clientX, "client X left se");
    // console.log(e.clientY, "client Y top se");
    // console.log(e.clientX, "client X from right");
    // console.log(e.clientY, "client Y from bottom");
    if (e.clientX < leftRestriction) {
      console.log("left violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    } else if (e.clientX > rightRestriction) {
      console.log("right violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    } else if (e.clientY < topRestriction) {
      console.log("top violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    } else if (e.clientY > bottomRestriction) {
      console.log("bottom violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    } else {
      console.log("NO  violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    }
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
    e.preventDefault();
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
      case 46:
        if (selected) {
          removeBox(positionInArray);
        }

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
