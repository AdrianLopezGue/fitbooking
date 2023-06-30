import { UserDTO } from '@fitbooking/contracts';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

export const UserContext = createContext<{
  user: UserDTO;
  setUser: React.Dispatch<React.SetStateAction<UserDTO>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}>({
  user: { _id: '', name: '', email: '', password: '' },
  setUser: () => undefined,
  token: '',
  setToken: () => undefined,
});

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
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
