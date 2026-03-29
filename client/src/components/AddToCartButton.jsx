import { useStore } from "../app/store.js";
import { CartIcon, CheckIcon } from "./icons.jsx";

const getProductKey = (product) => product?.sku || product?.slug;

export default function AddToCartButton({
  className = "",
  label = "Add to cart",
  product,
  quantity = 1,
  variant = "primary",
}) {
  const { addToCart, cartFeedback } = useStore();
  const isRecentlyAdded = cartFeedback?.itemKey === getProductKey(product);
  const variantClass = isRecentlyAdded
    ? "btn--success"
    : variant === "accent"
      ? "btn--accent"
      : "btn--primary";

  const buttonLabel = isRecentlyAdded ? "Added" : label;

  return (
    <button
      className={`btn ${variantClass} ${className}`.trim()}
      onClick={() => addToCart(product, quantity)}
      type="button"
    >
      {isRecentlyAdded ? <CheckIcon size={16} /> : <CartIcon size={16} />}
      {buttonLabel}
    </button>
  );
}
