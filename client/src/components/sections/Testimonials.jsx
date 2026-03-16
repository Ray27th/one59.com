import { testimonials } from "../../data/index.js";
import { StarFilled } from "../icons.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";

const Testimonials = () => (
  <section style={{ padding: "80px 48px" }}>
    <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
      <AnimateIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "36px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, margin: 0, letterSpacing: "-0.3px" }}>
            From our customers
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map(s => <StarFilled key={s} />)}
            </div>
            <span style={{ fontSize: "12px", color: "#6B5E50" }}>4.9 from 2,400+ reviews</span>
          </div>
        </div>
      </AnimateIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {testimonials.map((t, i) => (
          <AnimateIn key={i} delay={i * 100}>
            <div style={{
              background: "#FFFFFF",
              borderRadius: "12px", padding: "28px 26px",
              border: "1px solid #EDE8DF",
              height: "100%",
            }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map(s => <StarFilled key={s} />)}
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "18px", lineHeight: 1.6, margin: "0 0 20px", color: "#2A1F18",
              }}>{t.quote}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#1C1714" }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "#A0907A", marginTop: "2px" }}>{t.location}</div>
                </div>
                <span style={{
                  fontSize: "10px", color: "#8B7B6B",
                  background: "#EDE8DF", padding: "4px 10px", borderRadius: "4px",
                  letterSpacing: "0.04em", whiteSpace: "nowrap",
                }}>{t.product}</span>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;