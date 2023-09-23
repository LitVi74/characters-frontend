import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useCallback, useContext } from "react";

import { PATHS } from "../../constants/constants";
import { CurrentUserContext } from "../../contexts/currentUserContext";

import AuthService from "../../service/AuthService/AuthService";

export default function AuthorizedNavbar() {
  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleExitButtonClick = useCallback(async () => {
    const { hasError } = await AuthService.logout();
    if (!hasError) {
      setCurrentUser({
        _id: "",
        email: "",
        role: "",
        isActivated: false,
      });
    }
  }, [setCurrentUser]);

  return (
    <Navbar className="w-100 p-0 m">
      <Nav className="flex-grow-1 justify-content-start">
        <Nav.Link as={Link} to={PATHS.spells}>
          Заклинания
        </Nav.Link>
        <Nav.Link as={Link} to={PATHS.characters}>
          Персонажи
        </Nav.Link>
        <Nav.Link
          as={Button}
          variant="link"
          onClick={handleExitButtonClick}
          className="me-0 ms-auto"
        >
          Выход
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
