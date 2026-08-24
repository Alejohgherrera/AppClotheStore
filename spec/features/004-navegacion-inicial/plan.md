# 004 · Navegación inicial — Plan

## Enfoque

Configurar la navegación principal de ClotheStore utilizando React Navigation, respetando la arquitectura definida en la constitución del proyecto.

La navegación se mantendrá separada de `App.js`, utilizando `src/navigation/` como punto central para definir las rutas y la estructura de navegación.

La implementación inicial será sencilla y preparada para crecer conforme se incorporen las diferentes pantallas de la tienda.

## Implementación

1. Verificar las dependencias actuales relacionadas con React Navigation en `package.json`.

2. Instalar únicamente las dependencias necesarias para utilizar React Navigation con Expo SDK 54, si todavía no están instaladas.

3. Crear el archivo principal de navegación dentro de `src/navigation/`.

4. Configurar el navegador principal de la aplicación y definir la estructura inicial de rutas.

5. Integrar el navegador principal con `App.js`, manteniendo `App.js` como punto de entrada y evitando colocar allí la configuración de navegación.

6. Definir una ruta inicial que permita comprobar visualmente que la navegación funciona correctamente.

7. Utilizar el sistema visual existente de `src/theme/` cuando la navegación requiera estilos.

8. Ejecutar la aplicación mediante Expo y comprobar que la navegación se carga correctamente.

9. Validar la navegación en el entorno disponible y comprobar que no existen errores de imports o configuración.

## Decisiones

* **React Navigation** — Se utilizará porque está definido en el `tech-stack.md` y es una solución estándar para navegación en aplicaciones React Native. No se utilizará una solución de navegación personalizada.

* **Navegación separada de App.js** — La configuración permanecerá en `src/navigation/` para mantener responsabilidades claras y evitar que `App.js` crezca innecesariamente.

* **Configuración mínima inicial** — Solo se crearán las rutas necesarias para esta etapa. La navegación de catálogo, carrito, favoritos, perfil y checkout se incorporará mediante futuras features.

* **Una fuente central de navegación** — La configuración principal estará centralizada para facilitar su mantenimiento y evolución.

* **Compatibilidad con Expo** — La implementación deberá respetar las versiones y dependencias compatibles con Expo SDK 54.

## Riesgos

* **Dependencias incompatibles con Expo SDK 54** — Verificar las versiones recomendadas antes de instalarlas y utilizar las dependencias compatibles con la versión actual del proyecto.

* **Errores de configuración del navegador** — Mantener la configuración inicial sencilla y comprobar los imports antes de continuar con otras features.

* **Crecimiento innecesario de la navegación** — No agregar rutas de funcionalidades que todavía no hayan sido implementadas.

* **Problemas visuales con el sistema de diseño** — Utilizar los tokens existentes de `src/theme/` en lugar de crear valores visuales independientes.

* **Errores al integrar la navegación con App.js** — Mantener `App.js` únicamente como punto de entrada y composición raíz.
