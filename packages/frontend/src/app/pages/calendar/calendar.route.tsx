import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
import { CalendarPage } from '../calendar/calendar.page';

export const calendarRoute: RouteObject = {
  path: '/:boxId/calendar',
  element: (
    <PrivateRoute>
      <AthleteProvider>
        <CalendarPage></CalendarPage>
      </AthleteProvider>
    </PrivateRoute>
  ),
};
