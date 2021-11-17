import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MaterialCommunityIcons as McIcon,
  MaterialIcons as MdIcon,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { styles, htmlStyles } from './styles';
import { ApplicationState } from '../../store';
import { Field } from '../../store/modules/forms/types';
import { Fill } from '../../store/modules/fills/types';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import squaresTop from '../../../assets/squaresTop.png';
import squaresBottom from '../../../assets/squaresBottom.png';
import swAlert from '../../utils/alert';

interface IFill {
  id?: number;
  title?: string;
  description?: string;
  fields?: Field[];
  fill: Fill;
}

const Home: React.FC = () => {
  const nav = useNavigation();
  const name = useSelector((state: ApplicationState) => state.auth.user.name);
  const forms = useSelector((state: ApplicationState) => state.forms.forms);
  const loading = useSelector((state: ApplicationState) => state.forms.loading);
  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const [formsToSend, setFormsToSend] = useState<IFill[]>([]);

  const dispatch = useDispatch();

  const removeFills = async () => {
    try {
      const data = await AsyncStorage.getItem('fills');
      if (data !== null) {
        await AsyncStorage.removeItem('fills');
      }
    } catch (err) {
      Alert.alert('', err);
    }
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      swAlert(
        'question',
        '',
        'Deseja sair da aplicação?',
        'SAIR',
        true,
        'VOLTAR',
        '#f44336',
      ).then((result) => {
        if (result.isConfirmed) {
          dispatch(logout());
        }
      });
    } else {
      Alert.alert(
        'Aviso',
        'Se houver preenchimentos pendentes eles serão apagados. Deseja sair?',
        [
          {
            text: 'Voltar',
            style: 'cancel',
          },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: async () => {
              await removeFills();
              dispatch(logout());
            },
          },
        ],
      );
    }
  };

  const pendentForms = async () => {
    const data = await AsyncStorage.getItem('fills');

    if (data !== null) {
      setFormsToSend(JSON.parse(data));
    } else {
      setFormsToSend([]);
    }
  };

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    dispatch(getFormsRequest());
  }, [dispatch]);

  useEffect(() => {
    pendentForms();
  }, []);

  return (
    <>
      <LinearGradient
        colors={['#403f3f', '#302d2d']}
        start={[0, 0]}
        end={[1.0, 0]}
        style={styles.linearGradient}
      >
        <Image source={squaresTop} style={styles.squaresTop} />
        <Image source={squaresBottom} style={styles.squaresBottom} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>Olá, {name?.split(' ')[0]}</Text>
          <Text style={styles.title}>
            Formulários disponíveis para preenchimento:
          </Text>

          {forms.length !== 0 ? (
            forms.map((form) => {
              if (Platform.OS === 'web') {
                return (
                  <button
                    key={form.id}
                    type="button"
                    style={htmlStyles.formBox}
                    onClick={() => nav.navigate('Fill', form)}
                  >
                    <span style={htmlStyles.formTitle}>{form.title}</span>
                    <span style={htmlStyles.formDescription}>
                      {form.description}
                    </span>
                  </button>
                );
              }
              return (
                <TouchableOpacity
                  key={form.id}
                  style={styles.formBox}
                  onPress={() => nav.navigate('Fill', form)}
                  activeOpacity={0.5}
                >
                  <Text style={styles.formTitle}>{form.title}</Text>
                  <Text style={styles.formDescription}>{form.description}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noFormText}>Nenhum formulário.</Text>
          )}

          {loading ? (
            <ActivityIndicator size="large" color="#ffb855" />
          ) : (
            <View />
          )}

          <TouchableOpacity
            style={styles.refreshButton}
            activeOpacity={0.5}
            onPress={() => dispatch(getFormsRequest())}
          >
            <MdIcon name="refresh" size={24} color="#fff" />
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>

          {Platform.OS !== 'web' ? (
            <Text style={styles.title}>Preenchimentos a enviar:</Text>
          ) : (
            <View />
          )}

          {formsToSend.length !== 0 ? (
            formsToSend.map((form) => (
              <TouchableOpacity
                key={form.fill.key}
                style={styles.formBox}
                onPress={() => nav.navigate('Fill', form)}
                activeOpacity={0.5}
              >
                <Text style={styles.formTitle}>{form.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noFormText}>
              {Platform.OS !== 'web' ? 'Não há preenchimentos pendentes.' : ''}
            </Text>
          )}

          {Platform.OS !== 'web' ? (
            <TouchableOpacity
              style={styles.refreshButton}
              activeOpacity={0.5}
              onPress={pendentForms}
            >
              <MdIcon name="refresh" size={24} color="#fff" />
              <Text style={styles.refreshButtonText}>Atualizar</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {Platform.OS === 'web' ? (
            <button
              type="button"
              style={htmlStyles.logoutButton}
              onClick={handleLogout}
            >
              <McIcon name="logout" size={24} color="#fff" />
              <span style={htmlStyles.logoutButtonText}>Sair</span>
            </button>
          ) : (
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.5}
              onPress={handleLogout}
            >
              <McIcon name="logout" size={24} color="#fff" />
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
