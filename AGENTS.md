# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.


# AppClotheStore

AppClotheStore es una aplicación móvil de comercio electrónico para una tienda de ropa exclusiva y moderna. Está dirigida a clientes que buscan prendas premium, una experiencia de compra elegante y una interfaz visual cuidada para Android e iOS.

## Stack

- Lenguaje: JavaScript
- Framework: React Native
- Runtime / plataforma: Expo
- Plataforma: Android e iOS
- Navegación: React Navigation
- Estado global: React Context API
- Base de datos: Por definir
- Backend: Por definir
- Autenticación: Por definir
- Tests: Por definir

## Comandos

- `npx expo start`
  — inicia el proyecto en desarrollo.

- `npx expo start --android`
  — inicia el proyecto y lo abre en Android.

- `npx expo start --ios`
  — inicia el proyecto y lo abre en iOS.

- `npm test`
  — ejecuta los tests cuando sean configurados.

- `npm run lint`
  — revisa el estilo y posibles errores de código cuando el sistema de linting esté configurado.

- `npx expo export`
  — prepara una exportación del proyecto para producción.

## Estructura del proyecto

- `assets/`
  — imágenes, iconos, fuentes y otros recursos estáticos.

- `src/components/`
  — componentes reutilizables de la interfaz, como tarjetas de productos, botones, encabezados y elementos de navegación.

- `src/context/`
  — Context API y estados globales de la aplicación, como carrito, favoritos y usuario.

- `src/data/`
  — datos iniciales y estructuras de datos utilizadas durante el desarrollo.

- `src/hooks/`
  — hooks personalizados reutilizables.

- `src/navigation/`
  — configuración de la navegación entre las diferentes pantallas.

- `src/screens/`
  — pantallas principales de la aplicación.

- `src/theme/`
  — sistema visual de la aplicación: colores, tipografías, tamaños, espaciados y estilos globales.

- `App.js`
  — punto de entrada principal de la aplicación.

## Convenciones

- Utilizar `camelCase` para variables, funciones y propiedades.

- Utilizar `PascalCase` para componentes y pantallas.

- Los componentes de React Native deben utilizar nombres descriptivos.

- Las pantallas deben terminar en `Screen`.
  Ejemplo: `HomeScreen.js`, `ProductDetailScreen.js`.

- Los componentes reutilizables deben estar en `src/components/`.

- Los estilos relacionados con un componente deben mantenerse cerca de dicho componente.

- Los colores y valores visuales globales deben centralizarse en `src/theme/`.

- Evitar repetir códigos de colores directamente en múltiples componentes.

- Utilizar componentes de React Native en lugar de elementos HTML.

- Utilizar `View`, `Text`, `Image`, `Pressable`, `ScrollView`, `FlatList`, etc., según corresponda.

- Mantener los componentes pequeños y con una responsabilidad clara.

- Antes de agregar una dependencia nueva, comprobar si React Native o Expo ya proporcionan una solución adecuada.

- Priorizar código sencillo y fácil de entender durante la etapa de aprendizaje.

## Diseño visual

AppClotheStore debe transmitir una identidad:

- Exclusiva
- Moderna
- Elegante
- Minimalista
- Masculina
- Premium

La interfaz debe utilizar principalmente tonos oscuros y neutros, combinados con grises azulados y colores de acento utilizados de forma moderada.

La interfaz debe evitar una apariencia recargada.

Los productos deben ser el elemento visual principal de la aplicación.

Las imágenes de las prendas deben tener buena calidad y una presentación consistente.

Los botones, tarjetas y elementos interactivos deben mantener una apariencia coherente en toda la aplicación.

## No hagas

- No instalar dependencias nuevas sin avisar y explicar primero para qué se necesitan.

- No modificar la arquitectura del proyecto sin explicar el motivo.

- No crear carpetas o archivos innecesarios.

- No colocar toda la lógica de la aplicación dentro de `App.js`.

- No repetir estilos globales innecesariamente.

- No utilizar HTML como `div`, `button`, `img` o `h1` en lugar de componentes de React Native.

- No utilizar datos falsos como si fueran datos reales de producción.

- No subir claves API, contraseñas, tokens o archivos `.env` al repositorio.

- No almacenar información sensible directamente en el código fuente.

- No agregar funcionalidades complejas antes de comprender y probar la funcionalidad básica.

- No convertir el proyecto a TypeScript hasta que la arquitectura y la funcionalidad básica en JavaScript estén comprendidas y funcionando.

## Flujo de trabajo

- Antes de una tarea no trivial, proponer un plan y esperar mi aprobación.

- Trabajar una tarea a la vez.

- Explicar qué se está haciendo y por qué.

- Priorizar el aprendizaje sobre copiar y pegar código.

- Cuando se agregue una funcionalidad, explicar primero los conceptos necesarios.

- Después de terminar una tarea, indicar claramente qué archivos fueron modificados.

- Probar la aplicación después de realizar cambios importantes.

- Si existe un error, identificar primero la causa antes de realizar cambios innecesarios.

- No asumir que una dependencia está instalada; comprobar `package.json` cuando sea necesario.

- Si no se tiene suficiente información para tomar una decisión técnica, preguntar antes de inventar una solución.

## Objetivo del proyecto

La aplicación debe evolucionar progresivamente desde un prototipo de tienda de ropa hasta una aplicación móvil completa de comercio electrónico.

### Fase 1 — Fundamentos

- React Native
- Componentes
- Props
- State
- Eventos
- StyleSheet
- Flexbox
- Imágenes
- Listas

### Fase 2 — Tienda

- Página de inicio
- Catálogo
- Categorías
- Detalle de producto
- Carrito
- Favoritos
- Búsqueda

### Fase 3 — Navegación y estado

- React Navigation
- Context API
- Carrito global
- Favoritos globales
- Estado del usuario

### Fase 4 — Backend

- API
- Base de datos
- Usuarios
- Productos
- Inventario
- Pedidos

### Fase 5 — Comercio electrónico

- Registro e inicio de sesión
- Checkout
- Métodos de pago
- Historial de pedidos
- Seguimiento de pedidos

### Fase 6 — Funcionalidades avanzadas

- Notificaciones
- Recomendaciones personalizadas
- Panel administrativo
- Analítica
- Integración con IA

## Documentación

- Mantener la documentación técnica actualizada cuando cambie la arquitectura.

- Consultar la documentación oficial de React Native y Expo antes de implementar funcionalidades específicas del framework.

- Documentar decisiones arquitectónicas importantes.

- Registrar dependencias importantes y explicar su propósito cuando sea necesario.