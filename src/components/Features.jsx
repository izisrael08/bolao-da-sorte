import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/features.css'; // Crie este arquivo para o CSS

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    api.get('/api/features')
      .then(response => {
        if (response.data.success) {
          const sorted = response.data.data.sort((a, b) => a.ordem - b.ordem);
          setFeatures(sorted);
        }
      })
      .catch(error => {
        console.error('Erro ao carregar features:', error);
      });
  }, []);

  return (
    <section id="features" className="features-section">
      <div className="features-wrapper">
        <h2>Como Participar</h2>
        <div className="features-grid">
          {features.map((item) => (
            <div className="feature-card" key={item._id}>
              <div className="feature-header">
                <span className="feature-order">{item.ordem}</span>
                <h3>{item.titulo}</h3>
              </div>
              <div className="feature-content">
                <p>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}