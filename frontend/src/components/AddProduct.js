import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer un objet FormData pour envoyer des fichiers
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    axios
      .post('http://127.0.0.1:8000/api/products/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // nécessaire pour envoyer des fichiers
        },
      })
      .then((response) => {
        navigate('/products'); // Redirige vers la liste des produits après l'ajout
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        setError('Impossible d\'ajouter le produit.');
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ajouter un Produit</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
          required
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
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          Ajouter le produit
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
    maxWidth: '600px',
    margin: '50px auto',
  },
  title: {
    color: '#ffff00',
    fontSize: '2.5rem',
    textShadow: '0 0 10px #ffff00',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    border: '2px solid #39ff14',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: '#39ff14',
    fontSize: '16px',
    width: '80%',
  },
  textarea: {
    padding: '10px',
    border: '2px solid #39ff14',
    borderRadius: '10px',
    backgroundColor: '#1a1a1a',
    color: '#39ff14',
    fontSize: '16px',
    width: '80%',
    height: '100px',
  },
  submitButton: {
    backgroundColor: '#39ff14',
    color: 'black',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.5)',
  },
};

export default AddProduct;
