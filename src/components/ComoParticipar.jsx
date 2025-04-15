import React from 'react';
import { FaUserPlus, FaMobileAlt, FaTrophy } from 'react-icons/fa';
import '../styles/comoparticipar.css'; // Criaremos este arquivo

export default function ComoParticipar() {
  return (
    <section id="como-participar" className="como-participar-section">
      <h2>Como Participar</h2>
      <div className="passos-container">
        <div className="passo-card">
          <FaUserPlus className="passo-icon" />
          <h3>1. Cadastre-se</h3>
          <p>Registre-se gratuitamente na plataforma.</p>
        </div>
        
        <div className="passo-card">
          <FaMobileAlt className="passo-icon" />
          <h3>2. Receba Palpites</h3>
          <p>Ative as notificações para não perder nenhum palpite.</p>
        </div>
        
        <div className="passo-card">
          <FaTrophy className="passo-icon" />
          <h3>3. Ganhe!</h3>
          <p>Aposte nos números sugeridos e torça pela sorte.</p>
        </div>
      </div>
    </section>
  );
}