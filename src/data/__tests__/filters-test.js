import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  applyFilters,
  countActiveFilters,
  getActiveFilterChips,
  getPriceRange,
  isPriceFilterActive,
  normalizeFilters,
  normalizeStoredFilterMap,
  normalizeText,
  serializeFilterMap,
  serializeFilters,
} from '../filters';

function producto(overrides = {}) {
  return {
    id: 'prod-base',
    nombre: 'Producto Base',
    descripcion: 'Descripción base del producto',
    precio: 25,
    categoria: 'Polos',
    genero: 'Hombre',
    imagenes: [],
    disponible: true,
    tallas: ['M'],
    colores: [{ nombre: 'Negro', codigo: '#000000' }],
    ...overrides,
  };
}

const catalogo = [
  producto({ id: 'barato', nombre: 'Barato', precio: 12, tallas: ['S'], colores: [{ nombre: 'Blanco', codigo: '#FFFFFF' }] }),
  producto({ id: 'medio', nombre: 'Medio', precio: 25 }),
  producto({ id: 'caro', nombre: 'Caro', precio: 60, disponible: false, tallas: ['XL'], colores: [{ nombre: 'Azul', codigo: '#0000FF' }] }),
];

const priceRange = { min: 12, max: 60 };

describe('normalizeText', () => {
  it('normaliza a minusculas y elimina diacríticos', () => {
    expect(normalizeText('Camiseta Ñandú ÁÉÍÓÚ')).toBe('camiseta nandu aeiou');
  });

  it('recorta los espacios exteriores', () => {
    expect(normalizeText('  Polo  ')).toBe('polo');
  });

  it('devuelve cadena vacía para valores no textuales', () => {
    expect(normalizeText(null)).toBe('');
    expect(normalizeText(undefined)).toBe('');
    expect(normalizeText(42)).toBe('');
  });
});

describe('getPriceRange', () => {
  it('devuelve el rango real del catálogo redondeando', () => {
    expect(getPriceRange([producto({ precio: 12.4 }), producto({ precio: 60.2 })])).toEqual({
      min: 12,
      max: 61,
    });
  });

  it('devuelve rango cero para entradas vacías o no array', () => {
    expect(getPriceRange([])).toEqual({ min: 0, max: 0 });
    expect(getPriceRange(null)).toEqual({ min: 0, max: 0 });
    expect(getPriceRange(undefined)).toEqual({ min: 0, max: 0 });
  });

  it('ignora precios no numéricos al calcular el rango', () => {
    expect(getPriceRange([producto({ precio: 30 }), { precio: null }, null])).toEqual({
      min: 30,
      max: 30,
    });
  });
});

describe('normalizeFilters', () => {
  it('devuelve los valores por defecto cuando no hay filtros', () => {
    expect(normalizeFilters()).toEqual(DEFAULT_FILTERS);
    expect(normalizeFilters(null)).toEqual(DEFAULT_FILTERS);
    expect(normalizeFilters('invalido')).toEqual(DEFAULT_FILTERS);
  });

  it('conserva los campos por defecto ausentes en la entrada', () => {
    const resultado = normalizeFilters({ soloDisponibles: true });

    expect(resultado.soloDisponibles).toBe(true);
    expect(resultado.precioMin).toBe(DEFAULT_FILTERS.precioMin);
    expect(resultado.precioMax).toBe(DEFAULT_FILTERS.precioMax);
    expect(resultado.sortBy).toBe('default');
    expect(resultado.busqueda).toBe('');
  });

  it('acepta precios numéricos escritos como texto', () => {
    const resultado = normalizeFilters({ precioMin: '20', precioMax: '40' });

    expect(resultado.precioMin).toBe(20);
    expect(resultado.precioMax).toBe(40);
  });

  it('descarta precios no numéricos', () => {
    const resultado = normalizeFilters({ precioMin: 'abc', precioMax: 'xyz' });

    expect(resultado.precioMin).toBe(DEFAULT_FILTERS.precioMin);
    expect(resultado.precioMax).toBe(DEFAULT_FILTERS.precioMax);
  });

  it('interpreta precioMax ausente como ausencia de máximo', () => {
    expect(normalizeFilters({ precioMin: 10 }).precioMax).toBe(Infinity);
    expect(normalizeFilters({ precioMin: 10, precioMax: null }).precioMax).toBe(Infinity);
    expect(normalizeFilters({ precioMin: 10, precioMax: '' }).precioMax).toBe(Infinity);
  });

  it('nunca permite un precio mínimo negativo', () => {
    expect(normalizeFilters({ precioMin: -50 }).precioMin).toBe(0);
    expect(normalizeFilters({ precioMin: -50, precioMax: -10 }).precioMax).toBe(0);
  });

  it('iguala el máximo al mínimo cuando el rango es incoherente', () => {
    const resultado = normalizeFilters({ precioMin: 60, precioMax: 20 });

    expect(resultado.precioMin).toBe(60);
    expect(resultado.precioMax).toBe(60);
  });

  it('descarta una opción de ordenamiento desconocida', () => {
    expect(normalizeFilters({ sortBy: 'inventado' }).sortBy).toBe('default');
    SORT_OPTIONS.forEach((option) => {
      expect(normalizeFilters({ sortBy: option.value }).sortBy).toBe(option.value);
    });
  });

  it('normaliza tallas y colores a cadenas únicas sin vacías', () => {
    const resultado = normalizeFilters({
      tallas: ['M', 'M', ' L ', '', null, 42],
      colores: ['Negro', 'Negro', ''],
    });

    expect(resultado.tallas).toEqual(['M', ' L ']);
    expect(resultado.colores).toEqual(['Negro']);
  });

  it('descarta tallas y colores que no son arrays', () => {
    expect(normalizeFilters({ tallas: 'M', colores: 'Negro' }).tallas).toEqual([]);
    expect(normalizeFilters({ tallas: 'M', colores: 'Negro' }).colores).toEqual([]);
  });

  it('exige soloDisponibles estrictamente verdadero', () => {
    expect(normalizeFilters({ soloDisponibles: true }).soloDisponibles).toBe(true);
    expect(normalizeFilters({ soloDisponibles: 'true' }).soloDisponibles).toBe(false);
    expect(normalizeFilters({ soloDisponibles: 1 }).soloDisponibles).toBe(false);
  });

  it('recorta el término de búsqueda', () => {
    expect(normalizeFilters({ busqueda: '  polo  ' }).busqueda).toBe('polo');
    expect(normalizeFilters({ busqueda: 42 }).busqueda).toBe('');
  });
});

describe('serializeFilters', () => {
  it('omite precioMax cuando no hay máximo', () => {
    const serializado = serializeFilters({ precioMin: 10, precioMax: Infinity });

    expect('precioMax' in serializado).toBe(false);
    expect(JSON.stringify(serializado)).toContain('"precioMin":10');
  });

  it('conserva precioMax cuando existe un máximo real', () => {
    expect(serializeFilters({ precioMin: 10, precioMax: 40 }).precioMax).toBe(40);
  });

  it('produce un objeto serializable en JSON', () => {
    const serializado = serializeFilters({ precioMin: 10, precioMax: Infinity });

    expect(() => JSON.stringify(serializado)).not.toThrow();
    expect(JSON.parse(JSON.stringify(serializado)).precioMax).toBeUndefined();
  });

  it('sobrevive un ciclo de serialización y restauración', () => {
    const original = { precioMin: 10, precioMax: 30, busqueda: 'polo', sortBy: 'price_asc' };
    const restaurado = normalizeFilters(JSON.parse(JSON.stringify(serializeFilters(original))));

    expect(restaurado.precioMin).toBe(10);
    expect(restaurado.precioMax).toBe(30);
    expect(restaurado.busqueda).toBe('polo');
    expect(restaurado.sortBy).toBe('price_asc');
  });
});

describe('normalizeStoredFilterMap', () => {
  it('normaliza cada combinación almacenada', () => {
    const resultado = normalizeStoredFilterMap({
      'hombre::polos': { precioMin: '10', precioMax: null, busqueda: ' polo ' },
    });

    expect(resultado['hombre::polos'].precioMin).toBe(10);
    expect(resultado['hombre::polos'].precioMax).toBe(Infinity);
    expect(resultado['hombre::polos'].busqueda).toBe('polo');
  });

  it('devuelve un mapa vacío para entradas no objecto', () => {
    expect(normalizeStoredFilterMap(null)).toEqual({});
    expect(normalizeStoredFilterMap('texto')).toEqual({});
    expect(normalizeStoredFilterMap([1, 2])).toEqual({});
  });

  it('descarta combinaciones cuyo valor no es un objeto', () => {
    expect(normalizeStoredFilterMap({ 'hombre::polos': 'invalido', 'mujer::vestidos': null })).toEqual({});
  });
});

describe('serializeFilterMap', () => {
  it('serializa cada combinación de forma independiente', () => {
    const serializado = serializeFilterMap({
      'hombre::polos': { precioMin: 10, precioMax: 30 },
      'mujer::vestidos': { precioMin: 50, precioMax: Infinity },
    });

    expect(serializado['hombre::polos'].precioMax).toBe(30);
    expect('precioMax' in serializado['mujer::vestidos']).toBe(false);
  });

  it('es idempotente al aplicarse dos veces', () => {
    const unaVez = serializeFilterMap({ 'hombre::polos': { precioMin: 10, precioMax: 30 } });
    const dosVeces = serializeFilterMap(normalizeStoredFilterMap(unaVez));

    expect(dosVeces).toEqual(unaVez);
  });
});

describe('applyFilters', () => {
  it('devuelve vacío si los productos no son un array', () => {
    expect(applyFilters(null, DEFAULT_FILTERS)).toEqual([]);
  });

  it('no muta el array original', () => {
    const original = catalogo.slice();
    applyFilters(catalogo, { sortBy: 'price_asc' }, priceRange);

    expect(catalogo.map((item) => item.id)).toEqual(original.map((item) => item.id));
  });

  it('devuelve todos los productos sin filtros', () => {
    expect(applyFilters(catalogo, DEFAULT_FILTERS, priceRange)).toHaveLength(3);
  });

  it('filtra por precio mínimo y máximo', () => {
    expect(
      applyFilters(catalogo, { precioMin: 20, precioMax: 30 }, priceRange).map((p) => p.id),
    ).toEqual(['medio']);
  });

  it('ignora los limites de precio que coinciden con el rango completo', () => {
    expect(applyFilters(catalogo, { precioMin: 12, precioMax: 60 }, priceRange)).toHaveLength(3);
  });

  it('filtra por talla', () => {
    expect(applyFilters(catalogo, { tallas: ['XL'] }, priceRange).map((p) => p.id)).toEqual(['caro']);
  });

  it('filtra por color', () => {
    expect(applyFilters(catalogo, { colores: ['Blanco'] }, priceRange).map((p) => p.id)).toEqual(['barato']);
  });

  it('filtra por disponibilidad', () => {
    expect(
      applyFilters(catalogo, { soloDisponibles: true }, priceRange).map((p) => p.id),
    ).toEqual(['barato', 'medio']);
  });

  it('busca por nombre sin distinguir mayúsculas ni acentos', () => {
    expect(applyFilters(catalogo, { busqueda: 'MEDIO' }, priceRange).map((p) => p.id)).toEqual(['medio']);
    expect(applyFilters(catalogo, { busqueda: 'barato' }, priceRange).map((p) => p.id)).toEqual(['barato']);
  });

  it('busca por descripción y categoría', () => {
    expect(
      applyFilters(catalogo, { busqueda: 'descripcion base' }, priceRange),
    ).toHaveLength(3);
    expect(applyFilters(catalogo, { busqueda: 'polos' }, priceRange)).toHaveLength(3);
  });

  it('busca por atributos de talla y color', () => {
    expect(applyFilters(catalogo, { busqueda: 'xl' }, priceRange).map((p) => p.id)).toEqual(['caro']);
    expect(applyFilters(catalogo, { busqueda: 'azul' }, priceRange).map((p) => p.id)).toEqual(['caro']);
  });

  it('combina búsqueda con filtros activos', () => {
    const resultado = applyFilters(
      catalogo,
      { busqueda: 'a', soloDisponibles: true, tallas: ['M'] },
      priceRange,
    );

    expect(resultado.map((p) => p.id)).toEqual(['medio']);
  });

  it('ordena por precio ascendente y descendente', () => {
    expect(
      applyFilters(catalogo, { sortBy: 'price_asc' }, priceRange).map((p) => p.id),
    ).toEqual(['barato', 'medio', 'caro']);
    expect(
      applyFilters(catalogo, { sortBy: 'price_desc' }, priceRange).map((p) => p.id),
    ).toEqual(['caro', 'medio', 'barato']);
  });

  it('ordena por nombre', () => {
    expect(
      applyFilters(catalogo, { sortBy: 'name_asc' }, priceRange).map((p) => p.nombre),
    ).toEqual(['Barato', 'Caro', 'Medio']);
  });

  it('calcula el rango si no se le entrega', () => {
    expect(applyFilters(catalogo, { precioMin: 30 }).map((p) => p.id)).toEqual(['caro']);
  });
});

describe('isPriceFilterActive', () => {
  it('detecta un filtro real dentro del rango del catálogo', () => {
    expect(isPriceFilterActive({ precioMin: 10, precioMax: 30 }, priceRange)).toBe(true);
    expect(isPriceFilterActive({ precioMin: 20, precioMax: 60 }, priceRange)).toBe(true);
  });

  it('no cuenta como activo un rango igual al del catálogo', () => {
    expect(isPriceFilterActive({ precioMin: 12, precioMax: 60 }, priceRange)).toBe(false);
    expect(isPriceFilterActive(DEFAULT_FILTERS, priceRange)).toBe(false);
  });

  it('compara contra los valores por defecto sin rango', () => {
    expect(isPriceFilterActive({ precioMin: 0, precioMax: Infinity })).toBe(false);
    expect(isPriceFilterActive({ precioMin: 5, precioMax: Infinity })).toBe(true);
    expect(isPriceFilterActive({ precioMin: 0, precioMax: 100 })).toBe(true);
  });
});

describe('countActiveFilters', () => {
  it('devuelve cero sin filtros activos', () => {
    expect(countActiveFilters(DEFAULT_FILTERS, priceRange)).toBe(0);
  });

  it('cuenta cada categoría de filtro una vez', () => {
    expect(
      countActiveFilters(
        { soloDisponibles: true, tallas: ['M'], colores: ['Negro'], busqueda: 'polo' },
        priceRange,
      ),
    ).toBe(4);
  });

  it('no cuenta el precio cuando ningún límite restringe el rango', () => {
    expect(countActiveFilters({ precioMin: 12, precioMax: 60 }, priceRange)).toBe(0);
    expect(countActiveFilters({ precioMin: 12, precioMax: Infinity }, priceRange)).toBe(0);
  });

  it('cuenta el precio cuando un límite sí restringe el rango', () => {
    expect(countActiveFilters({ precioMin: 20, precioMax: 60 }, priceRange)).toBe(1);
    expect(countActiveFilters({ precioMin: 12, precioMax: 30 }, priceRange)).toBe(1);
  });

  it('compara contra los valores por defecto cuando no recibe rango', () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(countActiveFilters({ precioMin: 10, precioMax: Infinity })).toBe(1);
  });
});

describe('getActiveFilterChips', () => {
  it('no devuelve chips sin filtros activos', () => {
    expect(getActiveFilterChips(DEFAULT_FILTERS, priceRange)).toEqual([]);
  });

  it('devuelve un chip por cada filtro activo con su etiqueta', () => {
    const chips = getActiveFilterChips(
      { precioMin: 10, precioMax: 30, tallas: ['M'], colores: ['Negro'], soloDisponibles: true, busqueda: 'polo' },
      priceRange,
    );

    expect(chips.map((chip) => chip.key)).toEqual(['precio', 'tallas', 'colores', 'disponibles', 'busqueda']);
    expect(chips[0].label).toBe('Precio: 10€ - 30€');
    expect(chips[1].label).toBe('Talla: M');
    expect(chips[2].label).toBe('Color: Negro');
    expect(chips[3].label).toBe('Solo disponibles');
    expect(chips[4].label).toBe('Buscar: "polo"');
  });

  it('omite el chip de precio cuando solo el mínimo coincide con el rango', () => {
    expect(getActiveFilterChips({ precioMin: 12, precioMax: Infinity }, priceRange)).toEqual([]);
  });

  it('sustituye Infinity por el máximo del catálogo al etiquetar el chip', () => {
    const chips = getActiveFilterChips({ precioMin: 20, precioMax: Infinity }, priceRange);

    expect(chips).toHaveLength(1);
    expect(chips[0].label).toBe('Precio: 20€ - 60€');
  });

  it('omite el chip de precio cuando solo el máximo coincide con el rango', () => {
    expect(getActiveFilterChips({ precioMin: 0, precioMax: 60 }, priceRange)).toEqual([]);
  });

  it('omite el chip de precio cuando los límites coinciden con el rango', () => {
    const chips = getActiveFilterChips({ precioMin: 12, precioMax: 60 }, priceRange);

    expect(chips).toEqual([]);
  });

  it('agrupa varias tallas y colores en un único chip', () => {
    const chips = getActiveFilterChips({ tallas: ['S', 'M'], colores: ['Negro', 'Blanco'] }, priceRange);

    expect(chips).toHaveLength(2);
    expect(chips[0].label).toBe('Talla: S, M');
    expect(chips[1].label).toBe('Color: Negro, Blanco');
  });
});