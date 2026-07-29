import { useEffect, useRef, useState } from 'react';
import SectionLabel from '../ui/SectionLabel';

export default function Technologies({ technologies }) {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const featured = technologies.filter((technology) => technology.featured);
  const displayedTechnologies = showAll ? technologies : featured;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    let travel = 0;
    let frame;

    const update = () => {
      if (window.innerWidth <= 650) {
        section.style.removeProperty('height');
        track.style.removeProperty('transform');
        return;
      }

      const progress = Math.min(
        Math.max((window.scrollY - section.offsetTop) / Math.max(travel, 1), 0),
        1
      );
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    };

    const measure = () => {
      if (window.innerWidth <= 650) {
        travel = 0;
        update();
        return;
      }
      const horizontalPadding = Math.max(40, window.innerWidth * 0.064);
      travel = Math.max(0, track.scrollWidth - window.innerWidth + horizontalPadding);
      section.style.height = `${window.innerHeight + travel}px`;
      update();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
    };
  }, [displayedTechnologies.length]);

  return <section className="tech tech-horizontal" id="technologies" ref={sectionRef}>
    <div className="tech-sticky">
      <SectionLabel number="02">Technologies</SectionLabel>
      <div className="tech-heading">
        <h2 data-reveal>Mon arsenal<br /><em>créatif.</em></h2>
        <p data-reveal>Des outils modernes au service d’interfaces rapides, accessibles et évolutives.</p>
      </div>
      <div className="tech-grid" ref={trackRef}>
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
    </div>
  </section>;
}
