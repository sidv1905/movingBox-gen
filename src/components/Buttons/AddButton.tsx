import React from "react";

interface AddButtonProps {
  addBox: () => void;
}

export default function AddButton({ addBox }: AddButtonProps) {
  return <button onClick={addBox}>AddButton</button>;
}
