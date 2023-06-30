import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { TrainingDay } from '../pages/training-day/Layout';
import { BoxList } from '../pages/box-list/Layout';
import { Registration } from '../pages/auth/Register';
import { AthleteProvider } from '../contexts/athleteContext';
import { loginRoute } from '../pages/auth/Login/login.route';

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
  {
    path: '/boxes',
    element: (
      <PrivateRoute>
        <AthleteProvider>
          <BoxList></BoxList>
        </AthleteProvider>
      </PrivateRoute>
    ),
  },
  loginRoute,
  {
    path: '/register',
    element: <Registration></Registration>,
  },
]);
