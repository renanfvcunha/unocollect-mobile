import React, { useState, useEffect, useCallback } from 'react';
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
  Platform,
} from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { Form, Field } from '../../store/modules/forms/types';
import { Img, Fill as FillType, Value } from '../../store/modules/fills/types';
import { ApplicationState } from '../../store';
import {
  addFillRequest,
  setSuccessFalse,
} from '../../store/modules/fills/actions';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import squaresTop from '../../../assets/squaresTop.png';
import squaresBottom from '../../../assets/squaresBottom.png';

interface IForm {
  route: {
    params: Form;
  };
}

interface IFill {
  id?: number;
  title?: string;
  description?: string;
  fields?: Field[];
  fill: FillType;
}

const Fill: React.FC<IForm> = ({ route }) => {
  const form = route.params;
  const nav = useNavigation();

  const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  );
  const loading = useSelector((state: ApplicationState) => state.fills.loading);
  const success = useSelector((state: ApplicationState) => state.fills.success);
  const invalidToken = useSelector(
    (state: ApplicationState) => state.auth.invalidToken,
  );

  const [images, setImages] = useState<Img[]>([]);
  const [formValues, setFormValues] = useState<Value[]>([]);

  const removeFill = useCallback(async () => {
    if (success && form.fill?.key) {
      const data = await AsyncStorage.getItem('fills');

      if (data !== null) {
        const parsedData: IFill[] = JSON.parse(data);

        const fills = parsedData.filter(
          (fillToRemove) => fillToRemove.fill.key !== form.fill?.key,
        );

        await AsyncStorage.setItem('fills', JSON.stringify(fills));
      }
    }
  }, [success, form.fill?.key]);

  const dispatch = useDispatch();

  const pickImageFromCamera = async () => {
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

  const pickImageFromGallery = async () => {
    try {
      const result = await launchImageLibraryAsync({
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
    if (!form.fill?.key) {
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
    } else {
      Alert.alert(
        'Erro',
        'Não é possível remover imagens em formulários já preenchidos.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  };

  const handleCheckedRadio = (i: number, option: string) => {
    if (!form.fill?.key) {
      const newValue = [...formValues];

      const value = {
        ...newValue[i],
        value: option,
      };

      newValue[i] = value;

      setFormValues(newValue);
    }
  };

  const handleCheckedBox = (i: number, option: string, actualValue: string) => {
    if (!form.fill?.key) {
      let aux: string[] = [];
      if (actualValue) {
        aux = actualValue.split(', ');
      }

      const optionExists = aux.find((item) => item === option);

      if (optionExists) {
        const auxIndex = aux.findIndex((item) => item === option);
        aux.splice(auxIndex, 1);
      } else {
        aux.push(option);
      }

      const auxStr = aux.join(', ');

      const newValue = [...formValues];

      const value = {
        ...newValue[i],
        value: auxStr,
      };

      newValue[i] = value;

      setFormValues(newValue);
    }
  };

  const checkedBox = (option: string, actualValue: string) => {
    let aux: string[] = [];
    if (actualValue) {
      aux = actualValue.split(', ');
    }

    const optionExists = aux.find((item) => item === option);

    if (optionExists) {
      return true;
    }

    return false;
  };

  const handleChangeValue = (
    i: number,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (!form.fill?.key) {
      const newValue = [...formValues];

      const value = {
        ...newValue[i],
        value: e.nativeEvent.text,
      };

      newValue[i] = value;

      setFormValues(newValue);
    }
  };

  const generateFillKey = () => {
    const min = Math.ceil(1000);
    const max = Math.ceil(9999);

    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * Submissão do formulário
   */
  const handleSubmit = () => {
    /* Verificando se os campos obrigatórios estão preenchidos. */
    const emptyRequired = formValues.findIndex(
      (value) => value.required && value.value === '',
    );

    if (emptyRequired !== -1) {
      Alert.alert(
        'Ops...',
        'Verifique se preencheu todos os campos obrigatórios. (marcados com *)',
      );
      return;
    }

    const jsonData = {
      ...form,
      fill: {
        key: form.fill?.key || generateFillKey(),
        latitude,
        longitude,
        formValues: formValues.map((value) => ({
          fieldId: value.fieldId,
          value: value.value,
        })),
        date: new Date(),
        images,
      },
    };

    /**
     * Verificando se usuário está com acesso à internet para envio direto do
     * formulário. Caso contrário o formulário será salvo no async storage
     * até que o usuário obtenha acesso à internet.
     */
    NetInfo.fetch().then(async (state) => {
      if (state.isInternetReachable) {
        if (!form.fill?.key) {
          /**
           * Convertendo json dos valores em string
           */
          const values = jsonData.fill.formValues.map((value) =>
            JSON.stringify(value),
          );
          /**
           * Criando campos utilizando o FormData
           */
          const submit = new FormData();
          submit.append('latitude', String(jsonData.fill.latitude));
          submit.append('longitude', String(jsonData.fill.longitude));
          submit.append('date', String(jsonData.fill.date));
          for (let i = 0; i < jsonData.fill.formValues.length; i += 1) {
            submit.append(`values[${i}]`, values[i]);
          }
          if (jsonData.fill.images) {
            for (let i = 0; i < jsonData.fill.images.length; i += 1) {
              submit.append('image', {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                uri: images[i].uri,
                name: images[i].name,
                type: images[i].type,
              });
            }
          }

          dispatch(addFillRequest(submit, String(form.id)));
        } else {
          /**
           * Convertendo json dos valores em string
           */

          let values: string[] = [];
          if (form.fill.formValues) {
            values = form.fill.formValues.map((value) => JSON.stringify(value));
          }

          /**
           * Criando campos utilizando o FormData
           */
          const submit = new FormData();
          submit.append('latitude', String(form.fill.latitude));
          submit.append('longitude', String(form.fill.longitude));
          submit.append('date', String(form.fill.date));
          if (form.fill.formValues) {
            for (let i = 0; i < form.fill.formValues.length; i += 1) {
              submit.append(`values[${i}]`, values[i]);
            }
          }
          if (form.fill.images) {
            for (let i = 0; i < form.fill.images.length; i += 1) {
              submit.append('image', {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                uri: images[i].uri,
                name: images[i].name,
                type: images[i].type,
              });
            }
          }
          dispatch(addFillRequest(submit, String(form.id)));
        }
      } else {
        if (form.fill?.key) {
          Alert.alert(
            'Erro',
            'Este formulário já foi preenchido. Certifique-se de estar em uma conexão ativa para enviá-lo.',
          );
          return;
        }

        const fill: IFill[] = [];

        const setFill = async () => {
          try {
            const fillsData = await AsyncStorage.getItem('fills');
            if (fillsData === null) {
              fill.push(jsonData);
              await AsyncStorage.setItem('fills', JSON.stringify(fill));
            } else {
              const fillsParsed: IFill[] = JSON.parse(fillsData);
              fillsParsed.push(jsonData);
              await AsyncStorage.setItem('fills', JSON.stringify(fillsParsed));
            }
          } catch (err) {
            Alert.alert('', err);
          }
        };

        await setFill();

        Alert.alert(
          'Aviso',
          'Você está offline. Os dados serão salvos no dispositivo até a inicialização da aplicação em uma conexão ativa para que possam ser enviados.',
        );

        nav.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    });
  };

  if (form.fields.length !== 0) {
    for (let i = 0; i < form.fields.length; i += 1) {
      formValues.push({
        fieldId: form.fields[i].id,
        value: '',
        required: form.fields[i].required,
      });

      formValues.splice(form.fields.length);
    }
  }

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    const getPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert('Erro', 'Precisamos de acesso à câmera para continuar.');
        }
      }
    };

    getPermission();
  }, []);

  useEffect(() => {
    if (form.fill) {
      setImages(form.fill.images || []);
      setFormValues(form.fill.formValues || []);
    }
  }, [form.fill]);

  useEffect(() => {
    const rmFill = async () => {
      await removeFill();
      if (success) {
        dispatch(setSuccessFalse());
        nav.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    };

    rmFill();
  }, [removeFill, success, dispatch, nav]);

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
          <Text style={styles.formName}>{form.title}</Text>
          {form.description ? (
            <Text style={styles.formDesc}>{form.description}</Text>
          ) : (
            <Text />
          )}

          <TouchableOpacity
            style={styles.addImgBtn}
            activeOpacity={0.5}
            onPress={() => {
              if (!form.fill?.key) {
                Alert.alert('', 'Adicionar Imagem...', [
                  {
                    text: 'Da Galeria',
                    style: 'default',
                    onPress: () => pickImageFromGallery(),
                  },
                  {
                    text: 'Da Câmera',
                    style: 'default',
                    onPress: () => pickImageFromCamera(),
                  },
                ]);
              } else {
                Alert.alert(
                  'Erro',
                  'Não é possível adicionar imagens em formulários já preenchidos.',
                );
              }
            }}
          >
            <MdIcon name="add-a-photo" color="#000" size={24} />
            <Text style={styles.addImgText}>Adicionar Imagem</Text>
          </TouchableOpacity>
          <View style={styles.imgArr}>
            {images.length !== 0 ? (
              images.map((image, i) => (
                <View key={image.name} style={styles.img}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imgSelected}
                  />
                  <View style={{ position: 'absolute', right: 0 }}>
                    <TouchableOpacity onPress={() => removeImage(i)}>
                      <MdIcon name="cancel" color="#f44336" size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View />
            )}
          </View>

          <View style={styles.fieldsBox}>
            {form.fields.length !== 0 ? (
              form.fields.map((field, i) => (
                <View key={field.id}>
                  {field.type === 'text' ? (
                    <View style={styles.textInput}>
                      <View style={styles.inputNameAndDesc}>
                        <Text style={styles.inputName}>
                          {field.name + (field.required ? ' *' : '')}
                        </Text>
                        {field.description ? (
                          <Text style={styles.inputDesc}>
                            ({field.description})
                          </Text>
                        ) : (
                          <View />
                        )}
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="#ffb855"
                        value={formValues[i].value}
                        onChange={(e) => handleChangeValue(i, e)}
                      />
                    </View>
                  ) : (
                    <View />
                  )}

                  {field.type === 'radio' ? (
                    <View style={styles.textInput}>
                      <View style={styles.inputNameAndDesc}>
                        <Text style={styles.inputName}>
                          {field.name + (field.required ? ' *' : '')}
                        </Text>
                        {field.description ? (
                          <Text style={styles.inputDesc}>
                            ({field.description})
                          </Text>
                        ) : (
                          <View />
                        )}
                      </View>
                      {field.options?.map((option) => (
                        <View key={option} style={styles.options}>
                          <RadioButton
                            value={option}
                            status={
                              formValues[i].value === option
                                ? 'checked'
                                : 'unchecked'
                            }
                            color="#ffb855"
                            onPress={() => handleCheckedRadio(i, option)}
                          />
                          <Text>{option}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View />
                  )}

                  {field.type === 'checkbox' ? (
                    <View style={styles.textInput}>
                      <View style={styles.inputNameAndDesc}>
                        <Text style={styles.inputName}>
                          {field.name + (field.required ? ' *' : '')}
                        </Text>
                        {field.description ? (
                          <Text style={styles.inputDesc}>
                            ({field.description})
                          </Text>
                        ) : (
                          <View />
                        )}
                      </View>
                      {field.options?.map((option) => (
                        <View key={option} style={styles.options}>
                          <Checkbox
                            status={
                              checkedBox(option, formValues[i].value)
                                ? 'checked'
                                : 'unchecked'
                            }
                            color="#ffb855"
                            onPress={() =>
                              handleCheckedBox(i, option, formValues[i].value)
                            }
                          />
                          <Text>{option}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              ))
            ) : (
              <View />
            )}

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#ffb855"
                style={{ marginBottom: 16 }}
              />
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
        </View>
      </ScrollView>
    </>
  );
};

Fill.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
          type: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string.isRequired),
          required: PropTypes.bool.isRequired,
        }).isRequired,
      ).isRequired,
      fill: PropTypes.shape({
        key: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        formValues: PropTypes.arrayOf(
          PropTypes.shape({
            fieldId: PropTypes.number.isRequired,
            value: PropTypes.string,
          }).isRequired,
        ).isRequired,
        date: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            uri: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default Fill;
