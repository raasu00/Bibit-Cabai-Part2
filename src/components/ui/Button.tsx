import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon | 'whatsapp';
  children: ReactNode;
  href?: string;
  external?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  href,
  external = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    whatsapp: 'btn-whatsapp'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const renderIcon = () => {
    if (Icon === 'whatsapp') {
      return <FaWhatsapp className="w-5 h-5" />;
    }
    if (Icon) {
      return <Icon className="w-5 h-5" />;
    }
    return null;
  };

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...(props as any)}
      >
        {renderIcon()}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {renderIcon()}
      {children}
    </button>
  );
};
