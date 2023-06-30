import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/privateRoute';
import { AthleteProvider } from '../../contexts/athleteContext';
import { TrainingDay } from './sessions.page';

export const sessionsRoute: RouteObject = {
  path: '/:boxId/sessions',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <TrainingDay></TrainingDay>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
