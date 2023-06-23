import { FormEvent, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormContainer,
  Image,
  ImageContainer,
  Input,
  InputTitle,
  Subtitle,
  Title,
} from '../Layout/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showToast = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      theme: 'dark',
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('http://localhost:3333/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.statusCode && data.statusCode !== 200) {
          showToast(data.message);
        }
      })
      .catch(error => showToast(error));
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Title>Welcome back!</Title>
            <Subtitle>Enter your credentials to access your account</Subtitle>
            <InputTitle>Email address</InputTitle>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
            />
            <InputTitle>Password</InputTitle>
            <Input
              type="password"
              placeholder="Enter your Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
          </Form>
        </FormContainer>
        <ImageContainer>
          <Image
            src="https://as2.ftcdn.net/v2/jpg/03/71/58/33/1000_F_371583368_cIMTyJZ40MiiSRryPND2GX8hcgIDYvO1.jpg"
            alt="Athletes doing a wod in a crossfit box"
          />
        </ImageContainer>
      </Container>
      <ToastContainer />
    </>
  );
};

export { Login };
