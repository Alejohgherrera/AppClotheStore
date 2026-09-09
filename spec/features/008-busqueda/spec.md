# 008 · Búsqueda

**Estado:** en curso

## Qué hace

La feature implementa la búsqueda de productos dentro del catálogo. El usuario podrá buscar prendas por nombre, descripción, categoría y atributos disponibles (tallas y colores) mediante un campo de búsqueda integrado en la pantalla de lista de productos.

La búsqueda funciona en tiempo real dentro de la categoría y el género seleccionados, combinándose con los filtros y el ordenamiento ya implementados.

## Por qué

La búsqueda es una funcionalidad esencial en una tienda de comercio electrónico porque permite a los usuarios encontrar productos específicos rápidamente sin navegar por todas las categorías. Complementa el sistema de filtrado y mejora significativamente la experiencia de descubrimiento de productos.

Esta feature reutiliza la infraestructura existente de filtros y contexto global, manteniendo la coherencia arquitectónica del proyecto.

## Criterios de aceptación

* [ ] El usuario puede escribir una consulta de búsqueda en un campo de búsqueda.
* [ ] La búsqueda se ejecuta en tiempo real mientras el usuario escribe.
* [ ] La búsqueda encuentra productos por nombre.
* [ ] La búsqueda encuentra productos por descripción.
* [ ] La búsqueda encuentra productos por categoría.
* [ ] La búsqueda encuentra productos por atributos disponibles (tallas y colores).
* [ ] La búsqueda es insensible a mayúsculas y minúsculas.
* [ ] La búsqueda respeta los acentos del idioma español.
* [ ] La búsqueda se combina con los filtros activos (precio, tallas, colores, disponibilidad).
* [ ] La búsqueda respeta el ordenamiento seleccionado.
* [ ] La búsqueda se limita al género y categoría actualmente seleccionados.
* [ ] La búsqueda se limpia al cambiar de categoría.
* [ ] Se muestra un estado vacío informativo cuando no hay resultados.
* [ ] El término de búsqueda se muestra claramente en la interfaz.
* [ ] La aplicación continúa iniciando correctamente con Expo después de implementar la feature.
* [ ] La implementación no introduce dependencias externas innecesarias.

## Fuera de alcance

* La búsqueda global en toda la tienda (sin filtro de género/categoría) queda para una implementación posterior.
* La búsqueda predictiva o sugerencias de autocompletado queda fuera del alcance de esta feature.
* La búsqueda por precio exacto queda cubierta por los filtros existentes.
* La búsqueda en backend/API queda para cuando se implemente la conexión con el servidor.
* El historial de búsquedas queda fuera del alcance de esta feature.
