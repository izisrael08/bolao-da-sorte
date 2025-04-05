import { FaWhatsapp, FaYoutube } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Entre em Contato</h2>
      <div className="contact-buttons">
        <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="https://youtube.com/SEUCANAL" target="_blank" rel="noopener noreferrer" className="youtube-btn">
          <FaYoutube /> YouTube
        </a>
      </div>
    </section>
  );
}