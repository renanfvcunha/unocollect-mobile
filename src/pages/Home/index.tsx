import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../../assets/logoUnoCollect.png';

const Home: React.FC = () => {
  const nav = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle}>Olá, Sued!</Text>
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
    </SafeAreaView>
  );
};

export default Home;
