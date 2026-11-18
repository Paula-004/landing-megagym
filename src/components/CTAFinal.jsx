import { useState } from 'react';
import { buildWhatsAppUrl } from '../config/contact.js';

export function CTAFinal() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    goal: '',
    schedule: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const message = [
      'Hola MegaGym, quiero anotarme/hacerme socio.',
      `Nombre: ${form.name}`,
      `Telefono: ${form.phone}`,
      `Objetivo: ${form.goal || 'A definir'}`,
      `Horario preferido: ${form.schedule || 'A coordinar'}`,
    ].join('\n');

    window.location.href = buildWhatsAppUrl(message);
  }

  return (
    <section id="asociarme" className="section cta-section">
      <div className="container cta-panel" data-reveal>
        <div className="cta-copy">
          <p className="eyebrow dark">MegaGym</p>
          <h2>Tu entrenamiento empieza hoy.</h2>
          <p>
            Dejanos tus datos y se abre WhatsApp con el mensaje listo para
            enviarlo al gimnasio.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Nombre y apellido
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Juan Perez"
              required
            />
          </label>

          <label>
            Telefono
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Ej: 3446 123456"
              required
            />
          </label>

          <label>
            Objetivo
            <select name="goal" value={form.goal} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Bajar de peso">Bajar de peso</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
              <option value="Mejorar rendimiento">Mejorar rendimiento</option>
              <option value="Entrenar por salud">Entrenar por salud</option>
            </select>
          </label>

          <label>
            Horario preferido
            <select name="schedule" value={form.schedule} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Manana">Manana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
          </label>

          <button className="button button-primary button-large" type="submit">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
