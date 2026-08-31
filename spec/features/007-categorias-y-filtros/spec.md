# 007 · Categorías y filtros

*Extender el modelo de productos con tallas y colores, e implementar un sistema de filtros y ordenamiento en el catálogo.*

## Contexto

La Feature 005 definió una estructura de producto con campos básicos (id, nombre, descripción, precio, categoría, género, imágenes, disponible). La Feature 006 mostró los productos en un catálogo con navegación por género → categoría.

Esta feature extiende el modelo para soportar tallas y colores, e introduce un sistema completo de filtros y ordenamiento que permita a los usuarios encontrar productos rápidamente según sus preferencias.

## Extensión del modelo de producto

Cada producto puede tener múltiples tallas disponibles y múltiples colores disponibles.

**Estructura extendida del producto:**

```js
{
  id: 'camiseta-napbrand-negra',
  nombre: 'Camiseta Oversized Napbrand Negra',
  descripcion: 'Camiseta oversized Napbrand en negro',
  precio: 32.9,
  categoria: 'Camisetas',
  genero: 'Hombre',
  imagenes: [...],
  disponible: true,
  tallas: ['S', 'M', 'L', 'XL'],
  colores: [
    { nombre: 'Negro', codigo: '#000000' },
    { nombre: 'Beige', codigo: '#D4B896' },
  ],
}
```

**Tallas:** array de strings. Los valores deben ser consistentes entre productos. Se definen en `src/data/sizes.js`.

**Colores:** array de objetos con `nombre` y `codigo` (hexadecimal). Los valores deben ser únicos y reutilizables. Se definen en `src/data/colors.js`.

## Sistema de filtros

### Filtros disponibles

1. **Rango de precio:** dos campos numéricos (mínimo y máximo). El usuario introduce los valores o usa los límites del catálogo actual.
2. **Talla:** selección múltiple de tallas disponibles. Si un producto tiene al menos una de las tallas seleccionadas, se muestra.
3. **Color:** selección múltiple de colores disponibles. Si un producto tiene al menos uno de los colores seleccionados, se muestra.
4. **Disponibilidad:** filtro simple de "Solo disponibles" que oculta productos con `disponible: false`.

### Combinación de filtros

Todos los filtros activos se aplican con lógica AND entre sí y con el contexto de navegación (género + categoría actual). Si un producto pasa todos los filtros, se muestra.

### Filtros activos

Un filtro se considera activo cuando su valor difiere del valor por defecto:

- Precio: activo cuando mínimo > límite mínimo del catálogo O máximo < límite máximo del catálogo.
- Talla: activo cuando hay al menos una talla seleccionada.
- Color: activo cuando hay al menos un color seleccionado.
- Disponibilidad: activo cuando está activado.

## Sistema de ordenamiento

### Opciones de orden

1. **Precio: menor a mayor** — productos ordenados por precio ascendente.
2. **Precio: mayor a menor** — productos ordenados por precio descendente.
3. **Nombre: A-Z** — productos ordenados alfabéticamente por nombre.

### Orden por defecto

Por defecto, los productos se muestran en el orden en que aparecen en los datos (orden original del array).

## UI de filtros

### Chips de filtros activos

Encima de la lista de productos, visibles de forma permanente, se muestran chips para cada filtro activo. Cada chip muestra un resumen del filtro (ej. "Precio: 20€ - 50€", "Talla: M, L", "Color: Negro", "Solo disponibles").

Un chip tiene un botón para eliminar el filtro individual. Al eliminarlo, los productos se recalculan inmediatamente.

Si no hay filtros activos, esta zona está oculta.

### Barra de filtros y ordenamiento

Debajo de los chips (o directamente de la lista si no hay chips), una barra con:

- Botón "Filtros" con icono de embudo.
- Botón "Ordenar" con icono de flechas.

### Modal de filtros

Al pulsar "Filtros", se abre un modal que cubre la pantalla desde abajo (como un bottom sheet). Contiene:

- Sección de precio: dos inputs numéricos etiquetados "Mín" y "Máx".
- Sección de tallas: chips de selección múltiple con todas las tallas disponibles.
- Sección de colores: chips de selección múltiple con los colores disponibles (cada chip muestra un círculo con el color y el nombre).
- Sección de disponibilidad: interruptor (switch) para "Solo disponibles".
- Botón "Aplicar" que cierra el modal y recalcula los productos.
- Botón "Limpiar" que resetea todos los filtros a sus valores por defecto sin cerrar el modal.

El modal permite modificar filtros antes de aplicarlos. Los filtros no se aplican hasta que el usuario pulsa "Aplicar" o cierra el modal (que descarta cambios).

### Modal de ordenamiento

Al pulsar "Ordenar", se abre un modal simple (bottom sheet) con las opciones de ordenamiento como una lista de RadioButton o similar. Al seleccionar una opción, se aplica inmediatamente y se cierra el modal.

### Contexto de navegación

Los filtros y el ordenamiento se aplican dentro del contexto de la pantalla actual. Si el usuario está en "Hombre → Camisetas", los filtros solo afectan a las camisetas de hombre. Al cambiar de categoría, los filtros se resetean a sus valores por defecto.

## Persistencia de filtros

Los filtros y el ordenamiento seleccionados se guardan en `AsyncStorage` para que persistan entre sesiones de la aplicación.

La estructura almacenada es:

```json
{
  "filters": {
    "genero": "hombre",
    "categoria": "camisetas",
    "precioMin": 0,
    "precioMax": 100,
    "tallas": [],
    "colores": [],
    "soloDisponibles": false,
    "sortBy": "default"
  }
}
```

Cuando el usuario navega a una pantalla de producto, se verifica si los filtros guardados corresponden a la misma combinación género + categoría. Si no, se usa el valor por defecto.

## Dependencias

- `@react-native-async-storage/async-storage` — persistencia local de filtros.

## Criterios de aceptación

- [ ] El modelo de producto acepta campos `tallas` y `colores`.
- [ ] Los productos de ejemplo tienen tallas y colores asignados.
- [ ] Los datos de tallas disponibles están centralizados en `src/data/sizes.js`.
- [ ] Los datos de colores disponibles están centralizados en `src/data/colors.js`.
- [ ] El filtro de precio permite especificar un rango y filtra correctamente.
- [ ] El filtro de tallas permite selección múltiple y filtra correctamente.
- [ ] El filtro de colores permite selección múltiple y filtra correctamente.
- [ ] El filtro de disponibilidad oculta productos no disponibles cuando está activo.
- [ ] Los filtros se combinan correctamente (lógica AND).
- [ ] Las opciones de ordenamiento funcionan correctamente.
- [ ] Los chips de filtros activos se muestran y permiten eliminar filtros individuales.
- [ ] El modal de filtros permite modificar filtros antes de aplicar.
- [ ] El modal de ordenamiento permite seleccionar y aplicar una opción.
- [ ] Los filtros persisten en `AsyncStorage` entre sesiones.
- [ ] Los filtros se resetean al cambiar de categoría.
- [ ] La UI utiliza los tokens de `src/theme/`.
- [ ] La aplicación inicia correctamente después de la implementación.
- [ ] No se introducen dependencias externas innecesarias.
