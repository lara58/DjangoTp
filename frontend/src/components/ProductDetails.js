import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour gérer la navigation

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur:', err);
        setError('Impossible de charger les détails du produit.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{product.name}</h1>
      {product.image && (
        <img
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
          style={styles.image}
        />
      )}
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>Prix : <strong>{product.price} €</strong></p>
      <p style={styles.category}>Catégorie : <strong>{product.category}</strong></p>

      {/* Bouton de retour */}
      <button
        onClick={() => navigate('/products')}
        style={styles.backButton}
      >
        Retour au catalogue
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#0a0a0a',  // Fond noir pour tout le conteneur
    color: '#39ff14',  // Texte en vert
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
    maxWidth: '800px',
    margin: '50px auto',
  },
  title: {
    color: '#ffff00',
    fontSize: '2.5rem',
    textShadow: '0 0 10px #ffff00',  // Ombre jaune
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.5)',  // Ombre verte sur l'image
    objectFit: 'cover',
  },
  description: {
    color: '#fff',
    fontSize: '1.1rem',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  price: {
    color: '#39ff14',
    fontSize: '1.3rem',
    marginBottom: '20px',
  },
  category: {
    color: '#39ff14',
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  backButton: {
    backgroundColor: '#a020f0',  // Violet pour le bouton de retour
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 6px rgba(160, 32, 240, 0.6)',  // Ombre violette
  },
};

export default ProductDetails;
