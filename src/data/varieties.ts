export interface Variety {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'hybrid' | 'local';
  spiciness: 'mild' | 'medium' | 'hot';
  harvestDays: number;
  yieldPerHectare: number;
  price: number;
  features: string[];
  origin?: string;
  diseaseResistance?: string[];
  optimalTemperature?: {
    min: number;
    max: number;
  };
}

export const varieties: Variety[] = [
  {
    id: '1',
    name: 'Cabai Merah Keriting',
    description: 'Varietas cabai merah keriting dengan tingkat kepedasan tinggi dan produktivitas unggul.',
    image: '/cabai-merah-keriting.jpg',
    type: 'hybrid',
    spiciness: 'hot',
    harvestDays: 75,
    yieldPerHectare: 12000,
    price: 45000,
    features: ['Tahan penyakit', 'Produktivitas tinggi', 'Rasa pedas kuat'],
    origin: 'Thailand',
    diseaseResistance: ['Antraknosa', 'Virus kuning'],
    optimalTemperature: { min: 25, max: 32 }
  },
  {
    id: '2',
    name: 'Cabai Rawit Hijau',
    description: 'Cabai rawit lokal dengan buah kecil dan pedas menyengat, cocok untuk sambal.',
    image: '/cabai-rawit-hijau.jpg',
    type: 'local',
    spiciness: 'hot',
    harvestDays: 65,
    yieldPerHectare: 8000,
    price: 35000,
    features: ['Pedas menyengat', 'Tahan panas', 'Perawatan mudah'],
    origin: 'Indonesia',
    diseaseResistance: ['Layu bakteri', 'Bercak daun'],
    optimalTemperature: { min: 22, max: 30 }
  },
  {
    id: '3',
    name: 'Cabai Merah Besar',
    description: 'Cabai merah besar dengan daging tebal, cocok untuk saus dan bumbu masakan.',
    image: '/cabai-merah-besar.jpg',
    type: 'hybrid',
    spiciness: 'medium',
    harvestDays: 80,
    yieldPerHectare: 15000,
    price: 55000,
    features: ['Daging tebal', 'Rendah biji', 'Warna merah cerah'],
    origin: 'Taiwan',
    diseaseResistance: ['Virus mosaik', 'Busuk buah'],
    optimalTemperature: { min: 20, max: 28 }
  },
  {
    id: '4',
    name: 'Cabai Keriting Lokal',
    description: 'Varietas lokal dengan bentuk keriting khas dan aroma harum yang khas.',
    image: '/cabai-keriting-lokal.jpg',
    type: 'local',
    spiciness: 'medium',
    harvestDays: 70,
    yieldPerHectare: 9000,
    price: 40000,
    features: ['Aroma harum', 'Tahan hama', 'Adaptif berbagai tanah'],
    origin: 'Jawa Tengah',
    diseaseResistance: ['Kutu daun', 'Ulat grayak'],
    optimalTemperature: { min: 23, max: 31 }
  },
  {
    id: '5',
    name: 'Cabai Paprika',
    description: 'Cabai paprika dengan rasa manis, cocok untuk salad dan masakan tumis.',
    image: '/cabai-paprika.jpg',
    type: 'hybrid',
    spiciness: 'mild',
    harvestDays: 85,
    yieldPerHectare: 18000,
    price: 65000,
    features: ['Rasa manis', 'Kaya vitamin C', 'Warna variatif'],
    origin: 'Belanda',
    diseaseResistance: ['Busuk akar', 'Embun tepung'],
    optimalTemperature: { min: 18, max: 26 }
  },
  {
    id: '6',
    name: 'Cabai Jalapeno',
    description: 'Cabai jalapeno dengan tingkat kepedasan sedang, populer untuk masakan Mexicano.',
    image: '/cabai-jalapeno.jpg',
    type: 'hybrid',
    spiciness: 'medium',
    harvestDays: 72,
    yieldPerHectare: 11000,
    price: 48000,
    features: ['Cocok diolah', 'Tahan simpan', 'Serbaguna'],
    origin: 'Meksiko',
    diseaseResistance: ['Nematoda', 'Virus keriting'],
    optimalTemperature: { min: 21, max: 29 }
  },
  {
    id: '7',
    name: 'Cabai Hias',
    description: 'Cabai hias dengan buah warna-warni, cocok untuk tanaman hias sekaligus konsumsi.',
    image: '/cabai-hias.jpg',
    type: 'local',
    spiciness: 'mild',
    harvestDays: 60,
    yieldPerHectare: 5000,
    price: 30000,
    features: ['Warna menarik', 'Cocok pot', 'Perawatan mudah'],
    origin: 'Indonesia',
    diseaseResistance: ['Jamur', 'Bakteri daun'],
    optimalTemperature: { min: 20, max: 28 }
  },
  {
    id: '8',
    name: 'Cabai Tabasco',
    description: 'Cabai tabasco dengan rasa pedas tajam, bahan utama saus tabasco terkenal.',
    image: '/cabai-tabasco.jpg',
    type: 'hybrid',
    spiciness: 'hot',
    harvestDays: 78,
    yieldPerHectare: 13000,
    price: 52000,
    features: ['Pedas tajam', 'Aroma khas', 'Cocok saus'],
    origin: 'Amerika',
    diseaseResistance: ['Virus kuning', 'Bercak bakteri'],
    optimalTemperature: { min: 24, max: 32 }
  },
  {
    id: '9',
    name: 'Cabai Gendot',
    description: 'Cabai gendot dengan bentuk bulat dan pedas ekstra, khas Jawa Barat.',
    image: '/cabai-gendot.jpg',
    type: 'local',
    spiciness: 'hot',
    harvestDays: 68,
    yieldPerHectare: 7500,
    price: 38000,
    features: ['Pedas ekstra', 'Bentuk unik', 'Aroma kuat'],
    origin: 'Jawa Barat',
    diseaseResistance: ['Hama putih', 'Busuk batang'],
    optimalTemperature: { min: 22, max: 30 }
  },
  {
    id: '10',
    name: 'Cabai Pelita',
    description: 'Varietas unggulan dengan produktivitas sangat tinggi dan tahan penyakit.',
    image: '/cabai-pelita.jpg',
    type: 'hybrid',
    spiciness: 'medium',
    harvestDays: 82,
    yieldPerHectare: 20000,
    price: 70000,
    features: ['Produktivitas tinggi', 'Tahan penyakit', 'Seragam buah'],
    origin: 'Jepang',
    diseaseResistance: ['Virus mosaik', 'Antraknosa', 'Layu fusarium'],
    optimalTemperature: { min: 25, max: 34 }
  }
];
