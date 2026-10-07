# 008 · Búsqueda — Plan de implementación

## Objetivo

Implementar búsqueda en tiempo real de productos por nombre, descripción, categoría y atributos (tallas, colores), integrada con el sistema de filtros existente.

## Enfoque

1. Extender `DEFAULT_FILTERS` con un campo `busqueda` (cadena de texto).
2. Crear una función de normalización de texto para búsqueda insensible a mayúsculas/minúsculas y acentos.
3. Implementar la lógica de búsqueda en `src/data/filters.js`.
4. Añadir un componente `SearchBar` reutilizable en `src/components/`.
5. Integrar el campo de búsqueda en `ProductListScreen`.
6. Sincronizar el término de búsqueda con el contexto global de filtros.
7. Conservar la búsqueda por combinación de género y categoría, evitando borrados al montar la pantalla.
8. Actualizar el estado vacío para diferenciar "sin resultados" de "sin productos".
9. Validar visualmente y actualizar el roadmap.

## Consideraciones técnicas

* La búsqueda debe aplicarse **después** de los filtros por precio, talla, color y disponibilidad, pero **antes** del ordenamiento.
* La normalización debe usar `normalize('NFD')` y eliminar diacríticos para que "camiseta" coincida con "camiseta".
* El término de búsqueda se almacena en el contexto por combinación de género/categoría para mantener coherencia con los filtros actuales.
* No se añaden dependencias externas.
* Se mantiene la separación: lógica de datos en `src/data/`, componentes visuales en `src/components/`, estado global en `src/context/`.

## Archivos a modificar

* `src/data/filters.js`
* `src/context/FilterContext.js`
* `src/screens/ProductListScreen.js`
* `spec/constitution/roadmap.md`
* `spec/features/008-busqueda/tasks.md`

## Nuevos archivos

* `src/components/SearchBar.js`
* `spec/features/008-busqueda/spec.md`
* `spec/features/008-busqueda/plan.md`
* `spec/features/008-busqueda/tasks.md`
