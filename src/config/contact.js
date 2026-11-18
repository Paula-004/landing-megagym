export const whatsappUrl =
  'https://wa.me/5493446670344?text=Hola%20MegaGym%2C%20quiero%20recibir%20informaci%C3%B3n%20para%20asociarme.';

export const whatsappPhone = '5493446670344';

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}
