# Roadmap

*Orden y estado de las features. Es la vista de "qué hay hecho, qué toca ahora y qué viene". Cada entrada apunta a su carpeta en `features/`.*

## Hecho ✅

*Features completadas, en orden de implementación.*

1. **001 · Constitución SDD** — Misión, tech-stack y roadmap del proyecto definidos.

2. **002 · Sistema visual / Theme** — Centralizar colores, tipografías, espaciados, radios y demás tokens visuales en `src/theme/`.

3. **003 · Arquitectura base** — Definir y estructurar la arquitectura inicial de la aplicación y sus responsabilidades principales.

4. **004 · Navegación inicial** — Configurar la navegación principal de ClotheStore en `src/navigation/`.

5. **005 · Modelo de productos** — Definir la estructura de datos necesaria para representar productos, categorías, variantes, tallas, colores, precios e inventario.

6. **006 · Catálogo de productos** — Mostrar las prendas disponibles mediante una interfaz de exploración organizada.

7. **007 · Categorías y filtros** — Extender el modelo de productos con tallas y colores, e implementar un sistema de filtros y ordenamiento en el catálogo.

## En curso 🔜

*Lo próximo a abordar. Idealmente una sola feature "en curso" a la vez.*

## Próximas 📋

*Features planificadas que respetan la constitución. Cada feature se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.*

### FASE 1 — Fundamentos

### FASE 2 — Catálogo

7. **007 · Categorías y filtros** — Permitir explorar productos por categorías y aplicar filtros relevantes.

8. **008 · Búsqueda** — Permitir buscar productos por nombre, categoría y atributos disponibles.

9. **009 · Detalle de producto** — Mostrar información completa del producto, imágenes, precio, descripción y opciones disponibles.

10. **010 · Tallas, variantes y stock** — Gestionar tallas, colores, variantes y disponibilidad de los productos.

### FASE 3 — Backend y datos

11. **011 · Backend** — Definir e implementar la API necesaria para soportar las funcionalidades de la tienda. La tecnología se definirá mediante especificación técnica.

12. **012 · Base de datos** — Definir e implementar la persistencia de productos, usuarios, pedidos y demás entidades necesarias. La tecnología se definirá mediante especificación técnica.

13. **013 · API de productos** — Permitir consultar y gestionar la información necesaria del catálogo mediante el backend.

14. **014 · API de usuarios** — Proporcionar las operaciones necesarias para gestionar cuentas y datos de clientes.

15. **015 · API de pedidos** — Proporcionar las operaciones necesarias para crear, consultar y gestionar pedidos.

### FASE 4 — Experiencia de compra

16. **016 · Carrito** — Agregar, eliminar y modificar productos seleccionados antes del checkout.

17. **017 · Favoritos** — Permitir guardar productos para consultarlos o comprarlos posteriormente.

18. **018 · Checkout** — Gestionar la información necesaria para completar una compra, incluyendo productos, cantidades, dirección, envío, resumen y datos requeridos para el pago.

### FASE 5 — Usuarios

19. **019 · Registro** — Permitir a nuevos clientes crear una cuenta.

20. **020 · Inicio de sesión** — Permitir autenticar usuarios existentes y mantener su sesión de forma segura.

21. **021 · Perfil** — Permitir consultar y modificar la información personal del cliente.

22. **022 · Direcciones** — Permitir crear, editar, eliminar y seleccionar direcciones de envío.

### FASE 6 — Pedidos y pagos

23. **023 · Pagos** — Integrar un proveedor de pagos seguro y adecuado para la operación real de ClotheStore. El proveedor se definirá mediante especificación técnica.

24. **024 · Creación de pedidos** — Registrar correctamente un pedido después de completar y validar el proceso de compra y pago.

25. **025 · Historial de pedidos** — Permitir consultar las compras anteriores del usuario y sus respectivos detalles.

26. **026 · Seguimiento de pedidos** — Mostrar el estado de los pedidos y la información de seguimiento disponible.

### FASE 7 — Producción

27. **027 · Seguridad** — Proteger datos, credenciales, comunicaciones, sesiones y operaciones sensibles de la aplicación.

28. **028 · Testing** — Definir e implementar una estrategia de pruebas para validar las funcionalidades críticas de ClotheStore.

29. **029 · Despliegue** — Preparar y publicar la aplicación y los servicios necesarios para operar ClotheStore en producción. La estrategia y herramientas de despliegue se definirán mediante especificación técnica.

## Backlog / Ideas 💡

*Ideas que respetan la constitución pero que todavía no están comprometidas ni ordenadas para implementación.*

* **Notificaciones push** — Enviar alertas relacionadas con pedidos, productos y comunicaciones relevantes.

* **Recomendaciones personalizadas** — Sugerir productos según preferencias y comportamiento de compra.

* **Panel administrativo** — Gestionar productos, inventario, pedidos, usuarios y demás operaciones de la tienda desde una interfaz administrativa.

* **Analítica** — Obtener métricas sobre ventas, productos, usuarios y comportamiento de compra.

* **Integración con IA** — Incorporar asistentes de compra, búsqueda inteligente o recomendaciones basadas en IA.

* **Reseñas y valoraciones** — Permitir que los clientes califiquen y comenten los productos.

* **Programa de fidelidad** — Implementar puntos, beneficios y recompensas para clientes recurrentes.

* **Lista de deseos avanzada** — Permitir organizar y gestionar productos guardados en diferentes listas.

* **Modo de prueba virtual** — Explorar funcionalidades de visualización virtual de prendas mediante tecnologías de IA o realidad aumentada.

* **Promociones y cupones** — Permitir gestionar códigos promocionales, descuentos y campañas comerciales.

* **Multiidioma** — Preparar la aplicación para soportar diferentes idiomas.

* **Multi-moneda** — Permitir operaciones comerciales en diferentes monedas cuando el modelo de negocio lo requiera.

> Cada feature nueva debe crearse como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.

> El roadmap es un documento vivo. Una feature solo puede marcarse como **Hecho** cuando sus criterios de aceptación hayan sido cumplidos y la implementación haya sido validada.

> La constitución tiene prioridad sobre el roadmap. Si una feature entra en conflicto con `mission.md` o `tech-stack.md`, la feature deberá replantearse antes de modificar la constitución.
