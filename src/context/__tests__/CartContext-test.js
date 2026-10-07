import {
  CART_ACTION_ERRORS,
  buildCartKey,
  normalizeCartItems,
} from '../CartContext';

const productoTallasYColores = {
  id: 'prod-a',
  nombre: 'Producto A',
  precio: 10,
  categoria: 'Polos',
  disponible: true,
  tallas: ['S', 'M'],
  colores: [
    { nombre: 'Negro', codigo: '#000000' },
    { nombre: 'Blanco', codigo: '#FFFFFF' },
  ],
};

const productoAgotado = {
  id: 'prod-b',
  nombre: 'Producto B',
  precio: 20,
  categoria: 'Gorras',
  disponible: false,
  tallas: [],
  colores: [],
};

const productoSinVariantes = {
  id: 'prod-c',
  nombre: 'Producto C',
  precio: 30,
  categoria: 'Boxers',
  disponible: true,
  tallas: [],
  colores: [],
};

const catalogo = [productoTallasYColores, productoAgotado, productoSinVariantes];

describe('buildCartKey', () => {
  it('combina producto, talla y color', () => {
    expect(buildCartKey(productoTallasYColores, 'M', 'Negro')).toBe('prod-a::M::Negro');
  });

  it('normaliza la ausencia de talla y color', () => {
    expect(buildCartKey(productoSinVariantes, null, null)).toBe(
      'prod-c::sin-talla::sin-color',
    );
  });

  it('distingue combinaciones distintas', () => {
    expect(buildCartKey(productoTallasYColores, 'M', 'Negro')).not.toBe(
      buildCartKey(productoTallasYColores, 'M', 'Blanco'),
    );
  });
});

describe('normalizeCartItems', () => {
  it('devuelve un array vacío cuando la entrada no es válida', () => {
    expect(normalizeCartItems(null, catalogo)).toEqual([]);
    expect(normalizeCartItems('corrupto', catalogo)).toEqual([]);
  });

  it('resuelve el producto canónico por su identificador', () => {
    const resultado = normalizeCartItems(
      [{ productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 1 }],
      catalogo,
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].producto).toBe(productoTallasYColores);
  });

  it('acepta el producto embebido en items persistidos antiguos', () => {
    const resultado = normalizeCartItems(
      [{ producto: { id: 'prod-a' }, talla: 'M', color: 'Negro', cantidad: 2 }],
      catalogo,
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(2);
  });

  it('descarta productos agotados', () => {
    const resultado = normalizeCartItems(
      [{ productoId: 'prod-b', cantidad: 1 }],
      catalogo,
    );

    expect(resultado).toEqual([]);
  });

  it('descarta productos que no existen en el catálogo', () => {
    const resultado = normalizeCartItems(
      [{ productoId: 'inexistente', cantidad: 1 }],
      catalogo,
    );

    expect(resultado).toEqual([]);
  });

  it('descarta tallas y colores no contemplados por el producto', () => {
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'XXL', color: 'Negro', cantidad: 1 }], catalogo),
    ).toEqual([]);
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'M', color: 'Verde', cantidad: 1 }], catalogo),
    ).toEqual([]);
  });

  it('descarta cantidades no enteras o no positivas', () => {
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 0 }], catalogo),
    ).toEqual([]);
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: -2 }], catalogo),
    ).toEqual([]);
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 1.5 }], catalogo),
    ).toEqual([]);
    expect(
      normalizeCartItems([{ productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: '2' }], catalogo),
    ).toEqual([]);
  });

  it('acepta el color como objeto en items persistidos', () => {
    const resultado = normalizeCartItems(
      [{ productoId: 'prod-a', talla: 'M', color: { nombre: 'Negro' }, cantidad: 1 }],
      catalogo,
    );

    expect(resultado[0].color).toBe('Negro');
  });

  it('resuelve el color único sin seleccion explícita', () => {
    const producto = {
      ...productoTallasYColores,
      id: 'prod-d',
      colores: [{ nombre: 'Negro', codigo: '#000000' }],
    };
    const resultado = normalizeCartItems(
      [{ productoId: 'prod-d', talla: 'S', cantidad: 1 }],
      [producto],
    );

    expect(resultado[0].color).toBe('Negro');
  });

  it('fusiona líneas repetidas de la misma combinación', () => {
    const resultado = normalizeCartItems(
      [
        { productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 2 },
        { productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 3 },
      ],
      catalogo,
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(5);
  });

  it('mantiene separadas combinaciones distintas', () => {
    const resultado = normalizeCartItems(
      [
        { productoId: 'prod-a', talla: 'M', color: 'Negro', cantidad: 1 },
        { productoId: 'prod-a', talla: 'M', color: 'Blanco', cantidad: 1 },
        { productoId: 'prod-a', talla: 'S', color: 'Negro', cantidad: 1 },
      ],
      catalogo,
    );

    expect(resultado).toHaveLength(3);
  });

  it('descarta entradas que no son objetos', () => {
    const resultado = normalizeCartItems([null, 'texto', 5], catalogo);

    expect(resultado).toEqual([]);
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
      }),
    );
  });
});