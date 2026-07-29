import { useEffect, useRef } from 'react';
import FeaturedProject from '../projects/FeaturedProject';
import { scrollToSection } from '../../utils/navigation';

export default function Hero({ ready, content, profile, projects }) {
  const media = useRef();

  useEffect(() => {
    const move = (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = (event.clientX / innerWidth - 0.5) * 12;
      const y = (event.clientY / innerHeight - 0.5) * 12;
      media.current?.style.setProperty('--mx', `${x}px`);
      media.current?.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <section className={`hero ${ready ? 'ready' : ''}`} id="home">
    <div className="hero-media" ref={media}>
      <video autoPlay muted loop playsInline src={content.video} />
      <div className="video-fallback" /><div className="hero-grid" /><div className="hero-shade" />
      <div className="orb orb-a" /><div className="orb orb-b" />
      <div className="hero-copy">
        <p className="kicker"><i />{content.kicker}</p>
        <h1>{content.lines.map((line, index) => (
          <span key={line} style={{ '--d': `${index * 0.08}s` }}><b>{line}</b></span>
        ))}</h1>
        <a className="pill" href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>{content.cta}<b>↗</b></a>
      </div>
      <FeaturedProject projects={projects.slice(0, 3)} />
      <span className="coordinates">{profile.coordinates}</span>
    </div>
    <a className="about-tab" href="#about" onClick={(event) => scrollToSection(event, 'about')}>À propos <span>↓</span></a>
  </section>;
}
