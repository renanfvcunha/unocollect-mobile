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
} from 'react-native';
import {} from '@react-navigation/native';
import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import Constants from 'expo-constants';
import { MaterialIcons as MdIcon } from '@expo/vector-icons';
import { askAsync, CAMERA_ROLL } from 'expo-permissions';
import PropTypes from 'prop-types';

import styles from './styles';
import { Form } from '../../store/modules/forms/types';
import { Img } from '../../store/modules/fills/types';
import { addFill, setForms } from '../../store/modules/forms/actions';
import { ApplicationState } from '../../store';
import tron from '../../config/ReactotronConfig';

interface IForm {
  route: {
    params: Form;
  };
}

interface Values {
  fieldId?: number;
  value: string;
}

const Fill: React.FC<IForm> = ({ route }) => {
  const form = route.params;

  const latitude = useSelector(
    (state: ApplicationState) => state.fills.fill.latitude,
  );
  const longitude = useSelector(
    (state: ApplicationState) => state.fills.fill.longitude,
  );
  const forms = useSelector((state: ApplicationState) => state.forms.forms);

  const [images, setImages] = useState<Img[]>([]);
  const [formValues, setFormValues] = useState<Values[]>([]);

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

  const handleSubmit = () => {
    const values = formValues.map((value) => JSON.stringify(value));

    const data = new FormData();
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    for (let i = 0; i < values.length; i += 1) {
      data.append(`values[${i}]`, values[i]);
    }
    if (images) {
      for (let i = 0; i < images.length; i += 1) {
        data.append('image', {
          uri: images[i].uri,
          name: images[i].name,
          type: images[i].type,
        });
      }
    }

    const formFilled = {
      id: form.id,
      title: form.title,
      description: form.description,
      fields: form.fields,
      fill: data,
    };

    const newForms = forms;
    const index = newForms.findIndex((oldForm: Form) => oldForm.id === form.id);
    newForms.splice(index, 1);
    newForms.push(formFilled);

    dispatch(setForms(newForms));
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
