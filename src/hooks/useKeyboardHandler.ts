import React, { useRef, useState, useEffect } from "react";
import { DIRECTIONS } from "../constants/validations.js";

interface Props {
  selected: boolean;
  setSelected: (selected: boolean) => void;
  boxRef: any;
  position: { current: { x: number; y: number } };
  positionInArray: number;
  removeBox: (positionInArray: number) => void;
}

export default function useKeyboardHandler({
  boxRef,
  position,
  selected,
  setSelected,
  removeBox,
  positionInArray,
}: Props) {
  function verifyPosition() {
    console.log("verify position");

    console.log(boxRef.current?.getBoundingClientRect(), "box rect");
    console.log(window.innerWidth, "window width");
    console.log(window.innerHeight, "window height");

    const { left, right, bottom, top, width, height }: any =
      boxRef.current?.getBoundingClientRect();
    if (left < 0) {
      console.log("left violation bounds");
      return 0;
    } else if (right > window.innerWidth) {
      console.log("right violation bounds");
      return 1;
    } else if (top < 0) {
      console.log("top violation bounds");
      return 2;
    } else if (bottom > window.innerHeight) {
      console.log("bottom violation bounds");
      return 3;
    }
    return 4;
  }
  function MoveTheBoxTransform(x: number, y: number): void {
    boxRef.current.style.transform = `translate(${x}px,${y}px)`;
  }

  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    console.log("key down");
    verifyPosition();
    switch (e.keyCode) {
      case 37:
        if (verifyPosition() !== DIRECTIONS.LEFT) {
          position.current.x -= 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        }

        break;
      case 38:
        if (verifyPosition() !== DIRECTIONS.TOP) {
          position.current.y -= 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        }

        break;
      case 39:
        if (verifyPosition() !== DIRECTIONS.RIGHT) {
          position.current.x += 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        }
        break;
      case 40:
        if (verifyPosition() !== DIRECTIONS.BOTTOM) {
          position.current.y += 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        }

        break;
      case 46:
        if (selected) {
          removeBox(positionInArray);
        }

      default:
        break;
    }
  }
  return {
    handleKeyDown,
  };
}
// Language: javascript
// Path: src\hooks\useKeyboardMove.js
