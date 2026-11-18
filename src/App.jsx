import { useEffect, useState } from 'react';
import { BackOffice } from './components/BackOffice.jsx';
import { CTAFinal } from './components/CTAFinal.jsx';
import { EventSection } from './components/EventSection.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';
import { Hero } from './components/Hero.jsx';
import { Hours } from './components/Hours.jsx';
import { Location } from './components/Location.jsx';
import { Nosotros } from './components/Nosotros.jsx';
import { RoutinePortal } from './components/RoutinePortal.jsx';
import { TrainingAreas } from './components/TrainingAreas.jsx';
import { initialMembers } from './data/gymData.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';

function normalizeMembers(members) {
  const usedNumbers = new Set();

  return members.map((member, index) => {
    const [fallbackFirstName = '', ...fallbackLastName] = (member.name || '').split(' ');
    const memberNumber = member.memberNumber || String(1001 + index);
    usedNumbers.add(memberNumber);

    return {
      ...member,
      memberNumber,
      firstName: member.firstName || fallbackFirstName,
      lastName: member.lastName || fallbackLastName.join(' '),
    };
  }).map((member, index, normalizedMembers) => {
    if (
      normalizedMembers.findIndex((candidate) => candidate.memberNumber === member.memberNumber) === index
    ) {
      return member;
    }

    let nextNumber = 1001;
    while (usedNumbers.has(String(nextNumber))) {
      nextNumber += 1;
    }

    const memberNumber = String(nextNumber);
    usedNumbers.add(memberNumber);
    return { ...member, memberNumber };
  });
}

export default function App() {
  const [members, setMembers] = useState(() => {
    const savedMembers = window.localStorage.getItem('megagym-members');
    return normalizeMembers(savedMembers ? JSON.parse(savedMembers) : initialMembers);
  });

  useScrollReveal();

  useEffect(() => {
    window.localStorage.setItem('megagym-members', JSON.stringify(members));
  }, [members]);

  return (
    <>
      <Hero />
      <main>
        <Nosotros />
        <TrainingAreas />
        <CTAFinal />
        <RoutinePortal members={members} />
        <BackOffice members={members} setMembers={setMembers} />
        <Hours />
        <Location />
        <EventSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
