// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const navigateWithRef = ({name, params}: {name: never; params: never}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else return;
};

export {navigateWithRef, navigationRef};
