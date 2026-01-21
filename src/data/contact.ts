import { ContactInfo, BusinessHours } from '../types';

export const contactInfo: ContactInfo[] = [
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '0898-4338-479',
    link: 'https://wa.me/628984338479',
    icon: 'whatsapp'
  },
  {
    type: 'phone',
    label: 'Telepon',
    value: '0898-4338-479',
    link: 'tel:08984338479',
    icon: 'phone'
  },
  {
    type: 'email',
    label: 'Email',
    value: 'info@bibitcabai.com',
    link: 'mailto:info@bibitcabai.com',
    icon: 'mail'
  },
  {
    type: 'instagram',
    label: 'Instagram',
    value: '@BibitCabai.id',
    link: 'https://instagram.com/BibitCabai.id',
    icon: 'instagram'
  },
  {
    type: 'location',
    label: 'Lokasi',
    value: 'Temanggung, Jawa Tengah',
    link: 'https://maps.app.goo.gl/wQ82XwyLNZpqGcN49',
    icon: 'map-pin'
  }
];

export const businessHours: BusinessHours[] = [
  { day: 'Senin - Jumat', hours: '09:00 - 17:00 WIB' },
  { day: 'Sabtu - Minggu', hours: '09:00 - 15:00 WIB' },
  { day: 'WhatsApp 24/7', hours: '19 jam selama 7 hari' }
];

export const serviceAreas = [
  'Temanggung-Magelang',
  'Temanggung-Semarang',
  'Temanggung-Pekalongan',
  'Pengiriman seluruh Indonesia'
];

export const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9853962497696!2d110.16877677467236!3d-7.063491092939174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e7792a2a326d3f5!2sTemanggung%2C%20Jawa%20Tengah%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1647856789015!5m2!1sen!2sus";
