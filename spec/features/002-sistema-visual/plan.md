# 002 · Sistema visual / Theme — Plan

*Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`.*

## Enfoque

Implementar un sistema visual centralizado para ClotheStore utilizando una única fuente de verdad para los principales tokens de diseño de la aplicación.

La implementación se realizará inicialmente dentro de `src/theme/`, manteniendo una estructura sencilla y reutilizable compatible con React Native y Expo.

El sistema deberá permitir que componentes y pantallas consuman los mismos valores de colores, tipografía, espaciado y radios, evitando definir valores visuales repetidos directamente dentro de cada componente.

La identidad visual se orientará a una estética premium y urbana, manteniendo suficiente contraste y coherencia para una experiencia de compra profesional.

## Implementación

1. Revisar el estado actual de `src/theme/index.js` y conservar únicamente las decisiones que sean compatibles con la especificación aprobada.

2. Definir la paleta de colores principal de ClotheStore dentro de `src/theme/index.js`, incluyendo fondos, superficies, textos, bordes y estados de interacción.

3. Definir una escala de espaciado reutilizable para mantener proporciones consistentes entre componentes y pantallas.

4. Definir una escala de radios reutilizable para tarjetas, botones, campos y otros elementos de interfaz.

5. Definir la escala tipográfica para títulos, subtítulos, textos de contenido y elementos destacados.

6. Organizar y exportar los tokens visuales desde `src/theme/index.js` para que puedan ser consumidos por otros módulos.

7. Revisar la nomenclatura de los tokens para mantener una convención consistente y evitar nombres ambiguos.

8. Preparar el sistema visual para que futuras funcionalidades puedan utilizarlo sin duplicar valores de diseño.

9. Validar visualmente el sistema mediante componentes o una pantalla de prueba antes de utilizarlo como base de las siguientes features.

### Archivos/módulos afectados

```text id="1s9s3k"
src/
└── theme/
    └── index.js
```

Si durante la implementación se necesita un archivo adicional dentro de `src/theme/`, deberá justificarse antes de incorporarlo.

## Decisiones

* **Una única fuente de verdad para los tokens visuales** — Los valores principales de diseño estarán centralizados en `src/theme/` para evitar inconsistencias entre componentes. Se descarta definir colores, espaciados y radios repetidamente en cada pantalla.

* **Sistema de tokens semánticos** — Los nombres de los valores deberán representar su función dentro de la interfaz en lugar de depender únicamente de características visuales concretas. Esto facilitará modificar la identidad de la marca posteriormente.

* **JavaScript inicialmente** — La implementación seguirá el lenguaje actualmente utilizado por la aplicación. Se descarta migrar esta feature a TypeScript exclusivamente por motivos de tipado, ya que la adopción de TypeScript todavía es progresiva.

* **Compatibilidad con React Native y Expo** — Los valores deberán poder utilizarse directamente en los estilos de React Native sin introducir dependencias externas innecesarias.

* **Diseño premium y urbano** — La selección visual deberá responder a la misión de ClotheStore y no convertirse en un sistema genérico de estilos. Se descartan decisiones visuales que contradigan el posicionamiento premium y urbano de la marca.

## Riesgos

* **Inconsistencia visual entre componentes** — Mitigación: centralizar los tokens y exigir que los componentes reutilicen los valores definidos en `src/theme/`.

* **Paleta con contraste insuficiente** — Mitigación: validar la legibilidad de textos y elementos interactivos sobre sus respectivos fondos antes de considerar la feature terminada.

* **Sistema demasiado rígido** — Mitigación: utilizar tokens reutilizables y semánticos que permitan evolucionar la identidad visual sin modificar individualmente todos los componentes.

* **Definición prematura de decisiones que pertenecen a otras features** — Mitigación: mantener fuera de esta feature la implementación de componentes, navegación, pantallas, catálogo y lógica de negocio.

* **Introducción innecesaria de dependencias** — Mitigación: utilizar las capacidades existentes de React Native y Expo antes de incorporar librerías adicionales.
