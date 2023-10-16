import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface PropsInfoToast {
  show: boolean;
  setShow: (x: boolean) => void;
  delay?: number;
  variant?: string;
  title: string;
  message: string | JSX.Element;
}

function InfoToast({ show, setShow, delay = 5000, variant = "light", title, message }: PropsInfoToast) {
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
          className={["dark", "success", "primary"].includes(variant) ? "text-white" : ""}
        >
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

InfoToast.defaultProps = { 
  delay: 5000,
  variant: "light"
} 

export default InfoToast;
