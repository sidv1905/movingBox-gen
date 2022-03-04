import React from "react";

interface AddButtonProps {
  addBox: () => void;
}

export default function AddButton({ addBox }: AddButtonProps) {
  return (
    <button className="addButton" onClick={addBox}>
      Add
    </button>
  );
}
