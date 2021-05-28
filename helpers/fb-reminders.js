import 'firebase/database';

import * as firebase from 'firebase';

import { firebaseConfig } from './fb-credentials';

export function initReminderDb()
{
  firebase.initializeApp(firebaseConfig);
}

export function writeData(key, data) {
  firebase.database().ref(`reminderData/${key}`).set(data);
}

export function setupDataListener(key) {
  firebase
    .database()
    .ref(`reminderData/${key}`)
    .on('value', (snapshot) => {
      console.log('data listener fires up with: ', snapshot);
    });
}