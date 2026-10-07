import { fireEvent, render, screen } from '@testing-library/react-native';
import FilterModal from '../FilterModal';
import { DEFAULT_FILTERS } from '../../data/filters';

const priceRange = { min: 10, max: 60 };

const filtrosBase = {
  ...DEFAULT_FILTERS,
  precioMin: 20,
  precioMax: 40,
  tallas: ['M'],
  colores: ['Negro'],
  soloDisponibles: true,
  sortBy: 'price_asc',
  busqueda: 'polo',
};

async function montar(overrides = {}) {
  const onApply = jest.fn();
  const onClose = jest.fn();

  await render(
    <FilterModal
      visible
      initialFilters={{ ...filtrosBase, ...overrides }}
      priceRange={priceRange}
      onApply={onApply}
      onClose={onClose}
    />,
  );

  return { onApply, onClose };
}

describe('FilterModal', () => {
  describe('presentación inicial', () => {
    it('muestra los precios aplicando valores guardados', async () => {
      await montar();

      expect(screen.getByLabelText('Precio Mín').props.value).toBe('20');
      expect(screen.getByLabelText('Precio Máx').props.value).toBe('40');
    });

    it('deja vacío el máximo cuando no hay tope', async () => {
      await montar({ precioMax: Infinity });

      expect(screen.getByLabelText('Precio Máx').props.value).toBe('');
    });

    it('deja vacío el mínimo cuando no hay límite inferior', async () => {
      await montar({ precioMin: Infinity });

      expect(screen.getByLabelText('Precio Mín').props.value).toBe('');
    });

    it('expone la disponibilidad como filtro conmutable', async () => {
      await montar();

      expect(screen.getByLabelText('Solo disponibles').props.value).toBe(true);
    });
  });

  describe('edición de precio', () => {
    it('sustituye Infinity por el mínimo del rango al vaciar el mínimo', async () => {
      const { onApply } = await montar({ precioMin: Infinity });

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '');
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ precioMin: 10 }));
    });

    it('interpreta el máximo vacío como ausencia de tope', async () => {
      const { onApply } = await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Máx'), '');
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ precioMax: Infinity }));
    });

    it('descarta caracteres no numéricos', async () => {
      const { onApply } = await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '2a0');
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ precioMin: 20 }));
    });

    it('convierte el texto introducido en número', async () => {
      const { onApply } = await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '15');
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ precioMin: 15 }));
    });
  });

  describe('rango incoherente', () => {
    it('advierte cuando el mínimo supera al máximo', async () => {
      await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '80');

      expect(
        screen.getByText('El precio mínimo no puede superar al máximo.'),
      ).toBeTruthy();
    });

    it('no muestra la advertencia con un rango coherente', async () => {
      await montar();

      expect(
        screen.queryByText('El precio mínimo no puede superar al máximo.'),
      ).toBeNull();
    });

    it('bloquea aplicar cuando el rango es incoherente', async () => {
      const { onApply } = await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '80');
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).not.toHaveBeenCalled();
    });

    it('marca el botón de aplicar como deshabilitado', async () => {
      await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '80');

      expect(
        screen.getByLabelText('Aplicar filtros').props.accessibilityState.disabled,
      ).toBe(true);
    });

    it('vuelve a habilitar aplicar al corregir el rango', async () => {
      const { onApply } = await montar();

      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '80');
      await fireEvent.changeText(screen.getByLabelText('Precio Mín'), '30');

      expect(
        screen.getByLabelText('Aplicar filtros').props.accessibilityState.disabled,
      ).toBe(false);

      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({ precioMin: 30, precioMax: 40 }),
      );
    });
  });

  describe('selección múltiple', () => {
    it('añade una talla al pulsarla', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('L'));
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({ tallas: ['M', 'L'] }),
      );
    });

    it('quita una talla ya seleccionada', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('M'));
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ tallas: [] }));
    });

    it('añade un color al pulsarlo', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('Blanco'));
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({ colores: ['Negro', 'Blanco'] }),
      );
    });

    it('quita un color ya seleccionado', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('Negro'));
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ colores: [] }));
    });

    it('cambia la disponibilidad', async () => {
      const { onApply } = await montar();

      await fireEvent(screen.getByLabelText('Solo disponibles'), 'valueChange', false);
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({ soloDisponibles: false }),
      );
    });
  });

  describe('acciones', () => {
    it('aplica los filtros conservando búsqueda y ordenamiento', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledTimes(1);
      expect(onApply).toHaveBeenCalledWith(
        expect.objectContaining({ busqueda: 'polo', sortBy: 'price_asc' }),
      );
    });

    it('restablece los filtros conservando el ordenamiento al aplicar', async () => {
      const { onApply } = await montar();

      await fireEvent.press(screen.getByLabelText('Limpiar filtros'));
      await fireEvent.press(screen.getByLabelText('Aplicar filtros'));

      expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, sortBy: 'price_asc' });
    });

    it('descarta las selecciones locales al limpiar', async () => {
      await montar();

      await fireEvent.press(screen.getByLabelText('Limpiar filtros'));

      expect(screen.getByLabelText('M').props.accessibilityState.selected).toBe(false);
      expect(screen.getByLabelText('Negro').props.accessibilityState.selected).toBe(false);
      expect(screen.getByLabelText('Solo disponibles').props.value).toBe(false);
    });

    it('cierra sin aplicar al pulsar la equis', async () => {
      const { onApply, onClose } = await montar();

      await fireEvent.press(screen.getByLabelText('Cerrar filtros'));

      expect(onApply).not.toHaveBeenCalled();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('cierra al tocar el fondo', async () => {
      const { onClose } = await montar();

      await fireEvent.press(screen.getByLabelText('Cerrar filtros tocando el fondo'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});