import { act, renderHook } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider, useCart, CART_ACTION_ERRORS } from '../CartContext';
import { products } from '../../data/products';

const STORAGE_KEY = '@clothestore/cart';

const conDosColores = products.find((p) => p.id === 'pack-boxers-catterick-bn');
const conUnaTalla = products.find((p) => p.id === 'gorra-aksha-negra');
const agotado = products.find((p) => p.disponible === false);

async function montarConCarrito(contenido) {
  if (contenido !== undefined) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contenido));
  }

  return renderHook(() => useCart(), { wrapper: CartProvider });
}

async function montarConLecturaPendiente() {
  let resolver;
  jest.spyOn(AsyncStorage, 'getItem').mockImplementationOnce(
    () => new Promise((resolve) => {
      resolver = resolve;
    }),
  );

  const { result } = await renderHook(() => useCart(), { wrapper: CartProvider });

  return { result, resolver: (valor) => act(async () => resolver(valor)) };
}

describe('CartProvider', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    await AsyncStorage.clear();
  });

  describe('hidratación', () => {
    it('empieza sin líneas y sin hidratar', async () => {
      const { result: hook, resolver } = await montarConLecturaPendiente();

      expect(hook.current.hydrated).toBe(false);
      expect(hook.current.items).toEqual([]);
      expect(hook.current.count).toBe(0);
      expect(hook.current.total).toBe(0);

      await resolver(null);
    });

    it('bloquea toda mutación antes de hidratar', async () => {
      const { result: hook, resolver } = await montarConLecturaPendiente();

      expect(hook.current.addItem(conDosColores, 'M', 'Negro', 1)).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.NOT_HYDRATED,
      });
      expect(hook.current.removeItem('cualquiera')).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.NOT_HYDRATED,
      });
      expect(hook.current.updateQuantity('cualquiera', 2)).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.NOT_HYDRATED,
      });
      expect(hook.current.clearCart()).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.NOT_HYDRATED,
      });
      expect(hook.current.items).toEqual([]);

      await resolver(null);
    });

    it('restaura líneas válidas desde AsyncStorage', async () => {
      const { result: hook } = await montarConCarrito([
        { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 2 },
      ]);

      expect(hook.current.hydrated).toBe(true);
      expect(hook.current.items).toHaveLength(1);
      expect(hook.current.items[0].producto).toBe(conDosColores);
      expect(hook.current.count).toBe(2);
      expect(hook.current.total).toBe(conDosColores.precio * 2);
    });

    it('descarta líneas inválidas al hidratar y limpia el almacenamiento', async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([{ productoId: agotado.id, cantidad: 1 }]),
      );

      const { result: hook } = await montarConCarrito();

      expect(hook.current.items).toEqual([]);
      expect(hook.current.count).toBe(0);
      expect(hook.current.total).toBe(0);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))).toEqual([]);
    });

    it('no sobrescribe el almacenamiento cuando la lectura falla', async () => {
      const original = [{ productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 2 }];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(original));
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementationOnce(() => Promise.reject(new Error('fallo de lectura')));

      const { result: hook } = await montarConCarrito();

      expect(hook.current.hydrated).toBe(true);
      expect(hook.current.items).toEqual([]);
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))).toEqual(original);
    });
  });

  describe('addItem', () => {
    it('agrega una línea nueva con la cantidad indicada', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'M', 'Negro', 2);
      });

      expect(resultado.ok).toBe(true);
      expect(hook.current.items).toHaveLength(1);
      expect(hook.current.items[0].cantidad).toBe(2);
      expect(hook.current.items[0].talla).toBe('M');
      expect(hook.current.items[0].color).toBe('Negro');
    });

    it('usa cantidad uno por defecto', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro');
      });

      expect(hook.current.items[0].cantidad).toBe(1);
    });

    it('fusiona cantidades de la misma combinación', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 2);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 3);
      });

      expect(hook.current.items).toHaveLength(1);
      expect(hook.current.items[0].cantidad).toBe(5);
    });

    it('mantiene separadas combinaciones distintas', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 1);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Blanco', 1);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'L', 'Negro', 1);
      });

      expect(hook.current.items).toHaveLength(3);
    });

    it('resuelve el producto canónico por identificador', async () => {
      const { result: hook } = await montarConCarrito();
      const copiaObsoleta = { ...conDosColores, precio: 1 };

      await act(async () => {
        hook.current.addItem(copiaObsoleta, 'M', 'Negro', 1);
      });

      expect(hook.current.items[0].producto.precio).toBe(conDosColores.precio);
      expect(hook.current.total).toBe(conDosColores.precio);
    });

    it('acepta el color como objeto', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'M', { nombre: 'Negro' }, 1);
      });

      expect(hook.current.items[0].color).toBe('Negro');
    });

    it('acepta una copia obsoleta sin identificador y la rechaza', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem({ nombre: 'Sin id' }, 'M', 'Negro', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_PRODUCT,
      });
    });

    it('rechaza un producto inexistente en el catálogo', async () => {
      const { result: hook } = await montarConCarrito();
      const ficticio = { ...conDosColores, id: 'no-existe' };

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(ficticio, 'M', 'Negro', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_PRODUCT,
      });
      expect(hook.current.items).toEqual([]);
    });

    it('rechaza un producto agotado', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(agotado, 'M', 'Blanco', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.PRODUCT_UNAVAILABLE,
      });
      expect(hook.current.items).toEqual([]);
    });

    it('rechaza una talla no contemplada por el producto', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'XXL', 'Negro', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_VARIANT,
      });
    });

    it('rechaza un color no contemplado por el producto', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'M', 'Verde', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_VARIANT,
      });
    });

    it('rechaza una talla ausente cuando el producto tiene tallas', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, null, 'Negro', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_VARIANT,
      });
    });

    it('rechaza un color ausente cuando el producto tiene varios colores', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'M', null, 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.INVALID_VARIANT,
      });
    });

    it('resuelve el color implícito cuando el producto tiene uno solo', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conUnaTalla, conUnaTalla.tallas[0], null, 1);
      });

      expect(hook.current.items[0].color).toBe(conUnaTalla.colores[0].nombre);
    });

    it('rechaza cantidades no positivas o no enteras', async () => {
      const { result: hook } = await montarConCarrito();

      for (const cantidad of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
        let resultado;
        await act(async () => {
          resultado = hook.current.addItem(conDosColores, 'M', 'Negro', cantidad);
        });

        expect(resultado).toEqual({
          ok: false,
          reason: CART_ACTION_ERRORS.INVALID_QUANTITY,
        });
      }
      expect(hook.current.items).toEqual([]);
    });
  });

  describe('updateQuantity', () => {
    async function montarConLinea(cantidad = 2) {
      const { result: hook } = await montarConCarrito([
        { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad },
      ]);

      return { hook, id: hook.current.items[0].id };
    }

    it('actualiza la cantidad de una línea', async () => {
      const { hook, id } = await montarConLinea(2);

      await act(async () => {
        hook.current.updateQuantity(id, 5);
      });

      expect(hook.current.items[0].cantidad).toBe(5);
      expect(hook.current.count).toBe(5);
      expect(hook.current.total).toBe(conDosColores.precio * 5);
    });

    it('elimina la línea cuando la cantidad llega a cero', async () => {
      const { hook, id } = await montarConLinea(2);

      await act(async () => {
        hook.current.updateQuantity(id, 0);
      });

      expect(hook.current.items).toEqual([]);
      expect(hook.current.count).toBe(0);
      expect(hook.current.total).toBe(0);
    });

    it('rechaza cantidades negativas o no enteras', async () => {
      const { hook, id } = await montarConLinea(2);

      for (const cantidad of [-1, 1.5, Number.NaN]) {
        await act(async () => {
          hook.current.updateQuantity(id, cantidad);
        });
      }

      expect(hook.current.items[0].cantidad).toBe(2);
    });

    it('rechaza identificadores vacíos o no textuales', async () => {
      const { hook } = await montarConLinea(2);

      for (const id of ['', null, 42]) {
        let resultado;
        await act(async () => {
          resultado = hook.current.updateQuantity(id, 3);
        });

        expect(resultado.ok).toBe(false);
      }
      expect(hook.current.items[0].cantidad).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('elimina únicamente la línea indicada', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 1);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'L', 'Negro', 2);
      });
      const idAEliminar = hook.current.items[0].id;

      await act(async () => {
        hook.current.removeItem(idAEliminar);
      });

      expect(hook.current.items).toHaveLength(1);
      expect(hook.current.items[0].talla).toBe('L');
      expect(hook.current.count).toBe(2);
    });

    it('rechaza identificadores vacíos o no textuales', async () => {
      const { result: hook } = await montarConCarrito();

      for (const id of ['', null, 42]) {
        let resultado;
        await act(async () => {
          resultado = hook.current.removeItem(id);
        });

        expect(resultado).toEqual({
          ok: false,
          reason: CART_ACTION_ERRORS.INVALID_PRODUCT,
        });
      }
    });

    it('no falla si la línea ya no existe', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 1);
      });

      let resultado;
      await act(async () => {
        resultado = hook.current.removeItem('prod::M::Negro');
      });

      expect(resultado.ok).toBe(true);
      expect(hook.current.items).toHaveLength(1);
    });
  });

  describe('clearCart', () => {
    it('vacía todas las líneas', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 1);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'L', 'Blanco', 1);
      });

      await act(async () => {
        hook.current.clearCart();
      });

      expect(hook.current.items).toEqual([]);
      expect(hook.current.count).toBe(0);
      expect(hook.current.total).toBe(0);
    });

    it('es idempotente sobre un carrito vacío', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.clearCart();
      });

      expect(resultado.ok).toBe(true);
      expect(hook.current.items).toEqual([]);
    });
  });

  describe('validación de stock', () => {
    it('rechazar agregar una variante agotada', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'M', 'Blanco', 1);
      });

      expect(resultado).toEqual({
        ok: false,
        reason: CART_ACTION_ERRORS.OUT_OF_STOCK,
      });
      expect(hook.current.items).toEqual([]);
    });

    it('rechaza una cantidad superior al stock de la variante', async () => {
      const { result: hook } = await montarConCarrito();

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'S', 'Negro', 99);
      });

      expect(resultado.ok).toBe(false);
      expect(resultado.reason).toBe(CART_ACTION_ERRORS.INSUFFICIENT_STOCK);
      expect(resultado.availableStock).toBe(6);
      expect(hook.current.items).toEqual([]);
    });

    it('indica cuántas unidades quedan por añadir', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 4);
      });

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'S', 'Negro', 3);
      });

      expect(resultado.reason).toBe(CART_ACTION_ERRORS.INSUFFICIENT_STOCK);
      expect(resultado.remaining).toBe(2);
      expect(hook.current.items[0].cantidad).toBe(4);
    });

    it('permite fusionar hasta agotar exactamente el stock', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 3);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 3);
      });

      expect(hook.current.items).toHaveLength(1);
      expect(hook.current.items[0].cantidad).toBe(6);

      let resultado;
      await act(async () => {
        resultado = hook.current.addItem(conDosColores, 'S', 'Negro', 1);
      });

      expect(resultado.reason).toBe(CART_ACTION_ERRORS.INSUFFICIENT_STOCK);
      expect(hook.current.items[0].cantidad).toBe(6);
    });

    it('valida el stock acumulado entre altas consecutivas', async () => {
      const { result: hook } = await montarConCarrito();

      let primerResultado;
      await act(async () => {
        primerResultado = hook.current.addItem(conDosColores, 'S', 'Negro', 4);
      });
      let segundoResultado;
      await act(async () => {
        segundoResultado = hook.current.addItem(conDosColores, 'S', 'Negro', 4);
      });

      expect(primerResultado.ok).toBe(true);
      expect(segundoResultado.reason).toBe(CART_ACTION_ERRORS.INSUFFICIENT_STOCK);
      expect(hook.current.items[0].cantidad).toBe(4);
    });

    it('no limita la cantidad de variantes distintas', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 6);
      });
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Blanco', 4);
      });

      expect(hook.current.items).toHaveLength(2);
    });

    it('rechaza en updateQuantity una cantidad superior al stock', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 2);
      });
      const { id } = hook.current.items[0];

      let resultado;
      await act(async () => {
        resultado = hook.current.updateQuantity(id, 7);
      });

      expect(resultado.ok).toBe(false);
      expect(resultado.reason).toBe(CART_ACTION_ERRORS.INSUFFICIENT_STOCK);
      expect(hook.current.items[0].cantidad).toBe(2);
    });

    it('acepta en updateQuantity una cantidad igual al stock', async () => {
      const { result: hook } = await montarConCarrito();
      await act(async () => {
        hook.current.addItem(conDosColores, 'S', 'Negro', 2);
      });
      const { id } = hook.current.items[0];

      await act(async () => {
        hook.current.updateQuantity(id, 6);
      });

      expect(hook.current.items[0].cantidad).toBe(6);
    });
  });

  describe('valores derivados', () => {
    it('calcula count y total solo desde líneas válidas', async () => {
      const { result: hook } = await montarConCarrito([
        { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 2 },
        { productoId: conDosColores.id, talla: 'XL', color: 'Negro', cantidad: 1 },
        { productoId: agotado.id, cantidad: 5 },
        { productoId: 'inexistente', cantidad: 3 },
        { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 0 },
      ]);

      expect(hook.current.items).toHaveLength(2);
      expect(hook.current.count).toBe(3);
      expect(hook.current.total).toBe(conDosColores.precio * 3);
    });

    it('recalcula los derivados tras cada mutación', async () => {
      const { result: hook } = await montarConCarrito();

      await act(async () => {
        hook.current.addItem(conDosColores, 'M', 'Negro', 2);
      });
      expect(hook.current.count).toBe(2);

      await act(async () => {
        hook.current.updateQuantity(hook.current.items[0].id, 4);
      });
      expect(hook.current.count).toBe(4);
      expect(hook.current.total).toBe(conDosColores.precio * 4);

      await act(async () => {
        hook.current.clearCart();
      });
      expect(hook.current.count).toBe(0);
      expect(hook.current.total).toBe(0);
    });
  });

  describe('uso fuera del provider', () => {
    it('falla con un mensaje explícito', async () => {
      await expect(renderHook(() => useCart())).rejects.toThrow(/CartProvider/);
    });
  });
});