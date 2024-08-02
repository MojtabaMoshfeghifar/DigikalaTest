/* eslint-disable react/react-in-jsx-scope */
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './rootNavigation';
import ListOfItems from '../pages/ListOfItems';
import ItemDetail from '../pages/itemDetail';
import {RoutesName} from './routesName';
const RootStack = createNativeStackNavigator();

const MainRoutes = () => {
  const navigationTheme: Theme = {
    colors: {
      ...DefaultTheme.colors,
      border: 'white',
      background: 'white',
    },
    dark: false,
  };
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <RootStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          presentation: 'card',
          animation: 'none',
        }}>
        <RootStack.Screen
          component={ListOfItems}
          name={RoutesName.LIST_OF_ITEMS}
        />
        <RootStack.Screen
          component={ItemDetail}
          name={RoutesName.ITEM_DETAILS}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
