import { storePolicy } from "../data/index.js";

const footerCols = [
  { heading: "Shop", links: ["Chairs", "Tables", "Storage", "Lighting", "Decor", "New Arrivals"] },
  { heading: "Company", links: ["About", "How It Works", "Careers", "Press"] },
  { heading: "Help", links: ["Delivery", "Returns", "Care Guide", "Contact"] },
];

const Footer = () => (
  <footer style={{
    borderTop: "none",
    padding: "56px 48px 40px",
    background: "#1A1A1A",
  }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.5fr", gap: "48px", marginBottom: "48px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "16px" }}>
          <span style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "26px",
            fontWeight: 900,
            color: "#FF6B35",
            background: "#FFFFFF",
            padding: "4px 10px",
            borderRadius: "4px",
            letterSpacing: "-1px",
          }}>one59</span>
          <span style={{ fontSize: "9px", color: "#FF6B35", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700 }}>FURNITURE</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: 1.8, maxWidth: "240px", margin: "0 0 20px" }}>
          Factory-direct furniture for mainland Singapore homes. {storePolicy.gstNote}. {storePolicy.priceCapNote}.
        </p>
        <div style={{ fontSize: "11px", color: "#FF6B35", letterSpacing: "0.06em", fontWeight: 600, textTransform: "uppercase" }}>Mainland Singapore only</div>

        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <a href="https://instagram.com/one59furniture" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "36px", height: "36px",
            background: "#E4405F",
            borderRadius: "6px",
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://tiktok.com/@one59furniture" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "36px", height: "36px",
            background: "#000000",
            borderRadius: "6px",
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-5.21 2.9 2.9 0 0 1 .28.01v3.4a.48.48 0 0 0-.08 0 .89.89 0 0 0-.89.89.89.89 0 0 0 .89.89.89.89 0 0 0 .89-.89V6.49a4.84 4.84 0 0 0 3.45 1.49 4.84 4.84 0 0 0 4.84-4.84V2h-3.45v4.69a1.39 1.39 0 0 1-1.39 1.39 1.39 1.39 0 0 1-1.39-1.39V2h-3.45v13.67a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V6.69z"/>
            </svg>
          </a>
          <a href="https://facebook.com/one59furniture" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "36px", height: "36px",
            background: "#1877F2",
            borderRadius: "6px",
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.446-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.97v-3.47h4.155V6.733c0-4.088 2.33-6.48 6.165-6.48 1.835 0 3.753.313 3.753.313v4.125h-2.123c-2.09 0-2.74 1.297-2.74 2.628v3.154h4.66l-.745 3.47h-3.915v8.385C19.612 23.027 24 18.063 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
      {footerCols.map(col => (
        <div key={col.heading}>
          <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>
            {col.heading}
          </div>
          {col.links.map(l => (
            <div key={l} style={{
              fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "10px",
              cursor: "pointer", transition: "color 0.15s",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 600,
            }}
              onMouseEnter={e => e.target.style.color = "#FF6B35"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
            >{l}</div>
          ))}
        </div>
      ))}

      <div>
        <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>
          Singapore Coverage
        </div>
        <div style={{
          width: "100%",
          height: "180px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "2px solid #333",
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12961.348614927046!2d103.819836!3d1.300633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da190a5d330e5f%3A0x2c029c8e679f5c0a!2sSingapore!5e0!3m2!1sen!2ssg!4v1234567890"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Singapore Coverage"
          />
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "10px", lineHeight: 1.6 }}>
          <strong style={{ color: "#FF6B35" }}>Based in Singapore</strong><br/>
          {storePolicy.deliveryNote}<br/>
          {storePolicy.returnsNote}<br/>
          {storePolicy.supportNote}
        </div>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "2px solid rgba(255,255,255,0.1)" }}>
      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'Arial Black', Arial, sans-serif" }}>© 2026 one59 Furniture. All rights reserved.</span>
      <div style={{ display: "flex", gap: "24px" }}>
        {["Privacy Policy", "Terms", "Cookies"].map(l => (
          <span key={l} style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontWeight: 600 }}>{l}</span>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
