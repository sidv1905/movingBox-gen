import React, { useState } from "react";
import AddButton from "../Buttons/AddButton";
import ClearButton from "../Buttons/ClearButton";
import MovingBox from "./MovingBox";

export default function MovingBoxContainer() {
  const [movingBoxList, setMovingBoxList] = useState([
    {
      zIndex: 1,
      key: 1,
    },
  ]);

  function addBox() {
    setMovingBoxList([
      ...movingBoxList,
      {
        zIndex: movingBoxList.length + 1,
        key: movingBoxList.length + 1,
      },
    ]);
  }
  function removeBox(boxIndexToremove: number): void {
    const newBoxList = [...movingBoxList];
    newBoxList.splice(boxIndexToremove, 1);
    setMovingBoxList(newBoxList);
  }
  return (
    <>
      {movingBoxList.map((box, index) => {
        return (
          <MovingBox
            key={box.key}
            zIndex={box.zIndex}
            positionInArray={index}
            removeBox={removeBox}
          />
        );
      })}
      <AddButton />
      <ClearButton />
    </>
  );
}
