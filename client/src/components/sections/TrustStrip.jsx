import AnimateIn from "../ui/AnimateIn.jsx";

const items = [
  { stat: "4.9 / 5", label: "from 2,400+ verified reviews" },
  { stat: "Free delivery", label: "on orders over S$500" },
  { stat: "30-day returns", label: "free and hassle-free" },
  { stat: "SG · MY · ID", label: "shipping across Southeast Asia" },
];

const TrustStrip = () => (
  <AnimateIn>
    <div style={{
      background: "#F9F9F9",
      borderTop: "1px solid #EDE8DF",
      borderBottom: "1px solid #EDE8DF",
      display: "flex", alignItems: "stretch",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          flex: 1, display: "flex", alignItems: "center", gap: "14px",
          padding: "16px 24px",
          borderRight: i < 3 ? "1px solid #EDE8DF" : "none",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#BFA75D", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#1C1714", lineHeight: 1.3 }}>{item.stat}</div>
            <div style={{ fontSize: "11px", color: "#8B7B6B", marginTop: "1px" }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  </AnimateIn>
);

export default TrustStrip;