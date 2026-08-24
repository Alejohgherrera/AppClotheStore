# 003 · Arquitectura base de la aplicación — Plan

## Enfoque

La arquitectura base se organizará siguiendo una separación clara de responsabilidades dentro de `src/`.

Se mantendrá `App.js` como punto de entrada de la aplicación, pero se evitará colocar en él lógica específica de negocio o funcionalidades individuales.

La estructura existente de `src/` se utilizará como base para organizar progresivamente componentes, pantallas, datos, hooks, contextos, navegación y sistema visual.

La implementación será incremental y sencilla, respetando el stack actual de React Native + Expo + JavaScript.

No se implementará navegación en esta feature, ya que corresponde a la Feature 004.

## Implementación

1. Revisar la estructura actual de `src/` y comprobar qué carpetas ya existen antes de crear archivos nuevos.

2. Mantener `src/theme/` como fuente centralizada de los tokens visuales definidos en la Feature 002.

3. Establecer `src/components/` como ubicación para componentes reutilizables de la interfaz.

4. Establecer `src/screens/` como ubicación para las pantallas principales de la aplicación.

5. Establecer `src/data/` como ubicación para datos estáticos o estructuras de datos utilizados durante la etapa inicial del proyecto.

6. Establecer `src/hooks/` como ubicación para hooks personalizados reutilizables cuando sean necesarios.

7. Establecer `src/context/` como ubicación para futuros contextos de React utilizados para compartir estado entre diferentes partes de la aplicación.

8. Mantener `src/navigation/` como espacio reservado para la configuración de navegación que será implementada posteriormente en la Feature 004.

9. Revisar `App.js` y mantenerlo como punto de entrada y composición principal de la aplicación.

10. Extraer cualquier lógica que corresponda a componentes o módulos separados cuando sea necesario, evitando crear abstracciones innecesarias.

11. Verificar que la aplicación continúe iniciándose correctamente después de la reorganización.

12. Comprobar que no se hayan agregado dependencias externas innecesarias.

## Decisiones

* **JavaScript como lenguaje principal** — Se mantiene JavaScript porque es el lenguaje definido actualmente en la constitución y porque permite comprender primero la arquitectura y funcionamiento de React Native antes de realizar una futura migración a TypeScript.

* **Arquitectura por responsabilidad** — Las carpetas se separan según la responsabilidad del código para evitar concentrar toda la aplicación en `App.js`.

* **Mantener la estructura existente** — Se reutilizan las carpetas que ya existen en `src/` en lugar de crear una arquitectura completamente nueva e innecesaria.

* **Sin navegación en esta feature** — React Navigation se implementará posteriormente en la Feature 004 para mantener cada feature pequeña y enfocada.

* **Sin dependencias nuevas inicialmente** — Se utilizarán las capacidades actuales de React Native y Expo siempre que sean suficientes.

* **App.js como punto de entrada** — Se conserva `App.js` como punto de entrada porque es la estructura actual del proyecto y cumple correctamente esa responsabilidad.

## Riesgos

* **Crear archivos o abstracciones innecesarias** — Se mitigará revisando primero la estructura existente y creando únicamente los archivos necesarios para la arquitectura actual.

* **Convertir `App.js` en un archivo demasiado grande** — Se mitigará manteniendo la lógica de funcionalidades fuera del punto de entrada y utilizando componentes separados cuando sea necesario.

* **Implementar navegación antes de tiempo** — Se mitigará dejando la navegación fuera de esta feature y reservando su implementación para la Feature 004.

* **Agregar dependencias innecesarias** — Antes de instalar cualquier paquete se comprobará si React Native o Expo ya proporcionan una solución adecuada.

* **Romper la aplicación durante la reorganización** — Se mitigará ejecutando la aplicación y realizando validaciones después de los cambios.

* **Crear una arquitectura demasiado compleja para la etapa actual** — Se priorizará una estructura sencilla que pueda evolucionar conforme aumente la complejidad real del proyecto.
