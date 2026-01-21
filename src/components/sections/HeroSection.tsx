import React from 'react';
import { ArrowRight, Shield, Trophy, Users } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  showButtons?: boolean;
  showStats?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage = "/cabai-merah-keriting.jpg",
  showButtons = true,
  showStats = false,
}) => {
  const stats = [
    { icon: Users, value: '500+', label: 'Petani Bergabung' },
    { icon: Trophy, value: '98%', label: 'Kepuasan Pelanggan' },
    { icon: Shield, value: '10', label: 'Varietas Unggulan' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-agriculture-900/90 to-agriculture-800/80" />
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-agriculture-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-agriculture-100 text-sm font-medium">
              🌱 Spesialis Bibit Cabai Unggul
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight fade-in-up">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-agriculture-100 mb-10 fade-in-up" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>

          {/* Buttons */}
          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                href="#varieties"
                size="lg"
                className="bg-white text-agriculture-700 hover:bg-gray-100 px-8 py-4 text-lg"
                icon={ArrowRight}
              >
                Lihat Varietas
              </Button>
              <Button
                href="https://wa.me/628984338479"
                external
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
                className="px-8 py-4 text-lg"
              >
                Konsultasi Gratis
              </Button>
            </div>
          )}

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20 fade-in-up" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-agriculture-300 mr-2" />
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-sm text-agriculture-200">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 text-white"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};
