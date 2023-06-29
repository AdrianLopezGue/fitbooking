import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { TrainingDay } from "../pages/training-day/Layout";
import { BoxList } from "../pages/box-list/Layout";
import { Login } from "../pages/auth/Login";
import { Registration } from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: '/:boxId/sessions',
    element: (
      <PrivateRoute>
        <TrainingDay></TrainingDay>
      </PrivateRoute>
    ),
  },
  {
    path: '/boxes',
    element: (
      <PrivateRoute>
        <BoxList></BoxList>
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Registration></Registration>,
  },
]);
