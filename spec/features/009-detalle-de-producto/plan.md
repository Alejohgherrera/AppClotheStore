# 009 · Detalle de producto — Plan de implementación

## Objetivo

Consolidar el prototipo existente como una pantalla de detalle completa, accesible y segura, sin anticipar el modelo de variantes ni duplicar la lógica del carrito.

## Enfoque

1. Mantener `ProductDetailScreen` como responsable de presentar el producto y sus selecciones locales.
2. Mantener `ProductCard` como responsable de navegar al detalle.
3. Delegar al `CartContext` toda alta, validación y persistencia de líneas de carrito.
4. Resolver la disponibilidad y las variantes contra el catálogo canónico dentro de la Feature 016.
5. Utilizar únicamente componentes y tokens disponibles en React Native, Expo y `src/theme/`.

## Línea base del prototipo

| Archivo | Responsabilidad actual |
| --- | --- |
| `src/components/ProductCard.js` | Navega al detalle pasando el objeto `producto`. |
| `src/screens/ProductDetailScreen.js` | Presenta una imagen y sus datos, selecciona tallas/colores y llama a `addItem`. |
| `src/navigation/AppNavigator.js` | Registra la ruta `ProductDetail`. |
| `src/context/CartContext.js` | Valida y agrega líneas de carrito. |
| `src/data/products.js` | Proporciona el catálogo local y el array `imagenes`. |

## Defectos que debe corregir

| Severidad | Defecto | Impacto | Archivo actual |
| --- | --- | --- | --- |
| Alta | Permite comprar un producto marcado como agotado. | El usuario puede iniciar una compra inválida. | `src/screens/ProductDetailScreen.js` |
| Alta | Los errores de talla y color solo se escriben en consola. | El usuario no sabe por qué no se agrega el producto. | `src/screens/ProductDetailScreen.js` |
| Media | El contenido usa un contenedor fijo sin desplazamiento. | La CTA o la información inferior pueden quedar fuera de pantalla. | `src/screens/ProductDetailScreen.js` |
| Media | Solo se muestra `imagenes[0]`. | No se aprovecha el contrato de imágenes múltiples. | `src/screens/ProductDetailScreen.js` |
| Media | No hay estados de accesibilidad en selecciones ni CTA. | La pantalla no comunica correctamente su interacción. | `src/screens/ProductDetailScreen.js` |

## Implementación

1. Conservar el flujo de navegación y el modelo local existentes.
2. Convertir la pantalla en una experiencia desplazable y adapting su imagen al array `imagenes`.
3. Incorporar feedback visible para selecciones obligatorias.
4. Deshabilitar la CTA cuando el producto no esté disponible o el carrito aún esté hidratándose.
5. Mostrar confirmación solo cuando `addItem` confirme una alta válida.
6. Añadir roles, etiquetas y estados accesibles a controles y CTA.
7. Cubrir navegación, disponibilidad, selecciones y feedback con pruebas.
8. Validar compilación y flujo visual en Android e iOS.

## Archivos previstos

```text
src/screens/ProductDetailScreen.js
src/navigation/AppNavigator.js
src/context/CartContext.js
src/components/ProductCard.js
```

Las pruebas se ubicarán en `src/screens/__tests__/` cuando se configure la infraestructura de testing.

## Dependencias

La remediación no requiere dependencias de runtime nuevas. La configuración de pruebas y lint se aprobará y documentará por separado antes de instalar paquetes de desarrollo.

## Decisiones

- **La CTA no administra inventario** — La disponibilidad y la persistencia se validan en `CartContext`.
- **El catálogo local permanece explícitamente provisional** — No se presenta como fuente comercial real.
- **La galería no requiere cambiar el modelo** — Se consumirá `imagenes[]` cuando existan varias imágenes.

## Riesgos

- **Una sola imagen por producto** — La galería debe funcionar también con arrays de un único elemento.
- **Variantes todavía incompletas** — No se debe simular stock por talla/color antes de la Feature 010.
- **Carrito no hidratado** — La acción debe permanecer bloqueada hasta completar la lectura de AsyncStorage.
