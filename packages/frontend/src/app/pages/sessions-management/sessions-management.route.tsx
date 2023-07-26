import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
import { SessionsManagement } from './sessions-management.page';

export const sessionsManagementRoute: RouteObject = {
  path: '/:boxId/sessions-management',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <SessionsManagement></SessionsManagement>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
