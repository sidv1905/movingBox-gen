import React, { useRef, useState, useEffect } from "react";
interface Props {
  selected: boolean;
  setSelected: (selected: boolean) => void;
}
export default function useMouseHandler({ selected, setSelected }: Props) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (pressed) {
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed]);
  // Handles mouse down event
  function handleMouseDown(e: React.MouseEvent) {
    setPressed(true);
    setSelected(!selected);
  }
  // Handles mouse up event
  function handleMouseUp() {
    setPressed(false);
  }

  return {
    handleMouseDown,
  };
}
// Language: javascript
// Path: src\hooks\useKeyboardMove.js
