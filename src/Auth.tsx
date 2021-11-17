import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import { Alert, Platform } from 'react-native';

import Login from './pages/Login';
import Routes from './routes';
import { ApplicationState } from './store';
import { addUserLocation } from './store/modules/fills/actions';
import swAlert from './utils/alert';

const Auth: React.FC = () => {
  const logged = useSelector((state: ApplicationState) => state.auth.logged);
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserLocation = async () => {
      if (Platform.OS === 'web') {
        const webLocation = navigator.geolocation;

        webLocation.watchPosition(
          (loc) => {
            setLocation([loc.coords.latitude, loc.coords.longitude]);
          },
          (err) => swAlert('error', '', `Erro de localização: ${err.message}`),
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0,
          },
        );
      } else {
        const { status } = await requestForegroundPermissionsAsync();
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
            timeInterval: 30000,
          },
          (loc) => {
            setLocation([loc.coords.latitude, loc.coords.longitude]);
          },
        );
      }
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
