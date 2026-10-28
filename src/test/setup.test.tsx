import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

// Infrastructure check only. The exercises intentionally have no solutions yet.
describe('Тестовое окружение', () => {
  it('рендерит React и подключает DOM matchers', () => {
    render(<p>Окружение готово</p>);
    expect(screen.getByText('Окружение готово')).toBeInTheDocument();
  });
});
