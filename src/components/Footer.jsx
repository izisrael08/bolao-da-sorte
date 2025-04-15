import '../styles/footer.css';
import { FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="https://wa.me/SEUNUMERO" className="footer-link" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="https://instagram.com/SEUPERFIL" className="footer-link" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://youtube.com/SEUCANAL" className="footer-link" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
      <p>© {new Date().getFullYear()} Bolão da Sorte - Todos os direitos reservados</p>
    </footer>
  );
}