import { IconCalendar, IconClock } from './ui/Icons.jsx';

const schedules = [
  {
    icon: <IconCalendar />,
    title: 'Lunes a Viernes',
    time: '06:00 a 23:30 hs',
  },
  {
    icon: <IconClock />,
    title: 'Sábados',
    time: '08:00 a 15:00 hs',
  },
];

export function Hours() {
  return (
    <section id="horarios" className="section">
      <div className="container" data-reveal>
        <div className="section-heading">
          <p className="eyebrow dark">Horarios</p>
          <h2>Abierto para que entrenes cuando tu día lo permite.</h2>
        </div>
        <div className="cards-grid">
          {schedules.map((schedule) => (
            <article className="schedule-card" key={schedule.title}>
              <div className="icon-wrap" aria-hidden="true">
                {schedule.icon}
              </div>
              <h3>{schedule.title}</h3>
              <p>{schedule.time}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
