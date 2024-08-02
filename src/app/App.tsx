import React from 'react';
import AppContainer from './appContainer';
import {MainProvider} from '../core/providers/mainProvider';

const App = () => {
  return (
    <MainProvider>
      <AppContainer />
    </MainProvider>
  );
};

export default App;
