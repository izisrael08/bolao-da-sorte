import { motion } from "framer-motion";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import img01 from "../assets/img01.jpg";
import img02 from "../assets/img02.jpg";
import img03 from "../assets/img03.jpg";

const slides = [
  {
    image: img01,
    title: "Bolão da Sorte",
    description: "Participe do melhor bolão da região e concorra a prêmios incríveis!",
  },
  {
    image: img02,
    title: "Palpites Semanais",
    description: "Receba os melhores palpites do Gerente Edilson toda semana!",
  },
  {
    image: img03,
    title: "Resultados Atualizados",
    description: "Confira os resultados atrasados do Jogo do Bicho em nosso site",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Carrossel de imagens */}
      <div className="carrossel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carrossel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Overlay escuro fixo para melhor contraste */}
      <div className="carrossel-overlay" />

      {/* Conteúdo sobreposto - agora com container específico */}
      <div className="hero-content-container">
        <div className="hero-content">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {slides[currentSlide].description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <a
              href="https://wa.me/SEUNUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp /> Entrar no Grupo
            </a>
            <a
              href="https://www.youtube.com/@BOLAODASORTE-me1he"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-btn"
            >
              <FaYoutube /> Nosso Canal
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicadores do carrossel */}
      <div className="carrossel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}