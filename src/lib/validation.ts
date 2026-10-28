import type { CheckoutValues } from '../types';

export function validateCheckout(values: CheckoutValues) {
  const errors: Partial<Record<keyof CheckoutValues, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Введите имя: минимум 2 символа';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Введите корректный email';
  if (values.address.trim().length < 10) errors.address = 'Введите адрес: минимум 10 символов';
  return errors;
}
