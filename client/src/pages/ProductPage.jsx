import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useStore } from "../app/store.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import QuantityStepper from "../components/QuantityStepper.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AddToCartButton from "../components/AddToCartButton.jsx";
import ProductImage from "../components/ui/ProductImage.jsx";
import AnimateIn from "../components/ui/AnimateIn.jsx";
import { getAlternativeProducts, getProductBySlug } from "../content/catalog/index.js";
import { stockStatusLabels } from "../theme.js";

export default function ProductPage() {
  const { slug } = useParams();
  const { cartFeedback, getCartQuantity } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            action={
              <Link className="btn btn--primary" to="/shop">
                Back to shop
              </Link>
            }
            body="That product is not available right now. You can keep browsing the rest of the One59 catalogue."
            title="Product not found"
          />
        </div>
      </section>
    );
  }

  const alternatives = getAlternativeProducts(product);
  const accent = `var(--tone-${product.tone})`;
  const quantityInCart = getCartQuantity(product);
  const wasJustAdded = cartFeedback?.itemKey === (product.sku || product.slug);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.category.name, to: `/shop/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="detail-layout">
          <AnimateIn className="detail-gallery">
            <div className="detail-gallery__frame surface" style={{ "--detail-accent": accent }}>
              <ProductImage objectFit="contain" product={product} />

              <div className="detail-gallery__overlay badge-row">
                <span className="badge badge--solid">{product.badge || product.catalogType}</span>
                <span className="badge">{product.sku}</span>
                <span className="badge badge--dark">{stockStatusLabels[product.stockStatus]}</span>
              </div>
            </div>

            <div className="mini-card detail-gallery__caption">
              <span className="eyebrow">In the room</span>
              <p className="body-copy">{product.highlights[0]}</p>
              <p className="fine-copy">
                {product.dimensions} · {product.finish}
              </p>
            </div>

            <div className="detail-strip">
              <div className="detail-strip__card">
                <p className="fine-copy">Delivery</p>
                <h3 className="detail-strip__title">3 to 5 days</h3>
                <p className="body-copy">Mainland Singapore only.</p>
              </div>

              <div className="detail-strip__card">
                <p className="fine-copy">Returns</p>
                <h3 className="detail-strip__title">7 days</h3>
                <p className="body-copy">Change-of-mind return delivery is customer-paid.</p>
              </div>

              <div className="detail-strip__card">
                <p className="fine-copy">Support</p>
                <h3 className="detail-strip__title">DM first</h3>
                <p className="body-copy">Instagram replies within 24 hours, email available too.</p>
              </div>
            </div>

            <div className="detail-card surface">
              <SectionHeading
                eyebrow="Product details"
                title="Everything needed to decide quickly — with the details that matter most close at hand."
                body="Materials, room fit, and practical details stay close at hand so you can decide with confidence."
              />

              <div className="detail-columns">
                <div className="detail-list">
                  <h3 className="detail-section-title">Highlights</h3>
                  {product.highlights.map((item) => (
                    <div className="detail-list__item" key={item}>
                      <span className="badge">Why it works</span>
                      <p className="body-copy">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="detail-list">
                  <h3 className="detail-section-title">Product facts</h3>
                  {product.specs.map((item) => (
                    <div className="detail-list__item" key={item.label}>
                      <p className="fine-copy">{item.label}</p>
                      <p className="body-copy">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn className="detail-card detail-card--sticky surface" delay={80} style={{ "--card-accent": accent }}>
            <div className="badge-row">
              <span className="badge badge--solid">{product.badge || product.catalogType}</span>
              <span className="badge">{product.sku}</span>
              <span className="badge badge--dark">{stockStatusLabels[product.stockStatus]}</span>
            </div>

            <div className="detail-heading">
              <h1 className="page-title">{product.name}</h1>
              <p className="lede">{product.summary}</p>
            </div>

            <div className="detail-meta">
              <span className="badge">{product.category.name}</span>
              <span className="badge">{product.finish}</span>
              <span className="badge">Guest checkout only</span>
            </div>

            <div className="detail-price-panel">
              <div>
                <span className="price-text detail-price-panel__value">{product.priceLabel}</span>
                <p className="fine-copy">GST included in the displayed price.</p>
              </div>

              <div className="detail-proof">
                <span className="detail-proof__rating">{product.socialProof.rating} / 5</span>
                <span className="fine-copy">{product.socialProof.reviews} customer review notes</span>
              </div>
            </div>

            <div className="detail-summary-card">
              <div className="summary-row">
                <span className="fine-copy">Category</span>
                <span className="body-copy">{product.category.name}</span>
              </div>
              <div className="summary-row">
                <span className="fine-copy">Dimensions</span>
                <span className="body-copy">{product.dimensions}</span>
              </div>
              <div className="summary-row">
                <span className="fine-copy">Materials</span>
                <span className="body-copy">{product.materials}</span>
              </div>
              <div className="summary-row">
                <span className="fine-copy">Finish</span>
                <span className="body-copy">{product.finish}</span>
              </div>
              <div className="summary-row">
                <span className="fine-copy">Assembly</span>
                <span className="body-copy">{product.assembly}</span>
              </div>
            </div>

            {product.stockStatus !== "sold_out" ? (
              <div className="detail-buy-stack">
                <div className="detail-buy-row">
                  <div>
                    <p className="fine-copy">Quantity</p>
                    <p className="body-copy">Set the quantity you want before adding this piece.</p>
                  </div>

                  <QuantityStepper
                    onChange={(nextValue) => setQuantity(Math.max(1, nextValue))}
                    onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
                    onIncrease={() => setQuantity((current) => current + 1)}
                    value={quantity}
                  />
                </div>

                <div className="detail-actions">
                  <AddToCartButton
                    label={quantity === 1 ? "Add to cart" : `Add ${quantity} to cart`}
                    product={product}
                    quantity={quantity}
                    variant="accent"
                  />
                  <Link className="btn btn--ghost" to="/cart">
                    {quantityInCart ? `View cart (${quantityInCart})` : "View cart"}
                  </Link>
                </div>

                <div className={`detail-status${wasJustAdded ? " detail-status--success" : ""}`}>
                  {wasJustAdded
                    ? `${product.name} was added to your cart.`
                    : quantityInCart
                      ? `You already have ${quantityInCart} in your cart.`
                      : "Need a quick stock or delivery check first? Instagram DM is the fastest support channel."}
                </div>
              </div>
            ) : (
              <div className="mini-card">
                <span className="eyebrow">Sold out</span>
                <p className="body-copy">This SKU is currently unavailable. Similar pieces are listed below so you can keep browsing nearby options.</p>
              </div>
            )}

            <div className="mini-card">
              <span className="eyebrow">Customer note</span>
              <p className="body-copy">“{product.socialProof.quote}”</p>
              <p className="fine-copy">
                {product.socialProof.person} · {product.socialProof.rating} rating from {product.socialProof.reviews} review notes
              </p>
            </div>
          </AnimateIn>
        </div>

        {alternatives.length ? (
          <section className="section">
            <SectionHeading
              eyebrow={product.stockStatus === "sold_out" ? "Same-category alternatives" : "Compare nearby picks"}
              title={
                product.stockStatus === "sold_out"
                  ? "Keep the room idea going with similar pieces."
                  : "Compare nearby options for the same room."
              }
              body={
                product.stockStatus === "sold_out"
                  ? "If this piece is unavailable, these alternatives offer a similar fit, feel, or function for the same room."
                  : "These alternatives make it easier to compare room fit, price, and finish before you decide."
              }
            />

            <div className="catalog-grid catalog-grid--dense">
              {alternatives.map((item, index) => (
                <AnimateIn delay={index * 40} key={item.slug}>
                  <ProductCard product={item} showCategory />
                </AnimateIn>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
