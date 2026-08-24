# 006 · Catálogo de productos — Plan

*Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`.*

## Enfoque

El catálogo se implementará inicialmente utilizando datos locales y componentes reutilizables de React Native.

La información de los productos estará separada de la interfaz para evitar colocar datos directamente dentro de los componentes.

Se utilizará una lista optimizada de React Native para representar los productos y permitir que el catálogo pueda crecer sin modificar la estructura principal de la pantalla.

La interfaz utilizará los tokens definidos en `src/theme/` para mantener una identidad visual consistente con el resto de la aplicación.

La arquitectura se preparará para que posteriormente los datos locales puedan sustituirse por información proveniente de una API sin tener que reconstruir completamente la interfaz.

## Implementación

1. Crear el módulo de datos iniciales del catálogo en `src/data/`, manteniendo los productos separados de la interfaz.

2. Definir una estructura consistente para cada producto, incluyendo identificador, nombre, precio, categoría, imagen y disponibilidad.

3. Crear un componente reutilizable para representar un producto dentro del catálogo en `src/components/`.

4. Utilizar `FlatList` de React Native para representar la colección de productos.

5. Crear la pantalla del catálogo dentro de `src/screens/`.

6. Conectar la pantalla del catálogo con los datos locales definidos en `src/data/`.

7. Aplicar los colores, tipografías, espaciados y radios definidos en `src/theme/`.

8. Incorporar productos masculinos y femeninos para validar que el catálogo pueda representar ambas categorías.

9. Implementar estados básicos para representar correctamente productos disponibles y no disponibles.

10. Mantener la lógica de presentación dentro de los componentes y evitar colocar datos de productos directamente en `App.js`.

11. Verificar que la lista pueda desplazarse correctamente cuando existan múltiples productos.

12. Ejecutar la aplicación mediante Expo y verificar visualmente el catálogo en el dispositivo o emulador.

13. Validar la implementación contra los criterios de aceptación definidos en `spec.md`.

## Decisiones

* **Datos locales inicialmente** — Permiten desarrollar y probar el catálogo sin depender todavía de un backend o una base de datos. La conexión remota se incorporará posteriormente.

* **`FlatList` para el catálogo** — React Native proporciona este componente específicamente para listas y permite una representación más adecuada que crear manualmente múltiples elementos.

* **Componente reutilizable de producto** — Evita duplicar la estructura visual de cada producto y permitirá reutilizarla posteriormente en otras partes de la aplicación.

* **Datos separados de la interfaz** — Los productos se almacenarán en `src/data/` para mantener una separación clara entre información y presentación.

* **Uso obligatorio de `src/theme/`** — Los colores, tipografías, espaciados y radios existentes deben reutilizarse para mantener la identidad visual definida por la Constitución.

* **Sin nuevas dependencias** — Se utilizarán las capacidades existentes de React Native y Expo siempre que sean suficientes.

* **Preparación para backend futuro** — La estructura de los datos locales deberá ser suficientemente clara para facilitar posteriormente su reemplazo por información proveniente de una API.

## Riesgos

* **Imágenes inexistentes o incompatibles** — Utilizar inicialmente recursos disponibles localmente o imágenes de prueba controladas y evitar depender de URLs externas durante esta feature.

* **Catálogo demasiado acoplado a datos locales** — Mantener los datos separados de los componentes para facilitar posteriormente la sustitución por una API.

* **Duplicación de estilos** — Utilizar `src/theme/` y estilos reutilizables en los componentes.

* **Lista con demasiados elementos** — Utilizar `FlatList` en lugar de renderizar manualmente todos los productos dentro de un `ScrollView`.

* **Diseño inconsistente con la identidad premium** — Validar visualmente tamaños, espaciados, tipografías, imágenes y colores utilizando los tokens existentes.

* **Confusión entre catálogo y detalle de producto** — Mantener la tarjeta del catálogo limitada a la información necesaria para descubrir el producto. La información completa pertenecerá a la Feature 009.

* **Introducir funcionalidades antes de tiempo** — Mantener fuera de esta feature búsqueda, filtros, carrito, pagos, autenticación y backend.
