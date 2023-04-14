import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function Router() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(_user => {
      setUser(_user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
