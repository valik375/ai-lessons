import { describe, expect, it, vi } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuantityStepper } from './QuantityStepper'

describe('Quantity Stepper component', () => {
  it('render Quantity Stepper component increment value', async () => {
    const onChange = vi.fn()
    render(<QuantityStepper value={2} max={5} onChange={onChange} />)
    const output = screen.getByRole('status', { name: 'Item quantity' });
    expect(output).toHaveTextContent('2')

    const stepperIncrementButton = screen.getByRole('button', { name: 'Increase value' })
    await userEvent.click(stepperIncrementButton)
    expect(onChange).toHaveBeenCalledWith(3)
  })
  
  it('render Quantity Stepper component decrement value', async () => {
    const onChange = vi.fn()
    render(<QuantityStepper value={2} max={5} onChange={onChange} />)
    const output = screen.getByRole('status', { name: 'Item quantity' });
    expect(output).toHaveTextContent('2')

    const stepperDecrementButton = screen.getByRole('button', { name: 'Decrease value' })
    await userEvent.click(stepperDecrementButton)
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('render Quantity Stepper component disable decrement', async () => {
    const onChange = vi.fn()
    render(<QuantityStepper value={1} max={5} onChange={onChange} />)

    const stepperDecrementButton = screen.getByRole('button', { name: 'Decrease value' })
    await userEvent.click(stepperDecrementButton)
    expect(stepperDecrementButton).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('render Quantity Stepper component disable increment', async () => {
    const onChange = vi.fn()
    render(<QuantityStepper value={5} max={5} onChange={onChange} />)

    const stepperIncrementButton = screen.getByRole('button', { name: 'Increase value' })
    await userEvent.click(stepperIncrementButton)
    expect(stepperIncrementButton).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
  })
  
  it('render Quantity Stepper component disable buttons', async () => {
    const onChange = vi.fn()
    render(<QuantityStepper value={1} max={1} onChange={onChange} />)

    const stepperIncrementButton = screen.getByRole('button', { name: 'Increase value' })
    await userEvent.click(stepperIncrementButton)
    expect(stepperIncrementButton).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
    
    const stepperDecrementButton = screen.getByRole('button', { name: 'Decrease value' })
    await userEvent.click(stepperDecrementButton)
    expect(stepperDecrementButton).toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
  })
})
