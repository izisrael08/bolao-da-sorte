import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PalpitesSemana from './components/PalpitesSemana';
import ResultadosAtrasados from './components/ResultadosAtrasados';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <motion.div initial="hidden" animate="show">
      <Header />
      <Hero />
      <Features />
      <PalpitesSemana />
      <ResultadosAtrasados />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default App;