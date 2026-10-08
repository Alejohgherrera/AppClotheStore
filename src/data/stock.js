// Datos de inventario de ClotheStore.
//
// ATENCIÓN: este archivo contiene datos de DESARROLLO. Las cantidades son
// ficticias y no representan existencias reales. La Feature 011 sustituirá
// esta fuente por el backend.
//
// La disponibilidad de un producto se deriva de la suma de sus variantes,
// por lo que un producto con `disponible: false` en el catálogo no necesita
// entradas aquí: ya queda bloqueado antes de consultar el inventario.
//
// La estructura se indexa por producto, talla y color:
//
//   'producto-id': {
//     S: { Negro: 12, Blanco: 0 },
//   },
//
// Los productos marcados con "AGOTADO" están incluidos para que las
// funciones puras devuelvan cero y el resto del catálogo tenga cobertura.

export const stock = {
  // HOMBRE — Boxers
  'boxer-catterick-negro': {
    S: { Negro: 14 },
    M: { Negro: 22 },
    L: { Negro: 9 },
    XL: { Negro: 0 },
  },
  // El blanco solo queda en S. Por eso el color sigue siendo seleccionable
// pero las combinaciones M/Negro, M/Blanco, etc. en blanco son inválidas.
  'pack-boxers-catterick-bn': {
    S: { Negro: 6, Blanco: 4 },
    M: { Negro: 18, Blanco: 0 },
    L: { Negro: 7, Blanco: 0 },
    XL: { Negro: 2, Blanco: 0 },
  },
  'boxer-catterick-blanco': {
    S: { Blanco: 0 },
    M: { Blanco: 0 },
    L: { Blanco: 0 },
    XL: { Blanco: 0 },
  },

  // HOMBRE — Gorras
  'gorra-aksha-negra': {
    S: { Negro: 30 },
    M: { Negro: 25 },
    L: { Negro: 0 },
  },
  'gorra-miles-negra': {
    S: { Negro: 17 },
    M: { Negro: 0 },
    L: { Negro: 12 },
  },
  'gorra-vitalis-negra': {
    S: { Negro: 0 },
    M: { Negro: 0 },
    L: { Negro: 0 },
  },
  'gorra-xanthus-blanca': {
    S: { Blanco: 21 },
    M: { Blanco: 14 },
    L: { Blanco: 8 },
  },

  // HOMBRE — Camisetas oversize
  'camiseta-napbrand-beige': {
    S: { Beige: 10 },
    M: { Beige: 26 },
    L: { Beige: 15 },
    XL: { Beige: 4 },
  },
  'camiseta-napbrand-negra': {
    S: { Negro: 0 },
    M: { Negro: 19 },
    L: { Negro: 23 },
    XL: { Negro: 7 },
  },
  'camiseta-obsidian-gris': {
    S: { Gris: 13 },
    M: { Gris: 0 },
    L: { Gris: 17 },
    XL: { Gris: 6 },
  },

  // HOMBRE — Polos
  'polo-marcus-desert': {
    S: { Desierto: 9 },
    M: { Desierto: 16 },
    L: { Desierto: 11 },
    XL: { Desierto: 0 },
  },
  'polo-rexx-negro': {
    S: { Negro: 24 },
    M: { Negro: 0 },
    L: { Negro: 31 },
    XL: { Negro: 18 },
  },
  'polo-rexx-blanco': {
    S: { Blanco: 8 },
    M: { Blanco: 20 },
    L: { Blanco: 14 },
    XL: { Blanco: 3 },
  },
  'polo-salvator-negro': {
    S: { Negro: 19 },
    M: { Negro: 27 },
    L: { Negro: 0 },
    XL: { Negro: 12 },
  },
  // Descontinuado en el catálogo: disponible false, por lo que no hay stock.
  'polo-salvator-rosa': {
    S: { Rosa: 0 },
    M: { Rosa: 0 },
    L: { Rosa: 0 },
    XL: { Rosa: 0 },
  },
  'polo-salvator-blanco': {
    S: { Blanco: 15 },
    M: { Blanco: 22 },
    L: { Blanco: 9 },
    XL: { Blanco: 0 },
  },

  // MUJER — Corsets
  'corset-adwoa-negro': {
    XS: { Negro: 9 },
    S: { Negro: 12 },
    M: { Negro: 18 },
    L: { Negro: 7 },
  },
  'corset-tabita-negro': {
    XS: { Negro: 0 },
    S: { Negro: 20 },
    M: { Negro: 0 },
    L: { Negro: 14 },
  },
  'corset-tabita-blanco': {
    XS: { Blanco: 6 },
    S: { Blanco: 0 },
    M: { Blanco: 16 },
    L: { Blanco: 10 },
  },

  // MUJER — Jeans
  'jean-aliyah-denim': {
    XS: { 'Azul Denim': 5 },
    S: { 'Azul Denim': 17 },
    M: { 'Azul Denim': 23 },
    L: { 'Azul Denim': 12 },
  },
  'jean-collins-denim': {
    XS: { 'Azul Denim': 0 },
    S: { 'Azul Denim': 9 },
    M: { 'Azul Denim': 0 },
    L: { 'Azul Denim': 19 },
  },
  'jean-romy-denim': {
    XS: { 'Azul Denim': 11 },
    S: { 'Azul Denim': 26 },
    M: { 'Azul Denim': 15 },
    L: { 'Azul Denim': 0 },
  },
  'jean-scarlett-denim': {
    XS: { 'Azul Denim': 4 },
    S: { 'Azul Denim': 11 },
    M: { 'Azul Denim': 28 },
    L: { 'Azul Denim': 13 },
  },
  'jean-visus-negro': {
    XS: { Negro: 8 },
    S: { Negro: 21 },
    M: { Negro: 17 },
    L: { Negro: 0 },
  },

  // MUJER — Vestidos
  'vestido-blom-blanco': {
    XS: { Blanco: 3 },
    S: { Blanco: 14 },
    M: { Blanco: 19 },
    L: { Blanco: 0 },
  },
  'vestido-dinasty-negro': {
    XS: { Negro: 7 },
    S: { Negro: 18 },
    M: { Negro: 25 },
    L: { Negro: 16 },
  },
  'vestido-dinasty-lila': {
    XS: { Lila: 0 },
    S: { Lila: 7 },
    M: { Lila: 13 },
    L: { Lila: 0 },
  },
  'vestido-kesmez-taupe': {
    XS: { Taupe: 6 },
    S: { Taupe: 10 },
    M: { Taupe: 22 },
    L: { Taupe: 11 },
  },
  'vestido-opal-negro': {
    XS: { Negro: 0 },
    S: { Negro: 5 },
    M: { Negro: 17 },
    L: { Negro: 20 },
  },
  'vestido-vico-negro': {
    XS: { Negro: 9 },
    S: { Negro: 16 },
    M: { Negro: 0 },
    L: { Negro: 24 },
  },
  'vestido-vodianova-crema': {
    XS: { Crema: 5 },
    S: { Crema: 12 },
    M: { Crema: 0 },
    L: { Crema: 15 },
  },
};