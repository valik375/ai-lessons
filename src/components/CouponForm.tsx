import { useState } from 'react';
import { Button } from './Button';

export function CouponForm({ onApply }: { onApply: (coupon: string) => void }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  return <form className="coupon" onSubmit={(event) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    const valid = normalized === 'DESK10';
    setInvalid(!valid);
    setMessage(valid ? 'Промокод применён: скидка 10%' : 'Промокод не найден');
    onApply(valid ? normalized : '');
  }}>
    <label htmlFor="coupon">Промокод</label>
    <div className="input-row">
      <input id="coupon" value={code} onChange={(event) => setCode(event.target.value)}
        placeholder="Попробуйте DESK10" aria-invalid={invalid} aria-describedby={message ? 'coupon-message' : undefined} />
      <Button type="submit" variant="secondary">Применить</Button>
    </div>
    {message && <p id="coupon-message" className={invalid ? 'error' : 'success'} role={invalid ? 'alert' : 'status'}>{message}</p>}
  </form>;
}
