import { useMemo, useState } from 'react';

export function RoutinePortal({ members }) {
  const [form, setForm] = useState({ memberNumber: '' });
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [error, setError] = useState('');
  const [view, setView] = useState('weekly');
  const currentMember = members.find((member) => member.id === currentMemberId);
  const currentMemberName = currentMember
    ? `${currentMember.firstName} ${currentMember.lastName}`.trim() || currentMember.name
    : '';

  const visiblePlan = useMemo(() => {
    if (!currentMember) {
      return [];
    }

    return view === 'weekly' ? currentMember.weeklyRoutine : currentMember.monthlyRoutine;
  }, [currentMember, view]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const member = members.find(
      (candidate) => candidate.memberNumber === form.memberNumber.trim(),
    );

    if (!member) {
      setError('No encontramos una rutina con ese numero de socio.');
      setCurrentMemberId(null);
      return;
    }

    setCurrentMemberId(member.id);
    setView(member.planType === 'Mensual' ? 'monthly' : 'weekly');
    setError('');
  }

  function handleLogout() {
    setCurrentMemberId(null);
    setForm({ memberNumber: '' });
    setError('');
    setView('weekly');
  }

  return (
    <section id="rutinas" className="section section-light routine-section">
      <div className="container routine-layout" data-reveal>
        <div className="routine-copy">
          <p className="eyebrow dark">Area de socios</p>
          <h2>Rutinas cargadas para cada alumno</h2>
          <p className="section-lead">
            Cada socio recibe un numero unico. Con ese numero puede buscar la
            rutina que el profe le cargo, organizada por semana o por mes.
          </p>
          <div className="demo-access" aria-label="Usuarios de prueba">
            <span>Prueba rapida:</span>
            <strong>Socio 1001 - Martina Perez</strong>
            <strong>Socio 1002 - Diego Alvarez</strong>
          </div>
        </div>

        <div className="routine-panel">
          {!currentMember ? (
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <p className="panel-kicker">Ingreso</p>
                <h3>Busca tu rutina</h3>
              </div>

              <label>
                Numero de socio
                <input
                  name="memberNumber"
                  inputMode="numeric"
                  autoComplete="off"
                  value={form.memberNumber}
                  onChange={handleChange}
                  placeholder="Ej: 1001"
                  required
                />
              </label>

              {error ? <p className="form-error">{error}</p> : null}

              <button className="button button-primary button-default" type="submit">
                Ver mi rutina
              </button>
            </form>
          ) : (
            <div className="member-routine">
              <div className="member-header">
                <div>
                  <p className="panel-kicker">Plan {currentMember.planType}</p>
                  <h3>{currentMemberName}</h3>
                  <p>Socio {currentMember.memberNumber} - {currentMember.goal} - {currentMember.trainer}</p>
                </div>
                <button className="text-button" type="button" onClick={handleLogout}>
                  Salir
                </button>
              </div>

              <div className="progress-block" aria-label="Progreso del plan">
                <div>
                  <span>Progreso</span>
                  <strong>{currentMember.progress}%</strong>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${currentMember.progress}%` }} />
                </div>
              </div>

              <div className="routine-tabs" role="tablist" aria-label="Tipo de rutina">
                <button
                  className={view === 'weekly' ? 'is-active' : ''}
                  type="button"
                  onClick={() => setView('weekly')}
                >
                  Semanal
                </button>
                <button
                  className={view === 'monthly' ? 'is-active' : ''}
                  type="button"
                  onClick={() => setView('monthly')}
                >
                  Mensual
                </button>
              </div>

              <div className="routine-list">
                {view === 'weekly'
                  ? visiblePlan.map((item) => (
                      <article className="routine-item" key={item.day}>
                        <span>{item.day}</span>
                        <div>
                          <h4>{item.focus}</h4>
                          <p>{item.work}</p>
                        </div>
                      </article>
                    ))
                  : visiblePlan.map((item) => (
                      <article className="routine-item compact" key={item}>
                        <span>{item.split(':')[0]}</span>
                        <p>{item.replace(`${item.split(':')[0]}: `, '')}</p>
                      </article>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
