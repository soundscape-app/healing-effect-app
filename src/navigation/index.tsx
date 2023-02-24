/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Text } from 'react-native';

import NotFoundScreen from '~/screens/NotFoundScreen';
import LoginScreen from '~/screens/LoginScreen';
import RegisterScreen from '~/screens/RegisterScreen';
import UploadScreen from '~/screens/UploadScreen';
import SurveyScreen from '~/screens/SurveyScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import ResultDetailScreen from '~/screens/ResultDetailScreen';
import CheckMicScreen from '~/screens/CheckMicScreen';

import { RootStackParamList } from '~/types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { RouteName } from '~/common';
import { NavIcon } from '~/components';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<any>();

const NormalOption = {
  headerShown: true,
  headerLeft: () => NavIcon.BackButton(),
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteName.Root} component={BottomTabNavigator} />
      <Stack.Screen name={RouteName.NotFound} component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name={RouteName.Login} component={LoginScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.Register} component={RegisterScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.Upload} component={UploadScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.Survey} component={SurveyScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.Profile} component={ProfileScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.ResultDetail} component={ResultDetailScreen} options={NormalOption} />
      <Stack.Screen name={RouteName.CheckMic} component={CheckMicScreen} options={NormalOption} />
    </Stack.Navigator>
  );
}

