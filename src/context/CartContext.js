import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { products } from '../data/products';
import { getVariantStock } from '../data/inventory';

const STORAGE_KEY = '@clothestore/cart';

export const CART_ACTION_ERRORS = {
  NOT_HYDRATED: 'NOT_HYDRATED',
  INVALID_PRODUCT: 'INVALID_PRODUCT',
  PRODUCT_UNAVAILABLE: 'PRODUCT_UNAVAILABLE',
  INVALID_VARIANT: 'INVALID_VARIANT',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
};

const CartContext = createContext(null);

export function buildCartKey(producto, talla, color) {
  return `${producto.id}::${talla || 'sin-talla'}::${color || 'sin-color'}`;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function getColorName(color) {
  if (color && typeof color === 'object') return color.nombre || null;
  return typeof color === 'string' && color ? color : null;
}

function getVariant(producto, talla, color) {
  const availableSizes = Array.isArray(producto.tallas) ? producto.tallas : [];
  const availableColors = Array.isArray(producto.colores) ? producto.colores : [];
  const normalizedTalla = typeof talla === 'string' && talla ? talla : null;
  const normalizedColor = getColorName(color);

  if (availableSizes.length > 0) {
    if (!normalizedTalla || !availableSizes.includes(normalizedTalla)) return null;
  } else if (normalizedTalla) {
    return null;
  }

  if (availableColors.length > 0) {
    if (!normalizedColor) {
      if (availableColors.length !== 1) return null;
      return { talla: normalizedTalla, color: availableColors[0].nombre };
    }
    if (!availableColors.some((availableColor) => availableColor.nombre === normalizedColor)) {
      return null;
    }
  } else if (normalizedColor) {
    return null;
  }

  return { talla: normalizedTalla, color: normalizedColor };
}

function findCanonicalProduct(productId, catalog = products) {
  if (typeof productId !== 'string') return null;
  return catalog.find((product) => product.id === productId) || null;
}

export function normalizeCartItems(items, catalog = products) {
  if (!Array.isArray(items)) return [];

  return items.reduce((normalized, item) => {
    if (!item || typeof item !== 'object') return normalized;

    const productId = item.productoId || item.producto?.id;
    const producto = findCanonicalProduct(productId, catalog);
    if (!producto || producto.disponible !== true) return normalized;

    const variant = getVariant(producto, item.talla, item.color);
    if (!variant || !isPositiveInteger(item.cantidad)) return normalized;

    const availableStock = getVariantStock(producto.id, variant.talla, variant.color);
    if (availableStock <= 0) return normalized;

    // Se recorta al stock actual en lugar de descartar la línea: si queda
    // alguna unidad, se conserva la intención de compra del usuario.
    const cantidad = Math.min(item.cantidad, availableStock);

    const id = buildCartKey(producto, variant.talla, variant.color);
    const existing = normalized.find((cartItem) => cartItem.id === id);
    if (existing) {
      existing.cantidad = Math.min(existing.cantidad + cantidad, availableStock);
      return normalized;
    }

    normalized.push({
      id,
      producto,
      talla: variant.talla,
      color: variant.color,
      cantidad,
    });
    return normalized;
  }, []);
}

function actionError(reason) {
  return { ok: false, reason };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [persistenceEnabled, setPersistenceEnabled] = useState(false);

  // Espejo síncrono de items: addItem necesita conocer la cantidad ya
  // presente de una variante para validar el stock sin depender del estado
  // del closure, que puede estar desactualizado en llamadas consecutivas.
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active) return;
        if (!raw) {
          setPersistenceEnabled(true);
          setHydrated(true);
          return;
        }

        try {
          const parsed = JSON.parse(raw);
          setItems(normalizeCartItems(parsed));
          setPersistenceEnabled(true);
        } catch (error) {
          console.warn('No se pudieron cargar los productos del carrito:', error);
        }
        setHydrated(true);
      })
      .catch((error) => {
        if (active) {
          console.warn('No se pudieron cargar los productos del carrito:', error);
          setHydrated(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !persistenceEnabled) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) => {
      console.warn('No se pudieron guardar los productos del carrito:', error);
    });
  }, [items, hydrated, persistenceEnabled]);

  const addItem = useCallback((producto, talla, color, cantidad = 1) => {
    if (!hydrated) return actionError(CART_ACTION_ERRORS.NOT_HYDRATED);
    if (!producto || typeof producto.id !== 'string') {
      return actionError(CART_ACTION_ERRORS.INVALID_PRODUCT);
    }

    const canonicalProduct = findCanonicalProduct(producto.id);
    if (!canonicalProduct) return actionError(CART_ACTION_ERRORS.INVALID_PRODUCT);
    if (!canonicalProduct.disponible) {
      return actionError(CART_ACTION_ERRORS.PRODUCT_UNAVAILABLE);
    }

    const variant = getVariant(canonicalProduct, talla, color);
    if (!variant) return actionError(CART_ACTION_ERRORS.INVALID_VARIANT);

    const normalizedQuantity = cantidad === undefined ? 1 : cantidad;
    if (!isPositiveInteger(normalizedQuantity)) {
      return actionError(CART_ACTION_ERRORS.INVALID_QUANTITY);
    }

    const itemId = buildCartKey(canonicalProduct, variant.talla, variant.color);
    const availableStock = getVariantStock(
      canonicalProduct.id,
      variant.talla,
      variant.color,
    );
    if (availableStock <= 0) {
      return actionError(CART_ACTION_ERRORS.OUT_OF_STOCK);
    }

    const currentQuantity = itemsRef.current.find((item) => item.id === itemId)?.cantidad ?? 0;
    if (currentQuantity + normalizedQuantity > availableStock) {
      return {
        ...actionError(CART_ACTION_ERRORS.INSUFFICIENT_STOCK),
        availableStock,
        remaining: availableStock - currentQuantity,
      };
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, cantidad: item.cantidad + normalizedQuantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: itemId,
          producto: canonicalProduct,
          talla: variant.talla,
          color: variant.color,
          cantidad: normalizedQuantity,
        },
      ];
    });

    return { ok: true, itemId };
  }, [hydrated, itemsRef]);

  const removeItem = useCallback((itemId) => {
    if (!hydrated) return actionError(CART_ACTION_ERRORS.NOT_HYDRATED);
    if (typeof itemId !== 'string' || !itemId) {
      return actionError(CART_ACTION_ERRORS.INVALID_PRODUCT);
    }
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    return { ok: true, itemId };
  }, [hydrated]);

  const updateQuantity = useCallback((itemId, cantidad) => {
    if (!hydrated) return actionError(CART_ACTION_ERRORS.NOT_HYDRATED);
    if (typeof itemId !== 'string' || !itemId) {
      return actionError(CART_ACTION_ERRORS.INVALID_PRODUCT);
    }
    if (cantidad === 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return { ok: true, itemId, removed: true };
    }
    if (!isPositiveInteger(cantidad)) {
      return actionError(CART_ACTION_ERRORS.INVALID_QUANTITY);
    }

    const target = itemsRef.current.find((item) => item.id === itemId);
    if (!target) return actionError(CART_ACTION_ERRORS.INVALID_PRODUCT);

    const availableStock = getVariantStock(target.producto.id, target.talla, target.color);
    if (cantidad > availableStock) {
      return {
        ...actionError(CART_ACTION_ERRORS.INSUFFICIENT_STOCK),
        availableStock,
      };
    }

    setItems((prev) => prev.map((item) =>
      item.id === itemId ? { ...item, cantidad } : item,
    ));
    return { ok: true, itemId };
  }, [hydrated, itemsRef]);

  const clearCart = useCallback(() => {
    if (!hydrated) return actionError(CART_ACTION_ERRORS.NOT_HYDRATED);
    setItems([]);
    return { ok: true };
  }, [hydrated]);

  const total = items.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.cantidad, 0);

  const value = {
    items,
    hydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return ctx;
}
