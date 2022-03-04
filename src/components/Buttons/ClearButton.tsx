import React from "react";
interface ClearButtonProps {
  reset: () => void;
}
export default function ClearButton({ reset }: ClearButtonProps) {
  return (
    <button className="clearButton" onClick={reset}>
      Reset
    </button>
  );
}
