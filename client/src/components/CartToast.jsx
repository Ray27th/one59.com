import { Link } from "react-router-dom";

import { useStore } from "../app/store.js";
import { formatPrice } from "../theme.js";
import { CartIcon, CheckIcon, CloseIcon } from "./icons.jsx";

export default function CartToast() {
  const { cart, cartFeedback, dismissCartFeedback } = useStore();

  if (!cartFeedback) {
    return null;
  }

  return (
    <div aria-live="polite" className="cart-toast surface" role="status">
      <div className="cart-toast__icon" aria-hidden="true">
        <CheckIcon size={18} />
      </div>

      <div className="cart-toast__copy">
        <p className="cart-toast__title">{cartFeedback.productName} added to cart</p>
        <p className="fine-copy">
          +{cartFeedback.quantityAdded} item{cartFeedback.quantityAdded === 1 ? "" : "s"} · {cart.count} in cart · {formatPrice(cart.subtotal)}
        </p>
      </div>

      <div className="cart-toast__actions">
        <Link className="btn btn--ghost" to="/cart">
          <CartIcon size={16} />
          View cart
        </Link>

        <button
          aria-label="Dismiss cart confirmation"
          className="cart-toast__close"
          onClick={dismissCartFeedback}
          type="button"
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
