import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaYoutube } from 'react-icons/fa';
import api from '../api/api'; // importa seu axios configurado
import'../styles/contact.css';

export default function Contact() {
  const [contato, setContato] = useState(null);

  useEffect(() => {
    api.get('/api/contatos')
      .then(response => {
        if (response.data.success) {
          setContato(response.data.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar contato:', error);
      });
  }, []);

  return (
    <section id="contact" className="contact-section">
      <h2>Entre em Contato</h2>
      <div className="contact-buttons">
        <a
          href={contato ? `https://wa.me/55${contato.whatsapp.replace(/\D/g, '')}` : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <a
          href={contato ? contato.youtube : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-btn"
        >
          <FaYoutube /> YouTube
        </a>
      </div>
    </section>
  );
}
