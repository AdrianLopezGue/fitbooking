import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }): JSX.Element => {
    const isLoggedIn = localStorage.getItem('logged_user') !== null;
    const location = useLocation();
  
    return isLoggedIn ? (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  };