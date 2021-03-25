import { useContext } from 'react';
import { UserContext } from '../context/user';

export function useAuthentication() {
  const { user, ...rest } = useContext(UserContext);

  return {
    user,
    isGuest: !user,
    isRegistered: user?.type === 'regular',
    isAdmin: user?.type === 'admin',
    ...rest,
  };
}
