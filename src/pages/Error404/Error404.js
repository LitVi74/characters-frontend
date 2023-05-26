import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error404 = () => {

  return (
    <main className='mt-5 mx-auto text-center'>
        <h1 className='display-1 fw-bold'>404</h1>
        <p className="fs-3"><span className="text-danger">Ой-ой!</span> Кажется, мы сбились с пути.</p>
        <Button as={Link} to={"/"}>Давай начнем с начала :)</Button>
    </main>
  );
};

export default Error404;