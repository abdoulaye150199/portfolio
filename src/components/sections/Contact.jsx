import SectionLabel from '../ui/SectionLabel';

const cubes = [
  ['-95px', '-95px', '-55px', '-38px', '-28deg'],
  ['0px', '-95px', '22px', '-70px', '34deg'],
  ['95px', '-95px', '68px', '-24px', '18deg'],
  ['-95px', '0px', '-76px', '8px', '42deg'],
  ['0px', '0px', '8px', '36px', '-18deg'],
  ['95px', '0px', '82px', '15px', '48deg'],
  ['-95px', '95px', '-58px', '65px', '-38deg'],
  ['0px', '95px', '24px', '78px', '26deg'],
  ['95px', '95px', '72px', '58px', '-22deg']
];

export default function Contact({ profile }) {
  return <section className="contact section" id="contact">
    <div className="contact-portrait">
      <div className="cube-field" aria-label="Illustration interactive de cubes">
        {cubes.map(([x, y, dx, dy, rotation], index) => (
          <i
            className="contact-cube"
            key={`${x}-${y}`}
            style={{ '--x': x, '--y': y, '--dx': dx, '--dy': dy, '--rotation': rotation, '--delay': `${index * 0.025}s` }}
          >
            <b /><b /><b />
          </i>
        ))}
      </div>
    </div>
    <SectionLabel number="05">Contact</SectionLabel>
    <p data-reveal>Vous avez un projet en tête ?</p>
    <a data-reveal href={`mailto:${profile.email}`}>Parlons-en <b>↗</b></a>
    <div className="contact-links" data-reveal>
      {profile.phones.map((phone) => <a href={phone.href} key={phone.href}>{phone.label}</a>)}
      {profile.socials.map((social) => (
        <a href={social.url} target="_blank" rel="noreferrer" key={social.label}>{social.label} ↗</a>
      ))}
      <a href={`mailto:${profile.email}`}>Email ↗</a>
    </div>
    <footer>
      <span>© 2026 {profile.name}</span>
      <span>{profile.location} · {profile.availability}</span>
      <a href="#home">Retour en haut ↑</a>
    </footer>
  </section>;
}
