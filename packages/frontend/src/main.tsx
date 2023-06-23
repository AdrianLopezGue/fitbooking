import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { Login } from './app/pages/auth/Login';
import { Registration } from './app/pages/auth/Register';
import FontStyles from './app/styles/fontStyles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    <FontStyles />
    <RouterProvider router={router} />
  </StrictMode>,
);
