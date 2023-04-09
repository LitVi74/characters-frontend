import { Button, ButtonGroup } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorizationButtonGroup = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const navigate = useNavigate();

  const handleSelectLoginPage = useCallback(() => {
    setCurrentPage("login");
    navigate("/authorization/login");
  }, []);

  const handleSelectSignupPage = useCallback(() => {
    setCurrentPage("signup");
    navigate("/authorization/signup");
  }, []);

  return (
    <ButtonGroup
      isAttached
    >
      <Button
        colorScheme={currentPage === "login" ? "blue" : "gray" }
        onClick={handleSelectLoginPage}
      >
        Войти в аккаунт
      </Button>
      <Button
        colorScheme={currentPage === "signup" ? "blue" : "gray"}
        onClick={handleSelectSignupPage}
      >
        Создать аккаунт
      </Button>
    </ButtonGroup>
  );
};

export default AuthorizationButtonGroup;