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

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    boxRef.current.style.zIndex = zIndex.toString();
  }, []);
  function handleMouseDown(e) {
    setPressed(true);
    setSelected(!selected);
  }

  function handleMouseMove(e: any) {
    position.current = {
      x: position.current.x + e.movementX,
      y: position.current.y + e.movementY,
    };

    MoveTheBoxTransform(position.current.x, position.current.y);
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
