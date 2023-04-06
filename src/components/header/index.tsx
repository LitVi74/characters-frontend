import React from 'react';
import {Button, Flex, useColorMode} from '@chakra-ui/react';

const Header = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Flex 
      as="header" 
      w="100%"
      direction="row"
      p={2}
    >
      <Button
        mr="0"
        ml="auto" 
        onClick={toggleColorMode}
      >
        Сменить тему
      </Button>
    </Flex>
  );
};

export default Header;