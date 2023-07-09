import { UserDTO } from '@fitbooking/contracts';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

export const UserContext = createContext<{
  user: UserDTO;
  setUser: Dispatch<SetStateAction<UserDTO>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}>({
  user: { _id: '', name: '', email: '', password: '' },
  setUser: () => undefined,
  token: '',
  setToken: () => undefined,
});

type UserProviderProperties = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProperties) => {
  const [user, setUser] = useState<UserDTO>(() => {
    const storedUser = localStorage.getItem('logged_user');
    return storedUser
      ? JSON.parse(storedUser)
      : { _id: '', name: '', email: '', password: '' };
  });
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('logged_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
