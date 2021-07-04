import { useContext } from 'react';
import { UserContext } from '../context/user';

export function useAuthentication() {
  const { user, ...rest } = useContext(UserContext);

  return {
    profile: user,
    isGuest: !user,
    isAdmin: user?.type === 'admin',
    ...rest,
  };
}
