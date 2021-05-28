import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddReminderScreen = ({ route, navigation }) => {
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reminders", {text: reminder, done: false});
          }}
        >
          <Text style={styles.buttonStyle}> Save </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reminders");
          }}
        >
          <Text style={styles.buttonStyle}> Cancel </Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Input
        placeholder="Enter reminder"
        value={reminder}
        onChangeText={setReminder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 10,
    color: "blue",
  },
});

export default AddReminderScreen;
