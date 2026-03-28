import { MinusIcon, PlusIcon } from "./icons.jsx";

export default function QuantityStepper({ onChange, onDecrease, onIncrease, value }) {
  const handleInputChange = (event) => {
    const nextValue = Math.floor(Number(event.target.value));

    if (!Number.isFinite(nextValue) || nextValue < 1) {
      onChange?.(1);
      return;
    }

    onChange?.(nextValue);
  };

  return (
    <div className="stepper">
      <button aria-label="Decrease quantity" className="icon-btn icon-btn--soft" onClick={onDecrease} type="button">
        <MinusIcon />
      </button>

      <input
        aria-label="Quantity"
        className="stepper__input"
        inputMode="numeric"
        min="1"
        onChange={handleInputChange}
        type="number"
        value={value}
      />

      <button aria-label="Increase quantity" className="icon-btn icon-btn--soft" onClick={onIncrease} type="button">
        <PlusIcon />
      </button>
    </div>
  );
}
