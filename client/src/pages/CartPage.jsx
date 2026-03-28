import { Link } from "react-router-dom";

import { useStore } from "../app/store.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import EmptyState from "../components/EmptyState.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import ProductImage from "../components/ui/ProductImage.jsx";
import { formatPrice } from "../theme.js";

export default function CartPage() {
  const { cart, cartFeedback, clearCart, removeFromCart, updateCartQuantity } = useStore();

  if (!cart.lineItems.length) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            action={
              <div className="button-row" style={{ justifyContent: "center" }}>
                <Link className="btn btn--primary" to="/shop">
                  Start shopping
                </Link>
                <Link className="btn btn--ghost" to="/drops">
                  Browse drops
                </Link>
              </div>
            }
            body="Your cart is empty. Start with the catalogue or the latest drops and build your room from there."
            title="No items in cart yet"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />

        <div className="cart-heading surface">
          <div className="cart-heading__copy">
            <span className="eyebrow">Your cart</span>
            <h1 className="page-title">Review your order before guest checkout.</h1>
            <p className="lede">Adjust quantities directly, remove items cleanly, and keep the shipping and support truths visible before the next step.</p>

            <div className="badge-row">
              <span className="badge badge--dark">GST included</span>
              <span className="badge">3 to 5 day delivery</span>
              <span className="badge">7-day returns</span>
            </div>
          </div>

          <div className="cart-heading__aside">
            <div className="mini-card cart-heading__metric">
              <span className="fine-copy">Items subtotal</span>
              <span className="price-text">{formatPrice(cart.subtotal)}</span>
              <span className="body-copy">
                {cart.count} item{cart.count === 1 ? "" : "s"} across {cart.uniqueCount} product{cart.uniqueCount === 1 ? "" : "s"}
              </span>
            </div>

            <div className="button-row">
              <Link className="btn btn--ghost" to="/shop">
                Continue shopping
              </Link>
              <button className="btn btn--ghost" onClick={clearCart} type="button">
                Clear cart
              </button>
            </div>
          </div>
        </div>

        <div className="cart-layout">
          <div className="cart-card surface">
            <div className="cart-list">
              {cart.lineItems.map((item) => (
                <div
                  className={`cart-item${cartFeedback?.itemKey === item.itemKey ? " cart-item--highlight" : ""}`}
                  key={item.itemKey}
                  style={{ "--item-accent": `var(--tone-${item.product.tone})` }}
                >
                  <Link className="cart-item__media" to={`/product/${item.product.slug}`}>
                    <ProductImage objectFit="contain" product={item.product} />
                  </Link>

                  <div className="cart-item__details">
                    <div className="cart-item__header">
                      <div>
                        <p className="fine-copy">{item.product.category.name}</p>
                        <Link className="cart-item__title-link" to={`/product/${item.product.slug}`}>
                          <h2 className="cart-item__title">{item.product.name}</h2>
                        </Link>
                      </div>

                      <div className="badge-row">
                        <span className="badge">GST included</span>
                        <span className="badge">Mainland Singapore only</span>
                      </div>
                    </div>

                    <p className="body-copy">{item.product.summary}</p>

                    <div className="cart-item__footer">
                      <div className="cart-item__controls">
                        <span className="fine-copy">Quantity</span>
                        <QuantityStepper
                          onChange={(nextValue) => updateCartQuantity(item.itemKey, nextValue)}
                          onDecrease={() => updateCartQuantity(item.itemKey, Math.max(1, item.quantity - 1))}
                          onIncrease={() => updateCartQuantity(item.itemKey, item.quantity + 1)}
                          value={item.quantity}
                        />
                      </div>

                      <button className="cart-item__remove" onClick={() => removeFromCart(item.itemKey)} type="button">
                        Remove item
                      </button>
                    </div>
                  </div>

                  <div className="cart-item__price-stack">
                    <span className="fine-copy">{formatPrice(item.unitPrice)} each</span>
                    <span className="price-text">{formatPrice(item.lineTotal)}</span>
                    <Link className="btn btn--ghost" to={`/product/${item.product.slug}`}>
                      View product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="summary-card surface">
            <span className="eyebrow">Order summary</span>

            <div className="summary-row">
              <span className="body-copy">Items</span>
              <strong>{cart.count}</strong>
            </div>
            <div className="summary-row">
              <span className="body-copy">Distinct products</span>
              <span>{cart.uniqueCount}</span>
            </div>
            <div className="summary-row">
              <span className="body-copy">GST</span>
              <span>Included</span>
            </div>
            <div className="summary-row">
              <span className="body-copy">Delivery</span>
              <span>Flat mainland SG service</span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-total-label">Items subtotal</span>
              <span className="price-text">{formatPrice(cart.subtotal)}</span>
            </div>

            <div className="mini-card">
              <span className="eyebrow">Before checkout</span>
              <p className="body-copy">Guest checkout currently collects your details only. No payment is taken, no inventory is reserved, and no order email is sent from this storefront yet.</p>
            </div>

            <div className="button-row">
              <Link className="btn btn--primary" to="/checkout">
                Continue to checkout
              </Link>
              <Link className="btn btn--ghost" to="/contact">
                Ask a question first
              </Link>
            </div>

            <div className="cart-support-grid">
              <div className="mini-card">
                <span className="eyebrow">Delivery</span>
                <p className="body-copy">Standard delivery stays at 3 to 5 days and mainland Singapore only.</p>
              </div>

              <div className="mini-card">
                <span className="eyebrow">Returns</span>
                <p className="body-copy">7-day returns are supported, with customer-paid change-of-mind return delivery.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
