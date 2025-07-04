import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentHome from '../screens/student/StudentHome';
import CompanyHome from '../screens/company/CompanyHome';
import JobDetails from '../screens/shared/JobDetails';
import ApplyJob from '../screens/shared/ApplyJob';
import PostJob from '../screens/company/PostJob';
import ViewApplicants from '../screens/company/ViewApplicants';

const Stack = createNativeStackNavigator();

export default function AppStack({ route }) {
  const { role } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'student' ? (
        <Stack.Screen name="StudentHome" component={StudentHome} />
      ) : (
        <Stack.Screen name="CompanyHome" component={CompanyHome} />
      )}
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="ApplyJob" component={ApplyJob} />
      <Stack.Screen name="PostJob" component={PostJob} />
      <Stack.Screen name="ViewApplicants" component={ViewApplicants} />
      <Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="StudentHome" component={StudentDashboard} />
<Stack.Screen name="CompanyHome" component={CompanyDashboard} />

    </Stack.Navigator>
  );
}
