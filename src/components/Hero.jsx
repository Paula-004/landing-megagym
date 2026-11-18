import { Button } from './ui/Button.jsx';
import { whatsappUrl } from '../config/contact.js';

export function Hero() {
  return (
    <header className="hero">
      <nav className="nav" aria-label="Principal">
        <a className="brand" href="#inicio" aria-label="MegaGym inicio">
          <span className="brand-mark">M</span>
          <span>MegaGym</span>
        </a>
        <div className="nav-links">
          <a href="#nosotros">Nosotros</a>
          <a href="#actividades">Actividades</a>
          <a href="#asociarme">Asociarme</a>
          <a href="#rutinas">Rutinas</a>
          <a href="#backoffice">Backoffice</a>
          <a href="#horarios">Horarios</a>
          <a href="#ubicacion">Ubicación</a>
          <a href="#megarun">MegaRun</a>
        </div>
      </nav>

      <section id="inicio" className="hero-content" data-reveal>
        <p className="eyebrow">Clavarino 876</p>
        <h1>Somos MegaGym</h1>
        <p className="hero-subtitle">
          Sabemos lo que hacemos. Entrená con profesionales, superá tus límites
          y alcanzá tu mejor versión.
        </p>
        <Button href={whatsappUrl}>Comenzá hoy</Button>
      </section>
    </header>
  );
}
