import { useNavigation } from '@react-navigation/native';

export type Routes = 'Search' | 'Home' | 'Profile';

export function useCustomNavigation() {
  const { navigate, ...rest } = useNavigation();

  const customNavigate = (newTab: Routes) => {
    navigate(newTab);
  };

  return { navigate: customNavigate, ...rest };
}
