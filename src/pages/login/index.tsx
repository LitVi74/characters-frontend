import {Heading} from "@chakra-ui/react";
import {FC} from "react";
import LoginForm from "../../components/login form";

const LogIn: FC = () => {
  return (
   <>
    <Heading alignSelf="start" my={4}>Вход</Heading>
    <LoginForm />
   </>
  );
};

export default LogIn;