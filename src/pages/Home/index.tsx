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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MaterialCommunityIcons as McIcon,
  MaterialIcons as MdIcon,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import { ApplicationState } from '../../store';
import { Field } from '../../store/modules/forms/types';
import { Fill } from '../../store/modules/fills/types';
import { logout } from '../../store/modules/auth/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import squaresTop from '../../../assets/squaresTop.png';
import squaresBottom from '../../../assets/squaresBottom.png';

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
            forms.map((form) => (
              <TouchableOpacity
                key={form.id}
                style={styles.formBox}
                onPress={() => nav.navigate('Fill', form)}
                activeOpacity={0.5}
              >
                <Text style={styles.formTitle}>{form.title}</Text>
                <Text style={styles.formDescription}>
                  {form.description ? form.description : 'Sem descrição'}
                </Text>
              </TouchableOpacity>
            ))
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

          <Text style={styles.title}>Preenchimentos a enviar:</Text>

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
              Não há preenchimentos pendentes.
            </Text>
          )}

          <TouchableOpacity
            style={styles.refreshButton}
            activeOpacity={0.5}
            onPress={pendentForms}
          >
            <MdIcon name="refresh" size={24} color="#fff" />
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.5}
            onPress={handleLogout}
          >
            <McIcon name="logout" size={24} color="#fff" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
