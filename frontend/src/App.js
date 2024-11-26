import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div>
      <Routes>
        {/* Route vers la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Route vers la page principale des produits */}
        <Route path="/products" element={<Products />} />

        {/* Route vers les détails d'un produit spécifique */}
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;

