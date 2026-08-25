import { products } from './products';

export const genders = [
  { id: 'hombre', nombre: 'Hombre' },
  { id: 'mujer', nombre: 'Mujer' },
];

export const categoriesByGender = {
  hombre: [
    {
      id: 'boxers',
      nombre: 'Boxers',
      imagen: require('../../assets/products/Hombre/boxer/catterick-boxer-men-black-8195775.webp'),
    },
    {
      id: 'gorras',
      nombre: 'Gorras',
      imagen: require('../../assets/products/Hombre/gorras/aksha-cap-unisex-black-7289320.webp'),
    },
    {
      id: 'camisetas',
      nombre: 'Camisetas',
      imagen: require('../../assets/products/Hombre/oversided/napbrand-t-shirt-oversized-men-beige-1233581.webp'),
    },
    {
      id: 'polos',
      nombre: 'Polos',
      imagen: require('../../assets/products/Hombre/polos/rexx-polo-men-black-3672128.webp'),
    },
  ],
  mujer: [
    {
      id: 'corsets',
      nombre: 'Corsets',
      imagen: require('../../assets/products/Mujer/Corset/tabita-corset-women-black-9426480.webp'),
    },
    {
      id: 'jeans',
      nombre: 'Jeans',
      imagen: require('../../assets/products/Mujer/Jeans/collins-jeans-women-blue-denim-2571273.webp'),
    },
    {
      id: 'vestidos',
      nombre: 'Vestidos',
      imagen: require('../../assets/products/Mujer/Vestidos/dinasty-dress-women-black-6236277.webp'),
    },
  ],
};

export function getProductsByGenderAndCategory(genero, categoria) {
  return products.filter(
    (producto) =>
      producto.categoria === categoria &&
      (producto.genero === genero || producto.genero === 'Unisex'),
  );
}
