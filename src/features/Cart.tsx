import { useState } from 'react';
import type { Dispatch } from 'react';
import type { CartItem, CheckoutValues } from '../types';
import type { CartAction } from '../lib/cart';
import { createOrder } from '../lib/api';
import { calculateTotals, formatPrice } from '../lib/money';
import { QuantityStepper } from '../components/QuantityStepper';
import { CouponForm } from '../components/CouponForm';
import { CheckoutForm } from '../components/CheckoutForm';
import { Button } from '../components/Button';

export function Cart({ items, dispatch }: { items: CartItem[]; dispatch: Dispatch<CartAction> }) {
  const [coupon, setCoupon] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('');
  const totals = calculateTotals(items, coupon);
  async function submit(values: CheckoutValues) {
    if (pending) return;
    setPending(true); setError('');
    try {
      const result = await createOrder(values, items, coupon);
      setOrder(result.id); dispatch({ type: 'clear' }); setCheckout(false); setCoupon('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Ошибка заказа');
    } finally { setPending(false); }
  }
  return <aside className="cart" aria-labelledby="cart-title">
    <div className="section-heading"><h2 id="cart-title">Ваш набор</h2><span className="cart-count">{items.reduce((n, item) => n + item.quantity, 0)}</span></div>
    {order && <div className="order-success" role="status"><strong>Заказ оформлен!</strong><p>Номер заказа: {order}</p></div>}
    {!items.length ? <div className="empty-cart"><span aria-hidden="true">↗</span><h3>Здесь будет ваш набор</h3><p>Добавьте вещи, с которыми<br />приятнее работать.</p></div>
      : <>
        <fieldset className="cart-controls" disabled={pending}>
          <legend className="sr-only">Товары в корзине</legend>
          <ul className="cart-items">{items.map(({ product, quantity }) => <li key={product.id} aria-label={product.name}>
            <div className="cart-item-top"><strong>{product.name}</strong><button className="remove" type="button" aria-label={`Удалить ${product.name}`}
              onClick={() => dispatch({ type: 'remove', id: product.id })}>×</button></div>
            <div className="cart-item-bottom"><QuantityStepper value={quantity} max={product.stock}
              onChange={(value) => dispatch({ type: 'quantity', id: product.id, quantity: value })} />
              <span>{formatPrice(product.price * quantity)}</span></div>
          </li>)}</ul>
          <CouponForm onApply={setCoupon} />
        </fieldset>
        <dl className="totals"><div><dt>Товары</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
          <div><dt>Скидка</dt><dd>−{formatPrice(totals.discount)}</dd></div>
          <div><dt>Доставка</dt><dd>{totals.delivery ? formatPrice(totals.delivery) : 'Бесплатно'}</dd></div>
          <div className="grand-total"><dt>Итого</dt><dd>{formatPrice(totals.total)}</dd></div></dl>
        {checkout ? <CheckoutForm pending={pending} error={error} onSubmit={submit} />
          : <Button onClick={() => { setCheckout(true); setOrder(''); }}>Оформить заказ <span aria-hidden="true">↗</span></Button>}
      </>}
    <div className="delivery-note"><span aria-hidden="true">◇</span><div><strong>Доставка за наш счёт</strong><p>При заказе от 5 000 ₴ до скидки.</p></div></div>
  </aside>;
}
