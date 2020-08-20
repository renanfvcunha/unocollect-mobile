import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as McIcon } from '@expo/vector-icons';

import styles from './styles';
import { ApplicationState } from '../../store';
import { logout } from '../../store/modules/auth/actions';
import { getFormsRequest } from '../../store/modules/forms/actions';
import logoImg from '../../../assets/logoUnoCollect.png';

const Home: React.FC = () => {
  const nav = useNavigation();
  const name = useSelector((state: ApplicationState) => state.auth.user.name);
  const forms = useSelector((state: ApplicationState) => state.forms.forms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormsRequest());
  }, [dispatch]);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Olá, {name?.split(' ')[0]}!</Text>
          <Image source={logoImg} style={styles.welcomeImg} />
        </View>
        <Text style={styles.title}>Formulários a preencher</Text>

        {forms.map((form) => (
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
        ))}

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
