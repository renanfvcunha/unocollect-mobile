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
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { askAsync, CAMERA_ROLL } from 'expo-permissions';

import styles from './styles';

const Fill: React.FC = () => {
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.formName}>Formulário de Teste</Text>
        <Text style={styles.formDesc}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,
          voluptas!
        </Text>

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

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 1" />
          <Text style={styles.inputDesc}>Descrição do campo 1</Text>
        </View>

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 2" />
          <Text style={styles.inputDesc}>Descrição do campo 2</Text>
        </View>

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 3" />
          <Text style={styles.inputDesc}>Descrição do campo 3</Text>
        </View>

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 4" />
          <Text style={styles.inputDesc}>Descrição do campo 4</Text>
        </View>

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 5" />
          <Text style={styles.inputDesc}>Descrição do campo 5</Text>
        </View>

        <View style={styles.textInput}>
          <TextInput style={styles.input} placeholder="Campo 6" />
          <Text style={styles.inputDesc}>Descrição do campo 6</Text>
        </View>

        <TouchableOpacity style={styles.subButton} activeOpacity={0.5}>
          <Text style={styles.subButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Fill;
