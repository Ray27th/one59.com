import { forwardRef, useState } from "react";
import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";
import { HeartIcon } from "../icons.jsx";

const filters = ["All", "Sofas", "Tables", "Beds", "Storage", "Lighting"];

const badgeColor = (badge) => {
  if (badge === "New") return "#1C1714";
  if (badge === "Sale") return "#C31818";
  if (badge === "Ships Fast") return "#2E6B3E";
  return "#BFA75D";
};

const FeaturedProducts = forwardRef(({ wishlist, onToggleWishlist, onAddToCart, onVisualize, onOpenDetail }, ref) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);

  return (
    <section ref={ref} style={{ padding: "72px 48px 80px", borderTop: "1px solid #EDE8DF" }}>
      <AnimateIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, margin: 0, letterSpacing: "-0.3px" }}>
            Featured Furniture
          </h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: activeFilter === f ? "#1C1714" : "transparent",
                color: activeFilter === f ? "#FDFAF5" : "#6B5E50",
                border: "1.5px solid",
                borderColor: activeFilter === f ? "#1C1714" : "#DDD5C8",
                borderRadius: "6px", padding: "6px 14px",
                fontSize: "12px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em",
                transition: "all 0.15s",
              }}>{f}</button>
            ))}
          </div>
        </div>
      </AnimateIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
        {filtered.map((p, i) => (
          <AnimateIn key={p.id} delay={i * 60}>
            <div className="product-card" style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #EDE8DF",
              transition: "box-shadow 0.2s",
              cursor: "pointer",
              height: "100%",
            }}
              onClick={() => onOpenDetail(p)}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div className="product-img-wrap" style={{
                background: "#FFFFFF", height: "196px",
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

              <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background: "transparent", color: "#8B7B6B",
                      border: "1px solid #DDD5C8",
                      borderRadius: "20px", padding: "2px 9px",
                      fontSize: "10px", letterSpacing: "0.03em",
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 2px" }}>{p.name}</h3>
                <p style={{ color: "#A0907A", fontSize: "12px", lineHeight: 1.5, margin: "0 0 10px" }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: p.originalPrice ? "#C31818" : "#1C1714" }}>{p.price}</span>
                  {p.originalPrice && (
                    <span style={{ fontSize: "12px", color: "#A0907A", textDecoration: "line-through" }}>{p.originalPrice}</span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} style={{
                    flex: 2, background: "#1C1714", color: "#FDFAF5",
                    border: "none", borderRadius: "7px", padding: "9px",
                    fontSize: "11px", cursor: "pointer", fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >Add to Cart</button>
                  <button onClick={(e) => { e.stopPropagation(); onVisualize(p); }} style={{
                    flex: 1, background: "transparent", color: "#8B7B6B",
                    border: "1.5px solid #EDE8DF", borderRadius: "7px",
                    padding: "9px 6px", fontSize: "11px", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#BFA75D"; e.currentTarget.style.color = "#6B5E50"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE8DF"; e.currentTarget.style.color = "#8B7B6B"; }}
                    title="Visualize in your room"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto" }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
});

FeaturedProducts.displayName = "FeaturedProducts";
export default FeaturedProducts;