import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './app/contexts/user-context';
import { Fonts, theme } from './app/styles/font-styles';
import { router } from './app/routes/router';

const root = createRoot(document.querySelector('#root') as HTMLElement);
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
