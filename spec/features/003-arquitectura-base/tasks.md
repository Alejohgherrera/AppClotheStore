# 003 · Arquitectura base de la aplicación — Tareas

*Checklist accionable derivada del `plan.md`. Tareas pequeñas y concretas; marca `[x]` al completarlas.*

* [x] Revisar la estructura actual de `src/` antes de realizar modificaciones.

* [x] Revisar el contenido actual de `App.js`.

* [x] Confirmar que `src/components/` está disponible para componentes reutilizables.

* [x] Confirmar que `src/screens/` está disponible para las pantallas de la aplicación.

* [x] Confirmar que `src/data/` está disponible para los datos de la aplicación.

* [x] Confirmar que `src/hooks/` está disponible para hooks personalizados.

* [x] Confirmar que `src/context/` está disponible para contextos y estado compartido.

* [x] Confirmar que `src/navigation/` está disponible como espacio para la futura navegación.

* [x] Mantener `src/theme/` como fuente centralizada del sistema visual.

* [x] Revisar `App.js` y mantenerlo como punto de entrada de la aplicación.

* [x] Evitar colocar lógica específica de funcionalidades dentro de `App.js`.

* [ ] Crear únicamente los archivos que sean necesarios para establecer la arquitectura base.

* [ ] Evitar agregar dependencias externas innecesarias.

* [x] Verificar que los imports utilizados por `App.js` funcionen correctamente.

* [x] Ejecutar la aplicación mediante Expo.

* [x] Verificar que la aplicación inicia correctamente después de la reorganización.

* [x] Comprobar que el sistema visual de la Feature 002 continúa funcionando.

* [x] Validar la estructura contra todos los criterios de aceptación definidos en `spec.md`.

* [x] Actualizar la documentación del proyecto si alguna decisión arquitectónica importante cambia.

* [ ] Registrar en la documentación general qué se realizó durante la implementación de la Feature 003.

* [ ] Mover la Feature 003 de "Próximas" a "En curso" en `../../constitution/roadmap.md` cuando comience su implementación.

* [ ] Mover la Feature 003 de "En curso" a "Hecho" en `../../constitution/roadmap.md` cuando todos los criterios de aceptación estén cumplidos.

## Mantenimiento

*Checklist recurrente para mantener la arquitectura organizada.*

* [ ] Revisar antes de crear un nuevo archivo si existe un módulo existente donde pueda colocarse la funcionalidad.

* [ ] Mantener cada componente con una responsabilidad clara.

* [ ] Evitar concentrar lógica de negocio en `App.js`.

* [ ] Mantener los estilos globales y tokens visuales dentro de `src/theme/`.

* [ ] Evitar crear nuevas carpetas sin una necesidad real del proyecto.
