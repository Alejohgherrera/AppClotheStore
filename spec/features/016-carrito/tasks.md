# 016 · Carrito — Tareas

*Checklist accionable derivada del `plan.md`.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución.
- [x] Documentar el estado y las responsabilidades del prototipo preexistente.
- [x] Consultar la documentación versionada de Expo SDK 54.

## Navegación

- [ ] Convertir el icono del header en una acción pulsable.
- [ ] Navegar a la pantalla `Cart`.
- [ ] Añadir rol, etiqueta y zona táctil al botón.
- [ ] Mostrar el mismo botón en las pantallas donde corresponde.

## Estado y persistencia

- [ ] Exponer un estado de carga hasta completar la hidratación.
- [ ] Bloquear mutaciones antes de terminar la lectura de AsyncStorage.
- [ ] Normalizar líneas persistidas inválidas.
- [ ] Resolver el producto canónico por su identificador.
- [ ] Mantener la clave actual y migrar snapshots sin perder líneas válidas.
- [ ] Evitar sobrescribir el almacenamiento cuando la lectura falla.

## Reglas del carrito

- [ ] Rechazar productos no disponibles.
- [ ] Validar talla y color contra el producto.
- [ ] Rechazar cantidades no enteras o no positivas.
- [ ] Fusionar la misma combinación producto + talla + color.
- [ ] Mantener la cantidad mínima visible en uno.
- [ ] Deshabilitar realmente el botón de disminución cuando la cantidad es uno.
- [ ] Conservar una eliminación explícita por línea.
- [ ] Permitir vaciar todo el carrito.
- [ ] Recalcular `count` y `total` desde datos válidos.

## Interfaz y accesibilidad

- [ ] Mostrar un indicador de carga durante la hidratación.
- [ ] Mostrar vacío únicamente después de hidratar.
- [ ] Añadir etiquetas y estados a cantidades, eliminación y vaciado.
- [ ] Mantener checkout deshabilitado hasta implementar la Feature 018.

## Validación

- [ ] Añadir pruebas de hidratación y persistencia.
- [ ] Añadir pruebas de altas, fusiones y cantidades.
- [ ] Añadir pruebas de datos inválidos y productos agotados.
- [ ] Añadir pruebas de navegación y estados visibles.
- [ ] Ejecutar lint y pruebas.
- [ ] Ejecutar `npx expo export --platform all`.
- [ ] Validar visualmente el flujo en Android e iOS.
- [ ] Comprobar que todos los criterios de `spec.md` estén cumplidos.

## Cierre

- [ ] Registrar la implementación y las validaciones en `docs/development-log.md`.
- [ ] Actualizar el estado de la Feature 016 en el roadmap solo después de validar todos sus criterios.
