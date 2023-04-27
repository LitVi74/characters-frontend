import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/constants";

export default function UnauthorizedNavbar() {
  return (
    <Navbar className="w-100 p-0">
      <Nav className="flex-grow-1 justify-content-end">
        <Nav.Link as={Link} to={PATHS.login}>Вход</Nav.Link>
        <Nav.Link as={Link} to={PATHS.signup}>Регистрация</Nav.Link>
      </Nav>
    </Navbar>
  );
}