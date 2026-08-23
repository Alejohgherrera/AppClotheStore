# Tech Stack

## Propósito

Este documento define las tecnologías, herramientas, convenciones y límites técnicos utilizados para construir ClotheStore.

La constitución técnica debe mantenerse alineada con la misión del proyecto. Las nuevas tecnologías deberán incorporarse únicamente cuando exista una necesidad justificada y deberán ser compatibles con la arquitectura existente.

## Aplicación móvil

### Framework

* **React Native** — Framework principal para el desarrollo de la aplicación móvil.
* **Expo** — Plataforma utilizada para desarrollar, ejecutar y gestionar el proyecto React Native.

### Versión de Expo

* **Expo SDK 54** — Versión actualmente utilizada por el proyecto.

La versión exacta instalada deberá mantenerse registrada en `package.json` y deberá actualizarse de forma controlada cuando sea necesario.

## Lenguajes

### JavaScript

JavaScript es actualmente el lenguaje principal utilizado en la implementación de la aplicación.

Se utilizará para:

* Componentes de React Native.
* Pantallas.
* Navegación.
* Lógica de aplicación.
* Gestión de estilos y temas.
* Funcionalidades del cliente.

### TypeScript

TypeScript está instalado y disponible como herramienta de desarrollo.

Su adopción deberá realizarse de forma progresiva y planificada. No se deberá introducir TypeScript arbitrariamente en funcionalidades existentes sin considerar la compatibilidad con la arquitectura actual.

## Navegación

### React Navigation

React Navigation está contemplado como la solución de navegación de la aplicación.

La estructura destinada a la navegación se encuentra en:

```text
src/navigation/
```

Las decisiones específicas sobre stacks, tabs, rutas protegidas y navegación entre pantallas deberán documentarse en las especificaciones de las features correspondientes.

## Gestión de estado

### React Context API

React Context API está contemplada como solución para la gestión de estado compartido cuando sea necesario.

La estructura destinada a esta responsabilidad se encuentra en:

```text
src/context/
```

No se incorporarán librerías externas de gestión de estado sin una necesidad técnica justificada.

## Arquitectura de carpetas

La aplicación seguirá una organización por responsabilidades:

```text
src/
├── components/
├── context/
├── data/
├── hooks/
├── navigation/
├── screens/
└── theme/
```

### `components/`

Contendrá componentes reutilizables de interfaz.

### `context/`

Contendrá los contextos utilizados para compartir estado entre diferentes partes de la aplicación.

### `data/`

Contendrá datos, fuentes de información y estructuras relacionadas con los productos y otras entidades de la aplicación.

### `hooks/`

Contendrá hooks personalizados reutilizables.

### `navigation/`

Contendrá la configuración y estructura de navegación de la aplicación.

### `screens/`

Contendrá las pantallas principales de ClotheStore.

### `theme/`

Contendrá los elementos visuales globales de la aplicación, incluyendo:

* Colores.
* Espaciados.
* Bordes y radios.
* Tipografía.
* Otros tokens de diseño.

La identidad visual deberá mantener el posicionamiento premium y urbano definido en `mission.md`.

## Backend

Actualmente no existe un backend confirmado dentro del proyecto.

El backend deberá definirse antes de implementar funcionalidades que requieran:

* Persistencia de usuarios.
* Persistencia de productos.
* Gestión de pedidos.
* Procesamiento de pagos.
* Autenticación.
* Comunicación con servicios externos.

La tecnología de backend se decidirá mediante una especificación técnica antes de su implementación.

## Base de datos

Actualmente no existe una base de datos confirmada.

La solución de persistencia deberá definirse antes de implementar funcionalidades que requieran almacenamiento permanente de información.

## Autenticación

Actualmente no existe una solución de autenticación implementada o confirmada.

La autenticación deberá especificarse antes de desarrollar funcionalidades relacionadas con cuentas de usuario, sesiones, permisos o información privada.

## Pagos

Actualmente no existe un proveedor de pagos confirmado.

La integración de pagos deberá diseñarse como una feature independiente y deberá utilizar un proveedor que permita realizar transacciones de forma segura y adecuada para una tienda real.

## Testing

Actualmente no existe un framework de testing confirmado en el proyecto.

La estrategia de testing deberá definirse antes de que las funcionalidades críticas de la tienda entren en producción.

Las áreas prioritarias de validación serán:

* Lógica de negocio.
* Carrito.
* Pedidos.
* Autenticación.
* Pagos.
* Navegación.
* Componentes críticos de interfaz.

## Herramientas de desarrollo

Las principales herramientas utilizadas actualmente son:

* **Node.js / npm** — Gestión del entorno JavaScript y dependencias.
* **Expo CLI** — Ejecución y gestión del proyecto Expo.
* **TypeScript** — Herramienta disponible para desarrollo tipado.
* **VS Code** — Editor de código.
* **OpenCode** — Asistente de desarrollo basado en modelos.
* **Ollama** — Ejecución local de modelos de IA.
* **AppClothe MCP** — Servidor MCP personalizado para proporcionar herramientas relacionadas con el proyecto.
* **Context7 MCP** — Consulta de documentación técnica cuando sea necesario.
* **Git / GitHub** — Control de versiones y alojamiento del repositorio.

## Reglas técnicas

1. Las nuevas tecnologías deberán incorporarse únicamente cuando exista una necesidad justificada.
2. No se deberán agregar dependencias innecesarias para resolver problemas que puedan solucionarse con las herramientas existentes.
3. Las decisiones arquitectónicas importantes deberán documentarse antes de implementar la funcionalidad correspondiente.
4. Las funcionalidades deberán seguir el flujo de Spec-Driven Development definido por el proyecto.
5. La interfaz deberá mantener coherencia con la identidad premium y urbana de ClotheStore.
6. No se deberá implementar una funcionalidad importante sin una especificación y criterios de aceptación definidos.
7. Las tecnologías actualmente no confirmadas deberán permanecer como decisiones pendientes hasta que exista una especificación técnica.
8. Los cambios que afecten la arquitectura deberán evaluarse antes de modificar la constitución técnica.

## Tecnologías pendientes de definición

Las siguientes decisiones permanecen abiertas y deberán resolverse mediante features o especificaciones técnicas antes de su implementación:

* Backend.
* Base de datos.
* Autenticación.
* Proveedor de pagos.
* Estrategia de testing.
* Servicios de almacenamiento de imágenes.
* Infraestructura y despliegue.
* Servicios de envío y gestión de pedidos.

Estas tecnologías no deberán considerarse parte oficial del stack hasta que sean evaluadas y aprobadas.
