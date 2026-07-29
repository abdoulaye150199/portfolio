import { useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

export default function Technologies({ technologies }) {
  const [showAll, setShowAll] = useState(false);
  const featured = technologies.filter((technology) => technology.featured);
  const displayedTechnologies = showAll ? technologies : featured;

  return <section className="tech section" id="technologies">
    <SectionLabel number="02">Technologies</SectionLabel>
    <div className="tech-heading">
      <h2 data-reveal>Mon arsenal<br /><em>créatif.</em></h2>
      <p data-reveal>Des outils modernes au service d’interfaces rapides, accessibles et évolutives.</p>
    </div>
    <div className="tech-grid">
      {displayedTechnologies.map((item, index) => (
        <div className="tech-card" key={item.name} style={{ '--delay': `${index * 0.025}s` }}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div className="tech-icon">
            <img
              src={item.icon}
              alt=""
              loading="lazy"
              onError={(event) => event.currentTarget.classList.add('is-hidden')}
            />
            <strong>{item.name.slice(0, 2).toUpperCase()}</strong>
          </div>
          <div className="tech-name"><small>{item.category}</small><b>{item.name}</b></div>
          <i>↗</i>
        </div>
      ))}
    </div>
    <button
      className="skills-toggle"
      type="button"
      onClick={() => setShowAll((current) => !current)}
      aria-expanded={showAll}
    >
      <span>{showAll ? 'Voir moins' : `Voir plus · ${technologies.length - featured.length} compétences`}</span>
      <b>{showAll ? '↑' : '↓'}</b>
    </button>
  </section>;
}
