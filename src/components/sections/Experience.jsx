import SectionLabel from '../ui/SectionLabel';

export default function Experience({ experiences, profile }) {
  return <section className="experience section" id="parcours">
    <SectionLabel number="04">Parcours</SectionLabel>
    <div className="experience-head">
      <h2 data-reveal>Expérience &<br /><em>formation.</em></h2>
      <p data-reveal>Un parcours hybride entre ingénierie logicielle, conception d’interfaces et transmission.</p>
    </div>
    <div className="timeline">
      {experiences.map((item, index) => (
        <article data-reveal key={`${item.place}-${item.role}`} style={{ '--delay': `${index * 0.08}s` }}>
          <time>{item.date}</time>
          <div><span>{item.place}</span><h3>{item.role}</h3><p>{item.text}</p></div>
          <b>{String(index + 1).padStart(2, '0')}</b>
        </article>
      ))}
    </div>
    <div className="education" data-reveal>
      <span>Profil</span><strong>{profile.title}</strong><p>{profile.location} · Web, mobile & design produit</p>
    </div>
  </section>;
}
