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
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userActions from '../../../actions/userActions';
import { UserContext } from '../../../contexts/userContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, token, setUser } = useContext(UserContext);
  const showToast = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      theme: 'dark',
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userActions
      .login(email, password)
      .then(response => {
        if (response.error) {
          showToast(response.error);
          return;
        }

        setToken(response);
      })
      .catch(error => showToast(error));
  };

  useEffect(() => {
    if (token) {
      userActions
        .getByEmail(email, token)
        .then(data => {
          setUser(data);
          navigate('/boxes');
        })
        .catch(error => showToast(error));
    }
  }, [token, email, navigate, setUser]);

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your Password"
                onChange={e => setPassword(e.target.value)}
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
              <Button colorScheme={'blue'} variant={'solid'} type="submit">
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
