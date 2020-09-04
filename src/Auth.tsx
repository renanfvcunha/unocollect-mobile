import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPermissionsAsync, watchPositionAsync } from 'expo-location';
import { Alert } from 'react-native';

import Login from './pages/Login';
import Routes from './routes';
import { ApplicationState } from './store';
import { addUserLocation } from './store/modules/fills/actions';
import Background from './components/Background';

const Auth: React.FC = () => {
  const logged = useSelector((state: ApplicationState) => state.auth.logged);
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Erro',
          'Precisamos de Acesso à localização para continuar.',
        );
        return;
      }

      await watchPositionAsync(
        {
          accuracy: 6,
          enableHighAccuracy: true,
          timeInterval: 30000,
        },
        (loc) => {
          setLocation([loc.coords.latitude, loc.coords.longitude]);
        },
      );
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    dispatch(addUserLocation(location[0], location[1]));
  }, [dispatch, location]);

  if (!logged) {
    return <Login />;
  }

  return <Routes />;
};

export default Auth;
