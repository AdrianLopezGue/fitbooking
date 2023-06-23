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
  Title,
} from '../Layout/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showToast = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      theme: 'dark',
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('http://localhost:3333/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.status !== 201) {
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
            <Title>Get Started Now</Title>
            <InputTitle>Name</InputTitle>
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={e => setName(e.target.value)}
            />
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
            <Button type="submit">Signup</Button>
          </Form>
        </FormContainer>
        <ImageContainer>
          <Image
            src="https://cutewallpaper.org/21/crossfit-wallpaper/Wallpaper-Fitness-Gym-Crossfit-images-for-desktop-section-.jpg"
            alt="Athletes doing a wod in a crossfit box"
          />
        </ImageContainer>
      </Container>
      <ToastContainer />
    </>
  );
};

export { Registration };
