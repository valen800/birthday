import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBG7pWRrkgLqzGq9P09p7YiuqRsI6ExhIY',
  authDomain: 'birthday-8e46f.firebaseapp.com',
  databaseURL: 'https://birthday-8e46f.firebaseio.com',
  projectId: 'birthday-8e46f',
  storageBucket: 'birthday-8e46f.appspot.com',
  messagingSenderId: '416921981287',
  appId: '1:416921981287:web:a563fff0852eec5fa4dfc2',
};

export default firebase.initializeApp(firebaseConfig);
