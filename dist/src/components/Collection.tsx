import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchCars } from '../lib/api';
import { useLang } from '../contexts/LanguageContext';
import type { Car } from '../types';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

export default function Collection() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { t } = useLang();

  const categories = [
    { key: 'all', label: t('collection.catAll') },
    { key: 'luxury', label: t('collection.catLuxury') },
    { key: 'sports', label: t('collection.catSports') },
    { key: 'suv', label: t('collection.catSuv') },
  ];

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await fetchCars(activeCategory);
      setCars(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, [activeCategory]);

  return (
    <section
      id="collection"
      className="relative bg-zinc-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.4em] uppercase" style={{ color: RED_LIGHT }}>
            {t('collection.badge')}
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl" style={{ fontFamily: 'Georgia, serif' }}>
            {t('collection.title')}
          </h2>
          <p className="mt-4 text-gray-400">{t('collection.subtitle')}</p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'text-white'
                  : 'border border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
              }`}
              style={
                activeCategory === cat.key
                  ? { background: `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)`, border: 'none', boxShadow: `0 0 20px ${RED}50` }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-2" style={{ borderColor: `${RED}30`, borderTopColor: RED_LIGHT }} />
          </div>
        )}

        {error && <div className="py-20 text-center text-red-400">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCar(car)}
                className="group cursor-pointer overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 to-black border border-white/5 transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${RED_LIGHT}66`;
                  e.currentTarget.style.boxShadow = `0 10px 40px ${RED}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to top, ${RED}33, transparent 50%)` }}
                  />
                  {car.category && (
                    <span
                      className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium text-white"
                      style={{ background: RED }}
                    >
                      {categories.find((c) => c.key === car.category)?.label || car.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-1 text-xs font-light tracking-wider" style={{ color: RED_LIGHT }}>
                    {car.brand}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{car.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-400">{car.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{t('collection.priceOnDemand')}</span>
                    <span className="text-sm text-gray-500">{car.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="py-20 text-center text-gray-500">{t('collection.empty')}</div>
        )}
      </div>

      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCar(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-zinc-900 border"
              style={{ borderColor: `${RED_LIGHT}33` }}
            >
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute left-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-all"
                onMouseEnter={(e) => { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = '#fff'; }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={selectedCar.image} alt={selectedCar.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-8">
                <div className="mb-2 text-sm" style={{ color: RED_LIGHT }}>{selectedCar.brand}</div>
                <h3 className="mb-4 text-3xl font-bold text-white">{selectedCar.name}</h3>
                <p className="mb-6 text-gray-300">{selectedCar.description}</p>
                {selectedCar.specs && (
                  <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {(() => {
                      try {
                        const specs = typeof selectedCar.specs === 'string'
                          ? JSON.parse(selectedCar.specs)
                          : selectedCar.specs;
                        return Object.entries(specs).map(([key, value]: [string, any]) => (
                          <div key={key} className="rounded-lg bg-black/40 p-4 border border-white/5">
                            <div className="mb-1 text-xs text-gray-500">{key}</div>
                            <div className="text-sm font-medium text-white">{value}</div>
                          </div>
                        ));
                      } catch { return null; }
                    })()}
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <div className="text-xs text-gray-500">{t('collection.price')}</div>
                    <div className="text-lg font-bold text-gray-300">{t('collection.priceOnDemand')}</div>
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setSelectedCar(null)}
                    className="rounded-sm px-6 py-3 text-sm font-medium text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)` }}
                  >
                    {t('collection.inquire')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
