import { Toast, ToastContainer } from "react-bootstrap";
import { useEffect } from "react";

function InfoToast({
  show,
  setShow,
  delay = 5000,
  variant = "light",
  title,
  message,
}) {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, delay);
    }
  }, [delay, show, setShow]);

  return (
    <ToastContainer className="p-5" position="top-end">
      <Toast
        className="d-inline-block m-1"
        bg={variant}
        onClose={() => setShow(false)}
        show={show}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body
          className={
            ["dark", "success", "primary"].includes(variant) && "text-white"
          }
        >
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default InfoToast;
