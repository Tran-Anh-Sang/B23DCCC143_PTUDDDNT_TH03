import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, useApp} from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import {colors} from './src/theme';

function Gate() {
  const {loaded} = useApp();
  if (!loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <AppProvider>
        <Gate />
      </AppProvider>
    </SafeAreaProvider>
  );
}
