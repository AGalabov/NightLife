import { noop } from 'lodash';
import React, { createContext, ReactNode, useState } from 'react';
import { Profile } from '../models';

interface Props {
  children: ReactNode;
}
interface UserState {
  user?: Profile;
  login: (data: Profile) => void;
  logout: () => void;
}

const initialState: UserState = {
  user: undefined,
  login: noop,
  logout: noop,
};

export const UserContext = createContext(initialState);

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<Profile>();

  return (
    <UserContext.Provider
      value={{
        user,
        logout: () => setUser(undefined),
        login: (data: Profile) => setUser(data),
      }}>
      {children}
    </UserContext.Provider>
  );
}
