import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import FormInput from '../components/ui/FormInput';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useFormValidation from '../hooks/useFormValidation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const { errors, touched, handleBlur, validateField } = useFormValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    const nameError = validateField('name', formData.name, { required: true, minLength: 2 });
    if (nameError) newErrors.name = nameError;

    // Validate email
    const emailError = validateField('email', formData.email, { required: true, email: true });
    if (emailError) newErrors.email = emailError;

    // Validate phone
    const phoneError = validateField('phone', formData.phone, { required: true, phone: true });
    if (phoneError) newErrors.phone = phoneError;

    // Validate message
    const messageError = validateField('message', formData.message, { required: true, minLength: 10 });
    if (messageError) newErrors.message = messageError;

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      Object.keys(formData).forEach(field => handleBlur(field));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.address'),
      content: 'Jl. Raya Temanggung Km. 5, Temanggung, Jawa Tengah 56212',
      link: 'https://maps.google.com/?q=Temanggung+Jawa+Tengah'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.info.phone'),
      content: '+62 898-4338-479',
      link: 'tel:+628984338479'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.email'),
      content: 'info@bibitcabai.com',
      link: 'mailto:info@bibitcabai.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('contact.info.workingHours'),
      content: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Thank you for your message!
                </h3>
                <p className="text-green-700 dark:text-green-400">
                  We've received your inquiry and will get back to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slideInLeft">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-agriculture-100 to-agriculture-50 dark:from-agriculture-900/30 dark:to-agriculture-800/30 text-agriculture-600 dark:text-agriculture-400 mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-agriculture-600 dark:hover:text-agriculture-400 transition-colors"
                        >
                          {info.content.split('\n').map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.content.split('\n').map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Location
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Visit us at our farm and nursery in Temanggung
                </p>
              </div>
              <div className="h-64 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.715242495122!2d110.1937323153203!3d-7.270168794757312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c2b4b2b2b2b%3A0x2e708c2b4b2b2b2b!2sTemanggung%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1621234567890!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps location"
                  aria-label="Google Maps showing our location in Temanggung, Jawa Tengah"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slideInRight">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  type="text"
                  name="name"
                  label={t('contact.form.name')}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  touched={touched.name}
                  required
                  minLength={2}
                  maxLength={100}
                />

                <FormInput
                  type="email"
                  name="email"
                  label={t('contact.form.email')}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  required
                />

                <FormInput
                  type="tel"
                  name="phone"
                  label={t('contact.form.phone')}
                  placeholder="+62 812-3456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  error={errors.phone}
                  touched={touched.phone}
                  required
                />

                <FormInput
                  name="message"
                  label={t('contact.form.message')}
                  placeholder="Tell us about your farming needs or ask any questions..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  error={errors.message}
                  touched={touched.message}
                  required
                  multiline
                  rows={5}
                  minLength={10}
                  maxLength={1000}
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-agriculture-500 to-agriculture-600 hover:from-agriculture-600 hover:to-agriculture-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    By submitting this form, you agree to our privacy policy.
                    We'll never share your information with third parties.
                  </p>
                </div>
              </form>

              {/* Alternative Contact */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Prefer to contact directly?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/628984338479"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+628984338479"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>What are your delivery options?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fadeIn">
                    We offer free delivery within Temanggung area. For other regions, we partner with various logistics providers to ensure safe delivery of your chili seeds.
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>Do you provide farming consultation?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fadeIn">
                    Yes! We offer free basic consultation for all our customers. For advanced farming techniques, we have partnership programs with agricultural experts.
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <span>What is your return policy?</span>
                    <span className="transition group-open:rotate-180">▼</span>
                  </summary>
                  <div className="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fadeIn">
                    We offer a 30-day return policy for unopened seed packages. For germination issues, please contact us within 14 days of planting.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
