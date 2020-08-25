import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log('Inicio correcto');
        })
        .catch(() => {
          setFormError({
            email: true,
            password: false,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text}); //type el nombre de del valor,
    //lo ponemos entre corchetes para que sea dinámico y guarde todos los nombres de los valores
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}
      />
      <TouchableOpacity onPress={login}>
        <Text style={styles.btnText}>Inciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 40,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  register: {
    marginTop: 115,
    marginBottom: 50,
  },
  error: {
    borderColor: '#940c0c',
  },
});
