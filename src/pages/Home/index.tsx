import React, { useEffect } from 'react';
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

import styles from './styles';
import { ApplicationState } from '../../store';
import { logout } from '../../store/modules/auth/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import logoImg from '../../../assets/logoUnoCollect.png';
import tron from '../../config/ReactotronConfig';

const Home: React.FC = () => {
  const nav = useNavigation();
  const name = useSelector((state: ApplicationState) => state.auth.user.name);
  const forms = useSelector((state: ApplicationState) => state.forms.forms);
  const loading = useSelector((state: ApplicationState) => state.forms.loading);

  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert('', 'Deseja sair da aplicação?', [
      {
        text: 'Voltar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  useEffect(() => {
    dispatch(getFormsRequest());
  }, [dispatch]);

  useEffect(() => {
    // const fills: Fill[] = [];

    const getFills = async () => {
      try {
        const data = await AsyncStorage.getItem('fills');
        if (data !== null) {
          if (tron.log) {
            tron.log(JSON.parse(data));
          }
        }
      } catch (err) {
        Alert.alert('', err);
      }
    };

    getFills();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Olá, {name?.split(' ')[0]}!</Text>
          <Image source={logoImg} style={styles.welcomeImg} />
        </View>
        <Text style={styles.title}>Formulários a preencher</Text>

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
          <View>
            <Text>Nenhum formulário.</Text>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#3f51b5" />
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
  );
};

export default Home;
