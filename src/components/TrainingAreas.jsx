import {
  IconDumbbell,
  IconFlame,
  IconPulse,
  IconTarget,
  IconUsers,
} from './ui/Icons.jsx';

const areas = [
  {
    icon: <IconPulse />,
    title: 'Funcional',
    text: 'Entrenamientos dinámicos para mejorar fuerza, resistencia, movilidad y rendimiento general.',
  },
  {
    icon: <IconTarget />,
    title: 'Calistenia',
    text: 'Trabajo con peso corporal para desarrollar control, técnica, estabilidad y fuerza real.',
  },
  {
    icon: <IconFlame />,
    title: 'CrossFit',
    text: 'Clases intensas y progresivas con movimientos variados, potencia y acondicionamiento físico.',
  },
  {
    icon: <IconDumbbell />,
    title: 'Musculación',
    text: 'Equipamiento de calidad y rutinas orientadas a ganar fuerza, masa muscular y confianza.',
  },
  {
    icon: <IconUsers />,
    title: 'Asesoramiento continuo',
    text: 'Profesionales acompañando tu proceso para entrenar con técnica, seguridad y objetivos claros.',
  },
];

export function TrainingAreas() {
  return (
    <section id="actividades" className="section">
      <div className="container" data-reveal>
        <div className="section-heading">
          <p className="eyebrow dark">Qué hacemos</p>
          <h2>Entrenamientos pensados para avanzar con constancia.</h2>
          <p className="section-lead">
            En MegaGym combinamos clases, sala de musculación y seguimiento
            profesional para que cada persona entrene de acuerdo a su nivel, su
            ritmo y sus objetivos.
          </p>
        </div>

        <div className="areas-grid">
          {areas.map((area) => (
            <article className="area-card" key={area.title}>
              <div className="icon-wrap small" aria-hidden="true">
                {area.icon}
              </div>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
