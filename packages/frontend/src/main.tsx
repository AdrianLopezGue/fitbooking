import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './app/pages/auth/Login';
import { Registration } from './app/pages/auth/Register';
import { TrainingDay } from './app/pages/training-day/Layout';
import { Fonts, theme } from './app/styles/fontStyles';
import { UserProvider } from '../src/app/contexts/userContext';

const router = createBrowserRouter([
  {
    path: '/:boxId/sessions',
    element: <TrainingDay></TrainingDay>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Registration></Registration>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <RouterProvider router={router} />
      </ChakraProvider>
    </UserProvider>
  </StrictMode>,
);
