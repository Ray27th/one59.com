import { forwardRef } from "react";
import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";
import { HeartIcon, ArrowRight } from "../icons.jsx";

const badgeColor = (badge) => {
  if (badge === "New") return "#1A1A1A";
  if (badge === "Sale") return "#FF6B35";
  if (badge === "Ships Fast") return "#2E6B3E";
  return "#FF6B35";
};

const NewArrivals = forwardRef(({ wishlist, onToggleWishlist, onAddToCart, onOpenDetail, onScrollToFeatured }, ref) => (
  <section ref={ref} style={{ padding: "64px 0 56px", borderTop: "3px solid #1A1A1A" }}>
    <AnimateIn>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 48px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
          <span style={{
            fontSize: "12px", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase",
            letterSpacing: "0.2em", background: "#FF6B35", padding: "6px 12px", borderRadius: "4px",
          }}>
            Fresh Drops
          </span>
          <h2 style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "32px", fontWeight: 900, margin: 0,
            letterSpacing: "-1px", color: "#1A1A1A",
            textTransform: "uppercase",
          }}>
            New Arrivals
          </h2>
          <span style={{
            fontSize: "12px", fontWeight: 700, color: "#1A1A1A",
            background: "#F5F5F5", padding: "4px 10px", borderRadius: "4px",
          }}>
            {products.length} pieces
          </span>
        </div>
        <button onClick={onScrollToFeatured} style={{
          background: "#1A1A1A", border: "none", cursor: "pointer",
          color: "#FFFFFF", fontSize: "13px", fontWeight: 800,
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "'Arial Black', Arial, sans-serif",
          padding: "10px 18px", borderRadius: "6px",
          textTransform: "uppercase",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#333333"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#1A1A1A"; }}
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
        {products.map((p) => (
          <div key={p.id} className="product-card" style={{
            flexShrink: 0, width: "260px",
            background: "#FFFFFF",
            borderRadius: "8px",
            overflow: "hidden",
            border: "2px solid #1A1A1A",
            scrollSnapAlign: "start",
            transition: "all 0.2s",
            cursor: "pointer",
            boxShadow: "3px 3px 0px #1A1A1A",
          }}
            onClick={() => onOpenDetail(p)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "5px 5px 0px #FF6B35";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "3px 3px 0px #1A1A1A";
            }}
          >
            <div className="product-img-wrap" style={{
              background: "#FFFFFF", height: "200px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              borderBottom: "2px solid #1A1A1A",
            }}>
              <ProductImage product={p} />
              {p.badge && (
                <div style={{
                  position: "absolute", top: "12px", left: "12px",
                  background: badgeColor(p.badge), color: "#FFFFFF",
                  borderRadius: "4px", padding: "4px 10px",
                  fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{p.badge}</div>
              )}
              <button onClick={(e) => onToggleWishlist(p.id, e)} style={{
                position: "absolute", top: "12px", right: "12px",
                background: "#FFFFFF",
                border: "2px solid #1A1A1A",
                borderRadius: "50%",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.borderColor = "#FF6B35"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
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
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "16px", fontWeight: 900,
                marginBottom: "6px", color: "#1A1A1A",
                textTransform: "uppercase",
              }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                <span style={{
                  fontSize: "18px", fontWeight: 900,
                  color: "#FF6B35",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}>{p.price}</span>
                {p.originalPrice && (
                  <span style={{
                    fontSize: "13px", color: "#999999",
                    textDecoration: "line-through", fontWeight: 400
                  }}>{p.originalPrice}</span>
                )}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} style={{
                width: "100%", background: "#1A1A1A", color: "#FFFFFF",
                border: "none", borderRadius: "6px", padding: "11px",
                fontSize: "13px", fontWeight: 800, cursor: "pointer",
                fontFamily: "'Arial Black', Arial, sans-serif",
                textTransform: "uppercase",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
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
