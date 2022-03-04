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
}

export default function useKeyboardHandler({
  boxRef,
  position,
  selected,
  setSelected,
  removeBox,
  positionInArray,
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
  function MoveTheBoxTransform(x: number, y: number): void {
    boxRef.current.style.transform = `translate(${x}px,${y}px)`;
  }

  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    function moveBox() {
      verifyPosition();
      switch (e.keyCode) {
        case 37:
          if (verifyPosition() !== DIRECTIONS.LEFT) {
            position.current.x -= 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }

          break;
        case 38:
          if (verifyPosition() !== DIRECTIONS.TOP) {
            position.current.y -= 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }

          break;
        case 39:
          if (verifyPosition() !== DIRECTIONS.RIGHT) {
            position.current.x += 30;
            MoveTheBoxTransform(position.current.x, position.current.y);
          }
          break;
        case 40:
          if (verifyPosition() !== DIRECTIONS.BOTTOM) {
            position.current.y += 30;
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

    throttler(moveBox, 200);
  }
  return {
    handleKeyDown,
  };
}
// Language: javascript
// Path: src\hooks\useKeyboardMove.js
