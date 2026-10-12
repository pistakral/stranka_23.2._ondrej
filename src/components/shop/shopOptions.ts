// Spoločné nastavenia e-shopu: adaptéry, spôsoby doručenia, osobný odber.
// POZOR: ceny a názvy adaptérov a dopravy sú aj v netlify/functions/create-order.js
// – pri zmene ich uprav na oboch miestach.

export type PhoneType = 'iphone' | 'android';

// Všetko, čo nie je iPhone, je Android (rovnako ako filter na /eshop)
export const getPhoneType = (name: string): PhoneType =>
  /iphone/i.test(name ?? '') ? 'iphone' : 'android';

export interface AdapterOption {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  forType: PhoneType;
}

export const ADAPTERS: AdapterOption[] = [
  { id: 'iphone-20w', name: 'Nabíjací adaptér 20W', subtitle: 'USB-C Power Adapter', price: 15, forType: 'iphone' },
  { id: 'android-10w', name: 'Nabíjací adaptér 10W', subtitle: 'USB-A Power Adapter', price: 10, forType: 'android' },
];

export type ShippingId = 'posta' | 'osobny';
export type PaymentMethod = 'bank_transfer' | 'cash_on_pickup';

export interface ShippingMethod {
  id: ShippingId;
  name: string;
  description: string;
  price: number;
  payment: PaymentMethod;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'posta',
    name: 'Slovenská pošta – doručenie na adresu',
    description: 'Platba vopred prevodom (aj cez QR kód)',
    price: 0,
    payment: 'bank_transfer',
  },
  {
    id: 'osobny',
    name: 'Osobný odber – Fixanto, Dolná Súča 877',
    description: 'Nič neplatíte vopred – platba pri prevzatí',
    price: 0,
    payment: 'cash_on_pickup',
  },
];

export const PICKUP = {
  name: 'Fixanto',
  street: 'Dolná Súča 877',
  city: '913 32 Dolná Súča',
  hours: ['Po – Pi: 9:00 – 18:00', 'So: 10:00 – 14:00'],
  mapUrl: 'https://maps.app.goo.gl/GGBewDBR787dkxaC7',
  phone: '0949 344 600',
  phoneHref: 'tel:+421949344600',
};