export type Category = 'Аксессуары' | 'Канцелярия' | 'Техника';
export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  /** Цена в целых гривнах (UAH). */
  price: number;
  stock: number;
  art: string;
  color: string;
}
export interface CartItem { product: Product; quantity: number }
export interface CheckoutValues { name: string; email: string; address: string }
export interface Order { id: string }
