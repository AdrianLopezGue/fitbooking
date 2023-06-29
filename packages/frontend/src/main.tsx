import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from '../src/app/contexts/userContext';
import { Fonts, theme } from './app/styles/fontStyles';
import { router } from './app/routes/router';

const root = createRoot(document.getElementById('root') as HTMLElement);
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
