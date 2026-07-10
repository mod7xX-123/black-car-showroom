import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

export default function TrustBadges() {
  const { t } = useLang();

  const badges = [
    { icon: '🛡️', title: t('trust.badge1'), desc: t('trust.badge1Desc') },
    { icon: '🤝', title: t('trust.badge2'), desc: t('trust.badge2Desc') },
    { icon: '🌍', title: t('trust.badge3'), desc: t('trust.badge3Desc') },
  ];

  const stats = [
    { number: '+500', label: t('trust.stat1') },
    { number: '+15', label: t('trust.stat2') },
    { number: '+10', label: t('trust.stat3') },
    { number: '100%', label: t('trust.stat4') },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 to-black py-24 sm:py-32">
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(circle at 50% 50%, ${RED}40, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {badges.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-6 transition-all"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${RED_LIGHT}44`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
            >
              <div className="mb-3 text-4xl">{item.icon}</div>
              <h4 className="mb-2 text-base font-bold text-white">{item.title}</h4>
              <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative text-center"
            >
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 50%, ${RED}30, transparent 70%)` }}
              />
              <div
                className="mb-2 text-4xl font-bold sm:text-5xl"
                style={{ fontFamily: 'Georgia, serif', color: RED_LIGHT }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg italic text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
            {t('trust.tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
