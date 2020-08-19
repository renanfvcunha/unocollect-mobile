import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {
  MaterialIcons as MdIcon,
  MaterialCommunityIcons as McIcon,
} from '@expo/vector-icons';

import styles from './styles';
import { loginRequest } from '../../store/modules/auth/actions';
import logo from '../../../assets/logoUnoCollect.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(loginRequest(username, password));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.logoImg} />

        <Text style={styles.welcomeTxt}>Bem-Vindo(a)!</Text>
        <Text style={styles.welcomeLoginTxt}>Faça o login para continuar.</Text>

        <View style={styles.textInput}>
          <MdIcon name="person" color="rgba(0, 0, 0, 0.5)" size={24} />
          <TextInput
            placeholder="Usuário"
            style={styles.input}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.textInput}>
          <MdIcon name="lock" color="rgba(0, 0, 0, 0.5)" size={24} />
          <TextInput
            placeholder="Senha"
            ref={passwordRef}
            style={styles.input}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            secureTextEntry
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>

        <TouchableOpacity
          style={styles.subButton}
          activeOpacity={0.5}
          onPress={() => handleSubmit()}
        >
          <McIcon name="login" size={24} color="#fff" />
          <Text style={styles.subButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
