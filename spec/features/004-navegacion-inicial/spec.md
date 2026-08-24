# 004 · Navegación inicial

**Estado:** propuesta

## Qué hace

Implementa la navegación principal de AppClotheStore para permitir que el usuario pueda desplazarse entre las diferentes secciones de la aplicación.

La navegación establecerá una estructura inicial preparada para incorporar progresivamente las funcionalidades de la tienda.

En esta primera versión, la aplicación contará con una navegación principal sencilla que permita acceder a las pantallas fundamentales de la experiencia de compra.

La navegación deberá integrarse con la arquitectura definida en la Feature 003 y mantener una separación clara entre:

* Punto de entrada de la aplicación.
* Navegación.
* Pantallas.
* Componentes reutilizables.
* Sistema visual.

La navegación inicial será la base sobre la que posteriormente se incorporarán el catálogo, categorías, carrito, favoritos, perfil y demás funcionalidades definidas en el roadmap.

## Por qué

Actualmente AppClotheStore tiene una única vista de prueba y todavía no existe una forma estructurada de desplazarse entre diferentes pantallas.

La navegación es necesaria antes de comenzar a construir la tienda como una aplicación real, ya que permitirá organizar las diferentes áreas del producto y evitar que todas las funcionalidades terminen concentradas en una sola pantalla.

Implementarla en este momento permite:

* Establecer una arquitectura de navegación reutilizable.
* Separar las diferentes pantallas de la aplicación.
* Preparar el proyecto para el catálogo.
* Preparar el proyecto para el carrito y favoritos.
* Facilitar futuras funcionalidades de usuarios y pedidos.
* Mantener `App.js` como punto de entrada y no como contenedor de todas las pantallas.

## Criterios de aceptación

* [ ] React Navigation está instalado y configurado correctamente.

* [ ] La configuración principal de navegación se encuentra dentro de `src/navigation/`.

* [ ] `App.js` utiliza la navegación principal en lugar de contener directamente toda la interfaz de la aplicación.

* [ ] Existe una pantalla inicial accesible mediante la navegación.

* [ ] El usuario puede navegar entre las pantallas definidas para esta primera versión.

* [ ] La navegación funciona correctamente en Expo Go.

* [ ] La navegación funciona correctamente en Android.

* [ ] Las pantallas mantienen el sistema visual definido en `src/theme/`.

* [ ] La navegación utiliza componentes y patrones compatibles con React Native y Expo.

* [ ] No se colocan componentes específicos de navegación innecesariamente dentro de `App.js`.

* [ ] La estructura de navegación permite agregar nuevas pantallas sin modificar innecesariamente la arquitectura existente.

* [ ] No se introducen dependencias adicionales que no sean necesarias para la navegación.

* [ ] La aplicación continúa iniciando correctamente después de implementar la navegación.

## Fuera de alcance

* La implementación del catálogo de productos. Corresponde a la Feature 005.

* La implementación de categorías. Corresponde a la Feature 006.

* La implementación de búsqueda. Corresponde a la Feature 007.

* La implementación de filtros. Corresponde a la Feature 008.

* La implementación del carrito. Corresponde a la Feature 011.

* La implementación de favoritos. Corresponde a la Feature 012.

* La implementación de autenticación.

* La implementación de backend o base de datos.

* La implementación de pagos.

* La implementación de navegación compleja o flujos avanzados que todavía no sean necesarios.

* La migración de JavaScript a TypeScript.

* La creación de funcionalidades de negocio dentro de las pantallas.

* La creación de una interfaz completa de tienda; en esta feature únicamente se establece la navegación necesaria para soportar las futuras funcionalidades.
