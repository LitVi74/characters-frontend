import SignupForm from "../../components/SignupForm/SignupForm";

export default function SignUp({cbRegister}) {
  return (
   <main>
    <h1>Регистрация</h1>
    <SignupForm cbRegister={cbRegister} />
   </main>
  );
}