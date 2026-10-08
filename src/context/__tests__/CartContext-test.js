import {
  CART_ACTION_ERRORS,
  buildCartKey,
  normalizeCartItems,
} from '../CartContext';
import { products } from '../../data/products';

// Se usa el catálogo real porque el normalizador consulta el inventario de
// `src/data/stock.js`; un catálogo sintético no tendría existencias y todas
// las líneas se descartarían.

const conDosColores = products.find((p) => p.id === 'pack-boxers-catterick-bn');
const gorraNegra = products.find((p) => p.id === 'gorra-aksha-negra');
const agotado = products.find((p) => p.disponible === false);

describe('buildCartKey', () => {
  it('combina producto, talla y color', () => {
    expect(buildCartKey(conDosColores, 'M', 'Negro')).toBe(
      'pack-boxers-catterick-bn::M::Negro',
    );
  });

  it('normaliza la ausencia de talla y color', () => {
    expect(buildCartKey(conDosColores, null, null)).toBe(
      'pack-boxers-catterick-bn::sin-talla::sin-color',
    );
  });

  it('distingue combinaciones distintas', () => {
    expect(buildCartKey(conDosColores, 'M', 'Negro')).not.toBe(
      buildCartKey(conDosColores, 'M', 'Blanco'),
    );
  });
});

describe('normalizeCartItems', () => {
  it('devuelve un array vacío cuando la entrada no es válida', () => {
    expect(normalizeCartItems(null)).toEqual([]);
    expect(normalizeCartItems('corrupto')).toEqual([]);
  });

  it('resuelve el producto canónico por su identificador', () => {
    const resultado = normalizeCartItems([
      { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 1 },
    ]);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].producto).toBe(conDosColores);
  });

  it('acepta el producto embebido en items persistidos antiguos', () => {
    const resultado = normalizeCartItems([
      { producto: { id: conDosColores.id }, talla: 'M', color: 'Negro', cantidad: 2 },
    ]);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(2);
  });

  it('descarta productos agotados', () => {
    expect(
      normalizeCartItems([{ productoId: agotado.id, cantidad: 1 }]),
    ).toEqual([]);
  });

  it('descarta productos que no existen en el catálogo', () => {
    expect(normalizeCartItems([{ productoId: 'inexistente', cantidad: 1 }])).toEqual([]);
  });

  it('descarta tallas y colores no contemplados por el producto', () => {
    expect(
      normalizeCartItems([
        { productoId: conDosColores.id, talla: 'XXL', color: 'Negro', cantidad: 1 },
      ]),
    ).toEqual([]);
    expect(
      normalizeCartItems([
        { productoId: conDosColores.id, talla: 'M', color: 'Verde', cantidad: 1 },
      ]),
    ).toEqual([]);
  });

  it('descarta cantidades no enteras o no positivas', () => {
    for (const cantidad of [0, -2, 1.5, '2']) {
      expect(
        normalizeCartItems([
          { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad },
        ]),
      ).toEqual([]);
    }
  });

  it('acepta el color como objeto en items persistidos', () => {
    const resultado = normalizeCartItems([
      {
        productoId: conDosColores.id,
        talla: 'M',
        color: { nombre: 'Negro' },
        cantidad: 1,
      },
    ]);

    expect(resultado[0].color).toBe('Negro');
  });

  it('resuelve el color cuando el producto tiene uno solo', () => {
    const resultado = normalizeCartItems([
      { productoId: gorraNegra.id, talla: 'M', cantidad: 1 },
    ]);

    expect(resultado[0].color).toBe('Negro');
  });

  it('fusiona líneas repetidas de la misma combinación', () => {
    const resultado = normalizeCartItems([
      { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 2 },
      { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 3 },
    ]);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(5);
  });

  it('mantiene separadas combinaciones distintas', () => {
    const resultado = normalizeCartItems([
      { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 1 },
      { productoId: conDosColores.id, talla: 'S', color: 'Blanco', cantidad: 1 },
      { productoId: conDosColores.id, talla: 'S', color: 'Negro', cantidad: 1 },
    ]);

    expect(resultado).toHaveLength(3);
  });

  it('descarta entradas que no son objetos', () => {
    expect(normalizeCartItems([null, 'texto', 5])).toEqual([]);
  });
});

describe('normalizeCartItems con inventario', () => {
  it('descarta la línea de una variante agotada', () => {
    expect(
      normalizeCartItems([
        { productoId: conDosColores.id, talla: 'M', color: 'Blanco', cantidad: 1 },
      ]),
    ).toEqual([]);
  });

  it('recorta la cantidad al stock disponible en lugar de descartar la línea', () => {
    const resultado = normalizeCartItems([
      { productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 99 },
    ]);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(18);
  });

  it('recorta también la suma de líneas duplicadas', () => {
    const resultado = normalizeCartItems([
      { productoId: conDosColores.id, talla: 'S', color: 'Blanco', cantidad: 3 },
      { productoId: conDosColores.id, talla: 'S', color: 'Blanco', cantidad: 3 },
    ]);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(4);
  });

  it('respeta un catálogo personalizado y resuelve el producto contra él', () => {
    const catalogo = [
      {
        id: conDosColores.id,
        nombre: conDosColores.nombre,
        precio: conDosColores.precio,
        disponible: true,
        tallas: conDosColores.tallas,
        colores: conDosColores.colores,
      },
    ];

    const resultado = normalizeCartItems(
      [{ productoId: conDosColores.id, talla: 'M', color: 'Negro', cantidad: 1 }],
      catalogo,
    );

    expect(resultado[0].producto).toBe(catalogo[0]);
  });
});

describe('CART_ACTION_ERRORS', () => {
  it('expone los códigos de error utilizados por la interfaz', () => {
    expect(CART_ACTION_ERRORS).toEqual(
      expect.objectContaining({
        NOT_HYDRATED: 'NOT_HYDRATED',
        INVALID_PRODUCT: 'INVALID_PRODUCT',
        PRODUCT_UNAVAILABLE: 'PRODUCT_UNAVAILABLE',
        INVALID_VARIANT: 'INVALID_VARIANT',
        INVALID_QUANTITY: 'INVALID_QUANTITY',
        OUT_OF_STOCK: 'OUT_OF_STOCK',
        INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
      }),
    );
  });
});