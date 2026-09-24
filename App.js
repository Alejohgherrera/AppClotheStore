import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FilterProvider } from './src/context/FilterContext';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <FilterProvider>
        <CartProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </CartProvider>
      </FilterProvider>
    </SafeAreaProvider>
  );
}
