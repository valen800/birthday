import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';

import {validateEmail} from '../utils/validations'; //No es exportación default, se pone entre llaves y se llama a la función
import firebase from '../utils/firebase';

export default function RegisterForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 8) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log('Cuenta creada');
        })
        .catch(() => {
          console.log('Error al registrar la cuenta');
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
        });
    }
    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})} //...formData para obtener el valor y actualizarlo
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, password: e.nativeEvent.text})
        }
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Repetir contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
      />
      <TouchableOpacity onPress={register}>
        <Text style={styles.btnText}>Regístrate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeForm} style={styles.login}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </>
  );
}

function defaultValue() {
  return {email: '', password: '', repeatPassword: ''};
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
  login: {
    marginTop: 50,
    marginBottom: 50,
  },
  error: {
    borderColor: '#940c0c',
  },
});
