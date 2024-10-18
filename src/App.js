import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=space&client_id=${API_KEY}`
        );
        const imageUrls = response.data.results.map((image) => image.urls.full);
        setImages(imageUrls);
        setBackgroundImage(imageUrls[0]); 
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, []);

  const changeBackgroundImage = () => {
    
    const randomIndex = Math.floor(Math.random() * images.length);
    setBackgroundImage(images[randomIndex]);
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '3rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        position: 'relative', 
      }}
    >
      <div>
        Site coming soon
      </div>
      <button 
        onClick={changeBackgroundImage}
        style={{
          position: 'absolute', 
          bottom: '20px', 
          padding: '10px 20px',
          fontSize: '1.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Trocar Imagem
      </button>
    </div>
  );
}

export default App;
