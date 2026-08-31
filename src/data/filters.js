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
};

export function getPriceRange(products) {
  if (!products || products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.precio);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function applyFilters(products, filters, priceRange) {
  if (!products) return [];

  let filtered = products.slice();

  if (filters.precioMin > priceRange.min) {
    filtered = filtered.filter((p) => p.precio >= filters.precioMin);
  }

  if (filters.precioMax < priceRange.max) {
    filtered = filtered.filter((p) => p.precio <= filters.precioMax);
  }

  if (filters.tallas.length > 0) {
    filtered = filtered.filter((p) =>
      filters.tallas.some((talla) => (p.tallas || []).includes(talla)),
    );
  }

  if (filters.colores.length > 0) {
    filtered = filtered.filter((p) =>
      filters.colores.some((color) =>
        (p.colores || []).some((c) => c.nombre === color),
      ),
    );
  }

  if (filters.soloDisponibles) {
    filtered = filtered.filter((p) => p.disponible);
  }

  if (filters.sortBy === 'price_asc') {
    filtered.sort((a, b) => a.precio - b.precio);
  } else if (filters.sortBy === 'price_desc') {
    filtered.sort((a, b) => b.precio - a.precio);
  } else if (filters.sortBy === 'name_asc') {
    filtered.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  return filtered;
}

export function countActiveFilters(filters) {
  let count = 0;
  if (filters.soloDisponibles) count++;
  if (filters.tallas.length > 0) count++;
  if (filters.colores.length > 0) count++;
  return count;
}

export function isPriceFilterActive(filters, priceRange) {
  return filters.precioMin > priceRange.min || filters.precioMax < priceRange.max;
}

export function getActiveFilterChips(filters, priceRange) {
  const chips = [];

  if (isPriceFilterActive(filters, priceRange)) {
    chips.push({
      key: 'precio',
      label: `Precio: ${filters.precioMin}€ - ${filters.precioMax === Infinity ? priceRange.max : filters.precioMax}€`,
    });
  }

  if (filters.tallas.length > 0) {
    chips.push({ key: 'tallas', label: `Talla: ${filters.tallas.join(', ')}` });
  }

  if (filters.colores.length > 0) {
    chips.push({ key: 'colores', label: `Color: ${filters.colores.join(', ')}` });
  }

  if (filters.soloDisponibles) {
    chips.push({ key: 'disponibles', label: 'Solo disponibles' });
  }

  return chips;
}
