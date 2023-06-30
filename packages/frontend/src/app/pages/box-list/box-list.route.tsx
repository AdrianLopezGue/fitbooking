import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/privateRoute';
import { AthleteProvider } from '../../contexts/athleteContext';
import { BoxList } from './box-list.page';

export const boxListRoute: RouteObject = {
  path: '/boxes',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <BoxList></BoxList>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
