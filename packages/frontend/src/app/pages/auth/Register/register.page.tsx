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
import 'react-toastify/dist/ReactToastify.css';
import { useRegisterPage } from './register.controller';

const Register = () => {
  const { handleSubmit, form } = useRegisterPage();

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="Name">
              <FormLabel>Name</FormLabel>
              <Input
                {...form.register('name')}
                type="name"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                {...form.register('email')}
                type="email"
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                {...form.register('password')}
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
                <Link color={'blue.500'}>Forgot password?</Link>
              </Stack>
              <Button
                colorScheme={'blue'}
                variant={'solid'}
                type="submit"
                isLoading={form.formState.isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Register Image'}
          objectFit={'cover'}
          src={
            'https://cutewallpaper.org/21/crossfit-wallpaper/Wallpaper-Fitness-Gym-Crossfit-images-for-desktop-section-.jpg'
          }
        />
      </Flex>
    </Stack>
  );
};

export { Register };
