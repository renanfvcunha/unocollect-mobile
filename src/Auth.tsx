import React from 'react';
import { useSelector } from 'react-redux';

import Login from './pages/Login';
import Routes from './routes';
import { ApplicationState } from './store';

const Auth: React.FC = () => {
  const logged = useSelector((state: ApplicationState) => state.auth.logged);

  if (!logged) {
    return <Login />;
  }

  return <Routes />;
};

export default Auth;
