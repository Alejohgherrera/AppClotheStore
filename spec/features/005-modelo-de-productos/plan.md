# 005 · Modelo de productos — Plan

*Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`.*

## Enfoque

Se definirá un modelo de producto sencillo y reutilizable dentro de `src/data/`.

Durante esta feature se trabajará únicamente con la estructura necesaria para representar productos durante la etapa inicial de desarrollo. Los datos podrán utilizarse posteriormente como fuente del catálogo de la Feature 006.

Se utilizará JavaScript puro, sin dependencias adicionales, manteniendo el modelo separado de los componentes visuales y de las pantallas.

## Implementación

1. Revisar la estructura existente de `src/data/` y confirmar que es el lugar adecuado para los datos iniciales del proyecto.

2. Crear el módulo correspondiente al modelo y datos iniciales de productos dentro de `src/data/`.

3. Definir una estructura consistente para cada producto con identificación, nombre, descripción, precio, categoría, imágenes y disponibilidad.

4. Crear un conjunto pequeño de productos de ejemplo claramente identificados como datos de desarrollo.

5. Exportar el modelo/datos para permitir su reutilización desde otros módulos.

6. Verificar que la estructura pueda ser importada correctamente desde otros archivos del proyecto.

7. Comprobar que los datos no contengan información presentada como si fuera información real de producción.

8. Validar que no sea necesario instalar dependencias adicionales.

9. Ejecutar la aplicación y comprobar que la incorporación del modelo no afecta el funcionamiento existente.

## Decisiones

* **JavaScript como modelo de datos** — Mantiene el proyecto alineado con el stack actual y con la etapa de aprendizaje. No se utilizará TypeScript todavía.

* **Datos separados de la interfaz** — Los productos estarán en `src/data/` y no dentro de `App.js` ni de componentes visuales.

* **Datos locales de desarrollo** — Se utilizarán datos de ejemplo mientras no exista backend ni base de datos. No se presentarán como datos reales de producción.

* **Modelo inicial pequeño** — Se incluirán únicamente los campos necesarios para esta feature. Tallas, variantes y gestión detallada de inventario se desarrollarán posteriormente.

* **Sin dependencias nuevas** — React Native y JavaScript son suficientes para esta etapa. No se incorporarán librerías de manejo de datos.

## Riesgos

* **El modelo puede crecer demasiado pronto** — Se limitarán los campos a los criterios definidos en `spec.md`.

* **Acoplamiento entre datos y componentes** — Los componentes consumirán los datos mediante imports y no definirán nuevamente la estructura del producto.

* **Confusión entre datos de prueba y datos reales** — Los productos se identificarán como datos de desarrollo hasta que exista una fuente real.

* **Cambios posteriores en el modelo** — La estructura se mantendrá sencilla y preparada para incorporar variantes, tallas y stock en las siguientes features.

* **Crear archivos innecesarios** — Solo se crearán los módulos necesarios para cumplir los criterios de aceptación.
