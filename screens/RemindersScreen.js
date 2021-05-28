import { FlatList, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import { CheckBox } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

const items = [
    { text: "get groceries", done: false },
    { text: "feed dog", done: false },
    { text: "take out trash", done: false },
  ];

const RemindersScreen = ( { route, navigation}) => {

  const [reminders, setReminder] = useState(items);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddReminder");
          }}
        >
          <Feather style={{ marginRight: 10 }} name="edit" size={24} />
        </TouchableOpacity>
      ),
    });  }, []);

  const renderReminder = ({ index, item}) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          let newArr = [...reminders];
          newArr[index] = {...item, done: !item.done};
          setReminder(newArr);
        }}
        onLongPress={() => {
          let newArr = reminders.filter((valid,idx) => {
            return idx == index ? false : true;
          });
          setReminder(newArr);
          Toast.show(`Deleted ${item.text}`, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
          });
        }}
      />
    )
  }

  return (
    <FlatList
      keyExtractor={(item) => item.text}
      data={reminders}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({

});

export default RemindersScreen;

