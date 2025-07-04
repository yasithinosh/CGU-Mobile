import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Linking, ActivityIndicator } from 'react-native';

export default function ViewApplicants({ route }) {
  const { jobId } = route.params;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await fetch(`http://<your_backend>/api/jobs/${jobId}/applicants`);
      const data = await response.json();
      setApplicants(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL(item.cvUrl)}
      >
        View CV
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Applicants for Job ID: {jobId}</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={applicants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '600' },
  message: { fontSize: 14, color: '#444', marginVertical: 8 },
  link: { color: '#007aff', fontWeight: 'bold' },
});
