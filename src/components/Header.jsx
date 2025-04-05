import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controla o overflow do body quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpeza do efeito
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Fecha o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">Bolão da Sorte</div>

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
