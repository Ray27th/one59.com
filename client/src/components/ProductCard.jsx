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
  const metaLine = showCategory ? product.category.name : product.sku;

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
              <p className="fine-copy product-card__sku">{metaLine}</p>

              <Link className="product-card__title-link" to={`/product/${product.slug}`}>
              <h3 className="product-card__title">{product.name}</h3>
              <span className="product-card__title-icon">
                  <ArrowRightIcon size={14} />
                </span>
              </Link>
            </div>

            <div className="product-card__price-block">
              <span className="price-text">{product.priceLabel}</span>
            </div>
          </div>

          <p className="body-copy product-card__summary">{product.summary}</p>

          <div className="product-card__meta">
            <span className="fine-copy">{product.finish}</span>
            <span className="fine-copy">{product.dimensions}</span>
            {quantityInCart ? <span className="badge badge--dark">{quantityInCart} in cart</span> : null}
          </div>

          <div className="product-card__specs">
            <div className="product-card__spec">
              <span className="fine-copy">Materials</span>
              <span className="body-copy">{product.materials}</span>
            </div>

            <div className="product-card__spec">
              <span className="fine-copy">Assembly</span>
              <span className="body-copy">{product.assembly}</span>
            </div>
          </div>

          <div className="product-card__actions">
            {product.stockStatus === "sold_out" ? (
              <Link className="btn btn--ghost product-card__primary-action" to={`/product/${product.slug}`}>
                See alternatives
                <ArrowRightIcon size={14} />
              </Link>
            ) : (
              <>
                <AddToCartButton className="product-card__primary-action" label="Add to cart" product={product} variant="accent" />

                <Link className="product-card__detail-link" to={`/product/${product.slug}`}>
                  Details
                  <ArrowRightIcon size={14} />
                </Link>
              </>
            )}
          </div>
        </div>
      </article>
  );
}
