import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { TrainingDay } from '../pages/training-day/Layout';
import { AthleteProvider } from '../contexts/athleteContext';
import { loginRoute } from '../pages/auth/Login/login.route';
import { registerRoute } from '../pages/auth/Register/register.route';
import { boxListRoute } from '../pages/box-list/box-list.route';

export const router = createBrowserRouter([
  {
    path: '/:boxId/sessions',
    element: (
      <PrivateRoute>
        <AthleteProvider>
          <TrainingDay></TrainingDay>
        </AthleteProvider>
      </PrivateRoute>
    ),
  },
  boxListRoute,
  loginRoute,
  registerRoute,
]);
