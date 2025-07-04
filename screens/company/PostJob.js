import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function PostJob({ navigation }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const companyId = 1; // Replace with real auth data

  const handlePost = async () => {
    if (!title || !location || !type || !description) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://<your_backend>/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, location, type, description, companyId }),
      });

      const data = await res.json();
      if (data.success) {
        Alert.alert('Success', 'Job posted!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Job Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Job Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="e.g. Full-time, Internship" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Post Job" onPress={handlePost} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
