import { noop } from 'lodash';
import React, { createContext, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  type: 'admin' | 'regular';
}

interface UserState {
  user?: User;
  login: (data: User) => void;
  logout: () => void;
}

const initialState: UserState = {
  user: undefined,
  login: noop,
  logout: noop,
};

export const UserContext = createContext(initialState);

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider
      value={{
        user,
        logout: () => setUser(undefined),
        login: (data: User) => setUser(data),
      }}>
      {children}
    </UserContext.Provider>
  );
}
