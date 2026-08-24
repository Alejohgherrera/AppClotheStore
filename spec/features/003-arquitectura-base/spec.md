# 003 · Arquitectura base de la aplicación

**Estado:** propuesta

## Qué hace

Define la estructura base de la aplicación AppClotheStore para que el proyecto pueda crecer de forma organizada a medida que se incorporen nuevas funcionalidades.

La aplicación tendrá una separación clara entre:

* Punto de entrada de la aplicación.
* Pantallas.
* Componentes reutilizables.
* Datos.
* Hooks.
* Contextos y estado global.
* Navegación.
* Sistema visual.

`App.js` será responsable únicamente de iniciar y componer la aplicación, evitando concentrar en él la lógica de las funcionalidades.

La arquitectura deberá permitir incorporar posteriormente las funcionalidades definidas en el roadmap sin tener que reorganizar completamente el proyecto.

## Por qué

Actualmente AppClotheStore se encuentra en una etapa inicial y necesita una estructura clara antes de comenzar a desarrollar las funcionalidades principales de la tienda.

Una arquitectura organizada permitirá:

* Mantener el código fácil de entender.
* Evitar que `App.js` se convierta en un archivo demasiado grande.
* Separar responsabilidades.
* Facilitar la reutilización de componentes.
* Preparar el proyecto para futuras pantallas y funcionalidades.
* Facilitar el trabajo con Spec-Driven Development.
* Permitir que el proyecto evolucione progresivamente sin perder organización.

Esta feature es necesaria antes de comenzar con las funcionalidades principales de la tienda.

## Criterios de aceptación

* [ ] `App.js` funciona como punto de entrada y composición principal de la aplicación.

* [ ] La lógica específica de funcionalidades no se concentra dentro de `App.js`.

* [ ] Los componentes reutilizables se encuentran organizados dentro de `src/components/`.

* [ ] Las pantallas de la aplicación se encuentran organizadas dentro de `src/screens/`.

* [ ] Los datos utilizados por la aplicación se encuentran organizados dentro de `src/data/`.

* [ ] Los hooks reutilizables se encuentran organizados dentro de `src/hooks/`.

* [ ] La gestión de estado compartido tiene un espacio definido dentro de `src/context/`.

* [ ] La navegación tiene un espacio definido dentro de `src/navigation/`, sin implementar todavía la navegación correspondiente a la Feature 004.

* [ ] El sistema visual existente en `src/theme/` continúa funcionando sin modificaciones innecesarias.

* [ ] La arquitectura utiliza JavaScript y React Native/Expo, respetando el tech-stack definido en la constitución.

* [ ] No se agregan dependencias externas innecesarias.

* [ ] La aplicación puede iniciar correctamente después de aplicar la nueva estructura.

* [ ] La estructura permite incorporar las siguientes features del roadmap sin reorganizaciones estructurales importantes.

## Fuera de alcance

* La implementación de React Navigation. Se realizará en la **Feature 004 · Navegación inicial**.

* La creación del catálogo de productos. Se realizará en las features correspondientes de la Fase 2.

* La implementación del carrito y favoritos.

* La implementación de autenticación.

* La implementación del backend y la base de datos.

* La implementación de pagos.

* La creación de funcionalidades complejas dentro de las pantallas.

* La migración del proyecto de JavaScript a TypeScript.

* La creación de una arquitectura backend.

* La incorporación de nuevas dependencias que no sean necesarias para esta feature.
