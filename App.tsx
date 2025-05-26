import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import {Provider} from 'react-redux';
import store from './src/store/store';
import { initializeDatabase } from './src/utils/db';

const App: React.FC = () => {
  useEffect(() => {
initializeDatabase()
  }, [])
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;