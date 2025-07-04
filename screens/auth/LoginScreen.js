import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = route.params.role;

  /*const handleLogin = async () => {
    // use your backend API here
    const res = await fetch(`http://localhost:3000/api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (data.success) {
      navigation.navigate(role === 'student' ? 'StudentHome' : 'CompanyHome', { user: data.user });
    } else {
      alert(data.message);
    }
  };*/

  const handleLogin = () => {
  // Skip API and directly navigate to dashboard for testing
  const dummyUser = {
    email: email || 'test@example.com',
    name: 'Test User',
  };
  
  // Navigate based on role
  navigation.navigate(
    role === 'student' ? 'StudentHome' : 'CompanyHome',
    { user: dummyUser }
  );
};


  return (
    <View style={{ padding: 20 }}>
      <Text>{role.toUpperCase()} LOGIN</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register', { role })}>New User? Register Now</Text>
    </View>
  );
}
