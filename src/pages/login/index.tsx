import { Box, Heading} from "@chakra-ui/react";
import {FC} from "react";
import LoginForm from "../../components/login form";
import SignupForm from "../../components/signup form";

const LogIn: FC = () => {
  return (
   <Box 
    as="main"
    mt="10vh"
    w="20vw"
    flexGrow={1}
  >
    <Heading my={4}>Вход</Heading>
    {/*<LoginForm />*/}
    <SignupForm />
   </Box>
  );
};

export default LogIn;