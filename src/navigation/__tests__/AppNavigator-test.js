import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from '../AppNavigator';
import { CartProvider } from '../../context/CartContext';
import { products } from '../../data/products';

const STORAGE_KEY = '@clothestore/cart';
const producto = products.find((p) => p.id === 'boxer-catterick-negro');

async function montarNavegador() {
  await act(async () => {
    render(
      <SafeAreaProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </SafeAreaProvider>,
    );
  });
}

async function conLinea(cantidad = 1) {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      { productoId: producto.id, talla: 'M', color: 'Negro', cantidad },
    ]),
  );
}

describe('CartHeaderButton', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    await AsyncStorage.clear();
  });

  describe('accesibilidad', () => {
    it('expone rol de botón y etiqueta con la cantidad', async () => {
      await montarNavegador();

      const boton = screen.getByLabelText('Abrir carrito, 0 artículos');
      expect(boton.props.accessibilityRole).toBe('button');
    });

    it('usa singular cuando hay un único artículo', async () => {
      await conLinea(1);
      await montarNavegador();

      expect(screen.getByLabelText('Abrir carrito, 1 artículo')).toBeTruthy();
    });

    it('usa plural con varios artículos', async () => {
      await conLinea(3);
      await montarNavegador();

      expect(screen.getByLabelText('Abrir carrito, 3 artículos')).toBeTruthy();
    });

    it('amplía la zona táctil con hitSlop', async () => {
      await montarNavegador();

      expect(screen.getByLabelText('Abrir carrito, 0 artículos').props.hitSlop).toBe(8);
    });
  });

  describe('badge', () => {
    it('no muestra badge con el carrito vacío', async () => {
      await montarNavegador();

      expect(screen.queryByText('0')).toBeNull();
    });

    it('muestra el número de artículos cuando hay líneas', async () => {
      await conLinea(4);
      await montarNavegador();

      expect(screen.getByText('4')).toBeTruthy();
    });
  });

  describe('navegación', () => {
    it('navega a la pantalla del carrito', async () => {
      await montarNavegador();

      await fireEvent.press(screen.getByLabelText('Abrir carrito, 0 artículos'));

      expect(screen.getByText('Carrito vacío')).toBeTruthy();
    });

    it('permite abrir el carrito con líneas y ver el total', async () => {
      await conLinea(2);
      await montarNavegador();

      await fireEvent.press(screen.getByLabelText('Abrir carrito, 2 artículos'));

      expect(screen.getByText('Total (2 artículos)')).toBeTruthy();
    });

    it('no aparece en la propia pantalla del carrito', async () => {
      await montarNavegador();

      await fireEvent.press(screen.getByLabelText('Abrir carrito, 0 artículos'));

      expect(screen.queryByLabelText('Abrir carrito, 0 artículos')).toBeNull();
    });
  });

  describe('disponibilidad en cada pantalla', () => {
    it('sigue disponible tras navegar al catálogo', async () => {
      await montarNavegador();

      expect(screen.getByLabelText('Abrir carrito, 0 artículos')).toBeTruthy();

      await fireEvent.press(screen.getByText('Explorar'));

      expect(screen.getByLabelText('Abrir carrito, 0 artículos')).toBeTruthy();
    });
  });
});