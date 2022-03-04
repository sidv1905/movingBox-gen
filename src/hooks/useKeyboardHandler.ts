import React, { useRef, useState, useEffect } from "react";
import { DIRECTIONS } from "../constants/validations.js";
import useThrottle from "./useThrottle.js";

interface Props {
  selected: boolean;
  setSelected: (selected: boolean) => void;
  boxRef: any;
  position: { current: { x: number; y: number } };
  positionInArray: number;
  removeBox: (positionInArray: number) => void;
  checkboxCheck: boolean;
}

export default function useKeyboardHandler({
  boxRef,
  position,
  selected,
  setSelected,
  removeBox,
  positionInArray,
  checkboxCheck,
}: Props) {
  const throttler = useThrottle();
  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);
  // Checks if inside the box
  function verifyPosition() {
    const { left, right, bottom, top, width, height }: any =
      boxRef.current?.getBoundingClientRect();
    if (left < 0) {
      return 0;
    } else if (right > window.innerWidth) {
      return 1;
    } else if (top < 0) {
      return 2;
    } else if (bottom > window.innerHeight) {
      return 3;
    }
    return 4;
  }
  //Moves the bos by changing 3d transform
  function MoveTheBoxTransform(x: number, y: number): void {
    boxRef.current.style.transform = `translate(${x}px,${y}px)`;
  }
  // Handles key down event
  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    function moveBoxByArrowKeysorWASD() {
      verifyPosition();
      switch (e.keyCode) {
        case checkboxCheck ? 37 : 65:
          if (verifyPosition() !== DIRECTIONS.LEFT) {
            position.current.x -= 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }

          break;
        case checkboxCheck ? 38 : 87:
          if (verifyPosition() !== DIRECTIONS.TOP) {
            position.current.y -= 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }

          break;
        case checkboxCheck ? 39 : 68:
          if (verifyPosition() !== DIRECTIONS.RIGHT) {
            position.current.x += 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }
          break;
        case checkboxCheck ? 40 : 83:
          if (verifyPosition() !== DIRECTIONS.BOTTOM) {
            position.current.y += 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }

          break;
        case 46 || 8:
          if (selected) {
            removeBox(positionInArray);
          }

        default:
          break;
      }
    }

    throttler(moveBoxByArrowKeysorWASD, 200);
  }
  return {
    handleKeyDown,
  };
}
// Language: javascript
// Path: src\hooks\useKeyboardMove.js
