import { useEffect, useState } from 'react';

export default function Intro({ name, video, onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const value = Math.min((now - start) / 500, 1);
      setProgress(value * 100);
      if (value < 1) frame = requestAnimationFrame(tick);
      else onDone();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return <div className="intro">
    <video autoPlay muted playsInline src={video} />
    <div className="video-fallback" /><div className="intro-shade" />
    <p>{name}<span>Portfolio / 2026</span></p>
    <button onClick={onDone}>Passer <b>↗</b></button>
    <i style={{ width: `${progress}%` }} />
  </div>;
}
