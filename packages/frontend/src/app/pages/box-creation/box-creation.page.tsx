import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { NavBar } from './../../shared/components/navbar/navbar.component';

const BoxCreationPage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar userName={user.name} />
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Create box
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input type="text" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'teal'}
                  color={'white'}
                  _hover={{
                    bg: 'teal.500',
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export { BoxCreationPage };
