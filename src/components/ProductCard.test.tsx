import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { sampleProduct } from '../test/fixtures'

import { ProductCard } from './ProductCard'


describe('ProductCard component', () => {
  it('render ProductCard component', () => {
    const onAdd = vi.fn()
    render(<ProductCard product={sampleProduct} onAdd={onAdd} />)
    expect(screen.getByText(sampleProduct.name)).toBeVisible()
    expect(screen.getByText(sampleProduct.description)).toBeVisible()
    expect(screen.getByText(sampleProduct.category)).toBeVisible()
    expect(screen.getByText('4 200 ₴')).toBeVisible()
    const addToCartButton = screen.getByRole('button', { name: 'Add to cart' })
    expect(addToCartButton).toBeVisible()
    expect(addToCartButton).toBeEnabled()
  })

  it('render ProductCard component add item', async () => {
    const onAdd = vi.fn()
    render(<ProductCard product={sampleProduct} onAdd={onAdd} />)
    const addToCartButton = screen.getByRole('button', { name: 'Add to cart' })
    await userEvent.click(addToCartButton)
    expect(onAdd).toHaveBeenCalledOnce()
    expect(onAdd).toHaveBeenCalledWith(sampleProduct)
  })

  it('render ProductCard component add item with 0 stock', async () => {
    const onAdd = vi.fn()
    render(<ProductCard product={{...sampleProduct, stock: 0}} onAdd={onAdd} />)
    const noOnStockButton = screen.getByRole('button', { name: 'No on stock' })
    await userEvent.click(noOnStockButton)
    expect(onAdd).not.toHaveBeenCalled()
    expect(noOnStockButton).toBeDisabled()
  })
})
