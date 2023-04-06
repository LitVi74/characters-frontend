import { Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import {FC} from 'react';

const Characters: FC= () => {
  return (
    <Flex as="main" direction="column" gap="2">
      <Heading>Characters Page</Heading>
      <LinkBox as="a" display="block" w='sm' p='2' borderWidth='1px' rounded='md'>
        <Heading size='md' my='2'>
          <LinkOverlay href='#'>
            Character 1
          </LinkOverlay>
        </Heading>
      </LinkBox>
      <LinkBox as="a" display="block"  w='sm' p='2' borderWidth='1px' rounded='md'>
        <Heading size='md' my='2'>
          <LinkOverlay href='#'>
            Character 2
          </LinkOverlay>
        </Heading>
      </LinkBox>
      <LinkBox as="a" display="block"  w='sm' p='2' borderWidth='1px' rounded='md'>
        <Heading size='md' my='2'>
          <LinkOverlay href='#'>
            Character 3
          </LinkOverlay>
        </Heading>
      </LinkBox>
    </Flex>
  );
};

export default Characters;