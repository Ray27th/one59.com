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

const paymentPreview = [
  "PayNow / PayLah",
  "Cards via Stripe",
  "GrabPay",
  "Atome / hoolah",
];

export default function CheckoutPage() {
  const { cart } = useStore();
  const [formData, setFormData] = useState(initialForm);
  const [reviewed, setReviewed] = useState(false);

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
    setReviewed(true);
  };

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

        <div className="checkout-layout">
          <form className="cart-card surface" onSubmit={handleSubmit}>
            <div className="checkout-heading">
              <span className="eyebrow">Guest checkout</span>
              <h1 className="page-title">Fast details capture, no account required.</h1>
              <p className="lede">Enter the contact and address details needed for delivery so your order information is ready when payment goes live.</p>
            </div>

            <div className="checkout-section">
              <h2 className="checkout-section__title">Contact details</h2>
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
              </div>
            </div>

            <div className="checkout-section">
              <h2 className="checkout-section__title">Delivery address</h2>
              <div className="field-grid">
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
            </div>

            <div className="mini-card">
              <span className="eyebrow">Important note</span>
              <p className="body-copy">This page does not place a real order yet. No payment is collected, no stock is reserved, and no transactional email is triggered from this UI today.</p>
            </div>

            <div className="checkout-actions">
              <button className="btn btn--primary" type="submit">
                Review guest details
              </button>
              <Link className="btn btn--ghost" to="/cart">
                Back to cart
              </Link>
            </div>

            {reviewed ? (
              <div className="checkout-status">
                Your details look complete. Payment, live order submission, and confirmation emails are not enabled yet, so nothing has been placed or charged.
              </div>
            ) : null}
          </form>

          <aside className="summary-card surface">
            <span className="eyebrow">Checkout summary</span>

            <div className="checkout-summary-list">
              {cart.lineItems.map((item) => (
                <div className="checkout-summary-item" key={item.itemKey}>
                  <div>
                    <p className="body-copy">
                      {item.product.name} × {item.quantity}
                    </p>
                    <p className="fine-copy">{formatPrice(item.unitPrice)} each</p>
                  </div>
                  <span>{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
            </div>

            <div className="summary-row summary-row--total">
              <span className="summary-total-label">Items subtotal</span>
              <span className="price-text">{formatPrice(cart.subtotal)}</span>
            </div>

            <div className="mini-card">
              <span className="eyebrow">What stays visible</span>
              <p className="body-copy">GST included, mainland Singapore only, 3 to 5 day delivery, 7-day returns, and Instagram DM as the primary support route.</p>
            </div>

            <div className="mini-card">
              <span className="eyebrow">Payment methods coming soon</span>
              <div className="checkout-payment-list">
                {paymentPreview.map((item) => (
                  <div className="checkout-payment-item" key={item}>
                    <span>{item}</span>
                    <span className="fine-copy">Not live yet</span>
                  </div>
                ))}
              </div>
            </div>

            <Link className="btn btn--ghost" to="/contact">
              Need help before ordering?
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
