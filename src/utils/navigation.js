export function scrollToSection(event, sectionId) {
  event.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, '', cleanUrl);
}
