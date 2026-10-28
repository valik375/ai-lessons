interface Props { value: number; max: number; onChange: (value: number) => void }

export function QuantityStepper({ value, max, onChange }: Props) {
  return <div className="stepper" role="group" aria-label="Quantity">
    <button type="button" aria-label="Decrease value" disabled={value <= 1} onClick={() => onChange(value - 1)}>−</button>
    <output aria-label="Item quantity">{value}</output>
    <button type="button" aria-label="Increase value" disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
  </div>;
}
