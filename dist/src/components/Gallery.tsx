import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';

const galleryImages = [
  { src: '/images/mclaren-720s-1.jpg', titleAr: 'ماكلارين 720S', titleEn: 'McLaren 720S', span: 'lg:col-span-2 lg:row-span-2' },
  { src: '/images/car-lambo-black.jpg', titleAr: 'لامبورجيني أفينتادور', titleEn: 'Lamborghini Aventador', span: '' },
  { src: '/images/mclaren-720s-2.jpg', titleAr: 'ماكلارين 720S', titleEn: 'McLaren 720S', span: '' },
  { src: '/images/car-rolls-black.jpg', titleAr: 'رولز رويس فانتوم', titleEn: 'Rolls-Royce Phantom', span: '' },
  { src: '/images/mclaren-720s-3.jpg', titleAr: 'ماكلارين 720S', titleEn: 'McLaren 720S', span: '' },
  { src: '/images/car-mercedes-black.jpg', titleAr: 'مرسيدس AMG GT', titleEn: 'Mercedes AMG GT', span: '' },
  { src: '/images/car-bugatti-black.jpg', titleAr: 'بوجاتي', titleEn: 'Bugatti', span: 'lg:col-span-2' },
  { src: '/images/car-audi-red.jpg', titleAr: 'أودي R8', titleEn: 'Audi R8', span: '' },
  { src: '/images/car-bentley-black.jpg', titleAr: 'بنتلي كونتيننتال', titleEn: 'Bentley Continental', span: '' },
  { src: '/images/detail-wheel.jpg', titleAr: 'تفاصيل فاخرة', titleEn: 'Luxury Details', span: '' },
  { src: '/images/car-ferrari-red.jpg', titleAr: 'فيراري', titleEn: 'Ferrari', span: '' },
  { src: '/images/detail-light.jpg', titleAr: 'إضاءة ياقوتية', titleEn: 'Ruby Lighting', span: '' },
];

export default function Gallery() {
  const { t, lang } = useLang();

  return (
    <section
      id="gallery"
      className="relative bg-black py-24 sm:py-32"
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
            {t('gallery.badge')}
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl" style={{ fontFamily: 'Georgia, serif' }}>
            {t('gallery.title')}
          </h2>
          <p className="mt-4 text-gray-400">{t('gallery.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
              className={`group relative overflow-hidden rounded-lg ${img.span}`}
            >
              <img
                src={img.src}
                alt={lang === 'ar' ? img.titleAr : img.titleEn}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 60px ${RED}50` }}
              />
              <div className="absolute bottom-0 right-0 p-4">
                <h3 className="translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {lang === 'ar' ? img.titleAr : img.titleEn}
                </h3>
                <div
                  className="mt-1 h-px w-0 transition-all duration-300 group-hover:w-12"
                  style={{ background: RED_LIGHT }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
