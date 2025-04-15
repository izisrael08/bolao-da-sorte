import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PalpitesSemana from './components/PalpitesSemana';
import ResultadosAtrasados from './components/ResultadosAtrasados';
import Contact from './components/Contact';
import Footer from './components/Footer';
import api from './api/api';
import './styles/global.css';
import ComoParticipar from './components/ComoParticipar';


function App() {
  useEffect(() => {
    // Verifica autenticação ao carregar
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <motion.div initial="hidden" animate="show">
       <Header />
      <Hero />
      <ComoParticipar/>
      <Features />
      <PalpitesSemana />
      <ResultadosAtrasados />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default App;