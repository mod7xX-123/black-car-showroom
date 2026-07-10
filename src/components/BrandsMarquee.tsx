import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';

export default function BrandsMarquee() {
  const { t } = useLang();

  const brands = [
    'Lamborghini', 'Ferrari', 'Porsche', 'Rolls-Royce',
    'Bentley', 'McLaren', 'Mercedes-Benz', 'Bugatti',
    'Aston Martin', 'BMW', 'Audi', 'Maserati',
  ];

  return (
    <section className="overflow-hidden bg-zinc-950 py-12 border-y border-white/5">
      <div className="mb-6 text-center">
        <span className="text-xs font-light tracking-[0.4em] uppercase" style={{ color: RED_LIGHT }}>
          {t('brands.title')}
        </span>
      </div>
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="flex shrink-0 items-center gap-16 pr-16"
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-2xl font-bold text-gray-600 transition-colors hover:text-white sm:text-3xl"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
