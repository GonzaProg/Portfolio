
import Lightfall from './animations/Lightfall';
import ScrollStarProgress from './components/ScrollStarProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { GithubIcon, LinkedinIcon } from './components/SocialIcons';
import './App.css';

function App() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Lightfall
          colors={['#8b5cf6', '#3b82f6', '#FF9FFC']} // Accent Purple, Accent Blue, and a lighter pink
          backgroundColor="#06070d" // --space-darker
          speed={0.6}
          streakCount={1}
          streakWidth={1}
          streakLength={1.5}
          glow={1}
          density={0.5}
          twinkle={1}
          zoom={2}
          backgroundGlow={0.8}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.6}
        />
      </div>
      <ScrollStarProgress />
      <Navbar />
      
      <main>
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <a 
            href="https://github.com/GonzaProg" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-purple)' }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <GithubIcon size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/gonzalo-vaschchuk-a4b4033a7/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-blue)' }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <LinkedinIcon size={24} />
          </a>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Gonzalo Vaschchuk. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
