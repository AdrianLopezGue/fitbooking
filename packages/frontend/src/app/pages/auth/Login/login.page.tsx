import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginPage } from './login.controller';

const Login = () => {
  const { handleSubmit, form } = useLoginPage();

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                {...form.register('email')}
                id="email"
                type="text"
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...form.register('password')}
                id="password"
                type="password"
                placeholder="Enter your Password"
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'teal'}>Forgot password?</Link>
              </Stack>
              <Button
                colorScheme={'teal'}
                variant={'solid'}
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://as2.ftcdn.net/v2/jpg/03/71/58/33/1000_F_371583368_cIMTyJZ40MiiSRryPND2GX8hcgIDYvO1.jpg'
          }
        />
      </Flex>
      <ToastContainer />
    </Stack>
  );
};

export { Login };
