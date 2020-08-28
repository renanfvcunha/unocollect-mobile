import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { askAsync, CAMERA_ROLL } from 'expo-permissions';
import PropTypes from 'prop-types';

import styles from './styles';
import { Form } from '../../store/modules/forms/types';
import { Img, Fill as FillType } from '../../store/modules/fills/types';

import { ApplicationState } from '../../store';
import { addFillRequest } from '../../store/modules/fills/actions';

interface IForm {
  route: {
    params: Form;
  };
}

interface Values {
  fieldId?: number;
  value: string;
}

interface IFill {
  formId?: number;
  fill: FillType;
}

const Fill: React.FC<IForm> = ({ route }) => {
  const form = route.params;

  const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  );
  const loading = useSelector((state: ApplicationState) => state.fills.loading);

  const [images, setImages] = useState<Img[]>([]);
  const [formValues, setFormValues] = useState<Values[]>([]);
  const [showOffText, setShowOffText] = useState(false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    try {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const { uri } = result;
        const name = uri.split('/').pop();
        const type = `image/${uri.split('.').pop()}`;

        const newImage = [...images];
        if (uri && name && type) {
          const image = { uri, name, type };
          newImage.push(image);
          setImages(newImage);
        }
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
          <Image source={{ uri: images[i].uri }} style={styles.imgSelected} />
          <View style={{ position: 'absolute', right: 0 }}>
            <TouchableOpacity onPress={() => removeImage(i)}>
              <MdIcon name="cancel" color="#f44336" size={16} />
            </TouchableOpacity>
          </View>
        </View>,
      );
    }
  }

  const handleChangeValue = (
    i: number,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newValue = [...formValues];

    const value = {
      ...newValue[i],
      value: e.nativeEvent.text,
    };

    newValue[i] = value;

    setFormValues(newValue);
  };

  /**
   * Submissão do formulário
   */
  const handleSubmit = () => {
    const jsonData = {
      formId: form.id,
      fill: {
        latitude,
        longitude,
        formValues,
        date: new Date(),
        images,
      },
    };

    const fills: IFill[] = [];

    const setFill = async () => {
      try {
        const fillsData = await AsyncStorage.getItem('fills');
        if (fillsData === null) {
          fills.push(jsonData);
          await AsyncStorage.setItem('fills', JSON.stringify(fills));
        } else {
          const fillsParsed: IFill[] = JSON.parse(fillsData);
          if (fillsParsed.findIndex((fill) => fill.formId === form.id) === -1) {
            fillsParsed.push(jsonData);
            await AsyncStorage.setItem('fills', JSON.stringify(fillsParsed));
          }
        }
      } catch (err) {
        Alert.alert('', err);
      }
    };

    setFill();

    /**
     * Verificando se usuário está com acesso à internet para envio direto do
     * formulário. Caso contrário o formulário será salvo no async storage
     * até que o usuário obtenha acesso à internet.
     */
    NetInfo.fetch().then((state) => {
      if (state.isInternetReachable) {
        const submitForm = async () => {
          try {
            const data = await AsyncStorage.getItem('fills');
            if (data !== null) {
              const parsedData: IFill[] = JSON.parse(data);

              const formData = parsedData.find(
                (fill) => fill.formId === form.id,
              );

              if (formData) {
                if (
                  formData.fill.latitude &&
                  formData.fill.longitude &&
                  formData.fill.formValues &&
                  formData.fill.date
                ) {
                  /**
                   * Convertendo json dos valores em string
                   */
                  const values = formData.fill.formValues.map((value) =>
                    JSON.stringify(value),
                  );

                  /**
                   * Criando campos utilizando o FormData
                   */
                  const submit = new FormData();
                  submit.append('latitude', String(formData.fill.latitude));
                  submit.append('longitude', String(formData.fill.longitude));
                  submit.append('date', String(formData.fill.date));
                  for (let i = 0; i < formData.fill.formValues.length; i += 1) {
                    submit.append(`values[${i}]`, values[i]);
                  }
                  if (formData.fill.images) {
                    for (let i = 0; i < formData.fill.images.length; i += 1) {
                      submit.append('image', {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore: Unreachable code error
                        uri: images[i].uri,
                        name: images[i].name,
                        type: images[i].type,
                      });
                    }
                  }
                  dispatch(addFillRequest(submit, String(formData.formId)));
                }
              }
            }
          } catch (err) {
            Alert.alert('', err);
          }
        };
        submitForm();
      } else {
        setShowOffText(true);
      }
    });
  };

  const fields = [];
  if (form.fields) {
    for (let i = 0; i < form.fields.length; i += 1) {
      formValues.push({
        fieldId: form.fields[i].id,
        value: '',
      });

      fields.push(
        <View key={form.fields[i].id} style={styles.textInput}>
          <TextInput
            style={styles.input}
            placeholder={form.fields[i].name}
            value={formValues[i].value}
            onChange={(e) => handleChangeValue(i, e)}
          />
          <Text style={styles.inputDesc}>{form.fields[i].description}</Text>
        </View>,
      );

      formValues.splice(form.fields.length);
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

  useEffect(() => {
    const getFills = async () => {
      try {
        const data = await AsyncStorage.getItem('fills');
        if (data !== null) {
          const parsedData: IFill[] = JSON.parse(data);

          const formData = parsedData.find((fill) => fill.formId === form.id);

          if (formData) {
            if (formData.fill.images && formData.fill.formValues) {
              setImages(formData.fill.images);
              setFormValues(formData.fill.formValues);
            }
          }
        }
      } catch (err) {
        Alert.alert('', err);
      }
    };

    getFills();
  }, [form.id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.formName}>{form.title}</Text>
        <Text style={styles.formDesc}>{form.description}</Text>

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

        {loading ? (
          <ActivityIndicator size="large" color="#3f51b5" />
        ) : (
          <View />
        )}

        {showOffText ? (
          <View style={styles.offView}>
            <Text style={styles.offText}>
              Você está offline. Os dados serão salvos no dispositivo até a
              inicialização da aplicação em uma conexão ativa para que possam
              ser enviados.
            </Text>
          </View>
        ) : (
          <View />
        )}

        <TouchableOpacity
          style={styles.subButton}
          activeOpacity={0.5}
          onPress={handleSubmit}
        >
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
