# 010 · Tallas, variantes y stock — Tareas

*Checklist accionable derivada del `plan.md`.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución.
- [x] Auditar el catálogo actual: 31 productos, 124 combinaciones de talla y color.
- [x] Consultar la documentación versionada de Expo SDK 54.
- [x] Confirmar con el usuario la granularidad del stock y su ubicación: stock por variante completa en `src/data/stock.js`.

## Datos de inventario

- [ ] Crear `src/data/stock.js` con el inventario de las 124 combinaciones.
- [ ] Incluir variantes agotadas repartidas por productos y tallas.
- [ ] Documentar en el archivo que los datos son de desarrollo.

## Lógica de inventario

- [ ] Crear `src/data/inventory.js` con funciones puras de solo lectura.
- [ ] Implementar `getVariantStock` devolviendo cero ante combinaciones inexistentes.
- [ ] Implementar `isVariantAvailable`.
- [ ] Implementar `getAvailableSizes` usando la regla de cualquier color.
- [ ] Implementar `getAvailableColors` usando la regla de cualquier talla.
- [ ] Implementar `getProductStock` e `isProductAvailable`.

## Integración con el detalle de producto

- [ ] Pintar como agotadas las tallas y colores sin stock.
- [ ] Exponer `accessibilityState.disabled` en las variantes agotadas.
- [ ] Mostrar feedback al pulsar una variante agotada.
- [ ] Limpiar selecciones que dejan de ser viables.
- [ ] Mantener la insignia y la CTA deshabilitadas si el producto completo está agotado.
- [ ] Evitar que la CTA permita una combinación agotada.

## Integración con el carrito

- [ ] Añadir los códigos `OUT_OF_STOCK` e `INSUFFICIENT_STOCK`.
- [ ] Rechazar en `addItem` una variante agotada.
- [ ] Rechazar en `addItem` una cantidad total superior al stock.
- [ ] Recortar al stock en `normalizeCartItems` en lugar de descartar la línea.
- [ ] Rechazar en `updateQuantity` una cantidad superior al stock.
- [ ] Deshabilitar el aumento de cantidad al alcanzar el stock.

## Pruebas

- [ ] Pruebas estructurales del inventario contra el catálogo.
- [ ] Pruebas de las funciones puras de `inventory.js`.
- [ ] Pruebas de `addItem` con stock insuficiente y variante agotada.
- [ ] Pruebas del recorte al hidratar.
- [ ] Pruebas de las variantes agotadas en el detalle.
- [ ] Pruebas del límite de cantidad en la pantalla del carrito.

## Validación

- [ ] Ejecutar `npm test`.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npx expo export --platform all`.
- [ ] Validar visualmente el flujo en Android e iOS.
- [ ] Comprobar que todos los criterios de `spec.md` estén cumplidos.

## Cierre

- [ ] Registrar la implementación y las validaciones en `docs/development-log.md`.
- [ ] Actualizar el estado de la Feature 010 en el roadmap.