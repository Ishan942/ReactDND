import { useCallback, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import TextBox from "./TextBox.js";
import ImgBox from "./ImgBox.js";

export const Container = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState([
    { id: 1, top: 0, left: 0, title: "Add Image", flag: 0, type: "img" },
    { id: 2, top: 0, left: 180, title: "Add Text", flag: 0, type: "txt" },
  ]);
  const [itemcount, setitemcount] = useState(0);
  const [boxes2, setBoxes2] = useState([]);
  const moveBox = (id, left, top, flag, data, type) => {
    if (flag == 0) {
      const newb = {
        id: itemcount,
        left: left,
        top: top,
        title: "added",
        flag: 1,
        data: data,
        type: type,
      };
      setitemcount(itemcount + 1);
      const x = [...boxes2, newb];
      setBoxes2(x);
    } else {
      const updatedBoxes = boxes2.map((box) =>
        box.id === id ? { ...box, top: top, left: left, data: data } : box
      );
      setBoxes2(updatedBoxes);
    }
  };

  const [, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x - (!item.flag ? 200 : 0));

        const top = Math.round(item.top + delta.y);

        moveBox(item.id, left, top, item.flag, item.data, item.type);

        return undefined;
      },
    }),
    [moveBox]
  );

  const handleSave = () => {
    console.log(boxes2);
  };
  return (
    <div>
      <div className="container main">
        <div className="style1">
          {boxes.map((box) => {
            const { id, left, top, title, flag, type } = box;
            return (
              <Box
                key={id}
                id={id}
                left={left}
                top={top}
                flag={flag}
                type={type}
                hideSourceOnDrag={hideSourceOnDrag}
              >
                {title}
              </Box>
            );
          })}
        </div>
        <div ref={drop} className="style2">
          {boxes2.length > 0
            ? boxes2.map((box) => {
                const { id, left, top, title, flag, type } = box;
                return type === "txt" ? (
                  <TextBox
                    boxes2={boxes2}
                    setBoxes2={setBoxes2}
                    key={id}
                    id={id}
                    left={left}
                    top={top}
                    hideSourceOnDrag={hideSourceOnDrag}
                    flag={flag}
                    type={type}
                  >
                    {title}
                  </TextBox>
                ) : (
                  <ImgBox
                    key={id}
                    id={id}
                    left={left}
                    top={top}
                    hideSourceOnDrag={hideSourceOnDrag}
                    flag={flag}
                    type={type}
                  >
                    {title}
                  </ImgBox>
                );
              })
            : null}
        </div>
      </div>
      <div>
        <div className="save-button" onClick={handleSave}>
          SAVE
        </div>
      </div>
    </div>
  );
};
