# 016 · Carrito

**Estado:** en curso — remediación implementada y validada automáticamente; pendiente solo la validación visual manual en Android e iOS

## Qué hace

La feature permite abrir el carrito, agregar productos disponibles, modificar cantidades, eliminar líneas, vaciar el carrito y consultar el total local antes del checkout.

Las líneas se persisten en AsyncStorage y se revalidan al hidratarse contra el catálogo canónico. El checkout, los pagos y la reserva definitiva de stock siguen fuera de alcance.

## Estado del prototipo

El commit `24f4ca2` incorporó antes de esta especificación:

- `CartContext` con alta, fusión, eliminación, cantidades, total y contador;
- persistencia local bajo `@clothestore/cart`;
- una pantalla de carrito;
- una ruta de navegación registrada;
- integración desde el detalle de producto.

La pantalla era inaccesible porque el icono del header no era pulsable. El prototipo tampoco bloqueaba productos agotados, no controlaba la hidratación, aceptaba cantidades inválidas y persistía copias locales potencialmente obsoletas del producto.

## Estado de la remediación

Los ocho defectos del `plan.md` están corregidos y cubiertos por pruebas:

- El icono del header es un botón pulsable con `useNavigation()`, etiqueta que anuncia el número de artículos y `hitSlop` de 8.
- `addItem` valida disponibilidad, variante y cantidad antes de mutar, y resuelve el producto canónico por identificador.
- `updateQuantity` exige enteros positivos y trata el cero como eliminación explícita de la línea.
- Toda mutación devuelve `NOT_HYDRATED` hasta completar la lectura de AsyncStorage.
- La disminución se deshabilita realmente en cantidad uno, de modo que la interfaz comunica la acción ejecutada.
- Las líneas persistidas se normalizan y sustituyen por productos canónicos, de modo que precio y disponibilidad no quedan obsoletos.
- La pantalla distingue el estado de carga del estado vacío.
- El checkout permanece visible pero deshabilitado hasta la Feature 018.

## Por qué

El carrito es el estado intermedio entre descubrir un producto y completar una compra. Debe ser predecible, persistente y coherente con la disponibilidad actual del catálogo sin simular todavía un checkout o inventario remoto.

## Criterios de aceptación

- [x] El carrito puede abrirse desde los headers aplicables.
- [x] El botón de cabecera expone etiqueta accesible y badge actualizado.
- [x] La pantalla muestra un estado de carga hasta completar la hidratación.
- [x] Solo se pueden agregar productos disponibles con talla y color válidos.
- [x] La misma combinación de producto, talla y color fusiona cantidades.
- [x] Las cantidades son enteros positivos.
- [x] La cantidad mínima visible es uno y disminuir en uno no elimina la línea.
- [x] La eliminación requiere una acción explícita.
- [x] El usuario puede vaciar el carrito.
- [x] La persistencia conserva las claves actuales y migra snapshots antiguos al catálogo canónico.
- [x] Los datos locales inválidos se descartan de forma segura al hidratar.
- [x] `count` y `total` se calculan exclusivamente desde líneas válidas.
- [x] El checkout permanece deshabilitado hasta implementar la Feature 018.
- [x] Los controles de cantidad, eliminación y vaciado son accesibles.
- [x] La aplicación compila para Android e iOS con Expo SDK 54.
- [x] Los criterios críticos cuentan con pruebas automatizadas.
- [x] La implementación no introduce dependencias de runtime innecesarias.

## Cobertura de pruebas

| Criterio | Suite |
| --- | --- |
| Botón de cabecera, badge y navegación | `src/navigation/__tests__/AppNavigator-test.js` |
| Hidratación y bloqueo previo a mutar | `src/context/__tests__/CartProvider-test.js` |
| Altas, fusión, disponibilidad, variante y cantidad | `src/context/__tests__/CartProvider-test.js` |
| Actualización, eliminación y vaciado | `src/context/__tests__/CartProvider-test.js` |
| Normalización de snapshots y persistencia | `src/context/__tests__/CartContext-test.js`, `CartProvider-test.js` |
| `count` y `total` desde líneas válidas | `src/context/__tests__/CartProvider-test.js` |
| Estados visibles, accesibilidad y vaciado con confirmación | `src/screens/__tests__/CartScreen-test.js` |

## Fuera de alcance

- El stock por variante y la reserva definitiva de stock corresponden a las Features 010 y 011–015.
- Checkout, dirección, envío, pagos y creación de pedidos pertenecen a las Features 018 y 023–026.
- Sincronización entre dispositivos, autenticación y cupones quedan fuera del prototipo local.
- Favoritos pertenecen a la Feature 017.
