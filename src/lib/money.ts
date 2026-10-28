import type { CartItem } from '../types';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency', currency: 'UAH', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0,
  }).format(value);
}

export function calculateTotals(items: CartItem[], coupon: string = '') {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = coupon.trim().toUpperCase() === 'DESK10' ? Math.round(subtotal * 0.1) : 0;
  // Delivery threshold is measured BEFORE discount.
  const delivery = subtotal === 0 || subtotal >= 5000 ? 0 : 300;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}
