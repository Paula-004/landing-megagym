import { whatsappUrl } from '../config/contact.js';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#inicio" aria-label="MegaGym inicio">
            <span className="brand-mark">M</span>
            <span>MegaGym</span>
          </a>
          <p>Clavarino 876</p>
        </div>
        <div>
          <h2>Horarios</h2>
          <p>Lunes a Viernes 06:00 a 23:30 hs</p>
          <p>Sábados 08:00 a 15:00 hs</p>
        </div>
        <div>
          <h2>Redes</h2>
          <div className="social-links" aria-label="Redes sociales">
            <a href="#" aria-label="Instagram de MegaGym">Instagram</a>
            <a href="#" aria-label="Facebook de MegaGym">Facebook</a>
            <a href={whatsappUrl} aria-label="WhatsApp de MegaGym">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
