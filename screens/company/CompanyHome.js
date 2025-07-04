import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function CompanyHome({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const companyId = 1; // Replace with logged-in company ID (from auth)

  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  const fetchCompanyJobs = async () => {
    try {
      const res = await fetch(`http://<your_backend>/api/company/${companyId}/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderJob = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ViewApplicants', { jobId: item.id })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.location} | {item.type}</Text>
      <Text style={styles.date}>Posted on {item.postedDate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Posted Jobs</Text>
      <Button title="Post New Job" onPress={() => navigation.navigate('PostJob')} />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJob}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  date: { color: '#888', marginTop: 5 },
});
