# 007 · Categorías y filtros — Tareas

*Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución antes de comenzar la implementación.
- [x] Revisar la estructura actual de `src/data/`, `src/components/`, `src/context/` y `src/hooks/`.

## Modelo de datos

- [x] Instalar `@react-native-async-storage/async-storage` con `npx expo install`.
- [x] Crear `src/data/sizes.js` con la lista de tallas disponibles.
- [x] Crear `src/data/colors.js` con la lista de colores disponibles (nombre + código hexadecimal).
- [x] Extender la estructura de productos en `src/data/products.js` con campos `tallas` y `colores`.
- [x] Asignar tallas y colores a todos los productos de ejemplo existentes.
- [x] Verificar que los valores de tallas y colores coincidan con los definidos en `sizes.js` y `colors.js`.
- [x] Verificar que no se introduzcan dependencias externas innecesarias.

## Lógica de filtrado

- [x] Crear `src/data/filters.js` con la función `applyFilters(products, filters)`.
- [x] Implementar filtrado por rango de precio.
- [x] Implementar filtrado por tallas (selección múltiple, lógica OR entre tallas).
- [x] Implementar filtrado por colores (selección múltiple, lógica OR entre colores).
- [x] Implementar filtrado por disponibilidad.
- [x] Implementar las opciones de ordenamiento (precio asc, precio desc, nombre A-Z).
- [x] Verificar que la lógica de filtrado funcione correctamente con datos de prueba.

## Estado global

- [x] Crear `src/context/FilterContext.js` con el contexto de filtros.
- [x] Implementar el estado de filtros dentro del contexto.
- [x] Implementar las funciones `updateFilters`, `resetFilters` y `updateSort`.
- [x] Crear `src/hooks/useFilterPersistence.js` para sincronizar con AsyncStorage.
- [x] Integrar el `FilterProvider` en el árbol de componentes.

## Componentes de UI

- [x] Crear `src/components/FilterChip.js` con label y botón de eliminar.
- [x] Crear `src/components/FilterBar.js` con botones "Filtros" y "Ordenar".
- [x] Crear `src/components/FilterModal.js` (bottom sheet con todos los filtros).
- [x] Crear `src/components/SortModal.js` (bottom sheet con opciones de ordenamiento).
- [x] Aplicar los colores definidos en `src/theme/`.
- [x] Aplicar la escala tipográfica definida en `src/theme/`.
- [x] Aplicar los espaciados definidos en `src/theme/`.
- [x] Aplicar los radios definidos en `src/theme/`.
- [x] Verificar que no existan valores visuales hardcodeados.

## Integración

- [x] Modificar `src/screens/ProductListScreen.js` para integrar filtros y ordenamiento.
- [x] Mostrar chips de filtros activos encima de la lista.
- [x] Mostrar la `FilterBar` debajo de los chips.
- [x] Gestionar el estado de visibilidad de los modales.
- [x] Implementar el reset de filtros al cambiar de categoría.
- [x] Verificar que la navegación por género → categoría → productos siga funcionando.

## Validación

- [x] Ejecutar la aplicación con Expo.
- [x] Verificar visualmente el catálogo en dispositivo o emulador.
- [x] Probar cada filtro individualmente (precio, tallas, colores, disponibilidad).
- [x] Probar la combinación de filtros.
- [x] Probar cada opción de ordenamiento.
- [x] Verificar que los chips se muestran y eliminan correctamente.
- [x] Verificar que los filtros persisten al cerrar y abrir la aplicación.
- [x] Verificar que los filtros se resetean al cambiar de categoría.
- [x] Verificar que la aplicación continúa iniciando correctamente.
- [x] Validar todos los criterios de aceptación definidos en `spec.md`.

## Cierre

- [x] Actualizar la documentación del proyecto si se toma alguna decisión arquitectónica relevante.
- [x] Mover la Feature 007 de "Próximas" a "En curso" en `../../constitution/roadmap.md` al comenzar la implementación.
- [x] Mover la Feature 007 de "En curso" a "Hecho" en `../../constitution/roadmap.md` cuando todos los criterios de aceptación estén cumplidos.

## Mantenimiento (checklist recurrente)

- [ ] Mantener las opciones de filtros y ordenamiento sincronizadas con la evolución del modelo de productos.
- [ ] Revisar que nuevos productos incluyan tallas y colores según la estructura definida.
- [ ] Evitar duplicar la lógica de filtrado en múltiples módulos.
