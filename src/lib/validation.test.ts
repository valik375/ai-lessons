import { describe, it, expect } from "vitest";

import { validateCheckout } from './validation'

describe('lib validation.ts', () => {
  it('validateCheckout valid', () => {
    const { name, email, address } = validateCheckout({ name: ' An ', email: 'ex@gmail.com', address: 'Street with 10 chars' })
    expect(name).toBeUndefined()
    expect(email).toBeUndefined()
    expect(address).toBeUndefined()
  })

  it('validateCheckout invalid name', () => {
    const { name } = validateCheckout({ name: ' A ', email: 'ex@gmail.com', address: 'Street' })
    expect(name).toBe('Введите имя: минимум 2 символа')
  })

  it('validateCheckout invalid email', () => {
    const error1 = validateCheckout({ name: ' An ', email: 'exgmail.com', address: 'Street' })
    expect(error1.email).toBe('Введите корректный email')
    
    const error2 = validateCheckout({ name: ' An ', email: 'ex@gmailcom', address: 'Street' })
    expect(error2.email).toBe('Введите корректный email')
    
    const error3 = validateCheckout({ name: ' An ', email: '', address: 'Street' })
    expect(error3.email).toBe('Введите корректный email')
  })

  it('validateCheckout invalid address', () => {
    const error1 = validateCheckout({ name: ' An ', email: 'exgmail.com', address: 'Str' })
    expect(error1.address).toBe('Введите адрес: минимум 10 символов')

    const error2 = validateCheckout({ name: ' An ', email: 'exgmail.com', address: '' })
    expect(error2.address).toBe('Введите адрес: минимум 10 символов')
  })
})
