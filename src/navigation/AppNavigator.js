import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme';
import { useCart } from '../context/CartContext';
import HomeScreen from '../screens/HomeScreen';
import GenderSelectScreen from '../screens/GenderSelectScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { View, Text, Pressable } from 'react-native';

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

function CartIcon() {
  const { count } = useCart();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 20, color: colors.textPrimary }}>🛒</Text>
      {count > 0 && (
        <View style={{
          backgroundColor: colors.accent,
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}>
          <Text style={{ fontSize: 11, color: colors.onAccent, fontWeight: '700' }}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}

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
          options={{ title: 'ClotheStore', headerRight: () => <CartIcon /> }}
        />
        <Stack.Screen
          name="Catalog"
          component={GenderSelectScreen}
          options={{ title: 'Catálogo', headerRight: () => <CartIcon /> }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={({ route }) => ({
            title: route.params.genero.nombre,
            headerRight: () => <CartIcon />,
          })}
        />
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={({ route }) => ({
            title: route.params.categoria.nombre,
            headerRight: () => <CartIcon />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({
            title: route.params.producto.nombre,
            headerBackTitle: 'Atrás',
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Carrito', headerRight: () => <CartIcon /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
