# 010 · Tallas, variantes y stock

**Estado:** en curso — implementada y validada automáticamente; pendiente la validación visual manual en Android e iOS

## Qué hace

La feature introduce inventario por variante para que la disponibilidad ya no dependa solo del producto completo. Cada combinación de producto, talla y color tiene su propia cantidad en stock.

Los datos de inventario viven en `src/data/stock.js`, separados del catálogo. La lógica de consulta es pura y vive en `src/data/inventory.js`.

El detalle de producto deshabilita las tallas y los colores agotados y explica el motivo. El carrito valida la cantidad contra el stock disponible y rechaza altas que lo excedan.

## Por qué

Hasta ahora la disponibilidad es un único booleano por producto. Eso permite agregar una talla agotada si el producto completo tiene existencias, y permite agregar más unidades de las disponibles. Ninguna de las dos situaciones es admisible en una tienda real, y ambas se resuelven cuando el inventario vive en la variante.

La comprobación de stock sigue siendo local. La reserva definitiva, la concurrencia entre dispositivos y la fuente de verdad del inventario pertenecen a las Features 011–015.

## Decisiones tomadas

- **Stock por variante completa** — La combinación producto + talla + color tiene su propia cantidad. Es el comportamiento habitual en moda, donde cada talla y color se produce por separado.
- **Inventario en archivo separado** — `src/data/stock.js` mantiene el catálogo limpio y permite que la Feature 011 sustituya la fuente de inventario sin tocar `products.js`.

## Estado del catálogo actual

El catálogo de desarrollo tiene 31 productos y 124 combinaciones de talla y color. Ningún producto carece de tallas o de colores, por lo que toda variante tiene una combinación bien formada. Las tallas usadas son `XS`, `S`, `M`, `L` y `XL`, aunque `XS` no aparece en ningún producto actual y `XXL` está en `availableSizes` sin uso.

## Criterios de aceptación

- [x] `src/data/stock.js` declara el inventario de todas las combinaciones de talla y color del catálogo.
- [x] Toda combinación del catálogo tiene una entrada de stock y toda entrada corresponde a una combinación real.
- [x] `getVariantStock` devuelve el stock de una variante y cero si no existe.
- [x] `isVariantAvailable` indica si una variante tiene unidades disponibles.
- [x] `getAvailableSizes` devuelve solo las tallas con stock para un producto.
- [x] `getAvailableColors` devuelve solo los colores con stock para un producto.
- [x] `getVariantStock` y las funciones derivadas son puras y no dependen de React.
- [x] El detalle deshabilita visualmente las tallas y colores sin stock.
- [x] El detalle comunica el motivo por el que una talla o color no puede seleccionarse.
- [x] El detalle no permite seleccionar una combinación agotada.
- [x] Un producto totalmente agotado muestra la insignia y mantiene la CTA deshabilitada.
- [x] `addItem` rechaza una variante agotada.
- [x] `addItem` rechaza una cantidad que supere el stock disponible.
- [x] `addItem` fusiona dos altas de la misma variante sin superar el stock acumulado.
- [x] `updateQuantity` rechaza una cantidad superior al stock disponible.
- [x] El carrito no permite superar el stock mediante el botón de aumento.
- [x] Las líneas persistidas que superen el stock actual se recortan al hidratar.
- [x] `count` y `total` siguen derivándose exclusivamente de líneas válidas.
- [x] La UI comunica las tallas y colores agotados con roles y estados de accesibilidad.
- [x] Los criterios críticos cuentan con pruebas automatizadas.
- [x] La aplicación compila para Android e iOS con Expo SDK 54.
- [x] La implementación no introduce dependencias de runtime innecesarias.

## Fuera de alcance

- La reserva definitiva de stock al pagar corresponde a las Features 023 y 024.
- La fuente de verdad del inventario, su persistencia y su sincronización pertenecen a las Features 011–015.
- La sincronización entre dispositivos y la concurrencia de carritos quedan fuera de alcance.
- La notificación al usuario cuando una variante vuelve a estar disponible corresponde a una feature posterior.
- Checkout, pagos y creación de pedidos pertenecen a las Features 018 y 023–026.
- Favoritos pertenecen a la Feature 017.

## Notas de implementación

- `availableSizes` incluye `XS` y `XXL`, y `XS` sí lo usan los 14 productos femeninos. Ningún producto usa `XXL`. La 010 no introduce ni elimina tallas: esa decisión pertenece a la evolución del catálogo.
- `addItem` necesita conocer la cantidad ya presente de la variante para validar el stock acumulado. Se resolvió con un espejo síncrono de `items` en un `useRef`, porque el estado del closure puede estar desactualizado en llamadas consecutivas dentro del mismo `act`.
- La suite de `normalizeCartItems` usa el catálogo real en lugar de un catálogo sintético, porque el normalizador consulta `src/data/stock.js` y un catálogo ficticio no tendría existencias.