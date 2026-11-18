import { Button } from './ui/Button.jsx';

export function EventSection() {
  return (
    <section id="megarun" className="event-section">
      <div className="event-content" data-reveal>
        <p className="eyebrow">Evento</p>
        <h2>MegaRun - La Nocturna de Gualeguaychú</h2>
        <Button href="#megarun" variant="outline">
          Próximamente más información
        </Button>
      </div>
    </section>
  );
}
