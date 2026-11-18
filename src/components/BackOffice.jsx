import { useMemo, useState } from 'react';
import { createEmptyMonthlyRoutine, createEmptyWeeklyRoutine, trainers } from '../data/gymData.js';

const emptyMemberForm = {
  firstName: '',
  lastName: '',
  goal: '',
  planType: 'Semanal',
};

function getMemberFullName(member) {
  return `${member.firstName} ${member.lastName}`.trim() || member.name;
}

function getNextMemberNumber(members) {
  const usedNumbers = new Set(members.map((member) => Number(member.memberNumber)));
  let nextNumber = 1001;

  while (usedNumbers.has(nextNumber)) {
    nextNumber += 1;
  }

  return String(nextNumber);
}

export function BackOffice({ members, setMembers }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [trainer, setTrainer] = useState(null);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [memberForm, setMemberForm] = useState(emptyMemberForm);
  const nextMemberNumber = getNextMemberNumber(members);

  const trainerMembers = useMemo(() => {
    if (!trainer) {
      return [];
    }

    return members.filter((member) => member.trainerId === trainer.id);
  }, [members, trainer]);

  const selectedMember = members.find((member) => member.id === selectedId);

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLogin((current) => ({ ...current, [name]: value }));
  }

  function handleLogin(event) {
    event.preventDefault();

    const foundTrainer = trainers.find(
      (candidate) =>
        candidate.email.toLowerCase() === login.email.trim().toLowerCase() &&
        candidate.password === login.password,
    );

    if (!foundTrainer) {
      setError('Revisa el usuario y la clave del entrenador.');
      return;
    }

    setTrainer(foundTrainer);
    setError('');
    setSelectedId('');
  }

  function handleMemberFormChange(event) {
    const { name, value } = event.target;
    setMemberForm((current) => ({ ...current, [name]: value }));
  }

  function handleCreateMember(event) {
    event.preventDefault();

    const newMember = {
      ...memberForm,
      id: crypto.randomUUID(),
      name: `${memberForm.firstName} ${memberForm.lastName}`.trim(),
      memberNumber: getNextMemberNumber(members),
      email: '',
      password: '',
      trainerId: trainer.id,
      trainer: trainer.name,
      progress: 0,
      weeklyRoutine: createEmptyWeeklyRoutine(),
      monthlyRoutine: createEmptyMonthlyRoutine(),
    };

    setMembers((current) => [...current, newMember]);
    setSelectedId(newMember.id);
    setMemberForm(emptyMemberForm);
  }

  function updateSelectedMember(nextMember) {
    setMembers((current) =>
      current.map((member) => (member.id === nextMember.id ? nextMember : member)),
    );
  }

  function updateSelectedField(field, value) {
    updateSelectedMember({ ...selectedMember, [field]: value });
  }

  function updateIdentityField(field, value) {
    const nextMember = { ...selectedMember, [field]: value };
    nextMember.name = `${nextMember.firstName} ${nextMember.lastName}`.trim();
    updateSelectedMember(nextMember);
  }

  function updateWeeklyRoutine(index, field, value) {
    const weeklyRoutine = selectedMember.weeklyRoutine.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item,
    );

    updateSelectedMember({ ...selectedMember, weeklyRoutine });
  }

  function updateMonthlyRoutine(index, value) {
    const monthlyRoutine = selectedMember.monthlyRoutine.map((item, itemIndex) =>
      itemIndex === index ? value : item,
    );

    updateSelectedMember({ ...selectedMember, monthlyRoutine });
  }

  function handleLogout() {
    setTrainer(null);
    setLogin({ email: '', password: '' });
    setSelectedId('');
    setError('');
  }

  return (
    <section id="backoffice" className="section backoffice-section">
      <div className="container backoffice-layout" data-reveal>
        <div className="backoffice-copy">
          <p className="eyebrow">Backoffice</p>
          <h2>Gestion de socios y rutinas</h2>
          <p>
            Cada entrenador puede cargar socios con nombre, apellido y numero
            unico, y editar las rutinas que luego ve cada alumno desde su acceso.
          </p>
          <div className="trainer-access">
            <span>Entrenadores de prueba:</span>
            <strong>lucas@megagym.com / 1234</strong>
            <strong>carla@megagym.com / 1234</strong>
          </div>
        </div>

        {!trainer ? (
          <form className="login-form trainer-login" onSubmit={handleLogin}>
            <div>
              <p className="panel-kicker">Entrenadores</p>
              <h3>Ingresar al panel</h3>
            </div>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={login.email}
                onChange={handleLoginChange}
                placeholder="profe@megagym.com"
                required
              />
            </label>
            <label>
              Clave
              <input
                name="password"
                type="password"
                value={login.password}
                onChange={handleLoginChange}
                placeholder="Clave"
                required
              />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button className="button button-primary button-default" type="submit">
              Entrar al backoffice
            </button>
          </form>
        ) : (
          <div className="admin-panel">
            <div className="admin-topbar">
              <div>
                <p className="panel-kicker">Sesion activa</p>
                <h3>{trainer.name}</h3>
              </div>
              <button className="text-button" type="button" onClick={handleLogout}>
                Salir
              </button>
            </div>

            <div className="admin-grid">
              <aside className="member-manager">
                <form className="mini-form" onSubmit={handleCreateMember}>
                  <h4>Nuevo socio</h4>
                  <p className="next-member-number">Proximo numero: #{nextMemberNumber}</p>
                  <input
                    name="firstName"
                    value={memberForm.firstName}
                    onChange={handleMemberFormChange}
                    placeholder="Nombre"
                    required
                  />
                  <input
                    name="lastName"
                    value={memberForm.lastName}
                    onChange={handleMemberFormChange}
                    placeholder="Apellido"
                    required
                  />
                  <input
                    name="goal"
                    value={memberForm.goal}
                    onChange={handleMemberFormChange}
                    placeholder="Objetivo"
                    required
                  />
                  <select
                    name="planType"
                    value={memberForm.planType}
                    onChange={handleMemberFormChange}
                  >
                    <option value="Semanal">Semanal</option>
                    <option value="Mensual">Mensual</option>
                  </select>
                  <button className="button button-primary button-default" type="submit">
                    Crear socio
                  </button>
                </form>

                <div className="member-list">
                  <h4>Mis socios</h4>
                  {trainerMembers.map((member) => (
                    <button
                      className={member.id === selectedId ? 'is-active' : ''}
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedId(member.id)}
                    >
                      <span>{getMemberFullName(member)}</span>
                      <small>#{member.memberNumber}</small>
                    </button>
                  ))}
                </div>
              </aside>

              {selectedMember ? (
                <div className="routine-editor">
                  <div className="editor-header">
                    <div>
                      <p className="panel-kicker">Rutina asignada</p>
                      <h3>{getMemberFullName(selectedMember)}</h3>
                      <p className="member-number">Socio #{selectedMember.memberNumber}</p>
                    </div>
                    <label>
                      Progreso
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selectedMember.progress}
                        onChange={(event) => updateSelectedField('progress', Number(event.target.value))}
                      />
                    </label>
                  </div>

                  <div className="editor-fields">
                    <label>
                      Nombre
                      <input
                        value={selectedMember.firstName}
                        onChange={(event) => updateIdentityField('firstName', event.target.value)}
                      />
                    </label>
                    <label>
                      Apellido
                      <input
                        value={selectedMember.lastName}
                        onChange={(event) => updateIdentityField('lastName', event.target.value)}
                      />
                    </label>
                    <label>
                      Numero de socio
                      <input
                        inputMode="numeric"
                        value={selectedMember.memberNumber}
                        onChange={(event) => updateSelectedField('memberNumber', event.target.value)}
                      />
                    </label>
                    <label>
                      Objetivo
                      <input
                        value={selectedMember.goal}
                        onChange={(event) => updateSelectedField('goal', event.target.value)}
                      />
                    </label>
                    <label>
                      Tipo de plan
                      <select
                        value={selectedMember.planType}
                        onChange={(event) => updateSelectedField('planType', event.target.value)}
                      >
                        <option value="Semanal">Semanal</option>
                        <option value="Mensual">Mensual</option>
                      </select>
                    </label>
                  </div>

                  <div className="editor-block">
                    <h4>Rutina semanal</h4>
                    {selectedMember.weeklyRoutine.map((item, index) => (
                      <div className="weekly-edit-row" key={item.day}>
                        <strong>{item.day}</strong>
                        <input
                          value={item.focus}
                          onChange={(event) => updateWeeklyRoutine(index, 'focus', event.target.value)}
                          placeholder="Foco del dia"
                        />
                        <textarea
                          value={item.work}
                          onChange={(event) => updateWeeklyRoutine(index, 'work', event.target.value)}
                          placeholder="Ejercicios"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="editor-block">
                    <h4>Rutina mensual</h4>
                    {selectedMember.monthlyRoutine.map((item, index) => (
                      <textarea
                        key={`${selectedMember.id}-${index}`}
                        value={item}
                        onChange={(event) => updateMonthlyRoutine(index, event.target.value)}
                        placeholder={`Semana ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-editor">
                  <h3>Selecciona un socio</h3>
                  <p>Elegilo de la lista o crea uno nuevo para cargar su rutina.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
