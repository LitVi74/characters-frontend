import { useCallback } from 'react';
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/constants";

export default function AuthorizedNavbar({cbLogout}) {
  const handleExitButtonClick = useCallback(() => {
    cbLogout()
  }, [cbLogout]);

  return (
    <Navbar className="w-100 p-0">
      <Nav className="flex-grow-1 justify-content-end">
        <Nav.Link as={Link} to={PATHS.spells}>Заклинания</Nav.Link>
        <Nav.Link as={Link} to={PATHS.characters}>Чарники</Nav.Link>
        <Nav.Link
          as={Button}
          variant="link"
          onClick={handleExitButtonClick}
        >
          Выход
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}