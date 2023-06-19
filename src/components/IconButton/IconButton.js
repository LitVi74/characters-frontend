import {Button} from "react-bootstrap";

const IconButton = ({
  icon,
  isLoader,
  iconPosition = "left",
  children,
  ...props
}) => {
  return (
    <Button {...props} 
      className={`d-flex align-items-center gap-2 ${props.className ?? ""}`} 
      disabled={isLoader ? 'disabled' : ''}
    >
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