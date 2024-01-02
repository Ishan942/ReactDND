import { useState } from "react";
import { useDrag } from "react-dnd";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};
export const Box = ({ id, left, top, children, flag, type }) => {
  const [data, setData] = useState("");
  const handleInputChange = (e) => {
    setData(e.target.value);
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "BOX",
      item: { id, left, top, flag, data, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (flag == 0) {
    return (
      <div
        className="box"
        ref={drag}
        style={{ ...style, left, top }}
        data-testid="box"
      >
        {children}
      </div>
    );
  } else {
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
  }
};
