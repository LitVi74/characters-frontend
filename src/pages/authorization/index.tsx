import {Flex} from '@chakra-ui/react';
import {Outlet} from 'react-router-dom';
import AuthorizationButtonGroup from "../../components/authorization button group";

const Authorization = () => {
  return (
    <Flex
      direction="column"
      as="main"
      mt="10vh"
      minW="20vw"
      flexGrow={1}
      align="center"
    >
      <AuthorizationButtonGroup />
      <Outlet />
    </Flex>
  );
};

export default Authorization;