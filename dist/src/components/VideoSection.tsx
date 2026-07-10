import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

interface VideoSectionProps {
  videoSrc: string;
  titleKey: string;
  highlightKey: string;
  subtitleKey: string;
  height?: string;
}

export default function VideoSection({
  videoSrc,
  titleKey,
  highlightKey,
  subtitleKey,
  height = '50vh',
}: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden bg-black"
      style={{ height }}
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(135deg, ${RED} 0%, transparent 50%, ${RED_DEEP} 100%)` }}
        />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 px-4 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {t(titleKey)}
          <span
            className="block"
            style={{
              background: `linear-gradient(to right, ${RED_LIGHT}, ${RED}, ${RED_DEEP})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t(highlightKey)}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg text-gray-300"
        >
          {t(subtitleKey)}
        </motion.p>
      </motion.div>

      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute right-0 top-1/2 h-px w-32 origin-right"
        style={{ background: `linear-gradient(to left, ${RED_LIGHT}, transparent)` }}
      />
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
        className="absolute left-0 top-1/2 h-px w-32 origin-left"
        style={{ background: `linear-gradient(to right, ${RED_LIGHT}, transparent)` }}
      />
    </section>
  );
}
