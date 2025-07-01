import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RoleSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Before We Login</Text>
      <Text style={styles.title}>Select Your Role</Text>
      <Button title="Student" onPress={() => navigation.navigate('Login', { role: 'student' })} />
      <Button title="Company" onPress={() => navigation.navigate('Login', { role: 'company' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 30 }
});
