import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, loading = false, disabled, variant = 'primary', type = 'button', ...props }: Props) {
  return <button {...props} type={type} className={`button button--${variant} ${props.className ?? ''}`}
    disabled={disabled || loading} aria-busy={loading}>
    {loading ? 'Loading…' : children}
  </button>;
}
