import React, {useState, useEffect} from 'react';
import {
  Statusbar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Button,
} from 'react-native';
import firebase from './src/utils/firebase';
import 'firebase/auth';

import Auth from './src/components/Auth';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? (
          <View>
            <Logout />
          </View>
        ) : (
          <Auth />
        )}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <View>
      <Text>Estas Logueado</Text>
      <Button title="Cerrar sesión" onPress={logout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
