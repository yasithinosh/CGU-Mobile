import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function JobDetails({ route, navigation }) {
  const { job } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.info}>{job.location} | {job.type}</Text>
      <Text style={styles.desc}>{job.description}</Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Apply for this Job"
          color="#007aff"
          onPress={() => navigation.navigate('ApplyJob', { jobId: job.id })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  company: { fontSize: 18, fontWeight: '500', marginBottom: 5 },
  info: { fontSize: 16, color: '#777', marginBottom: 10 },
  desc: { fontSize: 16, lineHeight: 22, color: '#444' },
});
