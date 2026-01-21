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
          <
