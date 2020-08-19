import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as McIcon } from '@expo/vector-icons';

import styles from './styles';
import { ApplicationState } from '../../store';
import { logout } from '../../store/modules/auth/actions';
import logoImg from '../../../assets/logoUnoCollect.png';

const Home: React.FC = () => {
  const nav = useNavigation();
  const name = useSelector((state: ApplicationState) => state.auth.user.name);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle}>Olá, {name?.split(' ')[0]}!</Text>
        <Image source={logoImg} style={styles.welcomeImg} />
      </View>
      <Text style={styles.title}>Formulários a preencher</Text>

      <TouchableOpacity
        style={styles.formBox}
        onPress={() => nav.navigate('Fill')}
      >
        <Text style={styles.formTitle}>Lorem ipsum dolor sit amet.</Text>
        <Text style={styles.formDescription}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, qui?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.formBox}>
        <Text style={styles.formTitle}>Lorem ipsum dolor sit amet.</Text>
        <Text style={styles.formDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          voluptate?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.formBox}>
        <Text style={styles.formTitle}>Lorem ipsum dolor sit amet.</Text>
        <Text style={styles.formDescription}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, et.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.5}
        onPress={() => dispatch(logout())}
      >
        <McIcon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
