import SectionLabel from '../ui/SectionLabel';

export default function Contact({ profile }) {
  return <section className="contact section" id="contact">
    <div className="contact-orb" />
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
