import { useState } from 'react';
import type { CheckoutValues } from '../types';
import { validateCheckout } from '../lib/validation';
import { Button } from './Button';

export function CheckoutForm({ onSubmit, pending, error }: {
  onSubmit: (values: CheckoutValues) => void; pending: boolean; error: string;
}) {
  const [values, setValues] = useState<CheckoutValues>({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutValues, string>>>({});
  return <form className="checkout" noValidate onSubmit={(event) => {
    event.preventDefault();
    if (pending) return;
    const nextErrors = validateCheckout(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSubmit(values);
  }}>
    <h3>Куда доставить?</h3>
    {([['name', 'Имя'], ['email', 'Email'], ['address', 'Адрес доставки']] as const).map(([field, label]) =>
      <div className="field" key={field}>
        <label htmlFor={field}>{label}</label>
        <input id={field} type={field === 'email' ? 'email' : 'text'} value={values[field]}
          autoComplete={field === 'address' ? 'street-address' : field}
          aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined}
          onChange={(event) => setValues({ ...values, [field]: event.target.value })} />
        {errors[field] && <span id={`${field}-error`} className="error" role="alert">{errors[field]}</span>}
      </div>)}
    {error && <p className="error" role="alert">{error}</p>}
    <Button type="submit" loading={pending}>Подтвердить заказ</Button>
    <p className="small muted">Учебный заказ. Оплата и реальные доставки отсутствуют.</p>
  </form>;
}
