import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
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

        {/* Route vers le formulaire d'ajout de produit */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id/update" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
