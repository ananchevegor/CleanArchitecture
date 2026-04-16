/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MainScreen from './src/presentation/features/main/MainScreen';
import CardScreen from './src/presentation/features/card/CardScreen';



export type RootStackParamList = {
  MainScreen: undefined;
  CardScreen: { countryName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainScreen'>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="CardScreen" component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
