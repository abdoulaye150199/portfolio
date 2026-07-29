import { useEffect, useState } from 'react';
import { scrollToSection } from '../../utils/navigation';

export default function Header({ name, avatar, navigation }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 90);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const expanded = !scrolled || hovered || open;

  return <header
    className={`header ${scrolled ? 'is-scrolled' : ''} ${expanded ? 'is-expanded' : 'is-collapsed'}`}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocus={() => setHovered(true)}
    onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
    }}
  >
    <a className="logo" href="#home" onClick={(event) => scrollToSection(event, 'home')}>
      <span className="nav-avatar"><img src={avatar} alt="" /><i /></span>
      <span>{name}</span>
    </a>
    <nav className={open ? 'open' : ''}>
      {navigation.map(({ label, target }) => (
        <a
          key={target}
          href={`#${target}`}
          onClick={(event) => {
            scrollToSection(event, target);
            setOpen(false);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
    <div className="nav-status" aria-hidden="true"><i /><i /><i /></div>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
      <i /><i />
    </button>
  </header>;
}
