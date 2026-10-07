import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CartScreen from '../CartScreen';
import { CartProvider } from '../../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatPrice, products } from '../../data/products';

const STORAGE_KEY = '@clothestore/cart';

const productoReal = products.find((product) => product.id === 'boxer-catterick-negro');
const productoAgotado = products.find((product) => product.disponible === false);

function persistir(lineas) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lineas));
}

function lineaValida(cantidad = 2) {
  return { productoId: productoReal.id, talla: 'M', color: 'Negro', cantidad };
}

async function montarCarrito(navigation = { navigate: jest.fn() }) {
  return render(
    <NavigationContainer>
      <CartProvider>
        <CartScreen navigation={navigation} />
      </CartProvider>
    </NavigationContainer>,
  );
}

describe('CartScreen', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    await AsyncStorage.clear();
  });

  describe('hidratación', () => {
    it('muestra un indicador de carga mientras AsyncStorage no responde', async () => {
      let resolverLectura;
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementationOnce(() => new Promise((resolve) => {
          resolverLectura = resolve;
        }));

      await montarCarrito();

      expect(screen.getByText('Cargando carrito…')).toBeTruthy();
      expect(screen.queryByText('Carrito vacío')).toBeNull();

      await act(async () => {
        resolverLectura(null);
      });

      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());
      expect(screen.queryByText('Cargando carrito…')).toBeNull();
      jest.restoreAllMocks();
    });
  });

  describe('persistencia', () => {
    it('restaura líneas válidas desde AsyncStorage', async () => {
      await persistir([lineaValida(3)]);

      await montarCarrito();

      await waitFor(() => expect(screen.getByText(productoReal.nombre)).toBeTruthy());
      expect(screen.queryByText('Cargando carrito…')).toBeNull();
    });

    it('descarta líneas de productos agotados', async () => {
      await persistir([{ productoId: productoAgotado.id, cantidad: 1 }]);

      await montarCarrito();

      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());
    });

    it('no sobrescribe el almacenamiento cuando la lectura falla', async () => {
      await persistir([lineaValida(2)]);
      const almacenado = await AsyncStorage.getItem(STORAGE_KEY);
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockRejectedValueOnce(new Error('fallo de lectura'));

      await montarCarrito();

      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());
      expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe(almacenado);
    });

    it('conserva las líneas persistidas tras una lectura corrupta', async () => {
      await persistir([lineaValida(2)]);
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockResolvedValueOnce('{ esto no es json');

      await montarCarrito();

      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());
      expect(
        JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)),
      ).toEqual([lineaValida(2)]);
    });
  });

  describe('líneas del carrito', () => {
    async function montarConLinea(cantidad = 2) {
      await persistir([lineaValida(cantidad)]);
      await montarCarrito();
      await waitFor(() => expect(screen.getByText(productoReal.nombre)).toBeTruthy());
    }

    it('muestra talla, color y cantidad de la línea', async () => {
      await montarConLinea(2);

      expect(screen.getByText('Talla: M')).toBeTruthy();
      expect(screen.getByText('Color: Negro')).toBeTruthy();
      expect(screen.getByLabelText('Cantidad: 2')).toBeTruthy();
    });

    it('expone el total y el recuento derivados de las líneas', async () => {
      await montarConLinea(2);

      expect(screen.getByText('Total (2 artículos)')).toBeTruthy();
      expect(
        screen.getAllByText(formatPrice(productoReal.precio * 2)).length,
      ).toBeGreaterThan(0);
    });

    it('aumenta la cantidad de la línea', async () => {
      await montarConLinea(2);

      await fireEvent.press(
        screen.getByLabelText(`Aumentar cantidad de ${productoReal.nombre}`),
      );

      await waitFor(() => expect(screen.getByLabelText('Cantidad: 3')).toBeTruthy());
    });

    it('deshabilita la disminución cuando la cantidad es uno', async () => {
      await montarConLinea(1);

      const disminuir = screen.getByLabelText(
        `Disminuir cantidad de ${productoReal.nombre}`,
      );
      expect(disminuir.props.accessibilityState.disabled).toBe(true);
    });

    it('elimina la línea de forma explícita', async () => {
      await montarConLinea(2);

      await fireEvent.press(
        screen.getByLabelText(`Eliminar ${productoReal.nombre} del carrito`),
      );

      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());
    });

    it('mantiene el checkout deshabilitado hasta la Feature 018', async () => {
      await montarConLinea(2);

      const checkout = screen.getByLabelText('Finalizar compra, próximamente');
      expect(checkout.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('carrito vacío', () => {
    it('ofrece explorar el catálogo', async () => {
      const navigation = { navigate: jest.fn() };
      await montarCarrito(navigation);
      await waitFor(() => expect(screen.getByText('Carrito vacío')).toBeTruthy());

      await fireEvent.press(screen.getByLabelText('Explorar catálogo'));

      expect(navigation.navigate).toHaveBeenCalledWith('Catalog');
    });
  });
});