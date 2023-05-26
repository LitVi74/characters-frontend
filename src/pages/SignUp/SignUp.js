import SignupForm from "../../components/SignupForm/SignupForm";
import AuthService from "../../service/AuthService/AuthService";
import {useState} from "react";
import InfoToast from "../../components/InfoToast/InfoToast";

export default function SignUp() {
  const [showToast, setSowToast] = useState(false);
  const [signupResult, setSignupResult] = useState({
    hasError: false,
    errorMessage: '',
  })

  const cbRegister = async (email, password) => {
    const {hasError, errorMessage} = await AuthService.registration(email, password);
    setSignupResult({ hasError, errorMessage });
    setSowToast(true);
  };

  return (
   <main className="px-5">
     <h1>Регистрация</h1>
     <SignupForm cbRegister={cbRegister} />
     <InfoToast
       show={showToast}
       setShow={setSowToast}
       variant={signupResult.hasError ? 'danger' : 'success'}
       title={signupResult.hasError ? 'Что-то пошло не так' : 'Почти готово'}
       message={signupResult.hasError
         ? signupResult.errorMessage
         : (<p>
             Проверьте почту, вам должно было прийти <strong>письмо</strong>.
             Оно могло случайно попасть в <strong>спам</strong>
           </p>
         )}
     />
   </main>
  );
}