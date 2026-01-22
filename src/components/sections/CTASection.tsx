import React from 'react';
import { ArrowRight, CheckCircle, Shield, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface CTASectionProps {
  variant?: 'primary' | 'secondary' | 'success';
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  features?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  variant = 'primary',
  title,
  subtitle,
  buttonText,
  buttonLink = '#contact',
  features,
  className = '',
}) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const variantStyles = {
    primary: {
      bg: 'bg-gradient-to-r from-agriculture-500 to-agriculture-600',
      button: 'bg-white text-agriculture-600 hover:bg-gray-100',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      button: 'bg-white text-orange-600 hover:bg-gray-100',
      text: 'text-white',
    },
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-green-600',
      button: 'bg-white text-green-600 hover:bg-gray-100',
      text: 'text-white',
    },
  };

  const defaultFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: 'Quality Guaranteed',
    },
    {
      icon: <Truck className="w-5 h-5" />,
      text: 'Free Delivery',
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: 'Expert Support',
    },
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <section className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px',
        }} />
      </div>
      
      <div className={`relative ${variantStyles[variant].bg} p-8 md:p-12`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${variantStyles[variant].text}`}>
                {title || t('cta.ready.title')}
              </h2>
              <p className={`text-lg mb-6 opacity-90 ${variantStyles[variant].text}`}>
                {subtitle || t('cta.ready.subtitle')}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {displayFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${variantStyles[variant].text} bg-white/20 backdrop-blur-sm`}
                  >
                    <span className="opacity-90">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buttonLink}
                  className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${variantStyles[variant].button} shadow-lg`}
                  aria-label={buttonText || t('cta.ready.button')}
                >
                  <span>{buttonText || t('cta.ready.button')}</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <button
                  className={`px-6 py-3 rounded-lg font-medium border-2 ${variantStyles[variant].text} border-white/30 hover:border-white/60 transition-colors backdrop-blur-sm`}
                  onClick={() => window.open('tel:+628984338479', '_blank')}
                  aria-label="Call us directly"
                >
                  Call: 0898-4338-479
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/cabai-merah-keriting.jpg"
                  alt="Quality chili seeds"
                  className="rounded-xl shadow-2xl w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm" />
              
              {/* Stats overlay */}
              <div className="absolute -bottom-4 right-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-chili-600">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
