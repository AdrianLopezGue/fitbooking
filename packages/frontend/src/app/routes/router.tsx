import { createBrowserRouter } from 'react-router-dom';
import { athletesListRoute } from '../pages/athletes-list/athletes.route';
import { loginRoute } from '../pages/auth/Login/login.route';
import { registerRoute } from '../pages/auth/Register/register.route';
import { boxCreationRoute } from '../pages/box-creation/box-creation.route';
import { boxListRoute } from '../pages/box-list/box-list.route';
import { calendarRoute } from '../pages/calendar/calendar.route';
import { homeRoute } from '../pages/home/home.route';
import { sessionsManagementRoute } from '../pages/sessions-management/sessions-management.route';
import { sessionsRoute } from '../pages/sessions/sessions.route';

export const router = createBrowserRouter([
  sessionsRoute,
  boxListRoute,
  boxCreationRoute,
  loginRoute,
  registerRoute,
  homeRoute,
  athletesListRoute,
  calendarRoute,
  sessionsManagementRoute,
]);
