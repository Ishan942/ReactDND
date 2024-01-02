import { useState } from "react";
import { useDrag } from "react-dnd";

const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

const ImgBox = ({ id, left, top, type, flag }) => {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    setData(event.target.value);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [data, setData] = useState("");
  const handleInputChange = (e) => {
    setData(e.target.value);
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
      <div>
        <input type="file" onChange={onImageChange} className="fileinput" />
        <img className="imageclass" alt="preview image" src={image} />
      </div>
    </div>
  );
};
export default ImgBox;
