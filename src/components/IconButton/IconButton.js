/* eslint-disable react/jsx-props-no-spreading */
import { Button } from "react-bootstrap";

function IconButton({ icon, iconPosition = "left", children, ...props }) {
  return (
    <Button
      {...props}
      className={`d-flex align-items-center gap-2 ${props.className ?? ""}`}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </Button>
  );
}

export default IconButton;
