# 009 · Detalle de producto

**Estado:** completada — validada automáticamente y visualmente en Android e iOS

## Qué hace

La feature permite abrir un producto desde el catálogo y consultar su información principal: nombre, categoría, precio, descripción, imágenes, disponibilidad, tallas y colores.

La selección de tallas y colores se comunica visualmente y la acción de compra delega el carrito a la Feature 016. Los datos mostrados pertenecen al catálogo local de desarrollo hasta que exista una API.

## Estado del prototipo

El commit `24f4ca2` incorporó antes de esta especificación un prototipo que:

- navega desde `ProductCard` hacia `ProductDetailScreen`;
- muestra la primera imagen, nombre, categoría, precio y descripción;
- permite seleccionar tallas y colores;
- integra la acción de agregar al carrito;
- muestra una insignia para productos agotados.

El prototipo todavía no desplaza el contenido, no presenta una galería, no comunica errores de selección en pantalla y permite ejecutar la acción de compra sobre productos agotados.

## Estado de la remediación

Los cinco defectos descritos en `plan.md` están corregidos y cubiertos por pruebas:

- El contenido se presenta dentro de un `ScrollView` desplazable.
- La imagen se consume como galería horizontal sobre `imagenes[]`.
- El feedback de selección obligatoria se muestra en pantalla y se anuncia como región viva.
- La CTA se deshabilita cuando el producto está agotado o el carrito no está hidratado.
- Roles, etiquetas y estados de accesibilidad están presentes en selecciones y CTA.

La lógica de alta, validación y persistencia permanece delegada en `CartContext` (Feature 016).

## Por qué

El detalle de producto conecta el catálogo con la experiencia de compra. El usuario necesita evaluar la prenda, sus atributos y su disponibilidad antes de decidir si desea incorporarla al carrito.

## Criterios de aceptación

- [x] Al pulsar una tarjeta se abre el detalle del producto seleccionado.
- [x] La pantalla muestra nombre, categoría, precio, descripción y disponibilidad.
- [x] Todas las imágenes del array `imagenes` están disponibles para consulta.
- [x] El contenido puede desplazarse completo en pantallas pequeñas.
- [x] Las tallas y colores se muestran con estados seleccionados claros.
- [x] Los controles tienen roles, etiquetas y estados de accesibilidad.
- [x] Si falta una selección obligatoria, el usuario recibe feedback visible.
- [x] Un producto agotado no puede ejecutar la acción de compra.
- [x] La acción de compra delega el carrito a la Feature 016 y no duplica su lógica.
- [x] La pantalla no muestra datos locales como si fueran datos de producción.
- [x] La aplicación compila para Android e iOS con Expo SDK 54.
- [x] Los criterios críticos cuentan con pruebas automatizadas.
- [x] La implementación no introduce dependencias de runtime innecesarias.

## Fuera de alcance

- El modelo definitivo de variantes y stock por talla/color corresponde a la Feature 010.
- La persistencia, fusión y modificación de líneas del carrito corresponde a la Feature 016.
- La API, sincronización y datos de producción pertenecen a las Features 011–013.
- Favoritos, reseñas, recomendaciones y réalité virtuelle no forman parte de esta feature.
