export interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number | null;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string> | string | null;
  created_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  car_interest: string | null;
  created_at: string;
}
