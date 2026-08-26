# 005 · Modelo de productos

**Estado:** completada

## Qué hace

Define la estructura de datos que representa un producto dentro de AppClotheStore.

El modelo permitirá representar la información básica necesaria de una prenda, incluyendo su identificación, nombre, descripción, precio, categoría, imágenes y disponibilidad.

El modelo estará preparado para evolucionar posteriormente con variantes, tallas, colores e inventario sin mezclar responsabilidades de otras features.

## Por qué

El catálogo de productos necesita una estructura de datos clara y consistente antes de comenzar su implementación.

Definir primero el modelo evita que las pantallas y componentes creen estructuras diferentes para representar los productos y permite que las siguientes features reutilicen una única estructura.

## Criterios de aceptación

* [ ] Existe un modelo de producto definido y reutilizable dentro de `src/data/`.

* [ ] El modelo contiene una identificación única para cada producto.

* [ ] El modelo permite representar nombre, descripción y precio.

* [ ] El modelo permite asociar un producto con una categoría.

* [ ] El modelo permite representar una o varias imágenes del producto.

* [ ] El modelo contempla la disponibilidad básica del producto sin implementar todavía un sistema completo de inventario.

* [ ] La estructura utiliza JavaScript y es compatible con React Native/Expo.

* [ ] El modelo puede ser importado desde otros módulos sin duplicar su estructura.

* [ ] La implementación no introduce dependencias externas.

* [ ] La estructura puede evolucionar posteriormente para soportar variantes, tallas, colores e inventario.

## Fuera de alcance

* Catálogo visual de productos → Feature 006 · Catálogo de productos.

* Categorías y filtros → Feature 007 · Categorías y filtros.

* Búsqueda de productos → Feature 008 · Búsqueda.

* Pantalla de detalle → Feature 009 · Detalle de producto.

* Gestión completa de tallas, variantes y stock → Feature 010 · Tallas, variantes y stock.

* Backend y persistencia real de productos → Features 011–013.

* Base de datos → Feature 012 · Base de datos.

* Panel administrativo → Backlog.
