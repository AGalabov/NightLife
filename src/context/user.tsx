import { noop } from 'lodash';
import React, { createContext, ReactNode, useState } from 'react';
import { client } from '../services';

interface Props {
  children: ReactNode;
}

interface UserState {
  userId?: string;
  setUserId: (data: string) => void;
  logout: () => void;
}

const initialState: UserState = {
  userId: undefined,
  setUserId: noop,
  logout: noop,
};

export const UserContext = createContext(initialState);

export function UserContextProvider({ children }: Props) {
  const [userId, setUserId] = useState<string>();

  return (
    <UserContext.Provider
      value={{
        userId,
        logout: () => client.logout().then(() => setUserId(undefined)),
        setUserId,
      }}>
      {children}
    </UserContext.Provider>
  );
}
