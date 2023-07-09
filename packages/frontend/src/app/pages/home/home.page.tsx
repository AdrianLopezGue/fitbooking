import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { Login } from '../auth/Login/login.page';
import { PrivateRoute } from '../../routes/private-route';
import { AthleteProvider } from '../../contexts/athlete-context';
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
