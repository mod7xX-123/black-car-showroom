import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';

const faqs = [
  {
    question: 'هل يمكنني استبدال سيارتي الحالية بسيارة رياضية أو فاخرة من المعرض؟',
    answer: 'نعم، بكل تأكيد. نحن نقدم خدمة الاستبدال (Trade-in) للسيارات الفاخرة والرياضية. يمكنك إحضار سيارتك الحالية ليقوم فريقنا الفني والمثمنون المختصون بفحصها وتقديم تقييم عادل ومنطقي لها بناءً على قيمتها السوقية، ومن ثم خصم قيمتها من سعر السيارة الجديدة أو شبه الجديدة / المعتمدة التي تختارها من معرضنا لتسديد الفارق بسهولة.',
  },
  {
    question: 'هل السيارات شبه الجديدة / المعتمدة المتوفرة في المعرض مضمونة؟',
    answer: 'نعم، جميع السيارات شبه الجديدة / المعتمدة (Pre-owned) المتاحة لدينا تخضع لفحص دقيق وشامل يغطي أكثر من 100 نقطة (تشمل المحرك، الشاسيه، الأنظمة الكهربائية، والبودي). كما نوفر خيارات تمديد الضمان وضمان خلو السيارة من الحوادث المؤثرة لضمان أعلى مستويات الراحة والثقة.',
  },
  {
    question: 'هل توفرون سيارات حصرية بنظام الطلب الخاص (Special Order) من الخارج؟',
    answer: 'نعم، إذا كنت تبحث عن مواصفات محددة، ألوان نادرة، أو إصدارات محدودة (Limited Editions) من شركات مثل فيراري، لامبورغيني، أو بورشه، فإننا نملك شبكة علاقات دولية تتيح لنا تأمين السيارة وشحنها لك إلى الرياض مع إنهاء كافة الإجراءات الجمركية واللوجستية.',
  },
  {
    question: 'كيف يمكنني معرفة الأسعار وتفاصيل السيارات المتاحة حالياً؟',
    answer: 'نظراً لتغير المخزون وسرعة حركة بيع السيارات النادرة، فإننا نقوم بتحديث منصاتنا الرقمية باستمرار. يمكنك تصفح كتالوج الصور والمواصفات عبر موقعنا الإلكتروني، أو التواصل المباشر مع مستشاري المبيعات عبر الواتساب للحصول على ملف تفصيلي (Media Kit) يشمل السعر والمواصفات الكاملة وفيديو للسيارة.',
  },
  {
    question: 'هل يوفر المعرض خدمات الشحن والنقل خارج الرياض؟',
    answer: 'نعم، نحن نتعامل مع أفضل شركات النقل المغلق والفاخر (تريلات هيدروليك مغلقة) لضمان وصول سيارتك إلى أي مكان داخل المملكة العربية السعودية أو دول الخليج العربي بأعلى معايير الأمان والحماية.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-zinc-950 py-24 sm:py-32"
      dir="rtl"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span
            className="mb-4 inline-block text-sm font-light tracking-[0.4em] uppercase"
            style={{ color: RED_LIGHT }}
          >
            استفسارات
          </span>
          <h2
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            أسئلة شائعة
          </h2>
          <p className="mt-4 text-gray-400">إجابات لأكثر الأسئلة التي تردنا</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-zinc-900 to-black transition-all"
              style={openIndex === i ? { borderColor: `${RED_LIGHT}44` } : {}}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-right"
              >
                <span className="text-base font-medium text-white sm:text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: openIndex === i ? RED : 'rgba(255,255,255,0.05)' }}
                >
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
