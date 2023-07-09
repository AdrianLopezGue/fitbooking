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
import { NavBar } from './../../shared/components/navbar/navbar.component';
import { useBoxCreationPage } from './box-creation.controller';

const BoxCreationPage = () => {
  const { handleSubmit, form, user } = useBoxCreationPage();

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
              <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input {...form.register('name')} type="text" />
                </FormControl>
                <FormControl id="location" isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input {...form.register('location')} type="text" />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'teal'}
                    color={'white'}
                    type="submit"
                    _hover={{
                      bg: 'teal.500',
                    }}
                  >
                    Create
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export { BoxCreationPage };
