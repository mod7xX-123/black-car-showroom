import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const RED = '#8B0000';
const RED_LIGHT = '#b81414';
const RED_DEEP = '#5c0707';

interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number | null;
  category: string;
  image: string;
  description: string;
  specs: any;
}

const categories = [
  { key: 'luxury', label: 'فاخرة' },
  { key: 'sports', label: 'رياضية' },
  { key: 'suv', label: 'دفع رباعي' },
];

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    year: new Date().getFullYear(),
    category: 'luxury',
    image: '',
    description: '',
    specEngine: '',
    specPower: '',
    specAccel: '',
    specTopSpeed: '',
  });

  const fetchCars = async () => {
    try {
      const res = await fetch('/api/cars');
      if (!res.ok) throw new Error('فشل تحميل السيارات');
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileBase64: base64,
            contentType: file.type,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'فشل رفع الصورة');
        }
        const { url } = await res.json();
        setForm((prev) => ({ ...prev, image: url }));
        setUploading(false);
      };
      reader.onerror = () => {
        setUploadError('فشل قراءة الملف');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'فشل رفع الصورة');
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.brand.trim()) {
      alert('الرجاء إدخال اسم السيارة والماركة');
      return;
    }
    const specs: Record<string, string> = {};
    if (form.specEngine) specs['المحرك'] = form.specEngine;
    if (form.specPower) specs['القوة'] = form.specPower;
    if (form.specAccel) specs['التسارع'] = form.specAccel;
    if (form.specTopSpeed) specs['السرعة القصوى'] = form.specTopSpeed;

    const payload = {
      name: form.name,
      brand: form.brand,
      year: Number(form.year),
      category: form.category,
      image: form.image || '/images/car-ferrari-red.jpg',
      description: form.description,
      specs: Object.keys(specs).length > 0 ? JSON.stringify(specs) : null,
    };

    try {
      const res = await fetch('/api/cars', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editId ? { id: editId, ...payload } : payload),
      });
      if (!res.ok) throw new Error('فشل حفظ السيارة');
      setShowForm(false);
      setEditId(null);
      setForm({
        name: '', brand: '', year: new Date().getFullYear(), category: 'luxury',
        image: '', description: '', specEngine: '', specPower: '', specAccel: '', specTopSpeed: '',
      });
      fetchCars();
    } catch (err: any) {
      console.error('Save error:', err);
      alert('فشل حفظ السيارة: ' + (err.message || ''));
    }
  };

  const handleEdit = (car: Car) => {
    let specsObj: any = {};
    try {
      specsObj = typeof car.specs === 'string' ? JSON.parse(car.specs) : car.specs || {};
    } catch {}
    setForm({
      name: car.name,
      brand: car.brand,
      year: car.year,
      category: car.category,
      image: car.image,
      description: car.description || '',
      specEngine: specsObj['المحرك'] || '',
      specPower: specsObj['القوة'] || '',
      specAccel: specsObj['التسارع'] || '',
      specTopSpeed: specsObj['السرعة القصوى'] || '',
    });
    setEditId(car.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    try {
      const res = await fetch('/api/cars', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('فشل حذف السيارة');
      fetchCars();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('فشل حذف السيارة: ' + (err.message || ''));
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: '', brand: '', year: new Date().getFullYear(), category: 'luxury',
      image: '', description: '', specEngine: '', specPower: '', specAccel: '', specTopSpeed: '',
    });
    setUploadError(null);
    setShowForm(true);
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/95 backdrop-blur-xl" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
            لوحة التحكم — إدارة السيارات
          </h2>
          <div className="flex gap-3">
            <button
              onClick={resetForm}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})` }}
            >
              + إضافة سيارة
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-gray-300 hover:text-white"
            >
              إغلاق ✕
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 overflow-hidden rounded-2xl border p-6"
              style={{ borderColor: `${RED_LIGHT}33`, background: 'rgba(20,20,20,0.8)' }}
            >
              <h3 className="mb-4 text-lg font-bold text-white">
                {editId ? 'تعديل سيارة' : 'إضافة سيارة جديدة'}
              </h3>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="mb-2 block text-sm text-gray-400">صورة السيارة</label>
                {form.image && (
                  <div className="mb-3 overflow-hidden rounded-lg">
                    <img src={form.image} alt="preview" className="h-40 w-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="block w-full text-sm text-gray-400"
                  style={{
                    color: '#9ca3af',
                  }}
                />
                {uploading && (
                  <p className="mt-2 text-sm text-gray-400">جاري رفع الصورة...</p>
                )}
                {uploadError && (
                  <p className="mt-2 text-sm text-red-400">{uploadError}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">أو أدخل رابط الصورة يدوياً:</p>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-sm text-white"
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="اسم السيارة"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                  required
                />
                <input
                  type="text"
                  placeholder="الماركة"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                  required
                />
                <input
                  type="number"
                  placeholder="سنة الصنع"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white"
                >
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="وصف السيارة"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="mt-4 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
              />

              {/* Specs */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="المحرك (مثال: V8 توين توربو)"
                  value={form.specEngine}
                  onChange={(e) => setForm({ ...form, specEngine: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="القوة (مثال: 640 حصان)"
                  value={form.specPower}
                  onChange={(e) => setForm({ ...form, specPower: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="التسارع (مثال: 0-100 في 3.0 ثانية)"
                  value={form.specAccel}
                  onChange={(e) => setForm({ ...form, specAccel: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="السرعة القصوى (مثال: 330 كم/س)"
                  value={form.specTopSpeed}
                  onChange={(e) => setForm({ ...form, specTopSpeed: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white placeholder-gray-500"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="rounded-lg px-6 py-2.5 text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DEEP})` }}
                >
                  {editId ? 'حفظ التعديلات' : 'إضافة السيارة'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditId(null); }}
                  className="rounded-lg border border-white/20 px-6 py-2.5 text-sm text-gray-300"
                >
                  إلغاء
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Cars List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2" style={{ borderColor: `${RED}30`, borderTopColor: RED_LIGHT }} />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <div key={car.id} className="overflow-hidden rounded-lg border border-white/5 bg-zinc-900">
                <div className="aspect-[16/10] overflow-hidden bg-zinc-800">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/car-ferrari-red.jpg';
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs" style={{ color: RED_LIGHT }}>{car.brand}</div>
                  <div className="font-bold text-white">{car.name}</div>
                  <div className="mt-1 text-xs text-gray-500">{car.year} · {categories.find(c => c.key === car.category)?.label || car.category}</div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="flex-1 rounded-lg border border-white/10 py-2 text-xs text-gray-300 hover:text-white"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="flex-1 rounded-lg border py-2 text-xs text-red-400"
                      style={{ borderColor: 'rgba(255,50,50,0.2)' }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
