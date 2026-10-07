# 016 · Carrito — Tareas

*Checklist accionable derivada del `plan.md`.*

## Preparación

- [x] Revisar `spec.md`, `plan.md` y la Constitución.
- [x] Documentar el estado y las responsabilidades del prototipo preexistente.
- [x] Consultar la documentación versionada de Expo SDK 54.

## Navegación

- [x] Convertir el icono del header en una acción pulsable.
- [x] Navegar a la pantalla `Cart`.
- [x] Añadir rol, etiqueta y zona táctil al botón.
- [x] Mostrar el mismo botón en las pantallas donde corresponde.

## Estado y persistencia

- [x] Exponer un estado de carga hasta completar la hidratación.
- [x] Bloquear mutaciones antes de terminar la lectura de AsyncStorage.
- [x] Normalizar líneas persistidas inválidas.
- [x] Resolver el producto canónico por su identificador.
- [x] Mantener la clave actual y migrar snapshots sin perder líneas válidas.
- [x] Evitar sobrescribir el almacenamiento cuando la lectura falla.

## Reglas del carrito

- [x] Rechazar productos no disponibles.
- [x] Validar talla y color contra el producto.
- [x] Rechazar cantidades no enteras o no positivas.
- [x] Fusionar la misma combinación producto + talla + color.
- [x] Mantener la cantidad mínima visible en uno.
- [x] Deshabilitar realmente el botón de disminución cuando la cantidad es uno.
- [x] Conservar una eliminación explícita por línea.
- [x] Permitir vaciar todo el carrito.
- [x] Recalcular `count` y `total` desde datos válidos.

## Interfaz y accesibilidad

- [x] Mostrar un indicador de carga durante la hidratación.
- [x] Mostrar vacío únicamente después de hidratar.
- [x] Añadir etiquetas y estados a cantidades, eliminación y vaciado.
- [x] Mantener checkout deshabilitado hasta implementar la Feature 018.

## Validación

- [x] Añadir pruebas de hidratación y persistencia.
- [x] Añadir pruebas de altas, fusiones y cantidades.
- [x] Añadir pruebas de datos inválidos y productos agotados.
- [x] Añadir pruebas de navegación y estados visibles.
- [x] Ejecutar lint y pruebas.
- [x] Ejecutar `npx expo export --platform all`.
- [ ] Validar visualmente el flujo en Android e iOS.
- [x] Comprobar que todos los criterios de `spec.md` estén cumplidos.

## Cierre

- [x] Registrar la implementación y las validaciones en `docs/development-log.md`.
- [ ] Actualizar el estado de la Feature 016 en el roadmap solo después de validar todos sus criterios.

## Notas de cierre

- La implementación del carrito ya existía en el working tree sin commitear antes de esta sesión; esta tarea consolidó la verificación, la cobertura de pruebas y la documentación.
- La cobertura se reparte en cuatro suites. `src/context/__tests__/CartContext-test.js` (16) verifica las funciones puras `buildCartKey` y `normalizeCartItems`. `src/context/__tests__/CartProvider-test.js` (32) monta el provider real con `renderHook` y cubre `addItem`, `updateQuantity`, `removeItem`, `clearCart`, el bloqueo previo a la hidratación y los derivados `count` y `total`. `src/navigation/__tests__/AppNavigator-test.js` (10) cubre el botón de cabecera, el badge y la navegación. `src/screens/__tests__/CartScreen-test.js` (16) cubre la pantalla, incluido el vaciado con confirmación.
- `renderHook` de `@testing-library/react-native` v14 es asíncrono y devuelve una promesa; el resultado debe guardarse antes de los `act` para evitar perder la referencia al cambiar de render.
- Una expectativa inicial Resultó incorrecta: el normalizador no conserva las líneas inválidas en el almacenamiento, las purga. La prueba se corrigió para documentar ese comportamiento, que es el correcto, ya que una línea de producto agotado no debe sobrevivir a la siguiente sesión.
- Falta únicamente la validación visual manual en Android e iOS por parte del usuario antes de mover la feature a "Hecho" en el roadmap.