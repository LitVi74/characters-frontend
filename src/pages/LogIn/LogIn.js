import LoginForm from "../../components/LoginForm/LoginForm";

export default function LogIn({cbLogin}) {
  return (
   <main>
    <h1>Вход</h1>
    <LoginForm cbLogin={cbLogin} />
   </main>
  );
}