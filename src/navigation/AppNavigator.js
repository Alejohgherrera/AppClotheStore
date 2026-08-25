import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import GenderSelectScreen from '../screens/GenderSelectScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colors.interactive.default,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accent,
  },
};

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: {
    ...typography.subheading,
  },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ClotheStore' }}
        />
        <Stack.Screen
          name="Catalog"
          component={GenderSelectScreen}
          options={{ title: 'Catálogo' }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={({ route }) => ({ title: route.params.genero.nombre })}
        />
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={({ route }) => ({ title: route.params.categoria.nombre })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
