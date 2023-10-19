/* eslint-disable react/jsx-props-no-spreading */
import { Button } from "react-bootstrap";
import "./IconButton.scss";

function IconButton({ icon, iconPosition = "left", children = "", ...props }: {
  [x: string]: any;
  icon: JSX.Element;
}): JSX.Element {
  return (
    <Button
      {...props}
      className={`align-items-center gap-2 ${props.className ?? ""}`}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </Button>
  );
}

export default IconButton;
