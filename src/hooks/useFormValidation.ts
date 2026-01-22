import { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: string) => string | undefined;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleBlur: (field: string) => void;
  validateField: (field: string, value: string, rules: ValidationRules) => string | undefined;
  validateForm: () => boolean;
  resetValidation: () => void;
}

const useFormValidation = (initialFields: Record<string, string> = {}): ValidationResult => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone);
  };

  const validateField = useCallback((
    field: string,
    value: string,
    rules: ValidationRules
  ): string | undefined => {
    if (rules.required && !value.trim()) {
      return t('validation.required');
    }

    if (value.trim()) {
      if (rules.minLength && value.length < rules.minLength) {
        return t('validation.minLength').replace('{min}', rules.minLength.toString());
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return t('validation.maxLength').replace('{max}', rules.maxLength.toString());
      }

      if (rules.email && !validateEmail(value)) {
        return t('validation.email');
      }

      if (rules.phone && !validatePhone(value)) {
        return t('validation.phone');
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Invalid format';
      }

      if (rules.custom) {
        return rules.custom(value);
      }
    }

    return undefined;
  }, [t]);

  const validateForm = useCallback((): boolean => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    isValid: validateForm(),
    errors,
    touched,
    handleBlur,
    validateField,
    validateForm,
    resetValidation,
  };
};

export default useFormValidation;
