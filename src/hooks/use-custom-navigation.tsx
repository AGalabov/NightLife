import { useNavigation } from '@react-navigation/native';

const commonTabRoutes = ['Search', 'Profile'] as const;

const userTabRoutes = [...commonTabRoutes, 'Home'] as const;
const adminTabRoutes = [...commonTabRoutes, 'AddEvent'] as const;

const tabRoutes = [...userTabRoutes, ...adminTabRoutes] as const;
export type TabRoutes = typeof tabRoutes[number];

const additionalRoutes = ['EventDetails', 'SignIn', 'SignUp'] as const;

const routes = [...tabRoutes, ...additionalRoutes] as const;
export type Routes = typeof routes[number];

export function useCustomNavigation() {
  const { navigate, ...rest } = useNavigation();

  const customNavigate = (newTab: Routes) => {
    navigate(newTab);
  };

  return { navigate: customNavigate, ...rest };
}
