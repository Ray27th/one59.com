import { bundles } from "../../data/index.js";
import AnimateIn from "../ui/AnimateIn.jsx";

const CuratedBundles = ({ onOpenBundleDetail }) => (
  <section style={{ padding: "72px 48px 80px", background: "#F9F9F9", borderTop: "1px solid #EDE8DF" }}>
    <AnimateIn>
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ width: "22px", height: "1px", background: "#BFA75D", display: "inline-block" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#BFA75D", textTransform: "uppercase" }}>Curated Sets</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
          Buy the whole vibe, not just a piece.
        </h2>
        <p style={{ fontSize: "14px", color: "#6B5E50", margin: 0, fontWeight: 300 }}>
          Everything you need for a room — picked to work together, priced to make sense.
        </p>
      </div>
    </AnimateIn>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {bundles.map((bundle, i) => (
        <AnimateIn key={bundle.name} delay={i * 100}>
          <div
            onClick={() => onOpenBundleDetail(bundle)}
            style={{
              background: bundle.bg,
              border: "1px solid #EDE8DF",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
          >
            {/* Image area */}
            <div style={{
              height: "180px",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              <img
                src={bundle.image}
                alt={bundle.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.35s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              {/* Accent gradient overlay at bottom of image */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, ${bundle.bg} 0%, transparent 55%)`,
              }} />
              {/* Savings badge */}
              {bundle.originalPrice && (
                <div style={{
                  position: "absolute", top: "10px", left: "10px",
                  background: "#C31818", color: "#FDFAF5",
                  borderRadius: "4px", padding: "3px 8px",
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                }}>Save</div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "22px", fontWeight: 500, margin: "0 0 10px",
                letterSpacing: "-0.3px", color: "#1C1714",
              }}>{bundle.name}</h3>

              {/* Contents pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
                {bundle.contents.map(item => (
                  <span key={item} style={{
                    fontSize: "10px", color: "#6B5E50",
                    border: "1px solid #DDD5C8",
                    borderRadius: "20px", padding: "2px 9px",
                    background: "transparent",
                    letterSpacing: "0.02em",
                  }}>{item}</span>
                ))}
              </div>

              {/* Hook */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: "15px",
                color: "#2A1F18", lineHeight: 1.5,
                margin: "0 0 16px", fontWeight: 400,
                flex: 1,
              }}>"{bundle.hook}"</p>

              {/* Price row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#A0907A", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2px" }}>Bundle price</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 500, color: "#1C1714" }}>{bundle.price}</span>
                    {bundle.originalPrice && (
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "#A0907A", textDecoration: "line-through" }}>{bundle.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); onOpenBundleDetail(bundle); }}
                  style={{
                    background: "#1C1714", color: "#FDFAF5",
                    border: "none", borderRadius: "8px",
                    padding: "9px 18px", fontSize: "12px", fontWeight: 500,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.02em", transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >View Bundle</button>
              </div>
            </div>
          </div>
        </AnimateIn>
      ))}
    </div>
  </section>
);

export default CuratedBundles;
