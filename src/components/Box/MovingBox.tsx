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

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    boxRef.current.style.zIndex = zIndex.toString();
  }, []);
  function handleMouseDown(e) {
    setPressed(true);
    setSelected(!selected);
  }

  function handleMouseMove(e: any) {
    console.log(boxRef.current?.parentElement, "parent");

    const parent = boxRef.current?.parentElement;

    const parentRect = parent?.getBoundingClientRect();
    const childRect = boxRef.current?.getBoundingClientRect();
    console.log(childRect, parentRect, "CHILD AN PARENT RECT");
    const leftRestriction = parentRect?.left;
    const rightRestriction = parentRect?.right;
    const topRestriction = parentRect?.top;
    const bottomRestriction = parentRect?.bottom;

    // console.log(rightRestriction, "right rESTRICTION");
    // console.log(leftRestriction, "left rESTRICTION");
    // console.log(topRestriction, "top rESTRICTION");
    // console.log(bottomRestriction, "bottom rESTRICTION");
    // console.log(e.clientX, "client X left se");
    // console.log(e.clientY, "client Y top se");
    // console.log(e.clientX, "client X from right");
    // console.log(e.clientY, "client Y from bottom");
    console.log(e.movementX, "movement X");
    console.log(e.movementY, "movement Y");
    if (childRect?.left < leftRestriction) {
      console.log("left violation");
      if (e.movementX != -1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.right > rightRestriction) {
      console.log("right violation");
      if (e.movementX != 1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.top < topRestriction) {
      console.log("top violation");
      if (e.movementY != -1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.bottom > bottomRestriction) {
      console.log("bottom violation");
      if (e.movementY != 1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (
      childRect?.left >= leftRestriction &&
      childRect?.right <= rightRestriction &&
      childRect?.top >= topRestriction &&
      childRect?.bottom <= bottomRestriction
    ) {
      console.log("NO  violation");
      position.current = {
        x: position.current.x + e.movementX,
        y: position.current.y + e.movementY,
      };

      MoveTheBoxTransform(position.current.x, position.current.y);
    }
  }

  function checkIfinBoundaryAndMove(e) {
    const parent = boxRef.current?.parentElement;

    const parentRect = parent?.getBoundingClientRect();
    const childRect = boxRef.current?.getBoundingClientRect();
    console.log(childRect, parentRect, "CHILD AN PARENT RECT");
    const leftRestriction = parentRect?.left;
    const rightRestriction = parentRect?.right;
    const topRestriction = parentRect?.top;
    const bottomRestriction = parentRect?.bottom;

    // console.log(rightRestriction, "right rESTRICTION");
    // console.log(leftRestriction, "left rESTRICTION");
    // console.log(topRestriction, "top rESTRICTION");
    // console.log(bottomRestriction, "bottom rESTRICTION");
    // console.log(e.clientX, "client X left se");
    // console.log(e.clientY, "client Y top se");
    // console.log(e.clientX, "client X from right");
    // console.log(e.clientY, "client Y from bottom");
    console.log(e.movementX, "movement X");
    console.log(e.movementY, "movement Y");
    if (childRect?.left < leftRestriction) {
      console.log("left violation");
      if (e.movementX != -1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.right > rightRestriction) {
      console.log("right violation");
      if (e.movementX != 1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.top < topRestriction) {
      console.log("top violation");
      if (e.movementY != -1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (childRect?.bottom > bottomRestriction) {
      console.log("bottom violation");
      if (e.movementY != 1) {
        position.current = {
          x: position.current.x + e.movementX,
          y: position.current.y + e.movementY,
        };

        MoveTheBoxTransform(position.current.x, position.current.y);
      }
    } else if (
      childRect?.left >= leftRestriction &&
      childRect?.right <= rightRestriction &&
      childRect?.top >= topRestriction &&
      childRect?.bottom <= bottomRestriction
    ) {
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
        checkIfinBoundaryAndMove({
          movementX: -1,
          movementY: 0,
        });
        break;
      case 38:
        position.current.y -= 10;
        checkIfinBoundaryAndMove({
          movementX: 0,
          movementY: -1,
        });
        break;
      case 39:
        position.current.x += 10;
        checkIfinBoundaryAndMove({
          movementX: 1,
          movementY: 0,
        });
        break;
      case 40:
        position.current.y += 10;
        checkIfinBoundaryAndMove({
          movementX: 0,
          movementY: 1,
        });
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
