import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandsMarquee from './components/BrandsMarquee';
import About from './components/About';
import Services from './components/Services';
import Collection from './components/Collection';
import VideoSection from './components/VideoSection';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Location from './components/Location';
import TrustBadges from './components/TrustBadges';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (typeof window !== 'undefined' && window.location.hash === '#admin' && !showAdmin) {
    setShowAdmin(true);
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Tajawal', 'Segoe UI', sans-serif" }}>
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <BrandsMarquee />
        <About />

        <VideoSection
          videoSrc="/videos/mid-banner1.mp4"
          titleKey="video1.title"
          highlightKey="video1.highlight"
          subtitleKey="video1.subtitle"
          height="50vh"
        />

        <Services />

        <Collection />

        <VideoSection
          videoSrc="/videos/mid-banner2.mp4"
          titleKey="video2.title"
          highlightKey="video2.highlight"
          subtitleKey="video2.subtitle"
          height="50vh"
        />

        <Gallery />

        <VideoSection
          videoSrc="/videos/mid-banner3.mp4"
          titleKey="video3.title"
          highlightKey="video3.highlight"
          subtitleKey="video3.subtitle"
          height="50vh"
        />

        <FAQ />
        <Location />
        <TrustBadges />
        <Contact />
      </main>
      <Footer />

      {showAdmin && <AdminPanel onClose={() => {
        setShowAdmin(false);
        window.location.hash = '';
      }} />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
