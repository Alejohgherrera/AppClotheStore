# 016 · Carrito

**Estado:** en curso — remediación local de un prototipo implementado antes de su especificación

## Qué hace

La feature permite abrir el carrito, agregar productos disponibles, modificar cantidades, eliminar líneas, vaciar el carrito y consultar el total local antes del checkout.

Las líneas se persisten en AsyncStorage y se revalidan al hidratarse contra el catálogo canónico. El checkout, los pagos y la reserva definitiva de stock siguen fuera de alcance.

## Estado del prototipo

El commit `24f4ca2` incorporó antes de esta especificación:

- `CartContext` con alta, fusión, eliminación, cantidades, total y contador;
- persistencia local bajo `@clothestore/cart`;
- una pantalla de carrito;
- una ruta de navegación registrada;
- integración desde el detalle de producto.

La pantalla era inaccesible porque el icono del header no era pulsable. El prototipo tampoco bloqueaba productos agotados, no controlaba la hidratación, aceptaba cantidades inválidas y persistía copias locales potencialmente obsoletas del producto.

## Por qué

El carrito es el estado intermedio entre descubrir un producto y completar una compra. Debe ser predecible, persistente y coherente con la disponibilidad actual del catálogo sin simular todavía un checkout o inventario remoto.

## Criterios de aceptación

- [ ] El carrito puede abrirse desde los headers aplicables.
- [ ] El botón de cabecera expone etiqueta accesible y badge actualizado.
- [ ] La pantalla muestra un estado de carga hasta completar la hidratación.
- [ ] Solo se pueden agregar productos disponibles con talla y color válidos.
- [ ] La misma combinación de producto, talla y color fusiona cantidades.
- [ ] Las cantidades son enteros positivos.
- [ ] La cantidad mínima visible es uno y disminuir en uno no elimina la línea.
- [ ] La eliminación requiere una acción explícita.
- [ ] El usuario puede vaciar el carrito.
- [ ] La persistencia conserva las claves actuales y migra snapshots antiguos al catálogo canónico.
- [ ] Los datos locales inválidos se descartan de forma segura al hidratar.
- [ ] `count` y `total` se calculan exclusivamente desde líneas válidas.
- [ ] El checkout permanece deshabilitado hasta implementar la Feature 018.
- [ ] Los controles de cantidad, eliminación y vaciado son accesibles.
- [ ] La aplicación compila para Android e iOS con Expo SDK 54.
- [ ] Los criterios críticos cuentan con pruebas automatizadas.
- [ ] La implementación no introduce dependencias de runtime innecesarias.

## Fuera de alcance

- El stock por variante y la reserva definitiva de stock corresponden a las Features 010 y 011–015.
- Checkout, dirección, envío, pagos y creación de pedidos pertenecen a las Features 018 y 023–026.
- Sincronización entre dispositivos, autenticación y cupones quedan fuera del prototipo local.
- Favoritos pertenecen a la Feature 017.
