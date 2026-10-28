import type { CartItem, CheckoutValues, Order, Product } from '../types';

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch('/api/products', { signal });
  if (!response.ok) throw new Error('Не удалось загрузить товары');
  return response.json();
}

export async function createOrder(customer: CheckoutValues, items: CartItem[], coupon: string): Promise<Order> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: Object.fromEntries(Object.entries(customer).map(([key, value]) => [key, value.trim()])),
      items: items.map(({ product, quantity }) => ({ id: product.id, quantity })),
      coupon,
    }),
  });
  if (!response.ok) throw new Error('Не удалось оформить заказ. Попробуйте ещё раз.');
  return response.json();
}
