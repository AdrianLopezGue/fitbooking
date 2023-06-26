import React, { ReactNode, createContext, useState } from 'react';

type UserDTO = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

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
  const [user, setUser] = useState({ _id: '', name: '', email: '', password: '' });
  const [token, setToken] = useState('');

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
