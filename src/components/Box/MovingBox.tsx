import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../../styles/box.module.scss";
import visaLogo from "../../assets/images/visa.svg";
import useKeyboardHandler from "../../hooks/useKeyboardHandler";
import checked from "../../assets/images/checkbox-checked.svg";
import unchecked from "../../assets/images/checkbox-unchecked.svg";
import useMouseHandler from "../../hooks/useMouseHandler";
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
  const [selected, setSelected] = useState(false);

  const boxRef: any = useRef(null);
  const position = useRef({ x: 0, y: 0 });

  const { handleKeyDown } = useKeyboardHandler({
    boxRef,
    position,
    selected,
    setSelected,
    removeBox,
    positionInArray,
  });

  const { handleMouseDown } = useMouseHandler({
    selected,
    setSelected,
  });

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setSelected(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    boxRef.current.style.zIndex = zIndex.toString();
    boxRef.current.style.top = zIndex * 100 + "px";
    boxRef.current.style.left = zIndex * 100 + "px";
  }, []);

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
