import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { TrainingDay } from '../pages/training-day/Layout';
import { BoxList } from '../pages/box-list/Layout';
import { Login } from '../pages/auth/Login';
import { Registration } from '../pages/auth/Register';
import { AthleteProvider } from '../contexts/athleteContext';

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
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Registration></Registration>,
  },
]);
