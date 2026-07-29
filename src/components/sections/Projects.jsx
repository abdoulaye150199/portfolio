import SectionLabel from '../ui/SectionLabel';

export default function Projects({ projects }) {
  return <section className="works section" id="projets">
    <SectionLabel number="03">Projets sélectionnés</SectionLabel>
    <h2 data-reveal>Quelques créations<br />récentes.</h2>
    <div className="work-list">
      {projects.map((project) => (
        <article className="work" data-reveal key={project.id} style={{ '--card': project.color, '--ink': project.ink }}>
          <div className="work-visual">
            <img src={project.image} alt={`Aperçu du projet ${project.name}`} loading="lazy" />
          </div>
          <footer>
            <div><small>{project.type}</small><h3>{project.name}</h3></div>
            <a href={project.url} target="_blank" rel="noreferrer">Voir le projet <b>↗</b></a>
          </footer>
        </article>
      ))}
    </div>
  </section>;
}
