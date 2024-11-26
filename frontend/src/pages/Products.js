import React from 'react';
import ProductList from '../components/ProductList';

const Products = () => {
  return (
    <div style={{ padding: '20px', background: 'black', color: '#39ff14' }}>
      <h1 style={{ color: '#ffff00' }}>Catalogue de Produits</h1>
      <ProductList />
    </div>
  );
};

export default Products;
