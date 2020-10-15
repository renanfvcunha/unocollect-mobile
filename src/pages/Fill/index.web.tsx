import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { styles, htmlStyles } from './styles';
import { Form } from '../../store/modules/forms/types';
import { Value } from '../../store/modules/fills/types';
import { ApplicationState } from '../../store';
import {
  addFillRequest,
  setSuccessFalse,
} from '../../store/modules/fills/actions';
import { checkTokenRequest, logout } from '../../store/modules/auth/actions';
import squaresTop from '../../../assets/squaresTop.png';
import squaresBottom from '../../../assets/squaresBottom.png';
import swAlert from '../../utils/alert';

interface IForm {
  route: {
    params: Form;
  };
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

  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Value[]>([]);

  const dispatch = useDispatch();

  const pickImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { files } = e.target;
      const newImages: File[] = [];
      const newImagesUrl: string[] = [];
      for (let i = 0; i < files.length; i += 1) {
        newImages.push(files[i]);
        newImagesUrl.push(URL.createObjectURL(files[i]));
      }

      const addImages = [...images];
      addImages.push(...newImages);
      setImages(newImages);

      const addImagesUrl = [...imagesUrl];
      addImagesUrl.push(...newImagesUrl);
      setImagesUrl(addImagesUrl);
    }
  };

  const removeImage = (i: number) => {
    swAlert(
      'warning',
      'Aviso',
      'Deseja remover esta imagem?',
      'REMOVER',
      true,
      undefined,
      '#f44336',
    ).then((result) => {
      if (result.isConfirmed) {
        const removedImageUrl = [...imagesUrl];
        removedImageUrl.splice(i, 1);
        setImagesUrl(removedImageUrl);

        const removedImage = [...images];
        removedImage.splice(i, 1);
        setImages(removedImage);
      }
    });
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
    /* Verificando se os campos obrigatórios estão preenchidos. */
    const emptyRequired = formValues.findIndex(
      (value) => value.required && value.value === '',
    );

    if (emptyRequired !== -1) {
      swAlert(
        'warning',
        'Ops...',
        'Verifique se preencheu todos os campos obrigatórios. (marcados com *)',
      );

      return;
    }

    /**
     * Removendo campo required do formValues
     */
    const formValuesParsed = formValues.map((value) => ({
      fieldId: value.fieldId,
      value: value.value,
    }));

    /**
     * Convertendo json dos valores em string
     */
    const values = formValuesParsed.map((value) => JSON.stringify(value));
    /**
     * Criando campos utilizando o FormData
     */
    const submit = new FormData();
    submit.append('latitude', String(latitude));
    submit.append('longitude', String(longitude));
    submit.append('date', String(new Date()));
    for (let i = 0; i < formValues.length; i += 1) {
      submit.append(`values[${i}]`, values[i]);
    }
    if (images !== []) {
      for (let i = 0; i < images.length; i += 1) {
        submit.append('image', images[i]);
      }
    }

    dispatch(addFillRequest(submit, String(form.id)));
  };

  for (let i = 0; i < form.fields.length; i += 1) {
    formValues.push({
      fieldId: form.fields[i].id,
      value: '',
      required: form.fields[i].required,
    });

    formValues.splice(form.fields.length);
  }

  useEffect(() => {
    dispatch(checkTokenRequest());

    if (invalidToken) {
      dispatch(logout());
    }
  }, [dispatch, invalidToken]);

  useEffect(() => {
    if (success) {
      dispatch(setSuccessFalse());
      nav.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [success, dispatch, nav]);

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

          <label htmlFor="image">
            <TouchableOpacity style={styles.addImgBtn} activeOpacity={0.5}>
              <MdIcon name="add-a-photo" color="#000" size={24} />
              <Text style={styles.addImgText}>Adicionar Imagem</Text>
            </TouchableOpacity>
            <input
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={pickImage}
              style={{ display: 'none' }}
            />
          </label>

          <View style={styles.imgArr}>
            {imagesUrl.length !== 0 ? (
              imagesUrl.map((image, i) => (
                <View key={image} style={styles.img}>
                  <Image source={{ uri: image }} style={styles.imgSelected} />
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
            {form.fields.map((field, i) => (
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
            ))}

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#ffb855"
                style={{ marginBottom: 16 }}
              />
            ) : (
              <View />
            )}

            {/* <TouchableOpacity
              style={styles.subButton}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text style={styles.subButtonText}>Enviar</Text>
            </TouchableOpacity> */}
            <button
              type="button"
              style={htmlStyles.subButton}
              onClick={handleSubmit}
            >
              <span style={htmlStyles.subButtonText}>Enviar</span>
            </button>
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
