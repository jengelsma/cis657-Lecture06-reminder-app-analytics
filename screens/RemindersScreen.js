import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  initReminderDb,
  setupDataListener,
  writeData,
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

  const [reminders, setReminders] = useState(items.sort(comparator));
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
            writeData('score', { display });
          }}
        >
          <Text>{display}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddReminder");
          }}
        >
          <Feather style={{ marginRight: 10 }} name="edit" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      setReminders([...reminders, route.params].sort(comparator));
    }
  }, [route.params?.text]);

  useEffect(() => {
    try {
      initReminderDb();
    } catch (err) {
      console.log(err);
    }
    setupDataListener('score');
  }, []);

  const addRemindersNotDisplayed = (newArr) => {
    if (display === "Not Done") {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return i.done;
        })
      );
    } else if (display === "Done") {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return !i.done;
        })
      );
    }
    return newArr;
  };

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          let newArr = [...reminders.filter(displayFilter)];
          newArr[index] = { text: item.text, done: !item.done };
          newArr = addRemindersNotDisplayed(newArr);
          setReminders(newArr.sort(comparator));
        }}
        onLongPress={() => {
          let subset = reminders.filter(displayFilter);
          let newArr = subset.filter((val, idx) => {
            return idx == index ? false : true;
          });
          newArr = addRemindersNotDisplayed(newArr);
          setReminders(newArr.sort(comparator));
          Toast.show(`Deleted ${item.text}`, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.text}
      data={reminders.filter(displayFilter)}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({});

export default RemindersScreen;
