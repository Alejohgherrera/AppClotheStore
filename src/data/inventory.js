import { stock } from './stock';

// Funciones puras de consulta de inventario.
//
// Todas tratan `stock` como solo lectura, devuelven cero o una lista vacía
// ante combinaciones inexistentes y no lanzan excepciones. No dependen de
// React ni de ningún contexto, por lo que son verificables de forma aislada.

function getProductEntry(productoId) {
  if (typeof productoId !== 'string' || !productoId) return null;
  const entry = stock[productoId];
  return entry && typeof entry === 'object' ? entry : null;
}

function getSizeEntry(productoId, talla) {
  if (typeof talla !== 'string' || !talla) return null;
  const entry = getProductEntry(productoId);
  if (!entry) return null;
  const sizeEntry = entry[talla];
  return sizeEntry && typeof sizeEntry === 'object' ? sizeEntry : null;
}

function toStockNumber(value) {
  return Number.isInteger(value) && value > 0 ? value : 0;
}

export function getVariantStock(productoId, talla, color) {
  const sizeEntry = getSizeEntry(productoId, talla);
  if (!sizeEntry) return 0;
  if (typeof color !== 'string' || !color) return 0;
  return toStockNumber(sizeEntry[color]);
}

export function isVariantAvailable(productoId, talla, color) {
  return getVariantStock(productoId, talla, color) > 0;
}

// Una talla está disponible si tiene stock en cualquier color del producto.
// De lo contrario, una talla agotada solo en un color bloquearía una compra
// válida en otro.
export function getAvailableSizes(producto) {
  if (!producto || !producto.id) return [];
  const tallas = Array.isArray(producto.tallas) ? producto.tallas : [];
  const colores = Array.isArray(producto.colores) ? producto.colores : [];

  return tallas.filter((talla) =>
    colores.some((color) => getVariantStock(producto.id, talla, color.nombre) > 0),
  );
}

// El mismo criterio en el eje del color: disponible si hay stock en alguna
// talla.
export function getAvailableColors(producto) {
  if (!producto || !producto.id) return [];
  const tallas = Array.isArray(producto.tallas) ? producto.tallas : [];
  const colores = Array.isArray(producto.colores) ? producto.colores : [];

  return colores
    .filter((color) => tallas.some((talla) => getVariantStock(producto.id, talla, color.nombre) > 0))
    .map((color) => color.nombre);
}

export function getProductStock(producto) {
  if (!producto || !producto.id) return 0;
  const tallas = Array.isArray(producto.tallas) ? producto.tallas : [];
  const colores = Array.isArray(producto.colores) ? producto.colores : [];

  return tallas.reduce(
    (total, talla) =>
      total
      + colores.reduce(
        (subtotal, color) => subtotal + getVariantStock(producto.id, talla, color.nombre),
        0,
      ),
    0,
  );
}

export function isProductAvailable(producto) {
  return getProductStock(producto) > 0;
}