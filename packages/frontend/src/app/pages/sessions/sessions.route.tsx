import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
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
