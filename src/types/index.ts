export interface Variety {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  spiciness: number; // 1-10 scale
  harvestTime: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  sunlight: string;
  yield: string;
  price: number;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  color: string;
}

export interface ContactInfo {
  type: 'whatsapp' | 'phone' | 'email' | 'instagram' | 'location';
  label: string;
  value: string;
  link: string;
  icon: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}
