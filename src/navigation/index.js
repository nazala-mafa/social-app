import React from 'react';
import {AuthProvider} from './AuthProvider';
import Router from './Router';

export default Provider = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
