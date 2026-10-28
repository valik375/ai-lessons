import { describe, it, expect } from "vitest";

import { formatPrice, calculateTotals } from './money'
import { sampleProduct } from '../test/fixtures'

describe('lib money.ts', () => {
  it('formatPrice function', () => {
    expect(formatPrice(800)).toBe('800 ₴')
    expect(formatPrice(4500)).toBe('4 500 ₴')
  })

  it('calculateTotals function with shiping', () => {
    const { total, subtotal, discount, delivery } = calculateTotals([{ product: sampleProduct, quantity: 1 }])
    expect(total).toEqual(4500)
    expect(subtotal).toEqual(4200)
    expect(discount).toEqual(0)
    expect(delivery).toEqual(300)
  })

    it('calculateTotals function shiping included', () => {
      const { total, subtotal, discount, delivery } = calculateTotals([{ product: sampleProduct, quantity: 2 }])
      expect(total).toEqual(8400)
      expect(subtotal).toEqual(8400)
      expect(discount).toEqual(0)
      expect(delivery).toEqual(0)
    })

    it('calculateTotals function with shiping and discount', () => {
      const { total, subtotal, discount, delivery } = calculateTotals([{ product: sampleProduct, quantity: 1 }], 'DESK10')
      expect(total).toEqual(4080)
      expect(subtotal).toEqual(4200)
      expect(discount).toEqual(420)
      expect(delivery).toEqual(300)
    })

    it('calculateTotals function shiping included and discount', () => {
      const { total, subtotal, discount, delivery } = calculateTotals([{ product: sampleProduct, quantity: 2 }], 'DESK10')
      expect(total).toEqual(7560)
      expect(subtotal).toEqual(8400)
      expect(discount).toEqual(840)
      expect(delivery).toEqual(0)
    })
})
