# 010 · Tallas, variantes y stock — Tareas

*Checklist accionable derivada del `plan.md`.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución.
- [x] Auditar el catálogo actual: 31 productos, 124 combinaciones de talla y color.
- [x] Consultar la documentación versionada de Expo SDK 54.
- [x] Confirmar con el usuario la granularidad del stock y su ubicación: stock por variante completa en `src/data/stock.js`.

## Datos de inventario

- [x] Crear `src/data/stock.js` con el inventario de las 124 combinaciones.
- [x] Incluir variantes agotadas repartidas por productos y tallas.
- [x] Documentar en el archivo que los datos son de desarrollo.

## Lógica de inventario

- [x] Crear `src/data/inventory.js` con funciones puras de solo lectura.
- [x] Implementar `getVariantStock` devolviendo cero ante combinaciones inexistentes.
- [x] Implementar `isVariantAvailable`.
- [x] Implementar `getAvailableSizes` usando la regla de cualquier color.
- [x] Implementar `getAvailableColors` usando la regla de cualquier talla.
- [x] Implementar `getProductStock` e `isProductAvailable`.

## Integración con el detalle de producto

- [x] Pintar como agotadas las tallas y colores sin stock.
- [x] Exponer `accessibilityState.disabled` en las variantes agotadas.
- [x] Mostrar feedback al pulsar una variante agotada.
- [x] Mantener la insignia y la CTA deshabilitadas si el producto completo está agotado.
- [x] Evitar que la CTA permita una combinación agotada.

> **Tarea retirada:** "Limpiar selecciones que dejen de ser viables" se descartó al implementar. Con inventario estático no puede ocurrir: una variante agotada nunca llega a estar seleccionada y el stock no cambia durante la sesión. La limpieza solo tendrá sentido cuando el inventario pase a ser dinámico en la Feature 011, y entonces deberá diseñarse junto con la sincronización.

## Integración con el carrito

- [x] Añadir los códigos `OUT_OF_STOCK` e `INSUFFICIENT_STOCK`.
- [x] Rechazar en `addItem` una variante agotada.
- [x] Rechazar en `addItem` una cantidad total superior al stock.
- [x] Recortar al stock en `normalizeCartItems` en lugar de descartar la línea.
- [x] Rechazar en `updateQuantity` una cantidad superior al stock.
- [x] Deshabilitar el aumento de cantidad al alcanzar el stock.

## Pruebas

- [x] Pruebas estructurales del inventario contra el catálogo.
- [x] Pruebas de las funciones puras de `inventory.js`.
- [x] Pruebas de `addItem` con stock insuficiente y variante agotada.
- [x] Pruebas del recorte al hidratar.
- [x] Pruebas de las variantes agotadas en el detalle.
- [x] Pruebas del límite de cantidad en la pantalla del carrito.

## Validación

- [x] Ejecutar `npm test`.
- [x] Ejecutar `npm run lint`.
- [x] Ejecutar `npx expo export --platform all`.
- [ ] Validar visualmente el flujo en Android e iOS.
- [ ] Comprobar que todos los criterios de `spec.md` estén cumplidos.

## Cierre

- [x] Registrar la implementación y las validaciones en `docs/development-log.md`.
- [ ] Actualizar el estado de la Feature 010 en el roadmap.