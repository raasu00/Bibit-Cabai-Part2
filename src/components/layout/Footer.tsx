import React from 'react';
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Youtube 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produk: [
      { label: 'Varietas Cabai', href: '/varieties' },
      { label: 'Paket Petani', href: '/#packages' },
      { label: 'Bibit Unggulan', href: '/#products' },
      { label: 'Pupuk Organik', href: '/#products' },
    ],
    perusahaan: [
      { label: 'Tentang Kami', href: '/about' },
      { label: 'Blog & Artikel', href: '/blog' },
      { label: 'Testimonial', href: '/#testimonials' },
      { label: 'Karir', href: '/careers' },
    ],
    bantuan: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Panduan Budidaya', href: '/guide' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'Kebijakan Privasi', href: '/privacy' },
    ],
  };

  const contactInfo = [
    { icon: Phone, label: 'Telepon', value: '0898-4338-479', href: 'tel:08984338479' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: '0898-4338-479', href: 'https://wa.me/628984338479' },
    { icon: Mail, label: 'Email', value: 'info@bibitcabai.com', href: 'mailto:info@bibitcabai.com' },
    { icon: MapPin, label: 'Alamat', value: 'Temanggung, Jawa Tengah', href: 'https://maps.app.goo.gl/wQ82XwyLNZpqGcN49' },
    { icon: Clock, label: 'Jam Operasional', value: 'Senin-Minggu: 08.00-17.00 WIB' },
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/BibitCabai' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/BibitCabai.id' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/628984338479' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@BibitCabai' },
  ];

  return (
    <footer className="bg-gradient-to-b from-agriculture-900 to-agriculture-950 text-white">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌶️</span>
              </div>
              <div>
                <div className="text-2xl font-bold">Bibit<span className="text-orange-400">Cabai</span></div>
                <div className="text-sm text-agriculture-300">Solusi Perbibitan Unggul</div>
              </div>
            </a>
            <p className="text-agriculture-300 mb-6">
              Spesialis bibit cabai unggul dengan kualitas premium untuk mendukung kesuksesan pertanian Indonesia.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Produk</h3>
            <ul className="space-y-3">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-agriculture-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-agriculture-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Hubungi Kami</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.label} className="flex items-start">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-agriculture-300 hover:text-white transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-agriculture-300">{info.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-agriculture-300 text-sm mb-4 md:mb-0">
              &copy; {currentYear} BibitCabai. Hak Cipta Dilindungi.
            </div>
            <div className="text-agriculture-300 text-sm">
              Dibuat dengan ❤️ untuk petani Indonesia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
