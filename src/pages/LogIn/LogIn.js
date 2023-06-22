import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";

import InfoToast from "../../components/InfoToast/InfoToast";
import LoginForm from "./components/LoginForm/LoginForm";

import AuthService from "../../service/AuthService/AuthService";

import { PATHS } from "../../constants/constants";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [showToast, setShowToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signInResult, setSignInResult] = useState({
    hasError: false,
    errorMessage: "",
  });

  const handleLoginFormSubmit = useCallback(
    async (email, password) => {
      const { hasError, errorMessage, data } = await AuthService.login(email, password);
      const { _id, role, isActivated } = data;

      setCurrentUser({
        _id,
        email,
        role,
        isActivated,
      });
      setSignInResult({ hasError, errorMessage });

      if (hasError || !isActivated) {
        setShowToast(true);
      } else {
        navigate(PATHS.characters);
      }

      setIsSubmitted(false);
    },
    [navigate, setCurrentUser]
  );

  return (
    <main className="px-5">
      <h1>Вход</h1>
      <LoginForm cbLogin={handleLoginFormSubmit} isSubmitted={isSubmitted} />
      <InfoToast
        show={showToast}
        setShow={setShowToast}
        variant={signInResult.hasError ? "danger" : "warning"}
        title={
          signInResult.hasError ? "Что-то пошло не так" : "Пожалуйста, подтвердите почту"
        }
        message={
          signInResult.hasError ? (
            signInResult.errorMessage
          ) : (
            <p>
              Проверьте почту, вам должно было прийти <strong>письмо</strong>. Оно могло
              случайно попасть в <strong>спам</strong>
            </p>
          )
        }
      />
    </main>
  );
}
