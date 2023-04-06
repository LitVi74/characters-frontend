import { Box, Heading} from "@chakra-ui/react";
import {FC} from "react";
import LoginForm from "../../components/login form";

const LogIn: FC = () => {
  return (
   <Box 
    as="main"
    mt="10vh"
    w="20vw"
    flexGrow={1}
  >
    <Heading m={4}>Вход</Heading>
    <LoginForm />
   </Box>
  );
};

export default LogIn;