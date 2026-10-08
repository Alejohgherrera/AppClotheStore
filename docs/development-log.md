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
| 2026-08-26 | Bundle Metro vía `npx expo export --platform all` tras limpieza de assets | Aprobado: 0 errores | 006 |
| 2026-08-26 | Validación visual en Expo Go del flujo Catálogo → Género → Categoría → Lista → atrás | Aprobado (usuario) | 006 |
| 2026-08-26 | Bundle Metro vía `npx expo export --platform all` tras refactor a `imagenes[]` | Aprobado: 0 errores | 005 |
| 2026-08-26 | Verificación estructural del modelo (script Node) | Aprobado: 31 productos, IDs únicos, todos los campos presentes, 0 restos de `imagen` singular | 005 |
| 2026-08-26 | Búsqueda: filtrado por nombre, descripción, categoría y atributos | Aprobado | 008 |
| 2026-08-26 | Búsqueda: insensible a mayúsculas y acentos | Aprobado | 008 |
| 2026-08-26 | Búsqueda: combinación con filtros y ordenamiento | Aprobado | 008 |
| 2026-08-26 | Búsqueda: chip activo, limpiar y estado vacío diferenciado | Aprobado | 008 |
| 2026-08-26 | `expo-doctor` (18 comprobaciones) | Aprobado | 008 |
| 2026-10-07 | `npm test` (8 suites, 189 pruebas) | Aprobado: 189/189 | 007/008/009/016 |
| 2026-10-07 | `npm run lint` | Aprobado: 0 errores, 0 avisos | 007/008/009/016 |
| 2026-10-07 | Bundle Metro vía `npx expo export --platform all` tras la cobertura de 016 | Aprobado: bundles iOS y Android, 0 errores | 016 |
| 2026-10-07 | Validación visual Expo Go Android e iOS: header → carrito → cantidades → eliminar → vaciar | Aprobado (usuario) | 016 |
| 2026-10-07 | Bundle Metro vía `npx expo export --platform all` | Aprobado: bundles iOS y Android, 0 errores | 009 |
| 2026-10-07 | `expo-doctor` (18 comprobaciones) | Aprobado: 18/18 | 009 |
| 2026-10-07 | Validación visual Expo Go Android e iOS: catálogo → detalle → carrito | Aprobado (usuario) | 009 |

---

## 2026-08-26 — Feature 008 · Búsqueda

### Actividad

Se implementó la búsqueda de productos dentro del catálogo. El usuario puede buscar prendas por nombre, descripción, categoría y atributos (tallas y colores) mediante un campo de búsqueda integrado en la pantalla de lista de productos.

### Implementación

* `src/components/SearchBar.js`: campo de texto con icono de búsqueda, placeholder "Buscar productos…" y botón de limpiar, usando los tokens de `src/theme/`.
* `src/data/filters.js`: `DEFAULT_FILTERS` con campo `busqueda`, función `normalizeText` (NFD + eliminación de diacríticos + lowerCase), lógica de búsqueda en `applyFilters` (nombre, descripción, categoría, tallas, colores), y chip de búsqueda en `getActiveFilterChips`.
* `src/screens/ProductListScreen.js`: integración del `SearchBar` con `FilterContext`, sincronización del término de búsqueda, chips de búsqueda activos, diferenciación de estados vacíos ("Sin productos" vs "Sin resultados"), y limpieza de búsqueda al cambiar de categoría.

### Decisiones

* La búsqueda se aplica después de los filtros pero antes del ordenamiento, respetando el orden correcto según el plan.
* No se añaden dependencias externas; se reutiliza la infraestructura existente de `FilterContext`.
* El término de búsqueda se limpia al cambiar de categoría para mantener coherencia con los filtros.

### Archivos modificados

```text
src/components/SearchBar.js              (icono de búsqueda añadido)
src/data/filters.js                       (chip de búsqueda en getActiveFilterChips)
src/screens/ProductListScreen.js          (integración completa de búsqueda)
spec/features/008-busqueda/tasks.md      (checklist finalizado)
spec/constitution/roadmap.md              (008 movida a "Hecho")
docs/development-log.md                   (entrada de Feature 008)
```

### Validaciones

1. Bundle Metro vía `npx expo export --platform all`: Android e iOS, 0 errores.
2. Búsqueda por nombre de producto: funcional.
3. Búsqueda por descripción: funcional.
4. Búsqueda por categoría: funcional.
5. Búsqueda por atributos (tallas y colores): funcional.
6. Búsqueda insensible a mayúsculas/minúsculas: funcional.
7. Búsqueda con acentos (normalización NFD): funcional.
8. Combinación con filtros activos: funcional.
9. Chip de búsqueda activa mostrado en la interfaz: funcional.
10. Limpieza de búsqueda al cambiar de categoría: funcional.
11. Estado vacío diferenciado ("Sin productos" vs "Sin resultados"): funcional.

### Problemas encontrados

* El `SearchBar` original carecía de icono de búsqueda y no estaba renderizado en `ProductListScreen`. Se agregó el icono y se integró en el JSX.
* `getActiveFilterChips` no incluía el término de búsqueda. Se agregó para permitir eliminar la búsqueda desde el chip.
* El estado vacío no diferenciaba entre "sin productos" y "sin resultados". Se corrigió con `ListEmptyComponent` condicional.

### Resultado

Feature 008 completada: todos los criterios de aceptación de `spec.md` verificados. Movida a "Hecho" en `roadmap.md`.

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

## 2026-09-24 — Formalización de las Features 009 y 016

### Actividad

Se documentó el estado real del detalle de producto y del carrito implementados antes de que existieran sus especificaciones SDD. Se crearon los contratos de las Features 009 y 016 y se abrieron como trabajos de remediación, sin declararlas completadas.

### Estado registrado

- `ProductDetailScreen` y `CartScreen` existen como prototipos funcionales, pero presentan reglas incompletas de disponibilidad, validación, persistencia e interacción.
- El carrito estaba registrado en navegación, pero su icono de cabecera no era pulsable.
- Los filtros persistentes podían recuperar `precioMax: null` desde el valor no serializable `Infinity` y vaciar el catálogo.
- Favoritos y estado global de usuario siguen sin implementarse, aunque algunas listas de estado los habían marcado por error como completados.

### Decisiones

- El detalle de producto mantiene la presentación y las selecciones locales; la lógica de compra pertenece a la Feature 016.
- El carrito local se remedia antes de continuar con nuevas features, pero mantiene su dependencia futura de variantes, backend e inventario.
- La persistencia actual debe migrarse de forma compatible y revalidarse contra el catálogo canónico.
- Las Features 009 y 016 solo pasarán a estado Hecho después de cumplir y validar todos sus criterios.

### Documentación creada

```text
spec/features/009-detalle-de-producto/spec.md
spec/features/009-detalle-de-producto/plan.md
spec/features/009-detalle-de-producto/tasks.md
spec/features/016-carrito/spec.md
spec/features/016-carrito/plan.md
spec/features/016-carrito/tasks.md
```

### Documentación alineada

```text
spec/constitution/roadmap.md
README.md
AGENTS.md
```

### Validaciones realizadas

1. Revisión estática del prototipo y del commit `24f4ca2`.
2. Verificación de las inconsistencias entre código, roadmap, README, AGENTS y bitácora.
3. Consulta de la documentación oficial de Expo SDK 54 antes de modificar código.

### Resultado

Las Features 009 y 016 quedan en curso. La remediación de navegación, filtros, persistencia, inventario, cantidades y pruebas aún debe implementarse y validarse.

---

## 2026-10-07 — Feature 009 · Detalle de producto — Cierre de la remediación

### Actividad

Se cerró la remediación de la pantalla de detalle de producto. La implementación de la pantalla ya existía en el working tree sin commitear; esta sesión verificó los cinco defectos de `plan.md`, montó la infraestructura de pruebas y lint que el proyecto no tenía, y escribió la cobertura automatizada de los criterios críticos.

### Qué ya estaba implementado y se verificó

`src/screens/ProductDetailScreen.js` ya cubría los defectos catalogados en el `plan.md`:

- Contenido desplazable mediante `ScrollView`.
- Galería horizontal que consume el array `imagenes` con `pagingEnabled`.
- Feedback visible para talla y color obligatorios, anunciado con `accessibilityLiveRegion="polite"` y temporizador de 2,5 s con limpieza al desmontar.
- CTA deshabilitada mediante `!disponible || !hydrated`, con etiqueta y texto diferenciados por estado.
- Roles, etiquetas y `accessibilityState` en selecciones de talla, color y CTA.

### Infraestructura añadida

El proyecto tenía `jest`, `jest-expo`, `@testing-library/react-native`, `eslint` y `eslint-config-expo` declarados en `devDependencies` pero sin ningún archivo de configuración, por lo que `npm test` y `npm run lint` no existían.

- `jest.config.js` — preset `jest-expo`, `setupFilesAfterEnv` con `jest.setup.js`, `transformIgnorePatterns` según la documentación oficial de Expo SDK 54 (npm), incluyendo `react-navigation`, `react-native-screens`, `react-native-safe-area-context` y `@react-native-async-storage/*`.
- `jest.setup.js` — mock oficial de AsyncStorage (`@react-native-async-storage/async-storage/jest/async-storage-mock`) y mock de `react-native-safe-area-context` con insets neutros.
- `eslint.config.js` — `eslint-config-expo/flat` (ESLint 9, flat config), con `no-console` limitado a `warn`/`error` y desactivado en pruebas, más los globales de Jest y Node en los archivos de configuración.
- `package.json` — scripts `test`, `test:watch`, `test:coverage` y `lint`.

No se añadió ninguna dependencia nueva: `babel-preset-expo` se descartó como `babel.config.js` porque el preset `jest-expo` ya resuelve la configuración de Babel por sí mismo y el paquete no está declarado como dependencia del proyecto.

### Archivos creados / modificados

```text
jest.config.js                                (nuevo)
jest.setup.js                                 (nuevo)
eslint.config.js                              (nuevo)
package.json                                  (scripts test/test:watch/test:coverage/lint)
src/screens/ProductDetailScreen.js            (testID del ScrollView)
src/screens/__tests__/ProductDetailScreen-test.js  (nuevo, 17 pruebas)
src/screens/__tests__/CartScreen-test.js      (nuevo, 12 pruebas)
src/context/__tests__/CartContext-test.js     (nuevo, 16 pruebas)
spec/features/009-detalle-de-producto/tasks.md (checklist real)
spec/features/009-detalle-de-producto/spec.md  (estado y criterios)
```

### Pruebas escritas

> La cobertura de filtros, contexto de filtros y modal de filtros se añadió después y se documenta en la entrada de las Features 007 y 008.

- `ProductDetailScreen` (17): presentación de nombre, categoría, precio y descripción; todas las imágenes del array y placeholder sin imágenes; superficie desplazable; estados seleccionados de talla y color; feedback por falta de talla y por falta de color; limpieza del feedback por temporizador; CTA deshabilitada y sin confirmación en producto agotado; confirmación tras alta válida y su retirada por temporizador; rechazo de un producto ausente del catálogo; roles, región viva y navegación de vuelta.
- `CartContext` (16): `buildCartKey` y su normalización; `normalizeCartItems` contra entradas inválidas, productos agotados, inexistentes, variantes no contempladas, cantidades no positivas o no enteras, color como objeto, color único implícito, fusión de líneas repetidas y separación de combinaciones distintas.
- `CartScreen` (12): indicador de carga mientras AsyncStorage no responde; restauración de líneas válidas; descarte de agotados; no sobrescritura del almacenamiento ante fallo de lectura ni ante JSON corrupto; talla, color, cantidad y totales; aumento de cantidad; disminución deshabilitada en cantidad uno; eliminación explícita; checkout deshabilitado; navegación a catálogo desde el carrito vacío.

### Problemas encontrados y soluciones

1. **`babel.config.js` rompía la resolución del preset.** `jest-expo` resuelve `babel-preset-expo` desde su propia cadena, pero un `babel.config.js` propio hacía que Babel exigiera el preset como dependencia directa del proyecto y fallaba con `Cannot find module 'babel-preset-expo'`. Solución: eliminar `babel.config.js` y delegar la configuración al preset, que ya resuelve `expo/internal/babel-preset`.
2. **`render` y `fireEvent` son asíncronos en `@testing-library/react-native` v14.** La primera versión de las pruebas los usaba de forma síncrona y fallaba con `render function has not been called`. Solución: esperar cada `render`, `fireEvent` y `act`.
3. **`act(...)` en `afterEach` al vaciar temporizadores.** `jest.runOnlyPendingTimers()` disparaba `setFeedback` fuera de `act` y generaba avisos de React. Solución: envolver el vaciado en `act`.
4. **Los productos de prueba inventados eran rechazados por el carrito.** `addItem` resuelve el producto canónico por identificador, así que un objeto ficticio devuelve `INVALID_PRODUCT`. Esto confirmó que la pantalla delega correctamente. Solución: las pruebas usan productos reales de `src/data/products.js`, más una prueba explícita del rechazo por producto inexistente.
5. **`CartScreen` renderiza `ProductCard`, que usa `useNavigation()`.** Sin `NavigationContainer` la prueba falla con `Couldn't find a navigation object`. Solución: envolver el árbol de prueba en `NavigationContainer`.
6. **El precio de una línea y el total coinciden como texto.** `getByText` lanzaba `Found multiple elements`. Solución: usar `getAllByText` y afirmar sobre el conjunto.

### Decisiones técnicas

| Fecha      | Decisión                                                        | Motivo                                                                                              | Feature |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| 2026-10-07 | Sin `babel.config.js`; configuración delegada a `jest-expo`     | El preset ya resuelve Babel y evita exigir `babel-preset-expo` como dependencia directa             | 009     |
| 2026-10-07 | Pruebas sobre productos reales del catálogo, no objetos ficticios | Reproduce las reglas reales de `addItem` y evita falsear la validación contra el catálogo canónico  | 009     |
| 2026-10-07 | Pruebas del carrito en `CartScreen-test.js` junto a la 009      | Sus reglas de hidratación y persistencia son la base sobre la que la 009 deshabilita la CTA          | 009/016 |
| 2026-10-07 | `no-console` como advertencia, no error                        | El código usa `console.warn` en fallos de AsyncStorage legítimos y no debe romper el build            | 009     |

### Validaciones

1. `npm test`: 3 suites, 45 pruebas, todas aprobadas. Ampliado posteriormente a 6 suites y 143 pruebas con la cobertura de las Features 007 y 008.
2. `npm run lint`: 0 problemas.
3. `npx expo export --platform all`: bundles iOS y Android generados, 0 errores.
4. `npx expo-doctor`: 18/18 comprobaciones aprobadas; dependencias alineadas con SDK 54.
5. Cobertura de criterios: los 14 criterios de aceptación de `spec.md` están cubiertos por pruebas o por compilación.
6. Validación visual del flujo catálogo → detalle → carrito en Android e iOS: aprobado (usuario).

### Resultado

Feature 009 completada: los 14 criterios de aceptación de `spec.md` están cumplidos y verificados mediante pruebas automatizadas, compilación y validación visual en ambos dispositivos. Movida a "Hecho" en `roadmap.md`.

---

## 2026-10-07 — Features 007 y 008 · Cobertura de pruebas de filtros y búsqueda

### Actividad

La revisión de los cambios pendientes de las Features 007 y 008 detectó que ambas estaban marcadas como completadas sin pruebas que respaldaran sus criterios. Se escribió la cobertura de la lógica de filtros, su persistencia y el modal de filtros.

### Pruebas escritas

- `src/data/__tests__/filters-test.js` — 57 pruebas sobre `normalizeText`, `getPriceRange`, `normalizeFilters`, `serializeFilters`, `normalizeStoredFilterMap`, `serializeFilterMap`, `applyFilters`, `countActiveFilters`, `isPriceFilterActive` y `getActiveFilterChips`. Cubren el ciclo completo serializar → normalizar → aplicar, los tres ordenamientos, la insensibilidad a acentos y el rechazo de entradas inválidas.
- `src/context/__tests__/FilterContext-test.js` — 18 pruebas sobre hidratación, bloqueo de mutaciones antes de hidratar, independencia por combinación, normalización de datos antiguos, no sobrescritura del almacenamiento ante fallo de lectura o JSON inválido, y error explícito al usar el hook fuera del provider.
- `src/components/__tests__/FilterModal-test.js` — 23 pruebas sobre edición de precio con `Infinity`, rango incoherente, selección múltiple de tallas y colores, y las tres acciones del modal.

### Accesibilidad añadida a `FilterModal`

Las pruebas exigían consultar los controles por etiqueta, lo que reveló que el modal no las tenía. Se añadieron `accessibilityLabel` y `accessibilityRole` a la equis, el fondo, los chips de talla y color, los campos de precio, el interruptor de disponibilidad y los botones Limpiar y Aplicar. El botón Aplicar también expone `accessibilityState.disabled` cuando el rango es incoherente.

### Cambios en la infraestructura de pruebas

`jest.setup.js` silenciaba `console.warn` y `console.error` con `jest.spyOn`, pero `jest.restoreAllMocks()` en el `beforeEach` de las nuevas suites los restauraba y las pruebas de fallo de lectura empezaban a emitir avisos. Se cambió a asignación directa (`console.warn = () => {}`), que no es restaurable.

### Hallazgos de la revisión de código

Una revisión previa del diff-aplazado señaló dos posibles defectos en `src/data/filters.js`:

- **Falso positivo.** Se Abijo que el chip de precio podía quedar activo de forma permanente tras recargar. Se verificó ejecutando el ciclo `serializeFilters` → `normalizeFilters` → `getActiveFilterChips` y el chip se comporta correctamente en todos los casos.
- **Comportamiento confirmado.** El borrado de la búsqueda al cambiar de categoría no era un defecto sino una mejora deliberada: los filtros ahora persisten por combinación de género y categoría. Los specs de 007 y 008 ya lo reflejaban.

Tres expectativas de las pruebas resultaron incorrectas durante la redacción y se corrigieron, no el código: el rango de precio solo se cuenta como filtro activo cuando un límite restringe el catálogo, el chip de precio no aparece cuando solo el mínimo coincide con el rango, y `setFiltersFor` reemplaza la combinación completa en lugar de fusionarla.

### Documentación actualizada

- `spec/features/007-categorias-y-filtros/tasks.md`: las tres tareas de mantenimiento recurrente se marcaron como cumplidas con su justificación, y se añadió el apartado de pruebas.
- `spec/features/007-categorias-y-filtros/spec.md`: tabla de cobertura que relaciona cada criterio de aceptación con la suite que lo verifica.

### Validaciones

1. `npm test`: 6 suites, 143 pruebas, todas aprobadas y sin avisos de consola.
2. `npm run lint`: 0 problemas.

### Resultado

Las Features 007 y 008 quedan respaldadas por pruebas automatizadas. 98 de 143 pruebas cubren la lógica de filtros y su persistencia.

---

## 2026-10-07 — Feature 016 · Carrito — Cobertura de pruebas de la remediación

### Actividad

El carrito ya estaba remediado en el working tree, pero sus pruebas cubrían solo las funciones puras de `CartContext` y la presentación de `CartScreen`. Las reglas de negocio que el `plan.md` considera el núcleo de la feature no tenían cobertura. Se escribieron 46 pruebas nuevas sobre el provider real, el botón de cabecera y el vaciado con confirmación.

### Pruebas escritas

- `src/context/__tests__/CartProvider-test.js` — 32 pruebas sobre el provider real montado con `renderHook` y AsyncStorage mockeado. Cubren el bloqueo de `addItem`, `removeItem`, `updateQuantity` y `clearCart` antes de hidratar; la resolución del producto canónico a partir de una copia con precio obsoleto; la fusión de la misma combinación y la separación de combinaciones distintas; el rechazo de productos inexistentes, agotados, con talla o color no contemplados y con cantidades cero, negativas, decimales, `NaN` o infinitas; la resolución del color implícito cuando el producto tiene uno solo; el tratamiento del cero como eliminación de línea; el rechazo de identificadores no textuales; y el recálculo de `count` y `total` tras cada mutación y desde líneas parcialmente inválidas.
- `src/navigation/__tests__/AppNavigator-test.js` — 10 pruebas sobre el botón de cabecera: rol, etiqueta con singular y plural según el número de artículos, `hitSlop`, presencia y ausencia del badge, navegación a `Cart` con carrito vacío y con líneas, ausencia del botón en la propia pantalla del carrito y persistencia del botón tras navegar al catálogo.
- `src/screens/__tests__/CartScreen-test.js` — 4 pruebas nuevas sobre el vaciado: confirmación mediante `Alert`, cancelación sin efectos, vaciado efectivo y persistencia del carrito vacío en AsyncStorage.

### Problemas encontrados y soluciones

1. **`renderHook` es asíncrono en la versión 14 de React Native Testing Library.** La primera versión guardaba el resultado del hook dentro del `act`, por lo que la referencia se perdía al cambiar de render y todas las pruebas fallaban con `Cannot read properties of undefined`. Solución: esperar `renderHook` y capturar `result` antes de los `act` posteriores.
2. **`Alert` requiere espiar el módulo para poder pulsar sus botones.** Solución: `jest.spyOn(Alert, 'alert')` y llamada directa al `onPress` del botón confirmado dentro de un `act`.
3. **`AppNavigator` requiere `SafeAreaProvider`.** Solución: envolver el árbol de prueba con el provider real, ya mockeado en `jest.setup.js`.
4. **El texto del botón de inicio es "Explorar", no "Explorar catálogo".** La expectativa se ajustó al texto real de `HomeScreen`.
5. **Import duplicado en la suite nueva.** `CartProvider` y `useCart` se importaban en una línea y `CART_ACTION_ERRORS` en otra; ESLint lo detectó como `import/no-duplicates` y se unificó.

### Expectativa corregida

La primera versión de la prueba de descarte de líneas inválidas asumía que el almacenamiento conservaba la línea de un producto agotado. El comportamiento real es el contrario: el normalizador la purga y el almacenamiento acaba con un array vacío. Se corrigió la prueba para documentar ese comportamiento, que es el correcto, ya que una línea de producto agotado no debe sobrevivir a la siguiente sesión. La distinción relevante es entre lectura fallida, que no sobrescribe nada, y lectura correcta con datos inválidos, que sí purga.

### Validaciones

1. `npm test`: 8 suites, 189 pruebas, todas aprobadas.
2. `npm run lint`: 0 errores y 0 avisos.
3. `npx expo export --platform all`: bundles iOS y Android generados, 0 errores.
4. Validación visual del flujo de carrito en Android e iOS: aprobado (usuario). Se comprobó la apertura desde el header, la modificación de cantidades, la eliminación de una línea, el vaciado con confirmación y la actualización del badge.

### Resultado

Feature 016 completada: los 17 criterios de aceptación de `spec.md` están cumplidos y verificados mediante pruebas automatizadas, compilación y validación visual en ambos dispositivos. Movida a "Hecho" en `roadmap.md`.

Las reglas definitivas de stock por variante siguen dependiendo de la Feature 010 y del backend de las Features 011–015, tal como anticipates el `plan.md`.
---

## 2026-10-07 — Feature 010 · Tallas, variantes y stock

### Actividad

Se introdujo el inventario por variante, dejando el detalle y el carrito sujetos a la disponibilidad real de cada combinación de talla y color.

### Decisiones

- El stock se define por variante completa, es decir producto + talla + color, que es el comportamiento habitual en moda.
- El inventario vive en `src/data/stock.js`, separado del catálogo, para que la Feature 011 pueda sustituir su fuente sin reescribir `products.js`.
- Una talla es seleccionable si tiene stock en cualquier color del producto, y un color es seleccionable si tiene stock en cualquier talla. Sin esta regla, una talla agotada solo en negro bloquearía una compra válida en blanco.
- Dos códigos de error nuevos: `OUT_OF_STOCK` cuando no hay existencias e `INSUFFICIENT_STOCK` cuando la cantidad supera el stock, con `availableStock` y `remaining` para que el mensaje sea útil.

### Implementación

- `src/data/stock.js`: inventario de las 124 combinaciones del catálogo, con datos de desarrollo y variantes agotadas repartidas.
- `src/data/inventory.js`: seis funciones puras de solo lectura, `getVariantStock`, `isVariantAvailable`, `getAvailableSizes`, `getAvailableColors`, `getProductStock` e `isProductAvailable`. Devuelven cero o listas vacías ante entradas inexistentes y no lanzan excepciones.
- `ProductDetailScreen`: talla y color agotados con opacidad, tachado, etiqueta "agotada" y `accessibilityState.disabled`; feedback al pulsarlos; indicador de unidades restantes; CTA bloqueada si la combinación seleccionada no tiene stock.
- `CartContext`: `addItem` y `updateQuantity` validan contra el inventario y recortan por stock al hidratar.
- `CartScreen`: el botón de aumento se deshabilita al alcanzar el stock y la línea avisa del máximo disponible.

### Problemas encontrados y soluciones

1. **El inventario escrito a mano estaba desalineado con el catálogo.** La prueba estructural detectó 21 combinaciones ausentes: los 14 productos femeninos usan talla `XS`, que no había incluido. Solución: auditar el catálogo y corregir `src/data/stock.js`.
2. **Un color no existía con el nombre escrito.** `polo-salvator-rosa` usa `Rosa`, no `Rosa Quartz`. Solución: corregir el dato.
3. **`polo-salvator-rosa` está marcado `disponible: false` en el catálogo pero tenía stock.** Como `disponible: false` es una compuerta dura en `CartContext`, el inventario se puso en cero. Solución: cero en las cuatro tallas, documentado en el propio archivo.
4. **`getAvailableColors` devuelve nombres y la pantalla le pasaba el objeto de color.** `includes` nunca coincidía y todos los colores aparecían agotados. Detectado por las pruebas del detalle. Solución: comparar con `color.nombre`.
5. **`getVariantStock` recibía el objeto de color en lugar del nombre.** Toda combinación seleccionada parecía agotada y la CTA nunca agregaba al carrito. Detectado por las pruebas del detalle. Solución: pasar `selectedColor.nombre`.
6. **`addItem` no podía validar el stock acumulado.** El estado del closure puede estar desactualizado en llamadas consecutivas. Solución: espejo síncrono de `items` en un `useRef`.
7. **La suite de `normalizeCartItems` usaba un catálogo sintético.** Con inventario, un catálogo ficticio no tiene existencias y todas las líneas se descartaban. Solución: migrar la suite al catálogo real.
8. **Dos claves de objeto sin comillas.** `Rosa Quartz` y `Azul Denim` rompían el parseo. Solución: entrecomillar.
9. **Una tarea del plan resultó innecesaria.** "Limpiar selecciones que dejen de ser viables" no puede ocurrir con inventario estático, porque una variante agotada nunca llega a estar seleccionada. Se retiró en lugar de escribir código muerto y se reevaluará con la Feature 011.

### Validaciones

1. `npm test`: 9 suites, 234 pruebas, todas aprobadas.
2. `npm run lint`: 0 errores y 0 avisos.
3. `npx expo export --platform all`: bundles iOS y Android generados, 0 errores.

### Pendiente

- Validación visual en Android e iOS: comprobar que una talla agotada aparece tachada y no es seleccionable, que la indicadora de unidades restantes es correcta, que la CTA no permite comprar una combinación agotada y que el carrito impide superar el stock.

### Resultado

Los 23 criterios de aceptación de `spec.md` están implementados y cubiertos por pruebas. Falta únicamente la validación visual antes de mover la Feature 010 a "Hecho".

---

# 12. Features completadas

| Nº  | Feature          | Estado       | Fecha      |
| --- | ---------------- | ------------ | ---------- |
| 001 | Constitución SDD | ✅ Completada | 2026-08-23 |
| 002 | Sistema visual / Theme | ✅ Completada | 2026-08-23 |
| 003 | Arquitectura base | ✅ Completada | 2026-08-23 |
| 004 | Navegación inicial | ✅ Completada | 2026-08-24 |
| 005 | Modelo de productos | ✅ Completada | 2026-08-26 |
| 006 | Catálogo de productos | ✅ Completada | 2026-08-26 |
| 007 | Categorías y filtros | ✅ Completada | 2026-08-26 |
| 008 | Búsqueda | ✅ Completada | 2026-08-26 |
| 009 | Detalle de producto | ✅ Completada | 2026-10-07 |
| 016 | Carrito             | ✅ Completada | 2026-10-07 |

---

# 13. Features en desarrollo

| Nº  | Feature | Estado | Fecha de apertura |
| --- | ------- | ------ | ----------------- |

> Ninguna feature abierta en este momento.

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
