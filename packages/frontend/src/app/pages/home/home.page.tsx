import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Login } from '../auth/Login/login.page';
import { PrivateRoute } from '../../routes/privateRoute';
import { AthleteProvider } from '../../contexts/athleteContext';
import { BoxList } from '../box-list/box-list.page';

const Home = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <PrivateRoute>
      <AthleteProvider>
        <BoxList></BoxList>
      </AthleteProvider>
    </PrivateRoute>
  ) : (
    <Login></Login>
  );
};

export { Home };
