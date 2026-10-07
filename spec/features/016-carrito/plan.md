# 016 · Carrito — Plan de implementación

## Objetivo

Remediar el carrito local para que sea accesible, persistente, validado y coherente con el catálogo, dejando explícitamente fuera el checkout y la reserva remota de stock.

## Enfoque

1. Mantener React Context API y la clave `@clothestore/cart`.
2. Resolver cada producto persistido por su identificador contra `src/data/products.js` durante la hidratación.
3. Bloquear toda mutación hasta que AsyncStorage termine de cargar.
4. Centralizar en `CartContext` las reglas de disponibilidad, variante y cantidad.
5. Mantener la presentación y las acciones de interfaz en `CartScreen`.
6. Navegar al carrito desde un único componente de header reutilizable.

## Línea base del prototipo

| Archivo | Responsabilidad actual |
| --- | --- |
| `src/context/CartContext.js` | Persistencia y mutaciones del carrito. |
| `src/screens/CartScreen.js` | Lista de líneas, cantidades, eliminación y total. |
| `src/navigation/AppNavigator.js` | Registro de la ruta e icono de carrito. |
| `src/screens/ProductDetailScreen.js` | Inicia el alta de una línea. |
| `src/data/products.js` | Catálogo canónico local. |

## Defectos que debe corregir

| Severidad | Defecto | Impacto | Archivo actual |
| --- | --- | --- | --- |
| Bloqueante | El icono del header no es pulsable y no navega al carrito. | El usuario no puede abrir la pantalla. | `src/navigation/AppNavigator.js` |
| Alta | `addItem` no valida disponibilidad ni variantes. | Es posible agregar productos agotados o selections inválidas. | `src/context/CartContext.js` |
| Alta | `updateQuantity` acepta decimales, `NaN` e infinitos. | El contador y el total pueden quedar corruptos. | `src/context/CartContext.js` |
| Alta | Las mutaciones pueden ocurrir antes de terminar la hidratación. | Una acción puede ser sobrescrita por el contenido persistido. | `src/context/CartContext.js` |
| Media | El botón de disminución aparenta estar deshabilitado en uno, pero elimina la línea. | La interfaz comunica una acción distinta a la ejecutada. | `src/screens/CartScreen.js` |
| Media | Se persiste una copia completa del producto. | Precio, imágenes y disponibilidad pueden quedar obsoletos. | `src/context/CartContext.js` |
| Media | La pantalla muestra vacío antes de saber si existe un carrito persistido. | Produce un estado visual transitorio incorrecto. | `src/screens/CartScreen.js` |
| Media | El checkout aparenta estar disponible, pero no ejecuta ninguna acción. | La interfaz promete una capacidad inexistente. | `src/screens/CartScreen.js` |

## Implementación

1. Añadir un botón de cabecera accesible que use `useNavigation()`.
2. Incorporar un estado de hidratación visible y bloquear la CTA de detalle mientras carga.
3. Normalizar las líneas persistidas y sustituir snapshots por productos canónicos.
4. Validar producto, disponibilidad, talla, color y cantidad en el Context.
5. Mantener cantidades enteras positivas y una eliminación explícita.
6. Añadir vaciado manual y un checkout deshabilitado.
7. Añadir etiquetas y estados de accesibilidad a las acciones.
8. Cubrir normalización, persistencia, fusiones y quantities con pruebas.

## Archivos previstos

```text
src/context/CartContext.js
src/screens/CartScreen.js
src/screens/ProductDetailScreen.js
src/navigation/AppNavigator.js
src/data/products.js
```

Las pruebas se ubicarán en `src/context/__tests__/` y `src/screens/__tests__/` cuando se configure la infraestructura de testing.

## Dependencias

La remediación no requiere dependencias de runtime nuevas. Jest, React Native Testing Library y ESLint se instalarán como dependencias de desarrollo únicamente después de explicar y aprobar su propósito.

## Decisiones

- **Mantener la clave de almacenamiento** — Evita perder carritos existentes durante la remediación.
- **Hidratar por catálogo canónico** — El producto persistido no es la fuente de precio o disponibilidad.
- **Cantidad mínima visible igual a uno** — La eliminación se realiza mediante el botón `Eliminar` o `Vaciar carrito`.
- **Carrito local independiente del backend** — No se simula una transacción comercial ni una reserva de inventario.

## Riesgos

- **Datos persistidos antiguos** — El normalizador debe aceptar el formato actual con `producto` y proteger la transición futura a `productoId`.
- **Errores de lectura** — No se debe sobrescribir el almacenamiento después de un fallo de lectura.
- **Límite de stock desconocido** — Solo se valida disponibilidad global hasta que la Feature 010 defina stock por variante.
