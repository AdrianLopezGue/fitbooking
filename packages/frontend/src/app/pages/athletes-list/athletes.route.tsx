import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
import { AthletesList } from './athletes.page';

export const athletesListRoute: RouteObject = {
  path: '/:boxId/athletes',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <AthletesList></AthletesList>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
