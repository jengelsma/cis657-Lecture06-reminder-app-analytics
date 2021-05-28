import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  deleteReminder,
  initReminderDb,
  setupReminderListener,
  storeReminderItem,
  updateReminder,
} from "../helpers/fb-reminders";

import { CheckBox } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import { TouchableOpacity } from "react-native-gesture-handler";

const items = [
  { text: "get groceries", done: false },
  { text: "feed dog", done: false },
  { text: "take out trash", done: false },
];

const comparator = (item1, item2) => {
  return item1.text.toLowerCase() > item2.text.toLowerCase();
};

const RemindersScreen = ({ route, navigation }) => {
  console.log(route.params);

  const [reminders, setReminders] = useState([]);
  const [display, setDisplay] = useState("All");

  const displayFilter = (item) => {
    if (display === "All") {
      return true;
    } else if (display === "Done") {
      return item.done ? true : false;
    } else {
      return item.done ? false : true;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (display === "All") {
              setDisplay("Not Done");
            } else if (display === "Not Done") {
              setDisplay("Done");
            } else {
              setDisplay("All");
            }
          }}
        >
          <Text style={styles.buttonStyle}>{display}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddReminder");
          }}
        >
          <Feather style={styles.buttonStyle} name="edit" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      storeReminderItem(route.params);
    }
  }, [route.params?.text]);

  useEffect(() => {
    try {
      initReminderDb();
    } catch (err) {
      console.log(err);
    }
    setupReminderListener((items) => {
      setReminders(items.sort(comparator));
    });
  }, []);

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          updateReminder({ ...item, done: !item.done });
        }}
        onLongPress={() => {
          Toast.show(`Deleted ${item.text}`, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
          });
          deleteReminder(item);
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={reminders.filter(displayFilter)}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10, 
    color: 'blue',
  }
});

export default RemindersScreen;
