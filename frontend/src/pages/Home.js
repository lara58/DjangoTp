import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        padding: '50px',
        background: 'linear-gradient(135deg, #0f0f0f 30%, #2a2a2a 100%)',
        color: '#39ff14',
        textAlign: 'center',
        fontFamily: '"Arial", sans-serif',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#ffff00', fontSize: '3rem', textShadow: '0 0 10px #ffff00' }}>
        Bienvenue sur notre catalogue de produits !
      </h1>
      <p style={{ color: '#39ff14', fontSize: '1.5rem', marginBottom: '30px' }}>
        Découvrez nos produits et profitez des meilleures offres.
      </p>

      {/* Ajout du lien vers la page catalogue */}
      <Link to="/products">
        <button
          style={{
            backgroundColor: '#39ff14',
            color: 'black',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '10px',
            fontWeight: 'bold',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.8)',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#a020f0'; // Purple on hover
            e.target.style.boxShadow = '0 0 30px rgba(160, 32, 240, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#39ff14'; // Neon Green default
            e.target.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.8)';
          }}
        >
          Accéder au catalogue
        </button>
      </Link>
    </div>
  );
};

export default Home;
