import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
import { BoxCreationPage } from './box-creation.page';

export const boxCreationRoute: RouteObject = {
  path: '/box-creation',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <BoxCreationPage></BoxCreationPage>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
