import { trustPoints } from "../../data/index.js";
import AnimateIn from "../ui/AnimateIn.jsx";

const TrustStrip = () => (
  <AnimateIn>
    <div style={{
        background: "#FF6B35",
        borderTop: "2px solid #1A1A1A",
        borderBottom: "2px solid #1A1A1A",
        display: "flex", alignItems: "stretch",
      }}>
      {trustPoints.map((item, i) => (
        <div key={i} style={{
          flex: 1, display: "flex", alignItems: "center", gap: "16px",
          padding: "18px 24px",
          borderRight: i < trustPoints.length - 1 ? "2px solid #1A1A1A" : "none",
        }}>
          <div style={{
            width: "10px", height: "10px",
            borderRadius: "50%",
            background: "#1A1A1A",
            flexShrink: 0,
            border: "2px solid #FFFFFF",
          }} />
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, color: "#1A1A1A", lineHeight: 1.1, fontFamily: "'Arial Black', Arial, sans-serif", textTransform: "uppercase" }}>{item.stat}</div>
            <div style={{ fontSize: "11px", color: "#1A1A1A", marginTop: "3px", fontWeight: 700, letterSpacing: "0.05em" }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  </AnimateIn>
);

export default TrustStrip;
