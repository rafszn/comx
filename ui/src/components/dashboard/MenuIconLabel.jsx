import { NavLink } from "react-router-dom";

const MenuIconLabel = ({
  text,
  imageSrc,
  direction = "vertical",
  path = "/",
}) => {
  const imageWidth = direction === "vertical" ? "30px" : "20px";
  const fontSize = direction === "vertical" ? "0.8rem" : "1.1rem";
  const flexDirection = direction === "vertical" ? "column" : "row";
  return (
    <div className="menu-icon" style={{ flexDirection }}>
      <div className="icon">
        <img src={imageSrc} alt="" style={{ width: imageWidth, height: imageWidth }} />
      </div>
      <NavLink to={path} style={{ fontSize }}>
        {text}
      </NavLink>
    </div>
  );
};
export default MenuIconLabel;
