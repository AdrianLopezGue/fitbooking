import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
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
