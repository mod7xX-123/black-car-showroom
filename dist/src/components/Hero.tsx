import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';

const videos = [
  { src: '/videos/hero-ferrari-new.mp4', label: 'Ferrari' },
  { src: '/videos/hero-lambo-new.mp4', label: 'Lamborghini' },
  { src: '/videos/hero-rolls-new.mp4', label: 'Rolls-Royce' },
];

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 h-full w-full">
        {videos.map((video, i) => (
          <video
            key={video.src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
              i === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-black/70" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-4"
        >
          <span className="text-sm font-light tracking-[0.5em] uppercase" style={{ color: RED_LIGHT }}>
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-5xl font-bold leading-tight sm:text-7xl md:text-8xl lg:text-9xl"
          style={{
            fontFamily: 'Georgia, serif',
            background: `linear-gradient(to right, ${RED_LIGHT}, ${RED}, ${RED_DEEP})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl"
        >
          {t('hero.subtitle1')}
          <br className="hidden sm:block" />
          {t('hero.subtitle2')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#collection"
            className="group relative overflow-hidden rounded-sm px-8 py-4 text-sm font-medium tracking-wider text-white transition-all sm:text-base"
            style={{
              background: `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)`,
              boxShadow: `0 0 30px ${RED}66`,
            }}
          >
            <span className="relative z-10">{t('hero.cta1')}</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#contact"
            className="rounded-sm border border-white/30 px-8 py-4 text-sm font-medium tracking-wider text-white transition-all hover:border-white hover:bg-white/10 sm:text-base"
          >
            {t('hero.cta2')}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="mt-8 text-sm italic text-gray-500"
        >
          {t('hero.tagline')}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-2 w-1 rounded-full"
            style={{ background: RED_LIGHT }}
          />
        </div>
      </motion.div>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2">
        {videos.map((video, i) => (
          <button
            key={i}
            onClick={() => setCurrentVideo(i)}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-xs font-medium tracking-wider transition-all duration-500 ${
                i === currentVideo ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ color: i === currentVideo ? RED_LIGHT : '#fff' }}
            >
              {video.label}
            </span>
            <span
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentVideo ? 'w-8' : 'w-4 bg-white/30'
              }`}
              style={i === currentVideo ? { background: RED_LIGHT } : {}}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
