import { Package } from '../types';

export const packages: Package[] = [
  {
    id: 1,
    name: "Paket Petani Pemula",
    description: "Paket lengkap untuk memulai budidaya cabai",
    image: "/paket-petani-pemula.jpg",
    price: 250000,
    quantity: "100 bibit",
    features: [
      "2 Varietas cabai pilihan",
      "Bibit usia 21 hari siap tanam",
      "Konsultasi via WhatsApp 1 bulan",
      "Bonus pupuk organik 5 kg",
      "Panduan budidaya dasar"
    ],
    buttonText: "Pesan Sekarang",
    buttonLink: "https://wa.me/628984338479?text=Halo%20BibitCabai,%20saya%20ingin%20pesan%20Paket%20Petani%20Pemula",
    color: "bg-agriculture-700"
  },
  {
    id: 2,
    name: "Paket Petani Professional",
    description: "Paket komprehensif untuk petani berpengalaman",
    image: "/paket-petani-professional.jpg",
    price: 2500000,
    quantity: "1250 bibit",
    features: [
      "5 Varietas cabai unggulan",
      "Bibit usia 21 hari siap tanam",
      "Konsultasi dengan ahli 2 bulan",
      "Bonus pupuk organik 10 kg",
      "Akses ke grup petani eksklusif",
      "Panduan budidaya lengkap",
      "Support teknis 24/7"
    ],
    buttonText: "Pesan Sekarang",
    buttonLink: "https://wa.me/628984338479?text=Halo%20BibitCabai,%20saya%20ingin%20pesan%20Paket%20Petani%20Professional",
    color: "bg-orange-500"
  }
];
