# 008 · Búsqueda — Tareas

*Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas.*

## Preparación

* [x] Revisar `spec.md`, `plan.md` y la Constitución antes de comenzar la implementación.
* [x] Revisar la estructura actual de `src/data/`, `src/components/`, `src/context/` y `src/screens/`.

## Modelo de datos

* [ ] Extender `DEFAULT_FILTERS` con el campo `busqueda`.
* [ ] Crear función de normalización de texto (insensible a mayúsculas/minúsculas y acentos).
* [ ] Implementar búsqueda por nombre de producto.
* [ ] Implementar búsqueda por descripción de producto.
* [ ] Implementar búsqueda por categoría de producto.
* [ ] Implementar búsqueda por atributos (tallas y colores).
* [ ] Integrar la búsqueda en `applyFilters` respetando el orden: filtros → búsqueda → ordenamiento.
* [ ] Verificar que la búsqueda funciona con datos de prueba.

## Componentes de UI

* [ ] Crear `src/components/SearchBar.js` con campo de texto, icono de búsqueda y botón de limpiar.
* [ ] Aplicar los colores definidos en `src/theme/`.
* [ ] Aplicar la escala tipográfica definida en `src/theme/`.
* [ ] Aplicar los espaciados definidos en `src/theme/`.
* [ ] Aplicar los radios definidos en `src/theme/`.
* [ ] Verificar que no existan valores visuales hardcodeados.

## Integración

* [ ] Integrar `SearchBar` en `ProductListScreen`.
* [ ] Sincronizar el término de búsqueda con `FilterContext`.
* [ ] Limpiar la búsqueda al cambiar de categoría.
* [ ] Mostrar el término de búsqueda claramente en la interfaz.
* [ ] Diferenciar el estado vacío de "sin productos" del de "sin resultados".
* [ ] Verificar que la búsqueda se combina con filtros y ordenamiento.
* [ ] Verificar que la navegación por género → categoría → productos sigue funcionando.

## Validación

* [ ] Ejecutar la aplicación con Expo.
* [ ] Verificar visualmente la búsqueda en dispositivo o emulador.
* [ ] Probar búsquedas con acentos.
* [ ] Probar búsqueda con acentos.
* [ ] Probar búsqueda por nombre, categoría y atributos.
* [ ] Validar todos los criterios de aceptación definidos en `spec.md`.

## Cierre

* [ ] Actualizar la documentación del proyecto si se toma alguna decisión arquitectónica relevante.
* [ ] Mover la Feature 008 de "Próximas" a "En curso" en `../../constitution/roadmap.md` al comenzar la implementación.
* [ ] Mover la Feature 008 de "En curso" a "Hecho" en `../../constitution/roadmap.md` cuando todos los criterios de aceptación estén cumplidos.

## Mantenimiento (checklist recurrente)

* [ ] Revisar que la búsqueda se mantenga sincronizada con la evolución del modelo de productos.
* [ ] Verificar que nuevos productos sean encontrables mediante búsqueda.
* [ ] Mantener la búsqueda alineada con el sistema visual definido en `src/theme/`.
