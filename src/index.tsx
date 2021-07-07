import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyB6viYeTVIrqLaZw6PyC2UZMbPh_fVCTG4',
  authDomain: 'psychologists-7a2da.firebaseapp.com',
  databaseURL: 'https://psychologists-7a2da-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'psychologists-7a2da',
  storageBucket: 'psychologists-7a2da.appspot.com',
  messagingSenderId: '15128333192',
  appId: '1:15128333192:web:c3ad5e3d464da864f2483d',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();

export { storage, firebase, database as default };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
