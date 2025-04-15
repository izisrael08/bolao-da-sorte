import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import '../styles/header.css';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Bolão da Sorte</h1>
        <p>Os melhores palpites do Jogo do Bicho!</p>
      </div>

      <button
        className="menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`nav-list ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link
              to="home"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Início
            </Link>
          </li>

          <li>
            <Link
              to="como-participar"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Como Participar
            </Link>
          </li>

          <li>
            <Link
              to="features"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Como Funciona
            </Link>
          </li>
          <li>
            <Link
              to="palpites"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Palpites
            </Link>
          </li>
          <li>
            <Link
              to="resultados"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Resultados
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              onClick={handleLinkClick}
            >
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}