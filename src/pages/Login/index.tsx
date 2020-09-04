import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {
  MaterialIcons as MdIcon,
  MaterialCommunityIcons as McIcon,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import { ApplicationState } from '../../store';
import { loginRequest } from '../../store/modules/auth/actions';
import logo from '../../../assets/logoUnoCollect.png';
import squaresTop from '../../../assets/squaresTop.png';
import squaresBottom from '../../../assets/squaresBottom.png';

const Login: React.FC = () => {
  const loading = useSelector((state: ApplicationState) => state.auth.loading);

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
        <LinearGradient
          colors={['#403f3f', '#302d2d']}
          start={[0, 0]}
          end={[1.0, 0]}
          style={styles.linearGradient}
        >
          <Image source={squaresTop} style={styles.squaresTop} />
          <Image source={squaresBottom} style={styles.squaresBottom} />
        </LinearGradient>

        <View style={{ marginBottom: '20%', alignItems: 'center' }}>
          <Image source={logo} style={styles.logoImg} />

          <View style={styles.loginBox}>
            <View style={styles.textInput}>
              <MdIcon name="person" color="rgba(56, 53, 53, 0.5)" size={24} />
              <TextInput
                placeholder="USUÁRIO"
                style={styles.input}
                placeholderTextColor="rgba(56, 53, 53, 0.5)"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.textInput}>
              <MdIcon name="lock" color="#ffb855" size={24} />
              <TextInput
                placeholder="SENHA"
                ref={passwordRef}
                style={styles.input}
                placeholderTextColor="#ffb855"
                secureTextEntry
                returnKeyType="send"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSubmit}
              />
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#c88824" />
            ) : (
              <View />
            )}

            <TouchableOpacity
              style={styles.subButton}
              activeOpacity={0.5}
              onPress={() => handleSubmit()}
            >
              <McIcon name="login" size={24} color="#383636" />
              <Text style={styles.subButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
