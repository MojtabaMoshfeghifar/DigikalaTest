import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {RoutesName, RootStackParamList} from '../../../app/Routes/routesName';
//@ts-ignore
export type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, keyof RootStackParamList>
>;

export const useScreenNavigation = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return navigation;
};
export const useScreenRoutes = <T extends RoutesName>() => {
  // @ts-ignore
  const navigation = useRoute<RouteProp<RootStackParamList, T>>();
  return navigation;
};
