import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

export default function LoginForm(props) {
  const {changeForm} = props;

  return (
    <>
      <TouchableOpacity onPress={changeForm}>
        <Text style={styles.btnText}>Regístrate</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});
