import { motion } from 'framer-motion';
import { useState } from 'react';
import { submitInquiry } from '../lib/api';
import { useLang } from '../contexts/LanguageContext';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError(t('contact.errorName'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await submitInquiry(form);
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      <div className="absolute inset-0">
        <img
          src="/images/showroom-red.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${RED}20, transparent 60%)` }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block text-sm font-light tracking-[0.4em] uppercase" style={{ color: RED_LIGHT }}>
            {t('contact.badge')}
          </span>
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl" style={{ fontFamily: 'Georgia, serif' }}>
            {t('contact.title1')}
            <span
              className="block"
              style={{
                background: `linear-gradient(to right, ${RED_LIGHT}, ${RED}, ${RED_DEEP})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('contact.title2')}
            </span>
          </h2>
          <p className="mt-4 text-gray-400">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <a
              href="https://wa.me/966509700715"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border p-5 transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)`,
                borderColor: `${RED_LIGHT}44`,
                boxShadow: `0 0 30px ${RED}30`,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.608.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-white">{t('contact.whatsapp')}</div>
                <div className="text-sm text-white/80">{t('contact.whatsappDesc')}</div>
              </div>
            </a>

            <a
              href="tel:0509700715"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-5 transition-all hover:border-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${RED}30` }}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('contact.phone1Label')}</div>
                <div className="font-medium text-white" dir="ltr">050 970 0715</div>
              </div>
            </a>

            <a
              href="tel:0552314174"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-5 transition-all hover:border-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${RED}30` }}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('contact.phone2Label')}</div>
                <div className="font-medium text-white" dir="ltr">055 231 4174</div>
              </div>
            </a>

            <a
              href="https://instagram.com/nicecar_ksa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-5 transition-all hover:border-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${RED}30` }}>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('contact.instagram')}</div>
                <div className="font-medium text-white">@nicecar_ksa</div>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/5 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${RED}30` }}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: RED_LIGHT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('contact.addressLabel')}</div>
                <div className="text-sm font-medium text-white">{t('location.addressText')}</div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-gradient-to-b from-zinc-900/80 to-black/80 border p-8 backdrop-blur-xl sm:p-8"
            style={{ borderColor: `${RED_LIGHT}33` }}
          >
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">{t('contact.formName')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = RED_LIGHT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  placeholder={t('contact.formNamePlaceholder')}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">{t('contact.formPhone')}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = RED_LIGHT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  placeholder={t('contact.formPhonePlaceholder')}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">{t('contact.formEmail')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = RED_LIGHT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">{t('contact.formMessage')}</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = RED_LIGHT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  placeholder={t('contact.formMessagePlaceholder')}
                />
              </div>

              {error && (
                <div className="rounded-lg border px-4 py-3 text-sm text-red-400" style={{ borderColor: 'rgba(255,50,50,0.3)', background: 'rgba(255,50,50,0.1)' }}>
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border px-4 py-3 text-sm" style={{ borderColor: `${RED_LIGHT}55`, background: `${RED}20`, color: '#ff8a8a' }}>
                  {t('contact.success')}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg px-8 py-4 text-base font-bold text-white transition-all disabled:opacity-50"
                style={{
                  background: `linear-gradient(135deg, ${RED} 0%, ${RED_DEEP} 100%)`,
                  boxShadow: `0 0 30px ${RED}40`,
                }}
              >
                {loading ? t('contact.sending') : t('contact.submit')}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
