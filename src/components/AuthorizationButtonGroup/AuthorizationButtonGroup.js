import { useCallback, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AuthorizationButtonGroup() {
  const [currentPage, setCurrentPage] = useState('login');
  const navigate = useNavigate();

  const handleSelectLoginPage = useCallback(() => {
    setCurrentPage("login");
    navigate("/authorization/login");
  }, [navigate]);

  const handleSelectSignupPage = useCallback(() => {
    setCurrentPage("signup");
    navigate("/authorization/signup");
  }, [navigate]);

  return (
    <ButtonGroup
      className="w-100"
    >
      <Button
        variant={currentPage === "login" ? "primary" : "outline-secondary" }
        onClick={handleSelectLoginPage}
      >
        Войти в аккаунт
      </Button>
      <Button
        variant={currentPage === "signup" ? "primary" : "outline-secondary"}
        onClick={handleSelectSignupPage}
      >
        Создать аккаунт
      </Button>
    </ButtonGroup>
  );
}