# 007 · Categorías y filtros — Plan de implementación

*Arquitectura técnica y orden de trabajo para la feature.*

## 1. Dependencias

Instalar `@react-native-async-storage/async-storage` usando `npx expo install` para garantizar la versión compatible con Expo SDK 54.

```bash
npx expo install @react-native-async-storage/async-storage
```

## 2. Modelo de datos

### `src/data/sizes.js`

Lista centralizada de tallas. Define las tallas que pueden asignarse a productos.

```js
export const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
```

### `src/data/colors.js`

Lista centralizada de colores. Define los colores disponibles con su nombre y código hexadecimal.

```js
export const availableColors = [
  { nombre: 'Negro', codigo: '#000000' },
  { nombre: 'Blanco', codigo: '#FFFFFF' },
  { nombre: 'Gris', codigo: '#808080' },
  { nombre: 'Beige', codigo: '#D4B896' },
  { nombre: 'Azul Denim', codigo: '#4A6FA5' },
  { nombre: 'Crema', codigo: '#F5E6D3' },
  { nombre: 'Taupe', codigo: '#B5A395' },
  { nombre: 'Lila', codigo: '#C8A2C8' },
  { nombre: 'Rosa', codigo: '#E0BFB8' },
  { nombre: 'Desierto', codigo: '#C9A875' },
];
```

### Modificar `src/data/products.js`

Agregar `tallas` y `colores` a cada producto. Las tallas y colores deben coincidir con los valores definidos en `src/data/sizes.js` y `src/data/colors.js`.

Para los colores, se reutilizan los códigos hexadecimales ya presentes en el nombre del producto. Por ejemplo, "Polo Salvator Rosa" tiene color rosa con código `#E0BFB8`.

## 3. Lógica de filtrado y ordenamiento

### `src/data/filters.js`

Funciones puras que reciben la lista de productos y los filtros aplicados, y devuelven la lista filtrada y ordenada.

```js
export function applyFilters(products, filters) {
  // 1. Filtrar por rango de precio
  // 2. Filtrar por tallas (si hay tallas seleccionadas)
  // 3. Filtrar por colores (si hay colores seleccionados)
  // 4. Filtrar por disponibilidad
  // 5. Aplicar ordenamiento
  return filteredAndSortedProducts;
}
```

Esta función es pura y testeable. No accede a AsyncStorage ni a React Context.

## 4. Estado global de filtros

### `src/context/FilterContext.js`

Contexto que mantiene el estado de los filtros y el ordenamiento. Provee:

- `filters`: objeto con los valores actuales de los filtros para una combinación género + categoría.
- `updateFilters(newFilters)`: actualiza los filtros.
- `resetFilters()`: resetea los filtros a sus valores por defecto.
- `updateSort(sortBy)`: actualiza el ordenamiento.
- `getCurrentFilters(genero, categoria)`: obtiene los filtros para una combinación específica, o los valores por defecto si no existen.

El contexto se inicializa vacío y se carga desde AsyncStorage al montar.

### `src/hooks/useFilterPersistence.js`

Hook que sincroniza el contexto de filtros con AsyncStorage. Al montar, carga los filtros guardados. Cuando cambian los filtros, los guarda.

Usa una clave en AsyncStorage como `@clothestore/filters`.

## 5. Componentes de UI

### `src/components/FilterChip.js`

Chip que muestra un filtro activo. Props:

- `label`: texto del filtro (ej. "Talla: M, L").
- `onRemove`: callback al pulsar el botón de eliminar.

### `src/components/FilterBar.js`

Barra con los botones "Filtros" y "Ordenar". Props:

- `onPressFilters`: callback al pulsar "Filtros".
- `onPressSort`: callback al pulsar "Ordenar".
- `activeFiltersCount`: número de filtros activos (se muestra como badge en el botón "Filtros").

### `src/components/FilterModal.js`

Modal de filtros (bottom sheet). Props:

- `visible`: boolean que controla la visibilidad.
- `initialFilters`: filtros actuales.
- `onApply(filters)`: callback al aplicar filtros.
- `onClose`: callback al cerrar el modal sin aplicar.

El modal contiene:
- Inputs de precio mínimo y máximo.
- Chips de tallas (selección múltiple).
- Chips de colores (selección múltiple, cada chip muestra un círculo con el color y el nombre).
- Switch de "Solo disponibles".
- Botones "Aplicar" y "Limpiar".

El modal mantiene un estado interno de los filtros modificados. Solo al pulsar "Aplicar" o cerrar se notifica al componente padre.

### `src/components/SortModal.js`

Modal de ordenamiento (bottom sheet). Props:

- `visible`: boolean que controla la visibilidad.
- `currentSort`: opción de ordenamiento actual.
- `onSelect(sortBy)`: callback al seleccionar una opción.

El modal muestra las opciones de ordenamiento como una lista. Al seleccionar, llama a `onSelect` y se cierra.

## 6. Integración con la pantalla existente

### Modificar `src/screens/ProductListScreen.js`

La pantalla actual muestra la lista de productos. Se modifica para:

1. Obtener los filtros y el ordenamiento del contexto.
2. Aplicar los filtros a la lista de productos antes de renderizar.
3. Mostrar los chips de filtros activos encima de la lista.
4. Mostrar la `FilterBar` entre los chips y la lista.
5. Gestionar el estado de visibilidad de los modales.
6. Renderizar `FilterModal` y `SortModal` al final del árbol de componentes.

## 7. Navegación

No se requieren rutas nuevas. Los modales se manejan como componentes superpuestos en `ProductListScreen`.

## 8. Orden de implementación

1. Instalar `@react-native-async-storage/async-storage`.
2. Crear `src/data/sizes.js` y `src/data/colors.js`.
3. Modificar `src/data/products.js` para incluir tallas y colores.
4. Crear `src/data/filters.js` con la lógica de filtrado y ordenamiento.
5. Crear `src/context/FilterContext.js` con el contexto de filtros.
6. Crear `src/hooks/useFilterPersistence.js` para sincronizar con AsyncStorage.
7. Integrar el `FilterProvider` en el árbol de componentes (probablemente en `App.js` o en el navegador).
8. Crear `src/components/FilterChip.js`.
9. Crear `src/components/FilterBar.js`.
10. Crear `src/components/FilterModal.js`.
11. Crear `src/components/SortModal.js`.
12. Modificar `src/screens/ProductListScreen.js` para integrar todo.
13. Validar visualmente y contra los criterios de aceptación.
14. Actualizar la documentación y el roadmap.

## 9. Decisiones técnicas

- **Bottom sheet vs modal nativo:** se usa `Modal` de React Native con animación slide desde abajo, que es compatible con Expo SDK 54 sin dependencias adicionales.
- **Persistencia por género + categoría:** los filtros se guardan por combinación de género y categoría, para que el usuario pueda tener filtros diferentes en "Hombre → Camisetas" y "Mujer → Vestidos".
- **Reset al cambiar de categoría:** cuando el usuario navega a una nueva categoría, los filtros se resetean a sus valores por defecto para esa categoría.
