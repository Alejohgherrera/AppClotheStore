# 006 · Catálogo de productos

**Estado:** completada

## Qué hace

La feature implementa el catálogo principal de productos de ClotheStore.

El usuario podrá visualizar una colección de prendas de ropa masculina y femenina mediante una lista organizada y visualmente coherente con la identidad premium y urbana de la aplicación.

Cada producto mostrado en el catálogo tendrá como mínimo:

* Imagen de la prenda.
* Nombre del producto.
* Precio.
* Categoría.
* Disponibilidad básica.

La exploración del catálogo se organiza por género y categoría:

1. El usuario selecciona un género: **Hombre** o **Mujer**.
2. Se muestran las categorías del género seleccionado, cada una con imagen de portada: Hombre (Boxers, Gorras, Camisetas y Polos) y Mujer (Corsets, Jeans y Vestidos).
3. Al seleccionar una categoría se muestra la lista de productos correspondiente.

El catálogo utilizará inicialmente datos locales para permitir el desarrollo y validación de la experiencia de usuario antes de conectar el sistema con un backend y una base de datos.

## Por qué

El catálogo es una de las funcionalidades principales de una tienda de comercio electrónico, ya que constituye el punto inicial para descubrir los productos disponibles.

Esta feature permitirá construir la primera experiencia real de navegación de productos y establecer una base que posteriormente podrá integrarse con:

* Categorías.
* Búsqueda.
* Filtros.
* Detalle de producto.
* Tallas y variantes.
* Carrito.

La implementación inicial con datos locales permite avanzar en la interfaz sin depender todavía del backend.

## Criterios de aceptación

* [ ] El usuario puede visualizar una lista de productos al entrar al catálogo.

* [ ] Cada producto muestra una imagen representativa de la prenda.

* [ ] Cada producto muestra su nombre.

* [ ] Cada producto muestra su precio.

* [ ] Cada producto muestra su categoría.

* [ ] Cada producto muestra su disponibilidad básica.

* [ ] El catálogo permite desplazarse verticalmente cuando existen más productos de los que caben en pantalla.

* [ ] El catálogo puede mostrar productos masculinos y femeninos.

* [ ] El usuario puede elegir entre el catálogo Hombre y el catálogo Mujer.

* [ ] Al seleccionar un género se muestran sus categorías, cada una con imagen de portada.

* [ ] Al seleccionar una categoría se muestra únicamente la lista de productos de esa categoría y género.

* [ ] Cada género muestra únicamente las categorías definidas para él en los datos.

* [ ] Los productos Unisex aparecen en las categorías donde estén incluidos, con el filtro por género aplicado.

* [ ] Las categorías sin productos muestran un estado vacío informativo en lugar de una lista vacía.

* [ ] La navegación permite avanzar y retroceder entre género, categoría y lista de productos.

* [ ] Los productos utilizan una presentación visual coherente con el sistema visual definido en `src/theme/`.

* [ ] La interfaz mantiene una apariencia premium, moderna y urbana.

* [ ] Los productos se muestran utilizando componentes reutilizables.

* [ ] Los datos iniciales del catálogo están separados de los componentes visuales.

* [ ] La aplicación funciona utilizando datos locales sin necesidad de conexión con un backend.

* [ ] La implementación no introduce dependencias externas innecesarias.

* [ ] La aplicación continúa iniciando correctamente con Expo después de implementar la feature.

## Fuera de alcance

* La búsqueda de productos se implementará en la Feature 008 · Búsqueda.

* Los filtros avanzados por talla, color, precio u otros atributos se implementarán en una feature posterior.

* La pantalla completa de detalle de producto se implementará en la Feature 009 · Detalle de producto.

* La gestión de tallas, colores y stock por variante se implementará en la Feature 010 · Tallas y variantes.

* El carrito se implementará en la Feature 016 · Carrito.

* La conexión con un backend se realizará en la Fase 6 del roadmap.

* La conexión con una base de datos se realizará posteriormente junto con el backend.

* Los pagos no forman parte de esta feature.

* El registro e inicio de sesión de usuarios no forman parte de esta feature.

* La creación de un panel administrativo no forma parte de esta feature.

* La carga dinámica de productos desde una API queda para una implementación posterior.
