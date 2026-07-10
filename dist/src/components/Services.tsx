import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

const services = [
  { num: '01', image: '/images/service-buy.jpg' },
  { num: '02', image: '/images/service-used.jpg' },
  { num: '03', image: '/images/service-sell.jpg' },
];

export default function Services() {
  const { t } = useLang();

  const serviceData = [
    { title: t('services.s1Title'), desc: t('services.s1Desc') },
    { title: t('services.s2Title'), desc: t('services.s2Desc') },
    { title: t('services.s3Title'), desc: t('services.s3Desc') },
  ];

  return (
    <section
      id="services"
      className="relative bg-zinc-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.4em] uppercase" style={{ color: RED_LIGHT }}>
            {t('services.badge')}
          </span>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {t('services.title1')}
            <span
              className="block"
              style={{
                background: `linear-gradient(to right, ${RED_LIGHT}, ${RED}, ${RED_DEEP})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('services.title2')}
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900 to-black transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${RED_LIGHT}44`;
                e.currentTarget.style.boxShadow = `0 10px 40px ${RED}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={serviceData[i].title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to top, ${RED}33, transparent 50%)` }}
                />
                <div
                  className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})`, fontFamily: 'Georgia, serif' }}
                >
                  {service.num}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-white">{serviceData[i].title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{serviceData[i].desc}</p>
              </div>

              <div
                className="h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: `linear-gradient(to right, ${RED_LIGHT}, ${RED_DEEP})` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
