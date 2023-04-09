import {Heading} from "@chakra-ui/react";
import {FC} from "react";
import SignupForm from "../../components/signup form";

const SignUp: FC = () => {
  return (
   <>
    <Heading alignSelf="start" my={4}>Регистрация</Heading>
    <SignupForm />
   </>
  );
};

export default SignUp;