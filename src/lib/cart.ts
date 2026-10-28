import type { CartItem, Product } from '../types';

export const CART_KEY = 'deskshop.cart.v1';
export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'quantity'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      if (action.product.stock < 1) return state;
      const existing = state.find((item) => item.product.id === action.product.id);
      return existing
        ? state.map((item) => item.product.id === action.product.id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) } : item)
        : [...state, { product: action.product, quantity: 1 }];
    }
    case 'quantity':
      if (!Number.isInteger(action.quantity)) return state;
      return state.map((item) => item.product.id === action.id
        ? { ...item, quantity: Math.max(1, Math.min(action.quantity, item.product.stock)) } : item);
    case 'remove': return state.filter((item) => item.product.id !== action.id);
    case 'clear': return [];
  }
}

export function loadCart(): CartItem[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    if (!Array.isArray(data)) return [];
    return data.filter((item): item is CartItem =>
      !!item && typeof item.product?.id === 'string' && typeof item.product.name === 'string'
      && Number.isFinite(item.product.price) && item.product.price >= 0
      && Number.isInteger(item.product.stock) && Number.isInteger(item.quantity)
      && item.quantity > 0 && item.quantity <= item.product.stock);
  } catch { return []; }
}
