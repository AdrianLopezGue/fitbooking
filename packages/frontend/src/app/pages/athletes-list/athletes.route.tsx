import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/privateRoute';
import { AthleteProvider } from '../../contexts/athleteContext';
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
