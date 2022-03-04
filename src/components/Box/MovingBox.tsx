import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/box.module.scss";
import visaLogo from "../../assets/images/visa.svg";

import checked from "../../assets/images/checkbox-checked.svg";
import unchecked from "../../assets/images/checkbox-unchecked.svg";
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

  const boxRef: any = useRef(null);
  useEffect(() => {
    boxRef.current.style.zIndex = zIndex.toString();
    boxRef.current.style.top = zIndex * 100 + "px";
    boxRef.current.style.left = zIndex * 100 + "px";
  }, []);
  function handleMouseDown(e: MouseEventInit) {
    setPressed(true);
    setSelected(!selected);
  }

  function MoveTheBoxTransform(x: number, y: number): void {
    boxRef.current.style.transform = `translate(${x}px,${y}px)`;
  }
  function handleMouseUp() {
    console.log("mouse up");
    setPressed(false);
  }
  function verifyPosition() {
    console.log("verify position");
    console.log(position.current);
    console.log(boxRef.current?.getBoundingClientRect(), "box rect");
    console.log(window.innerWidth, "window width");
    console.log(window.innerHeight, "window height");

    const { left, right, bottom, top, width, height }: DOMRect =
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
  useEffect(() => {
    if (pressed) {
      console.log("moving");

      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed]);

  function handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    console.log("key down");
    verifyPosition();
    switch (e.keyCode) {
      case 37:
        if (verifyPosition() !== 0) {
          position.current.x -= 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        } else {
          console.log("left violation bounds");
        }

        break;
      case 38:
        if (verifyPosition() !== 2) {
          position.current.y -= 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        } else {
          console.log("top violation bounds");
        }

        break;
      case 39:
        if (verifyPosition() !== 1) {
          position.current.x += 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        } else {
          console.log("right violation bounds");
        }
        break;
      case 40:
        if (verifyPosition() !== 3) {
          position.current.y += 10;
          MoveTheBoxTransform(position.current.x, position.current.y);
        } else {
          console.log("bottom violation bounds");
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
      <div className={styles.top}>
        <img
          height={40}
          width={40}
          src={selected ? checked : unchecked}
          alt="check"
        />
      </div>
      <div className={styles.middle}>1860 2000 9000 7865</div>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <div>
            <div>Expiry date</div>
            <div>12/20</div>
          </div>
          <div>
            <div>CVV</div>
            <div>123</div>
          </div>
        </div>
        <div className={styles.right}>
          <img src={visaLogo} height={70} width={80} alt="visa" />
        </div>
      </div>
    </div>
  );
}
