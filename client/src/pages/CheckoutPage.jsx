import { useState } from "react";
import { Link } from "react-router-dom";

import { useStore } from "../app/store.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { formatPrice } from "../theme.js";

const initialForm = {
  email: "",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  unit: "",
  postalCode: "",
  deliveryNotes: "",
};

export default function CheckoutPage() {
  const { cart } = useStore();
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  if (!cart.lineItems.length) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            action={
              <Link className="btn btn--primary" to="/shop">
                Build a cart first
              </Link>
            }
            body="Add a few pieces to your cart first, then come back to complete your guest details."
            title="Cart required for checkout"
          />
        </div>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

        <div className="checkout-layout">
          <form className="cart-card surface" onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
              <span className="eyebrow">Guest checkout</span>
              <h1 className="page-title">Fast checkout, no account required.</h1>
              <p className="lede">
                Enter your email, name, phone number, and delivery address so One59 has the details needed to prepare your order.
              </p>
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" onChange={handleChange} required type="email" value={formData.email} />
              </div>

              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" onChange={handleChange} required type="text" value={formData.fullName} />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" onChange={handleChange} required type="tel" value={formData.phone} />
              </div>

              <div className="field">
                <label htmlFor="postalCode">Postal code</label>
                <input id="postalCode" name="postalCode" onChange={handleChange} required type="text" value={formData.postalCode} />
              </div>

              <div className="field field--full">
                <label htmlFor="addressLine1">Address line 1</label>
                <input id="addressLine1" name="addressLine1" onChange={handleChange} required type="text" value={formData.addressLine1} />
              </div>

              <div className="field field--full">
                <label htmlFor="addressLine2">Address line 2</label>
                <input id="addressLine2" name="addressLine2" onChange={handleChange} type="text" value={formData.addressLine2} />
              </div>

              <div className="field">
                <label htmlFor="unit">Unit / block</label>
                <input id="unit" name="unit" onChange={handleChange} type="text" value={formData.unit} />
              </div>

              <div className="field field--full">
                <label htmlFor="deliveryNotes">Delivery notes</label>
                <textarea id="deliveryNotes" name="deliveryNotes" onChange={handleChange} value={formData.deliveryNotes} />
              </div>
            </div>

            <div className="mini-card" style={{ marginTop: "var(--space-6)" }}>
              <span className="eyebrow">Payment update</span>
              <p className="body-copy">
                Online payment is not yet enabled here. You can submit your guest details today, and payment and order confirmation steps will be added once they go live.
              </p>
            </div>

            <div className="checkout-actions" style={{ marginTop: "var(--space-6)" }}>
              <button className="btn btn--primary" type="submit">
                Submit guest checkout
              </button>
              <Link className="btn btn--ghost" to="/cart">
                Back to cart
              </Link>
            </div>

            {submitted ? (
              <div className="mini-card" style={{ marginTop: "var(--space-6)" }}>
                <span className="eyebrow">Details received</span>
                <p className="body-copy">
                  Thanks, {formData.fullName || "there"}. Your guest details have been captured. Online payment, inventory reservation, and order confirmation are not yet enabled on the site.
                </p>
              </div>
            ) : null}
          </form>

          <aside className="summary-card surface">
            <span className="eyebrow">Checkout summary</span>

            {cart.lineItems.map((item) => (
              <div className="summary-row" key={item.slug}>
                <span className="body-copy">
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.lineTotal)}</span>
              </div>
            ))}

            <div className="summary-row summary-row--total">
              <span className="card-title" style={{ fontSize: "1.2rem" }}>
                Items subtotal
              </span>
              <span className="price-text">{formatPrice(cart.subtotal)}</span>
            </div>

            <div className="mini-card">
              <span className="eyebrow">What stays visible</span>
              <p className="body-copy">GST included in displayed prices, mainland Singapore only, 3 to 5 day delivery, 7 day returns, and Instagram DM as primary support.</p>
            </div>

            <div className="mini-card">
              <span className="eyebrow">Payment status</span>
              <p className="body-copy">Card, PayNow, GrabPay, and BNPL payment options are not yet enabled here.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
