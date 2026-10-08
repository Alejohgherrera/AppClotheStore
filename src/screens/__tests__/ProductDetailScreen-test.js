import { render, screen, fireEvent, act } from '@testing-library/react-native';
import ProductDetailScreen from '../ProductDetailScreen';
import { CartProvider } from '../../context/CartContext';
import { formatPrice, products } from '../../data/products';
import { getProductStock } from '../../data/inventory';

const productoDisponible = products.find(
  (product) => product.id === 'pack-boxers-catterick-bn',
);
const productoConTallaAgotada = products.find(
  (product) => product.id === 'boxer-catterick-negro',
);
const productoAgotado = products.find(
  (product) => product.id === 'boxer-catterick-blanco',
);

async function renderDetalle(producto, navigation = { goBack: jest.fn() }) {
  return render(
    <CartProvider>
      <ProductDetailScreen
        route={{ params: { producto, categoria: producto.categoria } }}
        navigation={navigation}
      />
    </CartProvider>,
  );
}

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe('presentación del producto', () => {
    it('muestra nombre, categoría, precio y descripción', async () => {
      await renderDetalle(productoDisponible);

      expect(screen.getByText(productoDisponible.nombre)).toBeTruthy();
      expect(screen.getByText(productoDisponible.categoria)).toBeTruthy();
      expect(screen.getByText(formatPrice(productoDisponible.precio))).toBeTruthy();
      expect(screen.getByText(productoDisponible.descripcion)).toBeTruthy();
    });

    it('expone todas las imágenes del array para consulta', async () => {
      await renderDetalle(productoDisponible);

      expect(
        screen.getByLabelText(`Imagen 1 de ${productoDisponible.nombre}`),
      ).toBeTruthy();
      productoDisponible.imagenes.forEach((_, index) => {
        expect(
          screen.getByLabelText(`Imagen ${index + 1} de ${productoDisponible.nombre}`),
        ).toBeTruthy();
      });
    });

    it('muestra un placeholder cuando el producto no tiene imágenes', async () => {
      await renderDetalle({ ...productoDisponible, imagenes: [] });

      expect(screen.getByText('Sin imagen disponible')).toBeTruthy();
    });

    it('expone el contenido dentro de una superficie desplazable', async () => {
      await renderDetalle(productoDisponible);

      expect(screen.getByTestId('producto-detalle-scroll')).toBeTruthy();
    });
  });

  describe('selección de talla y color', () => {
    it('comunica el estado seleccionado de la talla', async () => {
      await renderDetalle(productoDisponible);

      const [primeraTalla, segundaTalla] = productoDisponible.tallas;

      expect(
        screen.getByLabelText(`Seleccionar talla ${segundaTalla}`).props
          .accessibilityState.selected,
      ).toBe(false);

      await fireEvent.press(screen.getByLabelText(`Seleccionar talla ${segundaTalla}`));

      expect(
        screen.getByLabelText(`Seleccionar talla ${segundaTalla}`).props
          .accessibilityState.selected,
      ).toBe(true);
      expect(
        screen.getByLabelText(`Seleccionar talla ${primeraTalla}`).props
          .accessibilityState.selected,
      ).toBe(false);
    });

    it('comunica el estado seleccionado del color', async () => {
      await renderDetalle(productoConTallaAgotada);
      const color = productoConTallaAgotada.colores[0];

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar color ${color.nombre}`),
      );

      expect(
        screen.getByLabelText(`Seleccionar color ${color.nombre}`).props
          .accessibilityState.selected,
      ).toBe(true);
    });
  });

  describe('feedback de selección obligatoria', () => {
    it('informa cuando falta la talla', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));

      expect(screen.getByText('Selecciona una talla.')).toBeTruthy();
    });

    it('informa cuando falta el color tras haber seleccionado la talla', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar talla ${productoDisponible.tallas[0]}`),
      );
      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));

      expect(screen.getByText('Selecciona un color.')).toBeTruthy();
    });

    it('limpia el feedback tras el temporizador', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));
      expect(screen.getByText('Selecciona una talla.')).toBeTruthy();

      await act(async () => {
        jest.advanceTimersByTime(2500);
      });

      expect(screen.queryByText('Selecciona una talla.')).toBeNull();
    });
  });

  describe('producto agotado', () => {
    it('deshabilita la acción de compra', async () => {
      await renderDetalle(productoAgotado);

      const cta = screen.getByLabelText('Producto agotado');
      expect(cta.props.accessibilityState.disabled).toBe(true);
    });

    it('muestra la insignia de agotado y no confirma ninguna compra', async () => {
      await renderDetalle(productoAgotado);

      expect(screen.getByText('Agotado')).toBeTruthy();

      await fireEvent.press(screen.getByLabelText('Producto agotado'));

      expect(screen.queryByText('Agregado al carrito.')).toBeNull();
    });
  });

  describe('alta válida en el carrito', () => {
    it('confirma únicamente después de seleccionar talla y color', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar talla ${productoDisponible.tallas[2]}`),
      );
      await fireEvent.press(
        screen.getByLabelText(
          `Seleccionar color ${productoDisponible.colores[0].nombre}`,
        ),
      );
      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));

      expect(screen.getByText('Agregado al carrito.')).toBeTruthy();
    });

    it('retira la confirmación una vez transcurrido el temporizador', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar talla ${productoDisponible.tallas[2]}`),
      );
      await fireEvent.press(
        screen.getByLabelText(
          `Seleccionar color ${productoDisponible.colores[0].nombre}`,
        ),
      );
      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));
      expect(screen.getByText('Agregado al carrito.')).toBeTruthy();

      await act(async () => {
        jest.advanceTimersByTime(2500);
      });

      expect(screen.queryByText('Agregado al carrito.')).toBeNull();
    });

    it('trata como agotado un producto ausente del catálogo', async () => {
      const productoFicticio = {
        ...productoDisponible,
        id: 'producto-inexistente-en-catalogo',
      };
      await renderDetalle(productoFicticio);

      expect(screen.getByText('Agotado')).toBeTruthy();
      expect(screen.getByLabelText('Producto agotado')).toBeTruthy();
      expect(screen.queryByText('Agregado al carrito.')).toBeNull();
    });

    it('no permite agregar una variante agotada', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar talla ${productoDisponible.tallas[2]}`),
      );
      await fireEvent.press(
        screen.getByLabelText(`Seleccionar color ${productoDisponible.colores[1].nombre}`),
      );
      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));

      expect(screen.getByText('Esta combinación está agotada.')).toBeTruthy();
      expect(screen.queryByText('Agregado al carrito.')).toBeNull();
    });
  });

  describe('variantes agotadas', () => {
    it('marca como agotada una talla sin stock en ningún color', async () => {
      await renderDetalle(productoConTallaAgotada);

      expect(screen.getByLabelText('Talla XL agotada')).toBeTruthy();
      expect(screen.getByLabelText('Seleccionar talla S')).toBeTruthy();
    });

    it('expone el estado deshabilitado en las tallas agotadas', async () => {
      await renderDetalle(productoConTallaAgotada);

      expect(
        screen.getByLabelText('Talla XL agotada').props.accessibilityState.disabled,
      ).toBe(true);
    });

    it('informa al pulsar una talla agotada', async () => {
      await renderDetalle(productoConTallaAgotada);

      await fireEvent.press(screen.getByLabelText('Talla XL agotada'));

      expect(screen.getByText('No quedan existencias en la talla XL.')).toBeTruthy();
      expect(screen.queryByText('Agregado al carrito.')).toBeNull();
    });

    it('no cambia la selección al pulsar una talla agotada', async () => {
      await renderDetalle(productoConTallaAgotada);

      await fireEvent.press(
        screen.getByLabelText(`Seleccionar talla ${productoConTallaAgotada.tallas[0]}`),
      );
      await fireEvent.press(screen.getByLabelText('Talla XL agotada'));

      expect(
        screen.getByLabelText(`Seleccionar talla ${productoConTallaAgotada.tallas[0]}`).props
          .accessibilityState.selected,
      ).toBe(true);
    });

    it('conserva una talla disponible si tiene stock en algún color', async () => {
      await renderDetalle(productoDisponible);

      // M solo tiene existencias en negro, pero la talla sigue siendo
      // seleccionable porque el color blanco no debe invalidarla.
      expect(screen.getByLabelText('Seleccionar talla M')).toBeTruthy();
    });

    it('mantiene seleccionable un color con stock en al menos una talla', async () => {
      await renderDetalle(productoDisponible);

      // El blanco solo queda en S, por lo que el color sigue disponible.
      expect(screen.getByLabelText('Seleccionar color Blanco')).toBeTruthy();
    });

    it('muestra las unidades restantes del producto', async () => {
      await renderDetalle(productoDisponible);

      expect(screen.getByText(`Quedan ${getProductStock(productoDisponible)} unidades`)).toBeTruthy();
    });

    it('no muestra unidades restantes si el producto está agotado', async () => {
      await renderDetalle(productoAgotado);

      expect(screen.queryByText(/Quedan \d+ unidades/)).toBeNull();
    });
  });

  describe('accesibilidad', () => {
    it('expone rol y etiqueta en la CTA y en las selecciones', async () => {
      await renderDetalle(productoDisponible);

      expect(screen.getByLabelText('Agregar al carrito').props.accessibilityRole).toBe(
        'button',
      );
      expect(
        screen.getByLabelText(`Seleccionar talla ${productoDisponible.tallas[0]}`).props
          .accessibilityRole,
      ).toBe('button');
      expect(
        screen.getByLabelText(
          `Seleccionar color ${productoDisponible.colores[0].nombre}`,
        ).props.accessibilityRole,
      ).toBe('button');
    });

    it('marca el feedback como región viva', async () => {
      await renderDetalle(productoDisponible);

      await fireEvent.press(screen.getByLabelText('Agregar al carrito'));

      expect(screen.getByText('Selecciona una talla.').props.accessibilityLiveRegion).toBe(
        'polite',
      );
    });

    it('permite volver al catálogo', async () => {
      const navigation = { goBack: jest.fn() };
      await renderDetalle(productoDisponible, navigation);

      await fireEvent.press(screen.getByLabelText('Volver al catálogo'));

      expect(navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});