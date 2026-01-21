import React from 'react';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { useMobileMenu } from '../../hooks/useMobileMenu';

export const Header: React.FC = () => {
  const { isMenuOpen, scrolled, toggleMenu, closeMenu } = useMobileMenu();

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Varietas', href: '/varieties' },
    { label: 'Paket', href: '/#packages' },
    { label: 'Kontak', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white py-4'
      }`}
      data-menu="true"
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-agriculture-500 to-agriculture-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-agriculture-500/25 transition-shadow">
              <span className="text-2xl text-white">🌶️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 leading-tight">
                Bibit<span className="text-agriculture-600">Cabai</span>
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Solusi Perbibitan Unggul
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-agriculture-600 font-medium transition-colors relative group py-2"
                onClick={closeMenu}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-agriculture-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              href="tel:08984338479"
              variant="outline"
              size="sm"
              icon={Phone}
            >
              Telepon
            </Button>
            <Button
              href="https://wa.me/628984338479"
              external
              variant="whatsapp"
              size="sm"
              icon="whatsapp"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden fixed inset-x-0 top-20 bg-white shadow-xl rounded-b-2xl
            transition-all duration-300 transform origin-top
            ${isMenuOpen
              ? 'opacity-100 visible scale-y-100'
              : 'opacity-0 invisible scale-y-95'
            }
          `}
          data-menu="true"
        >
          <div className="container py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:text-agriculture-600 hover:bg-agriculture-50 rounded-lg font-medium transition-colors"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                href="tel:08984338479"
                variant="outline"
                fullWidth
                icon={Phone}
                onClick={closeMenu}
              >
                Telepon Kami
              </Button>
              <Button
                href="https://wa.me/628984338479"
                external
                variant="whatsapp"
                fullWidth
                icon="whatsapp"
                onClick={closeMenu}
              >
                Pesan via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
