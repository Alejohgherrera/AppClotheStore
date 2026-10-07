import { act, render, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterProvider, useFilters } from '../FilterContext';
import { DEFAULT_FILTERS } from '../../data/filters';

const STORAGE_KEY = '@clothestore/filters';

const HOMBRE = { id: 'hombre', nombre: 'Hombre' };
const POLOS = { id: 'polos', nombre: 'Polos' };
const MUJER = { id: 'mujer', nombre: 'Mujer' };
const VESTIDOS = { id: 'vestidos', nombre: 'Vestidos' };

function Consumidor({ onApi }) {
  const api = useFilters();

  onApi(api);

  return <Text>{api.hydrated ? 'hidratado' : 'hidratando'}</Text>;
}

async function montar(almacenado) {
  if (almacenado !== undefined) {
    await AsyncStorage.setItem(STORAGE_KEY, almacenado);
  }

  let api;
  await act(async () => {
    render(
      <FilterProvider>
        <Consumidor onApi={(value) => { api = value; }} />
      </FilterProvider>,
    );
  });

  return () => api;
}

async function montarConLecturaPendiente() {
  let resolver;
  jest.spyOn(AsyncStorage, 'getItem').mockImplementationOnce(
    () => new Promise((resolve) => {
      resolver = resolve;
    }),
  );

  let api;
  await act(async () => {
    render(
      <FilterProvider>
        <Consumidor onApi={(value) => { api = value; }} />
      </FilterProvider>,
    );
  });

  return { leer: () => api, resolver: (valor) => act(async () => resolver(valor)) };
}

describe('FilterContext', () => {
  beforeEach(async () => {
    jest.restoreAllMocks();
    await AsyncStorage.clear();
  });

  describe('hidratación', () => {
    it('expone hydrated en false hasta completar la lectura', async () => {
      const { leer, resolver } = await montarConLecturaPendiente();

      expect(leer().hydrated).toBe(false);

      await resolver(null);

      expect(leer().hydrated).toBe(true);
    });

    it('devuelve los valores por defecto cuando no hay datos guardados', async () => {
      const leer = await montar();

      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(DEFAULT_FILTERS);
    });

    it('restaura los filtros guardados de cada combinación', async () => {
      const leer = await montar(
        JSON.stringify({
          'hombre::polos': { precioMin: 20, precioMax: 40, busqueda: 'polo' },
          'mujer::vestidos': { soloDisponibles: true },
        }),
      );

      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(
        expect.objectContaining({ precioMin: 20, precioMax: 40, busqueda: 'polo' }),
      );
      expect(leer().getFiltersFor(MUJER, VESTIDOS)).toEqual(
        expect.objectContaining({ soloDisponibles: true, precioMax: Infinity }),
      );
    });

    it('normaliza datos guardados antiguos con precioMax null', async () => {
      const leer = await montar(
        JSON.stringify({ 'hombre::polos': { precioMin: 10, precioMax: null } }),
      );

      expect(leer().getFiltersFor(HOMBRE, POLOS).precioMax).toBe(Infinity);
    });

    it('descarta combinaciones guardadas con valor incoherente', async () => {
      const leer = await montar(
        JSON.stringify({ 'hombre::polos': 'invalido', 'mujer::vestidos': { tallas: 'M' } }),
      );

      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(DEFAULT_FILTERS);
      expect(leer().getFiltersFor(MUJER, VESTIDOS).tallas).toEqual([]);
    });

    it('no sobrescribe el almacenamiento cuando la lectura falla', async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ 'hombre::polos': { precioMin: 10 } }),
      );
      const original = await AsyncStorage.getItem(STORAGE_KEY);
      jest
        .spyOn(AsyncStorage, 'getItem')
        .mockImplementationOnce(() => Promise.reject(new Error('fallo de lectura')));

      const leer = await montar();

      expect(leer().hydrated).toBe(true);

      expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe(original);
    });

    it('no sobrescribe el almacenamiento cuando el JSON es inválido', async () => {
      await AsyncStorage.setItem(STORAGE_KEY, '{ esto no es json');

      const leer = await montar();

      expect(leer().hydrated).toBe(true);
      expect(await AsyncStorage.getItem(STORAGE_KEY)).toBe('{ esto no es json');
    });
  });

  describe('mutaciones', () => {
    it('ignora las escrituras recibidas antes de hidratar', async () => {
      const { leer, resolver } = await montarConLecturaPendiente();

      leer().setFiltersFor(HOMBRE, POLOS, { precioMin: 30 });
      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(DEFAULT_FILTERS);

      await resolver(null);

      expect(leer().getFiltersFor(HOMBRE, POLOS).precioMin).toBe(0);
    });

    it('ignora el reset recibido antes de hidratar', async () => {
      const { leer, resolver } = await montarConLecturaPendiente();

      leer().resetFiltersFor(HOMBRE, POLOS);
      await resolver(null);

      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(DEFAULT_FILTERS);
    });

    it('guarda los filtros de forma independiente por combinación', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { tallas: ['M'] });
      });
      await act(async () => {
        leer().setFiltersFor(MUJER, VESTIDOS, { busqueda: 'vestido' });
      });

      expect(leer().getFiltersFor(HOMBRE, POLOS).tallas).toEqual(['M']);
      expect(leer().getFiltersFor(HOMBRE, POLOS).busqueda).toBe('');
      expect(leer().getFiltersFor(MUJER, VESTIDOS).busqueda).toBe('vestido');
      expect(leer().getFiltersFor(MUJER, VESTIDOS).tallas).toEqual([]);
    });

    it('reemplaza la combinación completa al guardar', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { busqueda: 'polo', sortBy: 'price_asc' });
      });
      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { sortBy: 'name_asc' });
      });

      const filtros = leer().getFiltersFor(HOMBRE, POLOS);
      expect(filtros.sortBy).toBe('name_asc');
      expect(filtros.busqueda).toBe('');
    });

    it('normaliza los filtros recibidos antes de guardarlos', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, {
          precioMin: -10,
          precioMax: Infinity,
          sortBy: 'inventado',
          busqueda: '  polo  ',
        });
      });

      const filtros = leer().getFiltersFor(HOMBRE, POLOS);
      expect(filtros.precioMin).toBe(0);
      expect(filtros.precioMax).toBe(Infinity);
      expect(filtros.sortBy).toBe('default');
      expect(filtros.busqueda).toBe('polo');
    });

    it('elimina los filtros de una combinación al resetear', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { tallas: ['M'] });
      });
      await act(async () => {
        leer().resetFiltersFor(HOMBRE, POLOS);
      });

      expect(leer().getFiltersFor(HOMBRE, POLOS)).toEqual(DEFAULT_FILTERS);
    });

    it('no afecta a otras combinaciones al resetear', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { tallas: ['M'] });
      });
      await act(async () => {
        leer().setFiltersFor(MUJER, VESTIDOS, { tallas: ['S'] });
      });
      await act(async () => {
        leer().resetFiltersFor(HOMBRE, POLOS);
      });

      expect(leer().getFiltersFor(MUJER, VESTIDOS).tallas).toEqual(['S']);
    });
  });

  describe('persistencia', () => {
    it('omite precioMax al guardar cuando no hay máximo', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { precioMin: 10, precioMax: Infinity });
      });

      expect(await AsyncStorage.getItem(STORAGE_KEY)).not.toBeNull();
      const guardado = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      expect(guardado['hombre::polos'].precioMin).toBe(10);
      expect('precioMax' in guardado['hombre::polos']).toBe(false);
    });

    it('guarda cada combinación bajo su propia clave', async () => {
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, { tallas: ['M'] });
      });
      await act(async () => {
        leer().setFiltersFor(MUJER, VESTIDOS, { tallas: ['S'] });
      });

      const guardado = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      expect(guardado['hombre::polos'].tallas).toEqual(['M']);
      expect(guardado['mujer::vestidos'].tallas).toEqual(['S']);
    });

    it('restaura exactamente lo aplicado tras releer', async () => {
      const aplicador = { precioMin: 20, precioMax: 40, tallas: ['M'], colores: ['Negro'], soloDisponibles: true, sortBy: 'price_desc', busqueda: 'polo' };
      const leer = await montar();

      await act(async () => {
        leer().setFiltersFor(HOMBRE, POLOS, aplicador);
      });

      const releer = await montar();

      expect(releer().getFiltersFor(HOMBRE, POLOS)).toEqual(aplicador);
    });
  });

  describe('uso fuera del provider', () => {
    it('falla con un mensaje explícito', async () => {
      await expect(renderHook(() => useFilters())).rejects.toThrow(
        'useFilters debe usarse dentro de un FilterProvider',
      );
    });
  });
});