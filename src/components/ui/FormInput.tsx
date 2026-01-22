import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FormInputProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  rows?: number;
  multiline?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  inputClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  required = false,
  disabled = false,
  minLength,
  maxLength,
  pattern,
  autoComplete,
  rows = 3,
  multiline = false,
  showPasswordToggle = false,
  className = '',
  inputClassName = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const inputType = showPasswordToggle && type === 'password' && showPassword ? 'text' : type;

  const InputComponent = multiline ? 'textarea' : 'input';

  const inputProps = {
    ref: inputRef as any,
    id: name,
    name,
    type: inputType,
    value,
    onChange,
    onBlur: (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    onFocus: () => setIsFocused(true),
    placeholder,
    disabled,
    required,
    minLength,
    maxLength,
    pattern,
    autoComplete,
    className: `
      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-white
      placeholder-gray-500 dark:placeholder-gray-400
      ${error && touched ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
      ${isFocused ? 'ring-2 ring-opacity-50' : ''}
      ${isFocused && !error ? 'ring-chili-500 border-chili-500' : ''}
      ${isFocused && error ? 'ring-red-500' : ''}
      ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'}
      focus:outline-none focus:shadow-lg
      ${multiline ? 'resize-y min-h-[100px]' : ''}
      ${inputClassName}
    `,
    ...(multiline && { rows }),
  };

  const shouldShowError = error && touched;
  const isValid = !error && touched && value.trim() !== '';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {multiline ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {isValid && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>
      
      {shouldShowError && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {maxLength && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
      
      {/* Accessibility: Error message for screen readers */}
      {shouldShowError && (
        <div role="alert" className="sr-only">
          {t('validation.required')}: {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
