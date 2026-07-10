export const API_BASE = '/api';

export async function fetchCars(category?: string) {
  const res = await fetch('/cars.json');
  if (!res.ok) throw new Error('فشل تحميل السيارات');
  const data = await res.json();
  if (category && category !== 'all') {
    return data.filter((car: any) => car.category === category);
  }
  return data;
}
export async function fetchBrands() {
  const res = await fetch(`${API_BASE}/brands`);
  if (!res.ok) throw new Error('فشل تحميل الماركات');
  return res.json();
}

export async function submitInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  car_interest?: string;
}) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'فشل إرسال الطلب');
  }
  return res.json();
}
