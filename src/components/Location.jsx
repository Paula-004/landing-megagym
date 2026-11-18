import { Button } from './ui/Button.jsx';
import { IconMapPin } from './ui/Icons.jsx';

export function Location() {
  return (
    <section id="ubicacion" className="section section-dark">
      <div className="container location-panel" data-reveal>
        <div className="location-copy">
          <p className="eyebrow">Ubicación</p>
          <h2>Encontranos</h2>
          <p className="address">
            <IconMapPin />
            <span>Clavarino 876</span>
          </p>
        </div>
        <Button href="#" variant="light" ariaLabel="Cómo llegar a MegaGym">
          Cómo llegar
        </Button>
      </div>
    </section>
  );
}
