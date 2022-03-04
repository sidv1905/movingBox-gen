import React, { useState } from "react";
import AddButton from "../Buttons/AddButton";
import ClearButton from "../Buttons/ClearButton";
import CheckBox from "../CheckBox/CheckBox";

import RectangularFence from "../RectangularFence/RectangularFence";
import MovingBox from "./MovingBox";

interface MovingBox {
  zIndex: number;
  key?: number;
}
export default function MovingBoxContainer() {
  const [movingBoxList, setMovingBoxList] = useState<MovingBox[]>([
    {
      zIndex: 1,
      key: 1,
    },
  ]);
  // To add box
  function addBox() {
    setMovingBoxList([
      ...movingBoxList,
      {
        zIndex: movingBoxList.length + 1,
        key: movingBoxList.length + 1,
      },
    ]);
  }

  // TO remove box by index
  function removeBox(boxIndexToremove: number): void {
    const newBoxList = [...movingBoxList];

    newBoxList.splice(boxIndexToremove, 1);

    setMovingBoxList(newBoxList);
  }
  // TO reset box t initial state
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
      <div className="btn-container">
        <AddButton addBox={addBox} />
        <ClearButton reset={reset} />
      </div>
      <CheckBox />
    </RectangularFence>
  );
}
