# Development Log — ClotheStore

> Bitácora técnica del desarrollo de ClotheStore.
> Este documento registra las decisiones, cambios, implementaciones, problemas, soluciones y validaciones realizadas durante el desarrollo del proyecto.

---

# 1. Información del proyecto

**Nombre:** ClotheStore

**Tipo:** Tienda móvil de ropa

**Enfoque:** Moda urbana premium

**Público:** Hombres y mujeres

**Plataforma inicial:** Aplicación móvil

**Estado:** Desarrollo

---

# 2. Metodología de desarrollo

El proyecto utiliza **Spec-Driven Development (SDD)**.

El flujo de trabajo establecido es:

```text
Constitución
    ↓
Roadmap
    ↓
Spec
    ↓
Plan
    ↓
Tasks
    ↓
Implementación
    ↓
Validación
    ↓
Documentación
    ↓
Feature completada
```

La documentación de cada feature debe existir antes de modificar el código correspondiente.

---

# 3. Stack tecnológico

## Aplicación móvil

* React Native
* Expo SDK 54
* JavaScript

## Herramientas de desarrollo

* VS Code
* OpenCode
* Ollama

## Modelos locales

* Qwen 3 4B
* Llama 3.2

## MCP

* AppClothe MCP
* Context7 MCP

## Navegación

* React Navigation

## Gestión de estado

* React Context API

## Backend

Pendiente de definición.

## Base de datos

Pendiente de definición.

## Pagos

Pendiente de definición.

## Testing

Pendiente de definición.

---

# 4. Visión del producto

ClotheStore será una tienda real de ropa masculina y femenina orientada a la moda urbana premium.

La aplicación permitirá a los usuarios explorar productos, seleccionar prendas, gestionar un carrito, realizar compras y consultar sus pedidos.

La experiencia deberá transmitir:

* Premium.
* Moderna.
* Urbana.
* Elegante.
* Exclusiva.
* Confiable.

---

# 5. Estructura SDD

La documentación de especificaciones se encuentra en:

```text
spec/
├── constitution/
│   ├── mission.md
│   ├── tech-stack.md
│   └── roadmap.md
│
└── features/
```

Cada feature seguirá esta estructura:

```text
features/
└── NNN-nombre-feature/
    ├── spec.md
    ├── plan.md
    └── tasks.md
```

---

# 6. Registro de desarrollo

## 2026-08-23 — Inicialización SDD

### Actividad

Se estableció el enfoque de desarrollo basado en especificaciones para ClotheStore.

### Documentación creada

```text
spec/
├── constitution/
│   ├── mission.md
│   ├── tech-stack.md
│   └── roadmap.md
```

### Decisiones

* El proyecto seguirá una metodología Spec-Driven Development.
* Las features deberán documentarse antes de implementarse.
* La constitución será la referencia principal para las decisiones del proyecto.
* El roadmap determinará el orden de implementación.

### Resultado

Constitución inicial del proyecto definida.

---

## 2026-08-25 — Feature 006 · Extensión: navegación por género y categorías

### Actividad

Se extendió el catálogo con exploración jerárquica: selección de género (Hombre/Mujer) → rejilla de categorías con portada (Boxers, Gorras, Camisetas, Polos) → lista filtrada de productos.

### Decisiones

* El alcance se amplía dentro de la Feature 006 en lugar de abrir una feature nueva.
* Los datos de categorías viven en `src/data/categories.js`, separados de la interfaz.
* El filtrado combina género y categoría; los productos Unisex aparecen en ambos catálogos.
* Las categorías sin productos muestran estado vacío "Próximamente" (catálogo Mujer durante su carga inicial).
* Las portadas del catálogo Mujer reutilizan imágenes existentes hasta incorporar las fotos femeninas pendientes.

### Archivos creados / modificados

```text
src/data/categories.js                 (nuevo)
src/components/GenderCard.js           (nuevo)
src/components/CategoryCard.js         (nuevo)
src/screens/GenderSelectScreen.js      (nuevo)
src/screens/CategoriesScreen.js        (nuevo)
src/screens/ProductListScreen.js       (nuevo)
src/navigation/AppNavigator.js         (rutas Catalog/Categories/Products con parámetros)
src/screens/CatalogScreen.js           (eliminado; sustituido por el nuevo flujo)
spec/features/006-catalogo-productos/  (spec.md, plan.md, tasks.md extendidos)
```

### Validaciones

1. Bundle Metro vía `npx expo export`: Android (849 módulos) e iOS (851 módulos), 0 errores.
2. Verificación de que no quedan referencias a `CatalogScreen` eliminada.

### Pendiente

* Validación visual del usuario en Expo Go (género → categoría → lista → atrás).
* Incorporación de fotos de mujer y cierre de los criterios restantes de la Feature 006.

---

## 2026-08-25 — Feature 006 · Datos femeninos y reestructuración de assets

### Actividad

El usuario reorganizó `assets/products/` en carpetas por género (`Hombre/` y `Mujer/`) e incorporó las fotografías femeninas. Se actualizaron los datos del catálogo para reflejar la nueva estructura.

### Cambios

* Rutas de imágenes de hombre actualizadas a `assets/products/Hombre/<categoria>/`.
* 15 productos femeninos añadidos a `src/data/products.js`: 3 corsets, 5 jeans y 7 vestidos (precios provisionales pendientes de confirmación del usuario).
* `src/data/categories.js`: el catálogo Mujer pasa de las categorías provisionales a sus propias categorías (Corsets, Jeans, Vestidos) con portadas propias.
* `spec.md` actualizado: cada género muestra únicamente sus categorías definidas en datos; los productos Unisex aparecen donde estén incluidos, con filtro por género aplicado.

### Archivos modificados

```text
src/data/products.js                   (rutas Hombre/ + productos femeninos)
src/data/categories.js                 (categorías Mujer definitivas)
spec/features/006-catalogo-productos/spec.md
spec/features/006-catalogo-productos/tasks.md
docs/development-log.md
```

### Validaciones

1. Bundle Metro vía `npx expo export`: Android e iOS, 0 errores.

### Pendiente

* Validación visual del flujo completo en Expo Go.
* Confirmación de precios y disponibilidad de los productos femeninos.
* Limpieza de archivos sobrantes en assets (`.htm`, imagen duplicada, imagen sin usar).

---

# 7. Feature 002 — Sistema visual / Theme

**Estado:** Completada

### Objetivo

Crear un sistema visual centralizado que establezca la identidad premium y urbana de ClotheStore.

### Documentación

```text
spec/features/002-sistema-visual/
├── spec.md
├── plan.md
└── tasks.md
```

### Alcance

El sistema visual contempla:

* Colores.
* Tipografía.
* Espaciado.
* Border radius.
* Tokens visuales reutilizables.
* Consistencia visual.
* Contraste y legibilidad.

### Implementación

Se implementó la fuente única de verdad de los tokens visuales en `src/theme/index.js`:

* Paleta semántica: `background` (#10141A), `surface`, `surfaceRaised`, `textPrimary`, `textSecondary`, `textDisabled`, `border`, `borderStrong`, `accent` (#A5C3FA), `onAccent`.
* Estados de interacción: `interactive.default / pressed / active / disabled`, valores diferenciados entre sí.
* Escala tipográfica: `heading`, `subheading`, `body`, `caption`, `highlight` (objetos directamente extensibles en `StyleSheet`).
* Escala de espaciado base 4: `xs (4) → xxl (48)`.
* Escala de radios: `sm (8)`, `md (12)`, `lg (20)`, `pill (999)`.
* Exportaciones nombradas (`colors`, `typography`, `spacing`, `radius`) más export default agrupador.
* `App.js` se adaptó como pantalla de prueba consumiendo los tokens (mismo diseño previo, sin funcionalidad nueva).

### Archivos modificados

```text
src/theme/index.js                  (implementación principal)
App.js                              (pantalla de prueba; cambio justificado fuera del alcance del plan)
src/theme/…                         (sin archivos adicionales)
spec/features/002-sistema-visual/tasks.md
spec/constitution/roadmap.md
docs/development-log.md
```

### Validaciones

1. Import ESM del módulo: sintaxis correcta.
2. Script Node con cálculo WCAG 2.x: texto principal/fondo 17.06:1, texto principal/superficie 14.80:1, texto secundario/fondo 7.71:1, texto secundario/superficie 6.69:1, acento/fondo 10.37:1, texto sobre acento 10.37:1; estados de interacción distintos entre sí. Todas las comprobaciones aprobadas.
3. Sintaxis ESM/JSX verificada con el parser Babel del proyecto para `App.js` e `index.js`.
4. Verificación estructural de tokens (escalas ascendentes, hex válidos, exportaciones).
5. Validación visual realizada por el usuario en Expo Go: la pantalla se muestra correctamente.

### Problemas encontrados

* Los estilos de título y subtítulo originales de `App.js` estaban definidos en StyleSheets separados pero nunca aplicados al renderizado.
* Se reportó una presunta duplicación de la primera tarea en `tasks.md`.

### Soluciones

* La integración con los tokens unificó y aplicó correctamente dichos estilos.
* El análisis de líneas duplicadas confirmó que no existe duplicación real (la tarea aparece una sola vez); no se modificó nada al respecto.

### Decisiones técnicas

* Tokens semánticos en camelCase: representan función, no apariencia, facilitando evolucionar la identidad sin tocar componentes.
* JavaScript puro sobre React Native/Expo: cero dependencias externas.
* Exportación nombrada + default para flexibilidad de importación.
* Sin fuentes personalizadas ni modo claro/oscuro (fuera de alcance según spec.md).

### Resultado

Feature 002 completada: todos los criterios de aceptación de `spec.md` verificados (contraste medido, validación visual aprobada, tokens reutilizables desde cualquier módulo). Movida a "Hecho" en `roadmap.md`.

---

# 8. Feature 004 — Navegación inicial

**Estado:** Completada

### Objetivo

Configurar la navegación principal de ClotheStore con React Navigation, centralizada en `src/navigation/` y manteniendo `App.js` como punto de entrada.

### Documentación

```text
spec/features/004-navegacion-inicial/
├── spec.md
├── plan.md
└── tasks.md
```

### Implementación

* Dependencias instaladas con `npx expo install` (versiones compatibles con Expo SDK 54):
  * `@react-navigation/native` ^7.3.17
  * `@react-navigation/native-stack` ^7.18.9
  * `react-native-screens` ~4.16.0
  * `react-native-safe-area-context` ~5.6.0
* `src/navigation/AppNavigator.js`: `NavigationContainer` con native stack; tema de navegación derivado de `DarkTheme` extendido con los tokens de `src/theme/`; rutas iniciales `Home` y `Detail`; `screenOptions` con colores y tipografía del sistema visual.
* `src/screens/HomeScreen.js`: pantalla inicial con el contenido previo de `App.js` y botón "Explorar" (`Pressable`) que navega a Detail.
* `src/screens/DetailScreen.js`: pantalla placeholder para validar la navegación.
* `App.js`: reducido a punto de entrada (`StatusBar` + `AppNavigator`), sin configuración de navegación.

### Archivos modificados

```text
package.json / package-lock.json      (dependencias de navegación)
App.js                                (reescrito como punto de entrada)
src/navigation/AppNavigator.js        (nuevo)
src/screens/HomeScreen.js             (nuevo)
src/screens/DetailScreen.js           (nuevo)
spec/features/004-navegacion-inicial/tasks.md
spec/constitution/roadmap.md          (004 a "En curso")
docs/development-log.md
```

### Problemas encontrados

* Render Error en iOS al cargar la navegación: `TypeError: Cannot read property 'regular' of undefined`.

### Soluciones

* La causa fue el tema personalizado pasado a `NavigationContainer`: omitía la clave `fonts`, exigida por el objeto de tema completo de React Navigation v7. Se corrigió extendiendo `DarkTheme` (conserva `fonts`) y sobrescribiendo únicamente `colors` con los tokens del proyecto.

### Decisiones técnicas

* Native stack (`@react-navigation/native-stack`) sobre JS stack: mejor rendimiento y comportamiento nativo.
* Tema de navegación derivado de `DarkTheme` en lugar de construido desde cero: garantiza la estructura completa exigida por React Navigation v7.
* Rutas mínimas (`Home`, `Detail`): sin adelantar funcionalidades de features futuras.

### Resultado

* Compilación verificada con Metro bundler (iOS y Android, 828 módulos, 0 errores).
* `expo-doctor`: 18/18 comprobaciones aprobadas; dependencias alineadas con SDK 54.
* Validación visual en iOS (Expo Go): Home → Detalle → atrás, sin errores en consola.
* Validación visual en Android (Expo Go): Home → Detalle → atrás, sin errores.
* Todos los criterios de aceptación de `spec.md` verificados. Movida a "Hecho" en `roadmap.md`.

---

# 9. Registro de problemas y soluciones

Esta sección registra problemas técnicos encontrados durante el desarrollo y cómo fueron solucionados.

| Fecha | Problema | Solución | Estado |
| ----- | -------- | -------- | ------ |
| 2026-08-23 | Estilos de título/subtítulo en `App.js` definidos pero nunca aplicados | Se integraron consumiendo los tokens de `src/theme/index.js` | Resuelto |
| 2026-08-23 | Reporte de duplicación de la primera tarea en `tasks.md` | Análisis de líneas duplicadas: no existe duplicación real; sin cambios | Cerrado |
| 2026-08-24 | Render Error en iOS: `Cannot read property 'regular' of undefined` al renderizar la navegación | El tema custom de `NavigationContainer` omitía `fonts` (exigido por React Navigation v7); se extendió `DarkTheme` sobrescribiendo solo `colors` | Resuelto |

---

# 10. Registro de decisiones técnicas

Las decisiones importantes que afecten la arquitectura, tecnologías o funcionamiento del proyecto deben registrarse aquí.

| Fecha      | Decisión                             | Motivo                                                      | Feature      |
| ---------- | ------------------------------------ | ----------------------------------------------------------- | ------------ |
| 2026-08-23 | Utilizar SDD                         | Mantener una metodología ordenada antes de modificar código | Proyecto     |
| 2026-08-23 | Utilizar Expo SDK 54                 | Stack actual del proyecto móvil                             | Proyecto     |
| 2026-08-23 | Utilizar Ollama para modelos locales | Permitir trabajar con modelos locales durante el desarrollo | Herramientas |
| 2026-08-23 | Tokens visuales semánticos centralizados en `src/theme/index.js` | Fuente única de verdad y consistencia entre pantallas | 002 |
| 2026-08-23 | Paleta oscura azulada premium sin dependencias externas | Identidad premium/urbana y compatibilidad directa con RN/Expo | 002 |
| 2026-08-24 | React Navigation v7 con native-stack | Rendimiento y comportamiento nativo; solución estándar definida en el tech-stack | 004 |
| 2026-08-24 | Tema de navegación derivado de `DarkTheme` + tokens del proyecto | Estructura completa exigida por React Navigation v7 y consistencia visual | 004 |

---

# 11. Registro de validaciones

Las validaciones realizadas durante el desarrollo se registrarán aquí.

| Fecha | Validación | Resultado | Feature |
| ----- | ---------- | --------- | ------- |
| 2026-08-23 | Contraste WCAG 2.x de la paleta (script Node) | Aprobado: 17.06:1, 14.80:1, 7.71:1, 6.69:1, 10.37:1 | 002 |
| 2026-08-23 | Sintaxis ESM/JSX con parser Babel (`App.js`, `src/theme/index.js`) | Aprobado | 002 |
| 2026-08-23 | Estructura y diferenciación de tokens visuales (script Node) | Aprobado | 002 |
| 2026-08-23 | Validación visual en Expo Go (usuario) | Aprobado | 002 |
| 2026-08-24 | `expo-doctor` (18 comprobaciones) y `expo install --check` | Aprobado: dependencias alineadas con SDK 54 | 004 |
| 2026-08-24 | Bundle Metro vía `npx expo export` (iOS y Android) | Aprobado: 828 módulos, 0 errores | 004 |
| 2026-08-24 | Validación visual iOS Expo Go: Home → Detalle → atrás, consola limpia | Aprobado (tras corrección del tema de navegación) | 004 |
| 2026-08-24 | Validación visual Android Expo Go: Home → Detalle → atrás | Aprobado | 004 |
| 2026-08-26 | Bundle Metro vía `npx expo export` (iOS y Android) tras limpieza de assets | Aprobado: 0 errores | 006 |
| 2026-08-26 | Validación visual en Expo Go del flujo Catálogo → Género → Categoría → Lista → atrás | Aprobado (usuario) | 006 |
| 2026-08-26 | Bundle Metro vía `npx expo export --platform all` tras refactor a `imagenes[]` | Aprobado: 0 errores | 005 |
| 2026-08-26 | Verificación estructural del modelo (script Node) | Aprobado: 31 productos, IDs únicos, todos los campos presentes, 0 restos de `imagen` singular | 005 |

---

## 2026-08-26 — Feature 006 · Cierre

### Actividad

Cierre de la Feature 006 tras validación visual exitosa en Expo Go. Se completó la limpieza de assets sobrantes y se actualizó la documentación.

### Cambios

* Eliminados 3 archivos sobrantes de `assets/products/Hombre/`:
  - `oversided/napbrand-t-shirt-oversized-men-black.htm` (archivo HTML sobrante)
  - `gorras/salvator-polo-men-white-6722502.webp` (duplicado; ya existe en `polos/`)
  - `gorras/SHADIA_SALSA_FRENTE.webp` (sin usar)
* `spec/features/006-catalogo-productos/spec.md`: estado actualizado a "completada".
* `spec/features/006-catalogo-productos/tasks.md`: checklist completado.
* `docs/development-log.md` y `spec/constitution/roadmap.md`: Feature 006 movida a "Hecho".
* Los precios de productos femeninos quedan pendientes de confirmación (precios provisionales en `src/data/products.js`).

### Validaciones

1. Bundle Metro vía `npx expo export --platform all`: Android e iOS, 0 errores.
2. Validación visual en Expo Go del flujo completo: Género → Categoría → Lista de productos → atrás. Aprobado.

### Pendiente

* Confirmación de precios definitivos de los productos femeninos.

---

## 2026-08-26 — Feature 005 · Modelo de productos

### Actividad

Se definió y consolidó el modelo de datos de producto en `src/data/products.js`, alineado con los criterios de aceptación de `spec.md`. Se incorporó el campo `descripcion` y se refactorizó el campo `imagen` (singular) a `imagenes` (array) para representar una o varias imágenes por producto, requisito explícito del spec.

### Decisiones

* **Estructura de imágenes como array** — Adoptar `imagenes: [require(...)]` desde el inicio permite evolucionar hacia galería de imágenes, variantes visuales y detalle de producto (Feature 009) sin cambiar la firma del modelo.
* **Sin normalización de campos previos** — Se conserva el campo `genero` (Hombre | Mujer | Unisex) usado por la Feature 006 para el filtrado. Este campo no es parte del modelo definido por la Feature 005, pero eliminarlo aquí rompería la Feature 006 ya completada.
* **Datos identificados como de desarrollo** — El array de 31 productos en `src/data/products.js` se mantiene como dataset de desarrollo hasta que exista una fuente de datos real (backend).
* **Sin cambios arquitectónicos** — El modelo vive en `src/data/`, separado de `App.js`, componentes y pantallas, tal como exige la constitución.

### Cambios

* `src/data/products.js`: añadido campo `descripcion` a los 31 productos; renombrado `imagen` → `imagenes` (array) en los 31 productos.
* `src/components/ProductCard.js`: adaptado el consumo a `imagenes[0]`.
* `spec/features/005-modelo-de-productos/spec.md`: estado a "completada".
* `spec/features/005-modelo-de-productos/tasks.md`: checklist finalizado.
* `docs/development-log.md` y `spec/constitution/roadmap.md`: Feature 005 movida a "Hecho".

### Archivos modificados

```text
src/data/products.js                                  (descripcion + imagenes[])
src/components/ProductCard.js                         (consumo de imagenes[0])
spec/features/005-modelo-de-productos/spec.md
spec/features/005-modelo-de-productos/tasks.md
spec/constitution/roadmap.md                          (005 a "Hecho")
docs/development-log.md
```

### Validaciones

1. Bundle Metro vía `npx expo export --platform all`: Android e iOS, 0 errores tras la refactorización a `imagenes[]`.
2. Verificación estructural (script Node sobre `src/data/products.js`): 31 productos, 31 IDs únicos, 31 campos `descripcion`, 31 campos `imagenes` como array, 31 campos `disponible`, 0 restos del campo `imagen` singular.
3. Reutilización confirmada: `src/components/ProductCard.js` y `src/data/categories.js` importan `products` desde `src/data/products.js` sin redefinir la estructura.

### Decisiones técnicas

| Fecha      | Decisión                                | Motivo                                                      | Feature |
| ---------- | --------------------------------------- | ----------------------------------------------------------- | ------- |
| 2026-08-26 | Imágenes como array (`imagenes: []`)    | Cumplir criterio de "una o varias imágenes" y permitir galería futura sin cambiar la firma del modelo | 005 |

---

# 12. Features completadas

| Nº  | Feature          | Estado       | Fecha      |
| --- | ---------------- | ------------ | ---------- |
| 001 | Constitución SDD | ✅ Completada | 2026-08-23 |
| 002 | Sistema visual / Theme | ✅ Completada | 2026-08-23 |
| 004 | Navegación inicial | ✅ Completada | 2026-08-24 |
| 005 | Modelo de productos | ✅ Completada | 2026-08-26 |
| 006 | Catálogo de productos | ✅ Completada | 2026-08-26 |

---

# 13. Features en desarrollo

*Sección vacía: no hay features "en curso" en este momento.*

---

# 14. Notas de desarrollo

Este documento debe mantenerse actualizado durante todo el ciclo de vida del proyecto.

Cada implementación importante deberá registrar:

1. Qué se hizo.
2. Por qué se hizo.
3. Qué archivos fueron modificados.
4. Qué problemas aparecieron.
5. Cómo fueron solucionados.
6. Qué validaciones se realizaron.
7. Qué decisiones técnicas fueron tomadas.
8. Qué queda pendiente.

La bitácora debe reflejar únicamente trabajo realmente realizado y validado.

---

# 15. Regla de documentación

Antes de considerar una feature como completada:

```text
spec.md
    ↓
plan.md
    ↓
tasks.md
    ↓
implementación
    ↓
pruebas / validación
    ↓
development-log.md
    ↓
roadmap.md → Hecho ✅
```

Una feature no debe marcarse como completada únicamente porque el código fue escrito. También debe cumplir sus criterios de aceptación y haber sido validada.
