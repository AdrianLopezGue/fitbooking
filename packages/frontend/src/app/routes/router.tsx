import { createBrowserRouter } from 'react-router-dom';
import { loginRoute } from '../pages/auth/Login/login.route';
import { registerRoute } from '../pages/auth/Register/register.route';
import { boxListRoute } from '../pages/box-list/box-list.route';
import { sessionsRoute } from '../pages/sessions/sessions.route';
import { homeRoute } from '../pages/home/home.route';
import { athletesListRoute } from '../pages/athletes-list/athletes.route';

export const router = createBrowserRouter([
  sessionsRoute,
  boxListRoute,
  loginRoute,
  registerRoute,
  homeRoute,
  athletesListRoute,
]);
