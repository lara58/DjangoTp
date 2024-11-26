import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    min_price: '',
    max_price: '',
    category: '', // Ajout du filtre de catégorie
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProducts = () => {
    const query = new URLSearchParams(filters).toString();
    axios
      .get(`http://127.0.0.1:8000/api/products/?${query}`)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setError('Impossible de charger les produits.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]); // Applique les filtres immédiatement lorsque l'un d'eux change

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', background: '#0a0a0a' }}>
      {/* Formulaire de filtres */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          name="keyword"
          placeholder="Rechercher par mot-clé"
          value={filters.keyword}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '2px solid #39ff14',
            borderRadius: '10px',
            backgroundColor: '#1a1a1a',
            color: '#39ff14',
            fontSize: '16px',
          }}
        />
        <input
          type="number"
          name="min_price"
          placeholder="Prix min"
          value={filters.min_price}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '2px solid #39ff14',
            borderRadius: '10px',
            backgroundColor: '#1a1a1a',
            color: '#39ff14',
            fontSize: '16px',
          }}
        />
        <input
          type="number"
          name="max_price"
          placeholder="Prix max"
          value={filters.max_price}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '2px solid #39ff14',
            borderRadius: '10px',
            backgroundColor: '#1a1a1a',
            color: '#39ff14',
            fontSize: '16px',
          }}
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '2px solid #39ff14',
            borderRadius: '10px',
            backgroundColor: '#1a1a1a',
            color: '#39ff14',
            fontSize: '16px',
          }}
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="Electronics">Électronique</option>
          <option value="Laptops">Laptops</option>
          <option value="Arts">Arts</option>
          <option value="Food">Alimentation</option>
          <option value="Home">Maison</option>
          <option value="Kitchen">Cuisine</option>
        </select>
        <button
          onClick={fetchProducts}
          style={{
            padding: '10px 20px',
            backgroundColor: '#39ff14',
            border: 'none',
            borderRadius: '10px',
            color: 'black',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Filtrer
        </button>
      </div>

      {/* Liste des produits */}
      {products.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 255, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <h3 style={{ color: '#39ff14' }}>{product.name}</h3>
              {product.image && (
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.3)',
                  }}
                />
              )}
              <p style={{ color: '#fff' }}>{product.description}</p>
              <p style={{ color: '#39ff14' }}>Prix : {product.price} €</p>
              <Link
                to={`/product/${product.id}`}
                style={{
                  color: '#39ff14',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  marginTop: '10px',
                }}
              >
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Bouton de retour à l'accueil */}
      <Link to="/">
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#39ff14',
            color: 'black',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '20px',
          }}
        >
          Retour à l'accueil
        </button>
      </Link>
    </div>
  );
};

export default ProductList;

