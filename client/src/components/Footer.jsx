const footerCols = [
  { heading: "Shop", links: ["Sofas", "Tables", "Beds", "Storage", "Lighting", "New Arrivals"] },
  { heading: "Company", links: ["About", "Journal", "Careers", "Press"] },
  { heading: "Help", links: ["Delivery", "Returns", "Care Guide", "Contact"] },
];

const Footer = () => (
  <footer style={{
    borderTop: "none",
    padding: "56px 48px 40px",
    background: "#1C1714",
  }}>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "16px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 600, color: "#FDFAF5" }}>Livora</span>
          <span style={{ fontSize: "8px", color: "#BFA75D", letterSpacing: "0.22em", textTransform: "uppercase" }}>Studio</span>
        </div>
        <p style={{ color: "rgba(253,250,245,0.55)", fontSize: "13px", lineHeight: 1.8, maxWidth: "240px", margin: "0 0 20px" }}>
          AI-powered furniture for modern living. Designed for real homes across Southeast Asia.
        </p>
        <div style={{ fontSize: "11px", color: "#BFA75D", letterSpacing: "0.04em" }}>Singapore · Kuala Lumpur · Jakarta</div>
      </div>
      {footerCols.map(col => (
        <div key={col.heading}>
          <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#BFA75D", textTransform: "uppercase", marginBottom: "16px", fontWeight: 500 }}>
            {col.heading}
          </div>
          {col.links.map(l => (
            <div key={l} style={{
              fontSize: "13px", color: "rgba(253,250,245,0.6)", marginBottom: "10px",
              cursor: "pointer", transition: "color 0.15s",
            }}
              onMouseEnter={e => e.target.style.color = "#FDFAF5"}
              onMouseLeave={e => e.target.style.color = "rgba(253,250,245,0.6)"}
            >{l}</div>
          ))}
        </div>
      ))}
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid rgba(253,250,245,0.1)" }}>
      <span style={{ fontSize: "12px", color: "rgba(253,250,245,0.4)" }}>© 2025 Livora Studio. All rights reserved.</span>
      <div style={{ display: "flex", gap: "24px" }}>
        {["Privacy Policy", "Terms", "Cookies"].map(l => (
          <span key={l} style={{ fontSize: "12px", color: "rgba(253,250,245,0.4)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;