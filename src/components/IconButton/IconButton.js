import {Button} from "react-bootstrap";

const IconButton = ({
  icon,
  iconPosition = "left",
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {iconPosition === "left" &&
        icon
      }
      { children }
      {iconPosition === "right" &&
        icon
      }
    </Button>
  );
};

export default IconButton;