import { forwardRef } from "react";
import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";
import { HeartIcon, ArrowRight } from "../icons.jsx";
import { badgeColor, COL_DARK, COL_LIGHT, COL_ORANGE, COL_WHITE, FONT_HEAD } from "../../theme.js";

const dropProducts = products.filter((product) => product.catalogType === "drop");

const NewArrivals = forwardRef(({ wishlist, onToggleWishlist, onAddToCart, onOpenDetail, onScrollToFeatured }, ref) => (
  <section ref={ref} style={{ padding: "64px 0 56px", borderTop: `3px solid ${COL_DARK}` }}>
    <AnimateIn>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 48px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
          <span style={{
            fontSize: "12px", fontWeight: 800, color: COL_WHITE, textTransform: "uppercase",
            letterSpacing: "0.2em", background: COL_ORANGE, padding: "6px 12px", borderRadius: "4px",
          }}>
            Fresh Drops
          </span>
          <h2 style={{
            fontFamily: FONT_HEAD,
            fontSize: "32px", fontWeight: 900, margin: 0,
            letterSpacing: "-1px", color: COL_DARK,
            textTransform: "uppercase",
          }}>
            New Arrivals
          </h2>
          <span style={{
            fontSize: "12px", fontWeight: 700, color: COL_DARK,
            background: COL_LIGHT, padding: "4px 10px", borderRadius: "4px",
          }}>
            {dropProducts.length} pieces
          </span>
        </div>
        <button onClick={onScrollToFeatured} style={{
          background: COL_DARK, border: "none", cursor: "pointer",
          color: COL_WHITE, fontSize: "13px", fontWeight: 800,
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: FONT_HEAD,
          padding: "10px 18px", borderRadius: "6px",
          textTransform: "uppercase",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#333333"; }}
          onMouseLeave={e => { e.currentTarget.style.background = COL_DARK; }}
        >View All <ArrowRight /></button>
      </div>
    </AnimateIn>

    <AnimateIn delay={80}>
      <div style={{
        display: "flex", gap: "16px",
        overflowX: "auto",
        padding: "4px 48px 20px",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
      }}>
        {dropProducts.map((p) => (
          <div key={p.id} className="product-card" style={{
            flexShrink: 0, width: "260px",
            background: COL_WHITE,
            borderRadius: "8px",
            overflow: "hidden",
            border: `2px solid ${COL_DARK}`,
            scrollSnapAlign: "start",
            transition: "all 0.2s",
            cursor: "pointer",
            boxShadow: `3px 3px 0px ${COL_DARK}`,
          }}
            onClick={() => onOpenDetail(p)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = `5px 5px 0px ${COL_ORANGE}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = `3px 3px 0px ${COL_DARK}`;
            }}
          >
            <div className="product-img-wrap" style={{
              background: COL_WHITE, height: "200px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              borderBottom: `2px solid ${COL_DARK}`,
            }}>
              <ProductImage product={p} />
              {p.badge && (
                <div style={{
                  position: "absolute", top: "12px", left: "12px",
                  background: badgeColor(p.badge), color: COL_WHITE,
                  borderRadius: "4px", padding: "4px 10px",
                  fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{p.badge}</div>
              )}
              <button onClick={(e) => onToggleWishlist(p.id, e)} style={{
                position: "absolute", top: "12px", right: "12px",
                background: COL_WHITE,
                border: `2px solid ${COL_DARK}`,
                borderRadius: "50%",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = COL_ORANGE; e.currentTarget.style.borderColor = COL_ORANGE; }}
                onMouseLeave={e => { e.currentTarget.style.background = COL_WHITE; e.currentTarget.style.borderColor = COL_DARK; }}
              >
                <HeartIcon filled={wishlist.has(p.id)} />
              </button>
              <button
                className="product-quick-add"
                onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
              >
                GRAB IT — {p.price}
              </button>
            </div>
            <div style={{ padding: "14px" }}>
              <div style={{
                fontFamily: FONT_HEAD,
                fontSize: "16px", fontWeight: 900,
                marginBottom: "6px", color: COL_DARK,
                textTransform: "uppercase",
              }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                <span style={{
                  fontSize: "18px", fontWeight: 900,
                  color: COL_ORANGE,
                  fontFamily: FONT_HEAD,
                }}>{p.price}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} style={{
                width: "100%", background: COL_DARK, color: COL_WHITE,
                border: "none", borderRadius: "6px", padding: "11px",
                fontSize: "13px", fontWeight: 800, cursor: "pointer",
                fontFamily: FONT_HEAD,
                textTransform: "uppercase",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                onMouseLeave={e => e.currentTarget.style.background = COL_DARK}
              >Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </AnimateIn>
  </section>
));

NewArrivals.displayName = "NewArrivals";
export default NewArrivals;
