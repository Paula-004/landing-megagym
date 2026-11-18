export const trainers = [
  {
    id: 'lucas',
    name: 'Profe Lucas',
    email: 'lucas@megagym.com',
    password: '1234',
  },
  {
    id: 'carla',
    name: 'Profe Carla',
    email: 'carla@megagym.com',
    password: '1234',
  },
];

export const initialMembers = [
  {
    id: 'martina',
    name: 'Martina Perez',
    firstName: 'Martina',
    lastName: 'Perez',
    memberNumber: '1001',
    email: 'martina@megagym.com',
    password: '1234',
    goal: 'Fuerza y tonificacion',
    planType: 'Semanal',
    trainerId: 'lucas',
    trainer: 'Profe Lucas',
    progress: 68,
    weeklyRoutine: [
      { day: 'Lunes', focus: 'Piernas + gluteos', work: 'Sentadillas, prensa, hip thrust, estocadas' },
      { day: 'Martes', focus: 'Tren superior', work: 'Remo, press pecho, hombros, biceps y triceps' },
      { day: 'Miercoles', focus: 'Cardio funcional', work: 'Circuito HIIT, core y movilidad' },
      { day: 'Jueves', focus: 'Piernas', work: 'Peso muerto, femorales, abductores y gemelos' },
      { day: 'Viernes', focus: 'Full body', work: 'Kettlebell, empujes, traccion y abdominales' },
    ],
    monthlyRoutine: [
      'Semana 1: tecnica, carga moderada y adaptacion',
      'Semana 2: aumento de volumen y control de descansos',
      'Semana 3: intensidad alta y ejercicios accesorios',
      'Semana 4: descarga activa, movilidad y evaluacion',
    ],
  },
  {
    id: 'diego',
    name: 'Diego Alvarez',
    firstName: 'Diego',
    lastName: 'Alvarez',
    memberNumber: '1002',
    email: 'diego@megagym.com',
    password: '1234',
    goal: 'Hipertrofia',
    planType: 'Mensual',
    trainerId: 'carla',
    trainer: 'Profe Carla',
    progress: 42,
    weeklyRoutine: [
      { day: 'Lunes', focus: 'Pecho + triceps', work: 'Press plano, inclinado, fondos y polea' },
      { day: 'Martes', focus: 'Espalda + biceps', work: 'Dominadas asistidas, jalon, remo y curl' },
      { day: 'Miercoles', focus: 'Piernas', work: 'Sentadilla, prensa, extensiones y femorales' },
      { day: 'Jueves', focus: 'Hombros + core', work: 'Press militar, vuelos, face pull y planchas' },
      { day: 'Viernes', focus: 'Brazos + cardio', work: 'Superseries, abdomen y cinta suave' },
    ],
    monthlyRoutine: [
      'Semana 1: base de fuerza en rangos de 8 a 10 reps',
      'Semana 2: hipertrofia con superseries controladas',
      'Semana 3: cargas altas y pausas mas largas',
      'Semana 4: medicion, ajustes y tecnica fina',
    ],
  },
];

export function createEmptyWeeklyRoutine() {
  return ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].map((day) => ({
    day,
    focus: '',
    work: '',
  }));
}

export function createEmptyMonthlyRoutine() {
  return ['Semana 1: ', 'Semana 2: ', 'Semana 3: ', 'Semana 4: '];
}
