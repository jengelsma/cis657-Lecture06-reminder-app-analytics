import 'firebase/database';

import * as firebase from 'firebase';

import { firebaseConfig } from './fb-credentials';

export function initReminderDb()
{
  firebase.initializeApp(firebaseConfig);
}

export function storeReminderItem(item) {
  firebase.database().ref('reminderData/').push(item);
}

export function updateReminder(item) {
  const key = item.id;
  delete item.id
  firebase.database().ref(`reminderData/${key}`).set(item);
}

export function deleteReminder(item) {
  firebase.database().ref(`reminderData/${item.id}`).remove();
}

export function setupReminderListener(updateFunc) {
  firebase
    .database()
    .ref('reminderData/')
    .on('value', (snapshot) => {
      console.log('data listener fires up with: ', snapshot);
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          console.log(key, '||', index, '||', fbObject[key]);
          newArr.push({ ...fbObject[key], id: key});
        });
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
}