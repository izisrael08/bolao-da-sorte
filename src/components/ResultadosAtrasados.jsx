import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/resultados.css';

export default function ResultadosAtrasados() {
  const [resultados, setResultados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarResultados = async () => {
      try {
        const response = await api.get('/api/resultados');
        if (response.data.success) {
          setResultados(response.data.data);
        }
      } catch (err) {
        setError('Erro ao carregar resultados');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    carregarResultados();
  }, []);

  if (isLoading) {
    return (
      <motion.section 
        className="resultados-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando resultados...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        className="resultados-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="error-message">
          <p>{error}</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="resultados-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="resultados-header">
        <h1>Atrasados</h1>
        <p>Confira os mais atrasados</p>
      </div>

      <div className="resultados-content">
        {resultados.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum resultado disponível no momento</p>
          </div>
        ) : (
          <div className="resultados-grid">
            {resultados.map((resultado) => (
              <motion.div 
                key={resultado._id}
                className="resultado-card"
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-header">
                  <span className="data">{resultado.data}</span>
                  <span className="numero">{resultado.numeros[0]}</span>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <span className="label">Animal:</span>
                    <span className="value">{resultado.numeros[1]}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Prêmio:</span>
                    <span className="value highlight">{resultado.numeros[2]}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}