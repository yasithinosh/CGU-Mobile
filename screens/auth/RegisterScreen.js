// Reuse role  student/company registration

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function RegisterScreen({ route, navigation }) {
  const role = route.params.role;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch(`http://localhost:3000/api`, { //change it 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (data.success) {
      navigation.navigate('Login', { role });
    } else {
      alert(data.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register as {role}</Text>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
