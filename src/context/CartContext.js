import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@clothestore/cart';

const CartContext = createContext(null);

function buildCartKey(producto, talla, color) {
  return `${producto.id}::${talla || 'sin-talla'}::${color || 'sin-color'}`;
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item && item.producto && item.cantidad > 0);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active) return;
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            setItems(normalizeCartItems(parsed));
          } catch (error) {
            console.warn('No se pudieron cargar los productos del carrito:', error);
          }
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
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) => {
      console.warn('No se pudieron guardar los productos del carrito:', error);
    });
  }, [items, hydrated]);

  const addItem = useCallback((producto, talla, color, cantidad = 1) => {
    if (!producto || !talla) return;

    const key = buildCartKey(producto, talla, color);
    setItems((prev) => {
      const existing = prev.find((item) => item.id === key);
      if (existing) {
        return prev.map((item) =>
          item.id === key
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: key,
          producto,
          talla,
          color: color || null,
          cantidad,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, cantidad) => {
    if (cantidad <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, cantidad } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
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
