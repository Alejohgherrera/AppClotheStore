# 008 · Búsqueda — Tareas

*Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas.*

## Preparación

* [x] Revisar `spec.md`, `plan.md` y la Constitución antes de comenzar la implementación.
* [x] Revisar la estructura actual de `src/data/`, `src/components/`, `src/context/` y `src/screens/`.

## Modelo de datos

* [x] Extender `DEFAULT_FILTERS` con el campo `busqueda`.
* [x] Crear función de normalización de texto (insensible a mayúsculas/minúsculas y acentos).
* [x] Implementar búsqueda por nombre de producto.
* [x] Implementar búsqueda por descripción de producto.
* [x] Implementar búsqueda por categoría de producto.
* [x] Implementar búsqueda por atributos (tallas y colores).
* [x] Integrar la búsqueda en `applyFilters` respetando el orden: filtros → búsqueda → ordenamiento.
* [x] Verificar que la búsqueda funciona con datos de prueba.

## Componentes de UI

* [x] Crear `src/components/SearchBar.js` con campo de texto, icono de búsqueda y botón de limpiar.
* [x] Aplicar los colores definidos en `src/theme/`.
* [x] Aplicar la escala tipográfica definida en `src/theme/`.
* [x] Aplicar los espaciados definidos en `src/theme/`.
* [x] Aplicar los radios definidos en `src/theme/`.
* [x] Verificar que no existan valores visuales hardcodeados.

## Integración

* [x] Integrar `SearchBar` en `ProductListScreen`.
* [x] Sincronizar el término de búsqueda con `FilterContext`.
* [x] Conservar la búsqueda por combinación de género y categoría.
* [x] Mostrar el término de búsqueda claramente en la interfaz.
* [x] Diferenciar el estado vacío de "sin productos" del de "sin resultados".
* [x] Verificar que la búsqueda se combina con filtros y ordenamiento.
* [x] Verificar que la navegación por género → categoría → productos sigue funcionando.

## Validación

* [x] Ejecutar la aplicación con Expo.
* [x] Verificar visualmente la búsqueda en dispositivo o emulador.
* [x] Probar búsquedas con y sin acentos.
* [x] Probar búsqueda por nombre, categoría y atributos.
* [x] Validar todos los criterios de aceptación definidos en `spec.md`.

## Cierre

* [x] Actualizar la documentación del proyecto si se toma alguna decisión arquitectónica relevante.
* [x] Mover la Feature 008 de "Próximas" a "En curso" en `../../constitution/roadmap.md` al comenzar la implementación.
* [x] Mover la Feature 008 de "En curso" a "Hecho" en `../../constitution/roadmap.md` cuando todos los criterios de aceptación estén cumplidos.

## Mantenimiento (checklist recurrente)

* [x] Revisar que la búsqueda se mantenga sincronizada con la evolución del modelo de productos.
* [x] Verificar que nuevos productos sean encontrables mediante búsqueda.
* [x] Mantener la búsqueda alineada con el sistema visual definido en `src/theme/`.

> La feature se completa cuando todos los criterios de aceptación de `spec.md` han sido implementados y verificados.
