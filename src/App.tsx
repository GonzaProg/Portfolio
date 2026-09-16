
import StarfieldBackground from './components/StarfieldBackground';
import ScrollStarProgress from './components/ScrollStarProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
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
      </main>

      <footer style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', position: 'relative', zIndex: 10 }}>
        <p>© {new Date().getFullYear()} Gonzalo Vaschchuk. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
