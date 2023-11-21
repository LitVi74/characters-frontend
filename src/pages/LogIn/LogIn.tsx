import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";

import InfoToast from "../../shared/components/InfoToast/InfoToast";
import LoginForm from "./components/LoginForm/LoginForm";

import AuthService from "../../shared/service/AuthService/AuthService";

import { PATHS } from "../../shared/constants/constants";
import user from "../../shared/contexts/userContext";
import { IUser, SignInResult } from "../../shared/constants/IConstants";

const LogIn = observer(() => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [signInResult, setSignInResult] = useState<SignInResult>({
    hasError: false,
    errorMessage: "",
  });

  const handleLoginFormSubmit = useCallback(
    async (email: string, password: string) => {
      const { hasError, errorMessage, data } = await AuthService.login(email, password);
      if (!data) {
        return;
      }
      const { _id, role, isActivated }: IUser = data;

      user.setUser({
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
    [navigate]
  );

  return (
    <main className="auth">
      <h1>Вход</h1>
      <LoginForm cbSubmit={handleLoginFormSubmit} isSubmitted={isSubmitted} />
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
});

export default LogIn;

