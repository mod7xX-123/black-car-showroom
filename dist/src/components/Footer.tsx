import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';

export default function Footer() {
  const { t, lang } = useLang();

  const links = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#collection', label: t('nav.collection') },
    { href: '#about', label: t('nav.about') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-black border-t py-12" style={{ borderColor: `${RED}20` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-2xl font-bold" style={{ fontFamily: 'Georgia, serif', color: RED_LIGHT }}>
              {lang === 'ar' ? 'السيارة السوداء' : 'The Black Car'}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              {t('footer.desc')}
            </p>
            <div className="mt-4 text-xs text-gray-500">
              {t('footer.formerly')}
            </div>
            <p className="mt-4 text-sm italic text-gray-500" style={{ fontFamily: 'Georgia, serif' }}>
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold" style={{ color: RED_LIGHT }}>{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {links.map((link) => (
                <li key={link.href}><a href={link.href} className="hover:text-white">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold" style={{ color: RED_LIGHT }}>{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('location.addressText')}</li>
              <li dir="ltr" className="text-right">050 970 0715 · 055 231 4174</li>
              <li dir="ltr" className="text-right">✉️ nicecar827@gmail.com</li>
              <li>{t('footer.hoursShort')}</li>
              <li>
                <a href="https://wa.me/966509700715" target="_blank" rel="noopener noreferrer" className="hover:text-white">💬 WhatsApp</a>
                {' · '}
                <a href="https://instagram.com/nicecar_ksa" target="_blank" rel="noopener noreferrer" className="hover:text-white">📸 @nicecar_ksa</a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              {[
                { label: 'WA', href: 'https://wa.me/966509700715' },
                { label: 'IG', href: 'https://instagram.com/nicecar_ksa' },
                { label: '📞', href: 'tel:0509700715' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs text-gray-400 transition-all hover:text-white"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = RED_LIGHT;
                    e.currentTarget.style.background = RED;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '';
                  }}
                  aria-label={social.label}
                >
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {lang === 'ar' ? 'السيارة السوداء' : 'The Black Car'} · blackcar.sa · {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
