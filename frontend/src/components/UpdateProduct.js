import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    if (product.image) formData.append('image', product.image);

    axios
      .put(`http://127.0.0.1:8000/api/products/${id}/update/`, formData)
      .then((response) => {
        navigate(`/product/${id}`);
      })
      .catch((err) => {
        console.error('Erreur:', err);
        setError('Impossible de mettre à jour le produit.');
      });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mettre à jour un produit</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={product.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description du produit"
          value={product.description}
          onChange={handleInputChange}
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={product.price}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="category"
          value={product.category}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="Electronics">Électronique</option>
          <option value="Laptops">Laptops</option>
          <option value="Arts">Arts</option>
          <option value="Food">Alimentation</option>
          <option value="Home">Maison</option>
          <option value="Kitchen">Cuisine</option>
        </select>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Mettre à jour le produit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#0a0a0a',
    color: '#39ff14',
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
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '2px solid #39ff14',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: '#39ff14',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    border: '2px solid #39ff14',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: '#39ff14',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
    height: '100px',
  },
  select: {
    padding: '10px',
    border: '2px solid #39ff14',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: '#39ff14',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  button: {
    backgroundColor: '#39ff14',
    color: 'black',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.3)',
  },
};

export default UpdateProduct;
