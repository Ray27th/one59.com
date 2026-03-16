import { products } from "../../data/index.js";
import ProductImage from "../ui/ProductImage.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";

const CtaBanner = ({ onVisualize, onScrollToFeatured }) => (
  <section style={{ padding: "0 48px 80px" }}>
    <AnimateIn distance={16}>
      <div style={{
        background: "#1C1714",
        borderRadius: "18px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "340px",
      }}>
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ width: "28px", height: "1px", background: "#5A4A3A", display: "inline-block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#A0907A", textTransform: "uppercase" }}>
              AI Visualization Studio
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 3.5vw, 52px)",
            fontWeight: 300, color: "#F5EFE6",
            margin: "0 0 16px", lineHeight: 1.08, letterSpacing: "-0.8px",
          }}>
            Not sure how it'll look?<br />
            <em style={{ fontWeight: 400, color: "#BFA75D" }}>See it first.</em>
          </h2>
          <p style={{ color: "#6B5E50", fontSize: "14px", lineHeight: 1.8, maxWidth: "360px", margin: "0 0 32px" }}>
            Describe your room. Pick a piece. Get a photorealistic render in seconds. No guesswork, no returns anxiety.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => onVisualize(products[0])} style={{
              background: "#F5EFE6", color: "#1C1714",
              border: "none", borderRadius: "8px",
              padding: "13px 24px", fontSize: "13px", fontWeight: 500,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "opacity 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Try the Visualizer</button>
            <button onClick={onScrollToFeatured} style={{
              background: "transparent", color: "#6B5E50",
              border: "1px solid #3A2E28", borderRadius: "8px",
              padding: "13px 24px", fontSize: "13px",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#5A4A3A"; e.currentTarget.style.color = "#BFA75D"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#3A2E28"; e.currentTarget.style.color = "#6B5E50"; }}
            >Browse Collection</button>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "3px",
        }}>
          {products.slice(0, 4).map((p) => (
            <div key={p.id} style={{
              background: p.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <ProductImage product={p} />
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  </section>
);

export default CtaBanner;