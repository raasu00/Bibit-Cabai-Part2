import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ProductCard } from '../components/sections/ProductCard';
import { PackageCard } from '../components/sections/PackageCard';
import { Layout } from '../components/layout/Layout';
import { varieties } from '../data/varieties';
import { packages } from '../data/packages';
import { 
  CheckCircle, 
  Truck, 
  Headphones, 
  Sprout,
  Shield,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredVarieties = varieties.slice(0, 4);
  
  const features = [
    {
      icon: CheckCircle,
      title: 'Kualitas Terjamin',
      description: 'Bibit melalui proses seleksi ketat dengan kualitas premium',
    },
    {
      icon: Truck,
      title: 'Pengiriman Cepat',
      description: 'Gratis ongkir untuk area tertentu, aman sampai tujuan',
    },
    {
      icon: Headphones,
      title: 'Konsultasi Gratis',
      description: 'Tim ahli siap membantu 24/7 via WhatsApp',
    },
    {
      icon: Sprout,
      title: 'Garansi Tumbuh',
      description: 'Garansi 100% bibit tumbuh sehat',
    },
    {
      icon: Shield,
      title: 'Bebas Penyakit',
      description: 'Bibit sehat bebas penyakit layu dan virus',
    },
    {
      icon: Users,
      title: 'Komunitas Petani',
      description: 'Akses ke grup petani eksklusif untuk sharing',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection
        title="Bibit Cabai Unggul untuk Hasil Panen Melimpah"
        subtitle="Spesialis penyedia bibit cabai berkualitas tinggi dengan varietas terlengkap untuk petani Indonesia."
        showButtons={true}
        showStats={true}
      />

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Mengapa Memilih BibitCabai?</h2>
            <p>Kami berkomitmen memberikan yang terbaik untuk kesuksesan budidaya cabai Anda</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-agriculture-50 p-6 rounded-2xl border border-gray-100 hover:border-agriculture-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-agriculture-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-agriculture-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section bg-gradient-to-b from-white to-agriculture-50">
        <div className="container">
          <div className="section-title">
            <h2>Paket yang Tersedia</h2>
            <p>Pilih paket yang sesuai dengan kebutuhan budidaya cabai Anda</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Varieties */}
      <section id="varieties" className="section bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Varietas Unggulan</h2>
            <p>Beberapa varietas bibit cabai terbaik yang kami sediakan</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVarieties.map((variety) => (
              <ProductCard key={variety.id} variety={variety} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/varieties"
              className="btn btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
            >
              Lihat Semua Varietas
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-agriculture-600 to-agriculture-700">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Memulai Budidaya Cabai?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Konsultasikan kebutuhan bibit cabai Anda dengan tim ahli kami. 
              Dapatkan rekomendasi terbaik untuk hasil panen optimal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/628984338479"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-agriculture-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold"
              >
                💬 Konsultasi Gratis via WhatsApp
              </a>
              <a
                href="tel:08984338479"
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                📞 Telepon Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
