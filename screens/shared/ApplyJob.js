import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function ApplyJob({ route }) {
  const { jobId } = route.params;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [cvFile, setCvFile] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.type === 'success') {
      setCvFile(result);
    }
  };

  const handleSubmit = async () => {
    if (!name || !message || !cvFile) {
      Alert.alert('Validation', 'Please fill in all fields and upload your CV.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('jobId', jobId);
      formData.append('name', name);
      formData.append('message', message);
      formData.append('cv', {
        uri: cvFile.uri,
        type: 'application/pdf',
        name: cvFile.name,
      });

      const res = await fetch('http://<your_backend>/api/apply-with-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        Alert.alert('Success', 'Application submitted successfully');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Short Message</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <Text style={styles.label}>Upload CV (PDF)</Text>
      <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
        <Text style={styles.uploadBtnText}>
          {cvFile ? `Selected: ${cvFile.name}` : 'Choose PDF'}
        </Text>
      </TouchableOpacity>

      <Button title="Submit Application" onPress={handleSubmit} color="#28a745" />
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
  uploadBtn: {
    backgroundColor: '#007aff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  uploadBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
