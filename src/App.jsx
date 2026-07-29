import { useCallback, useState } from 'react';
import portfolio from './data/portfolio.json';
import { useReveal } from './hooks/useReveal';
import Header from './components/layout/Header';
import Intro from './components/layout/Intro';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Technologies from './components/sections/Technologies';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

export default function App() {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const recentProjects = [...portfolio.projects].reverse();
  useReveal();

  const finishIntro = useCallback(() => {
    setReady(true);
    window.setTimeout(() => setShowIntro(false), 500);
  }, []);

  return <>
    <div className="noise" />
    {showIntro && <Intro name={portfolio.profile.name} video={portfolio.hero.video} onDone={finishIntro} />}
    <Header name={portfolio.profile.name} avatar="/img/moi.png" navigation={portfolio.navigation} />
    <main>
      <Hero ready={ready} content={portfolio.hero} profile={portfolio.profile} projects={recentProjects} />
      <About content={portfolio.about} bio={portfolio.profile.bio} />
      <Technologies technologies={portfolio.technologies} />
      <Projects projects={recentProjects} />
      <Experience experiences={portfolio.experiences} profile={portfolio.profile} />
      <Contact profile={portfolio.profile} />
    </main>
  </>;
}
