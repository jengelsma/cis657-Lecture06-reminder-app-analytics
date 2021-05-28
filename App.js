import { StyleSheet, Text, View } from 'react-native';

import AddReminderScreen from './screens/AddRemindersScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RemindersScreen from './screens/RemindersScreen';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
