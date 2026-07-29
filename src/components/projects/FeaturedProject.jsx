import { useCallback, useEffect, useRef, useState } from 'react';

export default function FeaturedProject({ projects }) {
  const [index, setIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const timer = useRef();

  const next = useCallback(() => {
    setChanging(true);
    window.setTimeout(() => {
      setIndex((current) => (current + 1) % projects.length);
      setChanging(false);
    }, 260);
  }, [projects.length]);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(next, 3000);
  }, [next]);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const project = projects[index];
  return <a
    className={`featured glass ${changing ? 'changing' : ''}`}
    href={project.url}
    target="_blank"
    rel="noreferrer"
    onMouseEnter={() => clearInterval(timer.current)}
    onMouseLeave={start}
  >
    <div className="featured-visual" style={{ background: project.color, color: project.ink }}>
      <img src={project.image} alt={`Aperçu du projet ${project.name}`} />
      <div className="project-dots">
        {projects.map(({ id }, projectIndex) => <i className={projectIndex === index ? 'active' : ''} key={id} />)}
      </div>
    </div>
    <footer><span>Découvrir {project.name}</span><b>↗</b></footer>
  </a>;
}
