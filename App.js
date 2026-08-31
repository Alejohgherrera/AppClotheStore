import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/context/FilterContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FilterProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </FilterProvider>
    </SafeAreaProvider>
  );
}
