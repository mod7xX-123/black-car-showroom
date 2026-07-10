import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';

export default function Location() {
  const { t } = useLang();

  return (
    <section
      id="location"
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
            {t('location.badge')}
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl" style={{ fontFamily: 'Georgia, serif' }}>
            {t('location.title')}
          </h2>
          <p className="mt-4 text-gray-400">{t('location.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid gap-8 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ height: '450px', borderColor: `${RED_LIGHT}33` }}
            >
              <iframe
                src="https://maps.google.com/maps?q=6215%20%D8%B7%D8%B1%D9%8A%D9%82%20%D9%85%D9%83%D8%A9%20%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9%20%D8%AD%D9%8A%20%D8%A7%D9%84%D8%B9%D9%84%D9%8A%D8%A7%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.7) invert(0.88) contrast(0.9) hue-rotate(340deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Showroom Location"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-6 transition-all hover:border-white/10">
              <div className="mb-2 flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-bold text-white">{t('location.address')}</h3>
              </div>
              <p className="text-gray-400">{t('location.addressText')}</p>
              <a
                href="https://maps.app.goo.gl/LuT5NhsZRXo6K2M87?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm transition-colors hover:text-white"
                style={{ color: RED_LIGHT }}
              >
                {t('location.openMaps')}
              </a>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-6 transition-all hover:border-white/10">
              <div className="mb-2 flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="text-lg font-bold text-white">{t('location.phones')}</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <a href="tel:0509700715" className="block hover:text-white" dir="ltr">📞 050 970 0715</a>
                <a href="tel:0552314174" className="block hover:text-white" dir="ltr">📞 055 231 4174</a>
                <a href="https://wa.me/966509700715" target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                  💬 WhatsApp
                </a>
                <a href="mailto:nicecar827@gmail.com" className="block hover:text-white" dir="ltr">✉️ nicecar827@gmail.com</a>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-6 transition-all hover:border-white/10">
              <div className="mb-2 flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-white">{t('location.hours')}</h3>
              </div>
              <p className="text-gray-400">{t('location.hoursText')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
