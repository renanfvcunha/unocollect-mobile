import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {} from '@react-navigation/native';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { askAsync, CAMERA_ROLL } from 'expo-permissions';
import PropTypes from 'prop-types';

import styles from './styles';
import { Form } from '../../store/modules/forms/types';

interface IForm {
  route: {
    params: Form;
  };
}

const Fill: React.FC<IForm> = ({ route }) => {
  const form = route.params;
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    try {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const newImage = [...images];
        newImage.push(result.uri);
        setImages(newImage);
      }
    } catch (err) {
      Alert.alert('Erro', err);
    }
  };

  const removeImage = (i: number) => {
    Alert.alert('', 'Deseja remover esta imagem?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Ok',
        style: 'destructive',
        onPress: () => {
          const removedImage = [...images];
          removedImage.splice(i, 1);

          setImages(removedImage);
        },
      },
    ]);
  };

  const imagesField = [];
  if (images) {
    for (let i = 0; i < images.length; i += 1) {
      imagesField.push(
        <View key={i} style={styles.img}>
          <Image source={{ uri: images[i] }} style={styles.imgSelected} />
          <View style={{ position: 'absolute', right: 0 }}>
            <TouchableOpacity onPress={() => removeImage(i)}>
              <MdIcon name="cancel" color="#f44336" size={16} />
            </TouchableOpacity>
          </View>
        </View>,
      );
    }
  }

  useEffect(() => {
    const getPermission = async () => {
      if (Constants.platform?.ios) {
        const { status } = await askAsync(CAMERA_ROLL);

        if (status !== 'granted') {
          Alert.alert('Erro', 'Precisamos de acesso à câmera para continuar.');
        }
      }
    };

    getPermission();
  }, []);

  const fields = [];
  if (form.fields) {
    for (let i = 0; i < form.fields.length; i += 1) {
      fields.push(
        <View key={form.fields[i].id} style={styles.textInput}>
          <TextInput style={styles.input} placeholder={form.fields[i].name} />
          <Text style={styles.inputDesc}>{form.fields[i].description}</Text>
        </View>,
      );
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.formName}>{form.title}</Text>
        <Text style={styles.formDesc}>{form.description}</Text>

        {/* <Button title="Adicionar Imagem" onPress={pickImage} /> */}
        <TouchableOpacity
          style={styles.addImgBtn}
          activeOpacity={0.5}
          onPress={pickImage}
        >
          <MdIcon name="add-a-photo" color="#fff" size={24} />
          <Text style={styles.addImgText}>Adicionar Imagem</Text>
        </TouchableOpacity>
        <View style={styles.imgArr}>{imagesField}</View>

        {fields}

        <TouchableOpacity style={styles.subButton} activeOpacity={0.5}>
          <Text style={styles.subButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

Fill.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fields: PropTypes.array.isRequired, // eslint-disable-line
    }).isRequired,
  }).isRequired,
};

export default Fill;
