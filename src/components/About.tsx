import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black py-24 sm:py-32"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${RED}40, transparent 70%)` }}
        />
      </div>

      <motion.div
        animate={{ x: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute top-1/4 right-0 h-px w-full"
        style={{ background: `linear-gradient(to right, transparent, ${RED_LIGHT}50, transparent)` }}
      />
      <motion.div
        animate={{ x: ['100%', '0%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="absolute top-3/4 right-0 h-px w-full"
        style={{ background: `linear-gradient(to right, transparent, ${RED}40, transparent)` }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.4em] uppercase" style={{ color: RED_LIGHT }}>
            {t('about.badge')}
          </span>
          <h2
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {t('about.title1')}
            <span
              className="block"
              style={{
                background: `linear-gradient(to right, ${RED_LIGHT}, ${RED}, ${RED_DEEP})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('about.title2')}
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 text-lg leading-loose text-gray-300 sm:text-xl"
        >
          <p>{t('about.story1')}</p>
          <p>{t('about.story2')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 rounded-2xl border p-8"
          style={{ borderColor: `${RED_LIGHT}33`, background: `linear-gradient(135deg, ${RED}10, transparent)` }}
        >
          <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: 'Georgia, serif', color: RED_LIGHT }}>
            {t('about.collectionTitle')}
          </h3>
          <p className="text-lg leading-relaxed text-gray-300">{t('about.collectionText1')}</p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{t('about.collectionText2')}</p>
        </motion.div>
      </div>
    </section>
  );
}
