import { Link } from "react-router-dom";

import { useStore } from "../app/store.js";
import { stockStatusLabels } from "../theme.js";
import AddToCartButton from "./AddToCartButton.jsx";
import { ArrowRightIcon } from "./icons.jsx";
import ProductImage from "./ui/ProductImage.jsx";

const availabilityClass = {
  in_stock: "badge badge--success",
  low_stock: "badge badge--alert",
  sold_out: "badge badge--dark",
};

export default function ProductCard({ product, showCategory = false }) {
  const { getCartQuantity } = useStore();
  const quantityInCart = getCartQuantity(product);
  const accent = `var(--tone-${product.tone})`;

  return (
    <article className="product-card" style={{ "--card-accent": accent }}>
      <Link aria-label={`Open ${product.name}`} className="product-card__media" to={`/product/${product.slug}`}>
        <ProductImage objectFit="cover" product={product} />

        <div className="product-card__media-badges">
          <span className="badge badge--solid">{product.badge || product.catalogType}</span>
          <span className={availabilityClass[product.stockStatus]}>{stockStatusLabels[product.stockStatus]}</span>
        </div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__top">
          <div className="product-card__title-wrap">
            <p className="fine-copy product-card__sku">
              {product.sku}
              {showCategory ? ` · ${product.category.name}` : ""}
            </p>

            <Link className="product-card__title-link" to={`/product/${product.slug}`}>
              <h3 className="product-card__title">{product.name}</h3>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="product-card__price-block">
            <span className="price-text">{product.priceLabel}</span>
            <span className="fine-copy">GST included</span>
          </div>
        </div>

        <p className="body-copy product-card__summary">{product.summary}</p>

        <div className="badge-row">
          <span className="badge">3 to 5 day delivery</span>
          <span className="badge">Mainland Singapore only</span>
          {quantityInCart ? <span className="badge badge--dark">{quantityInCart} in cart</span> : null}
        </div>

        <div className="product-card__specs">
          <div className="product-card__spec">
            <span className="fine-copy">Materials</span>
            <span className="body-copy">{product.materials}</span>
          </div>

          <div className="product-card__spec">
            <span className="fine-copy">Room fit</span>
            <span className="body-copy">{product.category.name}</span>
          </div>
        </div>

        <div className="product-card__actions">
          {product.stockStatus === "sold_out" ? (
            <Link className="btn btn--ghost" to={`/product/${product.slug}`}>
              See alternatives
              <ArrowRightIcon size={14} />
            </Link>
          ) : (
            <AddToCartButton label="Add to cart" product={product} />
          )}

          <Link className="btn btn--ghost" to={`/product/${product.slug}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
