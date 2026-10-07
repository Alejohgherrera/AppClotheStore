export const SORT_OPTIONS = [
  { value: 'default', label: 'Por defecto' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'name_asc', label: 'Nombre: A-Z' },
];

export const DEFAULT_FILTERS = {
  precioMin: 0,
  precioMax: Infinity,
  tallas: [],
  colores: [],
  soloDisponibles: false,
  sortBy: 'default',
  busqueda: '',
};

function toFiniteNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item) => typeof item === 'string' && item.trim()))];
}

export function normalizeFilters(filters = {}) {
  const source = filters && typeof filters === 'object' ? filters : {};
  const precioMinValue = toFiniteNumber(source.precioMin);
  const precioMaxValue = toFiniteNumber(source.precioMax);
  const precioMin = precioMinValue === null
    ? DEFAULT_FILTERS.precioMin
    : Math.max(DEFAULT_FILTERS.precioMin, precioMinValue);
  const requestedMax = precioMaxValue === null
    ? DEFAULT_FILTERS.precioMax
    : Math.max(DEFAULT_FILTERS.precioMin, precioMaxValue);
  const precioMax = requestedMax === DEFAULT_FILTERS.precioMax || requestedMax >= precioMin
    ? requestedMax
    : precioMin;
  const sortBy = SORT_OPTIONS.some((option) => option.value === source.sortBy)
    ? source.sortBy
    : DEFAULT_FILTERS.sortBy;

  return {
    ...DEFAULT_FILTERS,
    precioMin,
    precioMax,
    tallas: normalizeStringArray(source.tallas),
    colores: normalizeStringArray(source.colores),
    soloDisponibles: source.soloDisponibles === true,
    sortBy,
    busqueda: typeof source.busqueda === 'string' ? source.busqueda.trim() : DEFAULT_FILTERS.busqueda,
  };
}

export function normalizeStoredFilterMap(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  return Object.entries(value).reduce((normalized, [key, filters]) => {
    if (filters && typeof filters === 'object' && !Array.isArray(filters)) {
      normalized[key] = normalizeFilters(filters);
    }
    return normalized;
  }, {});
}

export function serializeFilters(filters) {
  const normalized = normalizeFilters(filters);
  const serialized = {
    precioMin: normalized.precioMin,
    tallas: normalized.tallas,
    colores: normalized.colores,
    soloDisponibles: normalized.soloDisponibles,
    sortBy: normalized.sortBy,
    busqueda: normalized.busqueda,
  };

  if (normalized.precioMax !== DEFAULT_FILTERS.precioMax) {
    serialized.precioMax = normalized.precioMax;
  }

  return serialized;
}

export function serializeFilterMap(value) {
  return Object.entries(normalizeStoredFilterMap(value)).reduce((serialized, [key, filters]) => {
    serialized[key] = serializeFilters(filters);
    return serialized;
  }, {});
}

export function normalizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getPriceRange(products) {
  if (!Array.isArray(products) || products.length === 0) return { min: 0, max: 0 };
  const prices = products
    .map((product) => product && product.precio)
    .filter((price) => Number.isFinite(price));
  if (prices.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function applyFilters(products, filters, priceRange) {
  if (!Array.isArray(products)) return [];

  const activeFilters = normalizeFilters(filters);
  const activePriceRange = priceRange || getPriceRange(products);
  let filtered = products.slice();

  if (activeFilters.precioMin > activePriceRange.min) {
    filtered = filtered.filter((product) => product.precio >= activeFilters.precioMin);
  }

  if (activeFilters.precioMax < activePriceRange.max) {
    filtered = filtered.filter((product) => product.precio <= activeFilters.precioMax);
  }

  if (activeFilters.tallas.length > 0) {
    filtered = filtered.filter((product) =>
      activeFilters.tallas.some((talla) => (product.tallas || []).includes(talla)),
    );
  }

  if (activeFilters.colores.length > 0) {
    filtered = filtered.filter((product) =>
      activeFilters.colores.some((color) =>
        (product.colores || []).some((productColor) => productColor.nombre === color),
      ),
    );
  }

  if (activeFilters.soloDisponibles) {
    filtered = filtered.filter((product) => product.disponible);
  }

  if (activeFilters.busqueda) {
    const query = normalizeText(activeFilters.busqueda);
    filtered = filtered.filter((product) => {
      const nombre = normalizeText(product.nombre);
      const descripcion = normalizeText(product.descripcion);
      const categoria = normalizeText(product.categoria);
      const tallas = (product.tallas || []).map((talla) => normalizeText(talla)).join(' ');
      const colores = (product.colores || [])
        .map((color) => normalizeText(color.nombre))
        .join(' ');
      const searchableText = `${nombre} ${descripcion} ${categoria} ${tallas} ${colores}`;
      return searchableText.includes(query);
    });
  }

  if (activeFilters.sortBy === 'price_asc') {
    filtered.sort((a, b) => a.precio - b.precio);
  } else if (activeFilters.sortBy === 'price_desc') {
    filtered.sort((a, b) => b.precio - a.precio);
  } else if (activeFilters.sortBy === 'name_asc') {
    filtered.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  return filtered;
}

export function countActiveFilters(filters, priceRange) {
  const activeFilters = normalizeFilters(filters);
  let count = 0;
  if (activeFilters.soloDisponibles) count++;
  if (activeFilters.tallas.length > 0) count++;
  if (activeFilters.colores.length > 0) count++;
  if (activeFilters.busqueda) count++;
  if (priceRange) {
    if (isPriceFilterActive(activeFilters, priceRange)) count++;
  } else if (
    activeFilters.precioMin > DEFAULT_FILTERS.precioMin
    || activeFilters.precioMax !== DEFAULT_FILTERS.precioMax
  ) {
    count++;
  }
  return count;
}

export function isPriceFilterActive(filters, priceRange) {
  const activeFilters = normalizeFilters(filters);
  if (!priceRange) {
    return activeFilters.precioMin > DEFAULT_FILTERS.precioMin
      || activeFilters.precioMax !== DEFAULT_FILTERS.precioMax;
  }
  return activeFilters.precioMin > priceRange.min || activeFilters.precioMax < priceRange.max;
}

export function getActiveFilterChips(filters, priceRange) {
  const activeFilters = normalizeFilters(filters);
  const chips = [];

  if (isPriceFilterActive(activeFilters, priceRange)) {
    const maxPrice = activeFilters.precioMax === Infinity
      ? (priceRange?.max ?? activeFilters.precioMin)
      : activeFilters.precioMax;
    chips.push({
      key: 'precio',
      label: `Precio: ${activeFilters.precioMin}€ - ${maxPrice}€`,
    });
  }

  if (activeFilters.tallas.length > 0) {
    chips.push({ key: 'tallas', label: `Talla: ${activeFilters.tallas.join(', ')}` });
  }

  if (activeFilters.colores.length > 0) {
    chips.push({ key: 'colores', label: `Color: ${activeFilters.colores.join(', ')}` });
  }

  if (activeFilters.soloDisponibles) {
    chips.push({ key: 'disponibles', label: 'Solo disponibles' });
  }

  if (activeFilters.busqueda) {
    chips.push({ key: 'busqueda', label: `Buscar: "${activeFilters.busqueda}"` });
  }

  return chips;
}
