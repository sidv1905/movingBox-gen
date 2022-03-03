import React, { useState } from "react";
import AddButton from "../Buttons/AddButton";
import ClearButton from "../Buttons/ClearButton";
import RectangularFence from "../RectangularFence/RectangularFence";
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
    console.log(newBoxList, "before");
    newBoxList.splice(boxIndexToremove, 1);
    console.log(newBoxList, "after removal");
    setMovingBoxList(newBoxList);
  }

  function reset() {
    setMovingBoxList([
      {
        zIndex: 1,
        key: 1,
      },
    ]);
  }
  return (
    <RectangularFence>
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
      <AddButton addBox={addBox} />
      <ClearButton reset={reset} />
    </RectangularFence>
  );
}
