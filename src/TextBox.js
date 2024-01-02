import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";

const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

const Textbox = ({ id, left, top, type, flag, boxes2, setBoxes2 }) => {
  const [data, setData] = useState("");
  const handleInputChange = (e) => {
    const newData = e.target.value;
    const updatedBoxes = boxes2.map((box) =>
      box.id === id ? { ...box, top: top, left: left, data: newData } : box
    );
    setData(newData);
    setBoxes2(updatedBoxes);
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "BOX",
      item: { id, left, top, flag, data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  //console.log(type);
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      <input
        type="text"
        value={data}
        placeholder="Enter Text"
        onChange={handleInputChange}
      ></input>
    </div>
  );
};
export default Textbox;
