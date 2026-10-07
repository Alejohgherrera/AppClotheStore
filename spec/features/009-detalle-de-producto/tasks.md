# 009 · Detalle de producto — Tareas

*Checklist accionable derivada del `plan.md`.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución.
- [x] Documentar el estado y las responsabilidades del prototipo preexistente.
- [x] Consultar la documentación versionada de Expo SDK 54.

## Presentación del producto

- [x] Mantener el flujo catálogo → detalle.
- [x] Mostrar toda la información definida por el modelo local.
- [x] Adaptar la presentación al array `imagenes`.
- [x] Hacer que el contenido sea desplazable.
- [x] Respetar safe areas y tokens visuales.

## Interacción

- [x] Mostrar claramente la talla y el color seleccionados.
- [x] Mostrar feedback visible cuando falte una selección obligatoria.
- [x] Deshabilitar la CTA para productos agotados.
- [x] Deshabilitar la CTA mientras el carrito se esté hidratando.
- [x] Mostrar confirmación únicamente después de un alta válida.
- [x] Limpiar temporizadores o procesos de feedback al desmontar la pantalla.

## Accesibilidad

- [x] Añadir roles y etiquetas a las selecciones.
- [x] Comunicar estados seleccionados y deshabilitados.
- [x] Añadir una etiqueta descriptiva a la CTA.

## Validación

- [x] Añadir pruebas de navegación y renderizado.
- [x] Añadir pruebas para producto disponible y agotado.
- [x] Añadir pruebas para selecciones y feedback.
- [x] Ejecutar lint y pruebas.
- [x] Ejecutar `npx expo export --platform all`.
- [x] Validar visualmente el flujo en Android e iOS.
- [x] Comprobar que todos los criterios de `spec.md` estén cumplidos.

## Cierre

- [x] Registrar la implementación y las validaciones en `docs/development-log.md`.
- [x] Actualizar el estado de la Feature 009 en el roadmap solo después de validar todos sus criterios.

## Notas de cierre

- La implementación de la pantalla ya existía en el working tree sin commitear antes de esta sesión; esta tarea consolidó la verificación, la infraestructura de pruebas y la documentación.
- Se añadió `testID="producto-detalle-scroll"` al `ScrollView` para poder afirmar el carácter desplazable de la pantalla desde las pruebas.
- `render` y `fireEvent` de `@testing-library/react-native` v14 son asíncronos; todas las pruebas esperan el resultado antes de afirmar.
- La prueba de alta válida utiliza productos reales de `src/data/products.js` porque `addItem` resuelve el producto canónico por identificador y rechaza los que no existen en el catálogo. Existe una prueba específica para ese rechazo, que confirma la delegación de la lógica de compra a la Feature 016.
- La validación visual del flujo catálogo → detalle → carrito en Android e iOS fue completada por el usuario el 2026-10-07.