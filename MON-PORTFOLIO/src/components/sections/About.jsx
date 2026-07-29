import SectionLabel from '../ui/SectionLabel';

export default function About({ content, bio }) {
  return <section className="about section" id="about">
    <SectionLabel number="01">À propos</SectionLabel>
    <div className="about-layout">
      <h2 data-reveal>{content.heading}<br /><em>{content.accent}</em></h2>
      <div className="about-copy" data-reveal>
        <p>{bio}</p>
        <div className="stats">
          <span><b>{content.years}</b> années de pratique</span>
          <span><b>{content.projects}</b> projets sélectionnés</span>
        </div>
      </div>
    </div>
    <div className="marquee"><div>
      {content.marquee.map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}
    </div></div>
  </section>;
}
