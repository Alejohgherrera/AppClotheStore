# 010 · Tallas, variantes y stock

**Estado:** en curso

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

- [ ] `src/data/stock.js` declara el inventario de todas las combinaciones de talla y color del catálogo.
- [ ] Toda combinación del catálogo tiene una entrada de stock y toda entrada corresponde a una combinación real.
- [ ] `getVariantStock` devuelve el stock de una variante y cero si no existe.
- [ ] `isVariantAvailable` indica si una variante tiene unidades disponibles.
- [ ] `getAvailableSizes` devuelve solo las tallas con stock para un producto.
- [ ] `getAvailableColors` devuelve solo los colores con stock para un producto.
- [ ] `getVariantStock` y las funciones derivadas son puras y no dependen de React.
- [ ] El detalle deshabilita visualmente las tallas y colores sin stock.
- [ ] El detalle comunica el motivo por el que una talla o color no puede seleccionarse.
- [ ] El detalle no permite seleccionar una combinación agotada.
- [ ] Un producto totalmente agotado muestra la insignia y mantiene la CTA deshabilitada.
- [ ] `addItem` rechaza una variante agotada.
- [ ] `addItem` rechaza una cantidad que supere el stock disponible.
- [ ] `addItem` fusiona dos altas de la misma variante sin superar el stock acumulado.
- [ ] `updateQuantity` rechaza una cantidad superior al stock disponible.
- [ ] El carrito no permite superar el stock mediante el botón de aumento.
- [ ] Las líneas persistidas que superen el stock actual se recortan al hidratar.
- [ ] `count` y `total` siguen derivándose exclusivamente de líneas válidas.
- [ ] La UI comunica las tallas y colores agotados con roles y estados de accesibilidad.
- [ ] Los criterios críticos cuentan con pruebas automatizadas.
- [ ] La aplicación compila para Android e iOS con Expo SDK 54.
- [ ] La implementación no introduce dependencias de runtime innecesarias.

## Fuera de alcance

- La reserva definitiva de stock al pagar corresponde a las Features 023 y 024.
- La fuente de verdad del inventario, su persistencia y su sincronización pertenecen a las Features 011–015.
- La sincronización entre dispositivos y la concurrencia de carritos quedan fuera de alcance.
- La notificación al usuario cuando una variante vuelve a estar disponible corresponde a una feature posterior.
- Checkout, pagos y creación de pedidos pertenecen a las Features 018 y 023–026.
- Favoritos pertenecen a la Feature 017.