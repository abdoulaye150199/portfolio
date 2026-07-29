import { useState } from 'react';

export default function Header({ name, navigation }) {
  const [open, setOpen] = useState(false);

  return <header className="header">
    <a className="logo" href="#home"><i />{name}</a>
    <nav className={open ? 'open' : ''}>
      {navigation.map(({ label, target }) => (
        <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>
      ))}
    </nav>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
      <i /><i />
    </button>
  </header>;
}
