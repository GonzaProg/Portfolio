
import StarfieldBackground from './components/StarfieldBackground';
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
      <StarfieldBackground />
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
