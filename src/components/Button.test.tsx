import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button component', () => {

  it('render Button component', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button')
    console.log(button.textContent)
    expect(button).toBeInTheDocument()
    expect(button).toBeVisible()
    expect(button).toHaveTextContent('Save')
  })

    it('render Button component with click', async () => {
      const onButtonClick = vi.fn()
      render(<Button onClick={() => onButtonClick()}>Save</Button>)
      const button = screen.getByRole('button')
      await userEvent.click(button)
      expect(onButtonClick).toHaveBeenCalledTimes(1)
    })

    it('render Button component disabled', async () => {
      const onButtonClick = vi.fn()
      render(<Button disabled onClick={() => onButtonClick()}>Save</Button>)
      const button = screen.getByRole('button')
      await userEvent.click(button)
      expect(button).toBeDisabled()
      expect(onButtonClick).not.toHaveBeenCalled()
    })
// AGENT NOTE: I think this test to hard to understand and long probably it can be better
    it('render Button component loading', async () => {
      const onButtonClick = vi.fn()
      const { rerender } = render(<Button loading onClick={() => onButtonClick()}>Save</Button>)
      const button = screen.getByRole('button')

      await userEvent.click(button)
      expect(button).toBeDisabled()
      expect(button).toHaveTextContent('Loading…')
      expect(button).toHaveAttribute('aria-busy', "true")
      expect(onButtonClick).not.toHaveBeenCalled()

      rerender(<Button loading={false} onClick={() => onButtonClick()}>Save</Button>)
      
      await userEvent.click(button)
      expect(button).toBeEnabled()
      expect(button).toHaveTextContent('Save')
      expect(button).toHaveAttribute('aria-busy', "false")
      expect(onButtonClick).toHaveBeenCalledTimes(1)
    })

})
