import { bundles } from "../../data/index.js";
import AnimateIn from "../ui/AnimateIn.jsx";

const CuratedBundles = ({ onOpenBundleDetail }) => (
  <section style={{ padding: "80px 48px", background: "#1A1A1A", borderTop: "3px solid #FF6B35" }}>
    <AnimateIn>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{ width: "28px", height: "3px", background: "#FF6B35", display: "inline-block" }} />
          <span style={{
            fontSize: "12px", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase",
            letterSpacing: "0.2em", background: "#FF6B35", padding: "6px 12px", borderRadius: "4px",
          }}>Bundle & Save</span>
        </div>
        <h2 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 900, color: "#FFFFFF",
          margin: "0 0 12px", letterSpacing: "-2px",
          textTransform: "uppercase", lineHeight: 1,
        }}>
          BUY THE WHOLE VIBE
        </h2>
        <p style={{
          fontSize: "15px", color: "rgba(255,255,255,0.7)",
          margin: 0, fontWeight: 600, maxWidth: "450px",
        }}>
          Everything you need for a room — picked to work together. All under $159 per piece.
        </p>
      </div>
    </AnimateIn>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {bundles.map((bundle, i) => (
        <AnimateIn key={bundle.name} delay={i * 100}>
          <div
            onClick={() => onOpenBundleDetail(bundle)}
            style={{
              background: "#FFFFFF",
              border: "2px solid #FF6B35",
              borderRadius: "8px",
              overflow: "hidden",
              transition: "all 0.2s",
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 4px 0px #FF6B35",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "6px 6px 0px #FFFFFF";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "4px 4px 0px #FF6B35";
            }}
          >
            {/* Image area */}
            <div style={{
              height: "200px",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
              background: bundle.bg,
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
            </div>

            {/* Content */}
            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "20px", fontWeight: 900,
                margin: "0 0 12px", letterSpacing: "-0.5px",
                color: "#1A1A1A", textTransform: "uppercase",
              }}>{bundle.name}</h3>

              {/* Contents pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {bundle.contents.map(item => (
                  <span key={item} style={{
                    fontSize: "11px", fontWeight: 700, color: "#FFFFFF",
                    background: "#1A1A1A",
                    borderRadius: "4px", padding: "4px 10px",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{item}</span>
                ))}
              </div>

              {/* Hook */}
              <p style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontStyle: "italic", fontSize: "14px",
                color: "#666666", lineHeight: 1.5,
                margin: "0 0 18px", fontWeight: 400,
                flex: 1,
              }}>"{bundle.hook}"</p>

              {/* Price row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{
                    fontSize: "10px", fontWeight: 800,
                    color: "#999999", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: "4px",
                  }}>BUNDLE PRICE</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{
                      fontFamily: "'Arial Black', Arial, sans-serif",
                      fontSize: "28px", fontWeight: 900,
                      color: "#FF6B35", letterSpacing: "-1px",
                    }}>{bundle.price}</span>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); onOpenBundleDetail(bundle); }}
                  style={{
                    background: "#1A1A1A", color: "#FFFFFF",
                    border: "none", borderRadius: "6px",
                    padding: "12px 20px", fontSize: "13px", fontWeight: 800,
                    cursor: "pointer", fontFamily: "'Arial Black', Arial, sans-serif",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                  onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
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
