import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsCloud from './components/SkillsCloud';
import Certifications from './components/Certifications';
import EducationTimeline from './components/EducationTimeline';
import ProfessionalStrengths from './components/ProfessionalStrengths';
import Opportunities from './components/Opportunities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeViewer from './components/ResumeViewer';
import PdfShower from './components/PdfShower';
import { profile } from './data/content';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showering, setShowering] = useState(false);

  const handleDownload = useCallback(() => {
    setShowering(true);
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = profile.resume;
      a.download = 'Amruta_Thakare_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 600);
    setTimeout(() => setShowering(false), 1300);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light text-ink antialiased">
      <Navbar />
      <main>
        <Hero
          onCheckResume={() => setResumeOpen(true)}
          onDownloadResume={handleDownload}
          showering={showering}
        />
        <About />
        <ExperienceTimeline />
        <SkillsCloud />
        <Certifications />
        <EducationTimeline />
        <ProfessionalStrengths />
        <Opportunities />
        <Contact />
      </main>
      <Footer />

      <ResumeViewer open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <PdfShower active={showering} />
    </div>
  );
}
