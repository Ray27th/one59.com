import { forwardRef } from "react";
import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";
import { HeartIcon, ArrowRight } from "../icons.jsx";

const badgeColor = (badge) => {
  if (badge === "New") return "#1C1714";
  if (badge === "Sale") return "#C31818";
  if (badge === "Ships Fast") return "#2E6B3E";
  return "#BFA75D";
};

const NewArrivals = forwardRef(({ wishlist, onToggleWishlist, onAddToCart, onOpenDetail, onScrollToFeatured }, ref) => (
  <section ref={ref} style={{ padding: "64px 0 56px" }}>
    <AnimateIn>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 48px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, margin: 0, letterSpacing: "-0.3px" }}>
            New Arrivals
          </h2>
          <span style={{ fontSize: "11px", color: "#A0907A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {products.length} pieces
          </span>
        </div>
        <button onClick={onScrollToFeatured} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#6B5E50", fontSize: "13px",
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "'DM Sans', sans-serif", padding: 0,
        }}>View all <ArrowRight /></button>
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
        {products.map((p) => (
          <div key={p.id} className="product-card" style={{
            flexShrink: 0, width: "240px",
            background: "#FFFFFF",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #EDE8DF",
            scrollSnapAlign: "start",
            transition: "box-shadow 0.2s",
            cursor: "pointer",
          }}
            onClick={() => onOpenDetail(p)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div className="product-img-wrap" style={{
              background: "#FFFFFF", height: "180px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <ProductImage product={p} />
              {p.badge && (
                <div style={{
                  position: "absolute", top: "10px", left: "10px",
                  background: badgeColor(p.badge), color: "#FDFAF5",
                  borderRadius: "4px", padding: "3px 8px",
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{p.badge}</div>
              )}
              <button onClick={(e) => onToggleWishlist(p.id, e)} style={{
                position: "absolute", top: "10px", right: "10px",
                background: "rgba(253,250,245,0.9)",
                border: "none", borderRadius: "50%",
                width: "28px", height: "28px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <HeartIcon filled={wishlist.has(p.id)} />
              </button>
              <button
                className="product-quick-add"
                onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
              >
                Quick Add — {p.price}
              </button>
            </div>
            <div style={{ padding: "14px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: p.originalPrice ? "#C31818" : "#1C1714" }}>{p.price}</span>
                {p.originalPrice && (
                  <span style={{ fontSize: "12px", color: "#A0907A", textDecoration: "line-through" }}>{p.originalPrice}</span>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} style={{
                width: "100%", background: "#1C1714", color: "#FDFAF5",
                border: "none", borderRadius: "7px", padding: "10px",
                fontSize: "12px", fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "opacity 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
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