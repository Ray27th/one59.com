import { forwardRef, useState } from "react";
import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";
import { HeartIcon } from "../icons.jsx";

const filters = ["All", "Chairs", "Tables", "Storage", "Lighting", "Decor"];

const badgeColor = (badge) => {
  if (badge === "New") return "#1A1A1A";
  if (badge === "Sale") return "#FF6B35";
  if (badge === "Ships Fast") return "#2E6B3E";
  return "#FF6B35";
};

const FeaturedProducts = forwardRef(({ wishlist, onToggleWishlist, onAddToCart, onVisualize, onOpenDetail }, ref) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);

  return (
    <section ref={ref} style={{ padding: "80px 48px", borderTop: "3px solid #1A1A1A" }}>
      <AnimateIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{
              fontSize: "12px", fontWeight: 800, color: "#FF6B35", textTransform: "uppercase",
              letterSpacing: "0.2em", background: "#1A1A1A", padding: "6px 12px", borderRadius: "4px",
              display: "inline-block", marginBottom: "12px",
            }}>
              Factory Direct
            </span>
            <h2 style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "42px", fontWeight: 900, margin: "8px 0",
              letterSpacing: "-1.5px", color: "#1A1A1A",
              textTransform: "uppercase", lineHeight: 1,
            }}>
              Shop Everything
            </h2>
            <p style={{ color: "#666666", fontSize: "14px", marginTop: "8px" }}>
              All under S$159. No markup.
            </p>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                background: activeFilter === f ? "#FF6B35" : "#F5F5F5",
                color: activeFilter === f ? "#FFFFFF" : "#1A1A1A",
                border: "2px solid",
                borderColor: activeFilter === f ? "#FF6B35" : "#E0E0E0",
                borderRadius: "6px", padding: "10px 18px",
                fontSize: "13px", fontWeight: 800, cursor: "pointer",
                fontFamily: "'Arial Black', Arial, sans-serif",
                textTransform: "uppercase", letterSpacing: "0.05em",
                transition: "all 0.15s",
              }}>{f}</button>
            ))}
          </div>
        </div>
      </AnimateIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {filtered.map((p, i) => (
          <AnimateIn key={p.id} delay={i * 60}>
            <div className="product-card" style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              overflow: "hidden",
              border: "2px solid #1A1A1A",
              transition: "all 0.2s",
              cursor: "pointer",
              height: "100%",
              boxShadow: "4px 4px 0px #1A1A1A",
            }}
              onClick={() => onOpenDetail(p)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #FF6B35";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0px #1A1A1A";
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
                    borderRadius: "4px", padding: "6px 10px",
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

              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background: "#1A1A1A", color: "#FFFFFF",
                      borderRadius: "4px", padding: "3px 10px",
                      fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  fontSize: "18px", fontWeight: 900,
                  margin: "0 0 4px", color: "#1A1A1A",
                  textTransform: "uppercase", letterSpacing: "-0.5px",
                }}>{p.name}</h3>
                <p style={{ color: "#666666", fontSize: "12px", lineHeight: 1.4, margin: "0 0 12px", fontFamily: "Arial, sans-serif" }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <span style={{
                    fontSize: "22px", fontWeight: 900,
                    color: "#FF6B35",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                  }}>{p.price}</span>
                  {p.originalPrice && (
                    <span style={{
                      fontSize: "13px", color: "#999999", textDecoration: "line-through", fontWeight: 400
                    }}>{p.originalPrice}</span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} style={{
                    flex: 2, background: "#1A1A1A", color: "#FFFFFF",
                    border: "none", borderRadius: "6px", padding: "11px",
                    fontSize: "12px", cursor: "pointer", fontWeight: 800,
                    fontFamily: "'Arial Black', Arial, sans-serif",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                    onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
                  >Add to Cart</button>
                  <button onClick={(e) => { e.stopPropagation(); onVisualize(p); }} style={{
                    flex: 1, background: "#F5F5F5", color: "#1A1A1A",
                    border: "2px solid #1A1A1A", borderRadius: "6px",
                    padding: "11px", fontSize: "11px", cursor: "pointer",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                    fontWeight: 700,
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#FF6B35"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
                    title="Visualize in your room"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto" }}>
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
