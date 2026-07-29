export default function SectionLabel({ number, children }) {
  return <div className="section-label" data-reveal><span>{number}</span>{children}</div>;
}
