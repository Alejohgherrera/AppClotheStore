import { stock } from '../stock';
import {
  getAvailableColors,
  getAvailableSizes,
  getProductStock,
  getVariantStock,
  isProductAvailable,
  isVariantAvailable,
} from '../inventory';
import { products } from '../products';

const porId = (id) => products.find((product) => product.id === id);

describe('stock', () => {
  it('cubre todas las combinaciones del catálogo', () => {
    const faltantes = [];

    for (const producto of products) {
      const entry = stock[producto.id];
      if (!entry) {
        faltantes.push(`${producto.id}: sin entrada`);
        continue;
      }

      for (const talla of producto.tallas) {
        if (!entry[talla]) {
          faltantes.push(`${producto.id}/${talla}: sin entrada de talla`);
          continue;
        }
        for (const color of producto.colores) {
          if (typeof entry[talla][color.nombre] !== 'number') {
            faltantes.push(`${producto.id}/${talla}/${color.nombre}: sin cantidad`);
          }
        }
      }
    }

    expect(faltantes).toEqual([]);
  });

  it('no declara combinaciones que no existen en el catálogo', () => {
    const sobrantes = [];

    for (const [productoId, porTalla] of Object.entries(stock)) {
      const producto = porId(productoId);
      if (!producto) {
        sobrantes.push(`${productoId}: producto inexistente`);
        continue;
      }

      for (const [talla, porColor] of Object.entries(porTalla)) {
        if (!producto.tallas.includes(talla)) {
          sobrantes.push(`${productoId}/${talla}: talla no declarada`);
          continue;
        }
        const nombres = producto.colores.map((color) => color.nombre);
        for (const color of Object.keys(porColor)) {
          if (!nombres.includes(color)) {
            sobrantes.push(`${productoId}/${talla}/${color}: color no declarado`);
          }
        }
      }
    }

    expect(sobrantes).toEqual([]);
  });

  it('usa solo cantidades enteras no negativas', () => {
    const invalidas = [];

    for (const [productoId, porTalla] of Object.entries(stock)) {
      for (const [talla, porColor] of Object.entries(porTalla)) {
        for (const [color, cantidad] of Object.entries(porColor)) {
          if (!Number.isInteger(cantidad) || cantidad < 0) {
            invalidas.push(`${productoId}/${talla}/${color}: ${cantidad}`);
          }
        }
      }
    }

    expect(invalidas).toEqual([]);
  });

  it('incluye variantes agotadas para poder probarlas', () => {
    const agotadas = Object.values(stock).flatMap((porTalla) =>
      Object.values(porTalla).flatMap((porColor) =>
        Object.values(porColor).filter((cantidad) => cantidad === 0),
      ),
    );

    expect(agotadas.length).toBeGreaterThan(0);
  });

  it('deja en cero las combinaciones de los productos ya agotados', () => {
    for (const producto of products.filter((p) => p.disponible === false)) {
      expect(getProductStock(producto)).toBe(0);
    }
  });
});

describe('getVariantStock', () => {
  const producto = porId('pack-boxers-catterick-bn');

  it('devuelve la cantidad de una variante existente', () => {
    expect(getVariantStock(producto.id, 'M', 'Negro')).toBe(18);
    expect(getVariantStock(producto.id, 'L', 'Blanco')).toBe(0);
  });

  it('devuelve cero ante combinaciones inexistentes', () => {
    expect(getVariantStock(producto.id, 'XXL', 'Negro')).toBe(0);
    expect(getVariantStock(producto.id, 'M', 'Verde')).toBe(0);
    expect(getVariantStock('producto-inexistente', 'M', 'Negro')).toBe(0);
  });

  it('devuelve cero ante identificadores no textuales', () => {
    expect(getVariantStock(null, 'M', 'Negro')).toBe(0);
    expect(getVariantStock(producto.id, null, 'Negro')).toBe(0);
    expect(getVariantStock(producto.id, 'M', null)).toBe(0);
    expect(getVariantStock(producto.id, 'M', 42)).toBe(0);
  });
});

describe('isVariantAvailable', () => {
  it('refleja si la variante tiene unidades', () => {
    expect(isVariantAvailable('pack-boxers-catterick-bn', 'M', 'Negro')).toBe(true);
    expect(isVariantAvailable('pack-boxers-catterick-bn', 'L', 'Blanco')).toBe(false);
  });
});

describe('getAvailableSizes', () => {
  it('excluye las tallas sin stock en ningún color', () => {
    expect(getAvailableSizes(porId('boxer-catterick-negro'))).toEqual(['S', 'M', 'L']);
  });

  it('conserva una talla disponible en al menos un color', () => {
    expect(getAvailableSizes(porId('pack-boxers-catterick-bn'))).toEqual(['S', 'M', 'L', 'XL']);
  });

  it('devuelve vacío cuando el producto está totalmente agotado', () => {
    expect(getAvailableSizes(porId('gorra-vitalis-negra'))).toEqual([]);
  });

  it('devuelve vacío ante productos inválidos', () => {
    expect(getAvailableSizes(null)).toEqual([]);
    expect(getAvailableSizes({})).toEqual([]);
  });
});

describe('getAvailableColors', () => {
  it('excluye los colores sin stock en ninguna talla', () => {
    expect(getAvailableColors(porId('camiseta-obsidian-gris'))).toEqual(['Gris']);
  });

  it('devuelve todos los colores disponibles de un producto multicolor', () => {
    expect(getAvailableColors(porId('pack-boxers-catterick-bn'))).toEqual(['Negro', 'Blanco']);
  });

  it('devuelve vacío cuando el producto está totalmente agotado', () => {
    expect(getAvailableColors(porId('gorra-vitalis-negra'))).toEqual([]);
  });
});

describe('getProductStock', () => {
  it('suma el stock de todas las variantes', () => {
    expect(getProductStock(porId('boxer-catterick-negro'))).toBe(45);
  });

  it('devuelve cero para productos agotados', () => {
    expect(getProductStock(porId('gorra-vitalis-negra'))).toBe(0);
  });

  it('devuelve cero ante productos inválidos', () => {
    expect(getProductStock(null)).toBe(0);
    expect(getProductStock({ id: 'inexistente' })).toBe(0);
  });
});

describe('isProductAvailable', () => {
  it('indica si el producto tiene alguna unidad', () => {
    expect(isProductAvailable(porId('boxer-catterick-negro'))).toBe(true);
    expect(isProductAvailable(porId('gorra-vitalis-negra'))).toBe(false);
  });
});