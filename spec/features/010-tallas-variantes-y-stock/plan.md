# 010 · Tallas, variantes y stock — Plan de implementación

## Objetivo

Introducir el inventario por variante y hacer que la interfaz y el carrito respeten la disponibilidad real de cada combinación de talla y color.

## Enfoque

1. Mantener el inventario en `src/data/stock.js`, separado del catálogo.
2. Centralizar toda consulta de inventario en funciones puras de `src/data/inventory.js`.
3. No modificar el modelo de producto: el stock no se añade a `products.js`.
4. Tratar la disponibilidad de una variante como la suma de su existencias, y la del producto como la de cualquiera de sus variantes con stock.
5. Mantener `CartContext` como único lugar que valida una alta contra el inventario.
6. Presentar las variantes agotadas en el detalle sin permitir su selección.

## Línea base

| Archivo | Responsabilidad actual |
| --- | --- |
| `src/data/products.js` | Catálogo local con `tallas`, `colores` y `disponible` por producto. |
| `src/data/stock.js` | Nuevo. Inventario por combinación de talla y color. |
| `src/data/inventory.js` | Nuevo. Consultas puras sobre el inventario. |
| `src/screens/ProductDetailScreen.js` | Permite seleccionar cualquier talla y color sin consultar existencias. |
| `src/context/CartContext.js` | Valida disponibilidad global del producto, sin comprobar stock. |
| `src/screens/CartScreen.js` | Permite aumentar la cantidad sin límite. |

## Defectos que debe corregir

| Severidad | Defecto | Impacto | Archivo actual |
| --- | --- | --- | --- |
| Alta | Se puede agregar una talla agotada si el producto tiene existencias. | El usuario compra algo que no hay. | `src/context/CartContext.js` |
| Alta | Se puede agregar más unidades de las disponibles. | El total local no es realizable. | `src/context/CartScreen.js` |
| Alta | Las tallas y colores agotados se muestran seleccionables. | La interfaz promete disponibilidad que no existe. | `src/screens/ProductDetailScreen.js` |
| Media | `updateQuantity` no tiene cota superior. | El carrito puede divergir del inventario. | `src/context/CartContext.js` |
| Media | Una línea persistida puede quedar por encima del stock actual. | Al rehidratar, el carrito muestra unidades inexistentes. | `src/context/CartContext.js` |
| Media | El aumento de cantidad nunca se deshabilita. | La interfaz no comunica el límite real. | `src/screens/CartScreen.js` |

## Modelo de datos

El inventario se declara como un mapa indexado por producto, y cada producto contiene sus variantes indexadas por talla y color:

```js
export const stock = {
  'boxer-catterick-negro': {
    S: { Negro: 12 },
    M: { Negro: 8 },
  },
};
```

El inventario es un dato de desarrollo y no representa existencias reales. Las funciones de `inventory.js` lo tratan como solo lectura.

## API de inventario

```js
getVariantStock(productoId, talla, color)
isVariantAvailable(productoId, talla, color)
getAvailableSizes(producto)
getAvailableColors(producto)
getProductStock(producto)
isProductAvailable(producto)
```

Todas reciben identificadores o el objeto de producto, devuelven números o listas de nombres de talla y color ya presentes en el catálogo, y no lanzan ante combinaciones inexistentes: devuelven cero o una lista vacía.

## Regla de consistencia del inventario

Una talla se considera disponible si tiene stock en **cualquier** color del producto. Un color se considera disponible si tiene stock en **cualquier** talla del producto. Esto evita deshabilitar una talla que sí puede comprarse en otro color.

Una combinación concreta solo queda deshabilitada si su stock exacto es cero.

## Integración con el detalle de producto

- Las tallas y colores sin stock se pintan con estilos de agotado y exponen `accessibilityState={{ disabled: true }}`.
- Al pulsar una variante agotada, la pantalla muestra feedback explicando que no hay existencias.
- Si el producto completo está agotado, se mantiene la insignia y la CTA deshabilitada de la Feature 009.
- Si una talla o un color queda sin selección viable tras aplicar el inventario, la selección se limpia para que la CTA no permita una combinación imposible.

## Integración con el carrito

- `addItem` rechaza una variante agotada con el código `OUT_OF_STOCK`.
- `addItem` rechaza una cantidad total superior al stock con el código `INSUFFICIENT_STOCK`, teniendo en cuenta la cantidad ya presente de esa misma variante.
- `updateQuantity` rechaza una cantidad superior al stock disponible.
- `normalizeCartItems` recorta la cantidad al stock disponible en lugar de descartar la línea, y descarta la línea cuando el stock es cero.
- `CartScreen` deshabilita el botón de aumento cuando la cantidad alcanza el stock.

## Archivos previstos

```text
src/data/stock.js
src/data/inventory.js
src/context/CartContext.js
src/screens/ProductDetailScreen.js
src/screens/CartScreen.js
src/data/products.js        (solo si el inventario exige ajustar disponible)
```

Las pruebas vivirán en `src/data/__tests__/`, `src/context/__tests__/` y `src/screens/__tests__/`.

## Dependencias

No se requieren dependencias de runtime nuevas. La feature usa solo React Native y los tokens de `src/theme/`.

## Decisiones

- **El inventario no entra en el modelo de producto** — Mantener `products.js` como catálogo y `stock.js` como inventario hace que la Feature 011 pueda sustituir la fuente sin reescribir el catálogo.
- **Una talla disponible si tiene stock en algún color** — Evita bloquear una compra válida por una combinación concreta agotada.
- **El recorte al hidratar conserva la línea** — Descartar la línea entera perdería la intención de compra del usuario cuando queda algo de stock; recortarla mantiene una cantidad realizable.
- **`OUT_OF_STOCK` e `INSUFFICIENT_STOCK` son códigos nuevos** — Se distinguen porque la interfaz debe decir "no hay" frente a "solo quedan n".
- **El inventario no se reserva al agregar al carrito** — La reserva definitiva pertenece al checkout; aquí solo se valida contra el estado local.

## Riesgos

- **Inventario desalineado con el catálogo** — Una prueba estructural verifica que toda combinación del catálogo tiene entrada y que toda entrada corresponde a una combinación real.
- **Divergencia entre lo que la interfaz permite y lo que el carrito acepta** — Ambas capas consultan las mismas funciones puras y las pruebas cubren el mismo escenario desde las dos.
- **Un recorte silencioso al hidratar** — El recorte se documenta en el propio `normalizeCartItems` y en la bitácora para que no parezca una pérdida de datos.
- **`availableSizes` incluye tallas sin uso en el catálogo** — La 010 no introduce ni elimina tallas; esa decisión pertenece a la evolución del catálogo.
- **Colores agotados en un producto de un solo color** — Si el único color se agota, la talla completa queda sin selección viable y la pantalla debe comunicarlo con claridad en lugar de dejar la CTA activa.