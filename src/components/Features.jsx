import React, { useEffect, useState } from 'react';
import api from '../api/api'; // sua instância do axios

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    api.get('/api/features') // troque pela rota correta da sua API
      .then(response => {
        if (response.data.success) {
          // Ordena se tiver a propriedade 'ordem'
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
      <h2>Como Participar</h2>
      <div className="features-grid">
        {features.map((item) => (
          <div className="feature-card" key={item._id}>
            <h3>{item.titulo}</h3>
            <p>{item.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
