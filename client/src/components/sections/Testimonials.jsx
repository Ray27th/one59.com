import { testimonials, testimonialsSummary } from "../../data/index.js";
import { StarFilled } from "../icons.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";

const Testimonials = () => (
  <section style={{ padding: "80px 48px", borderTop: "3px solid #1A1A1A" }}>
    <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
      <AnimateIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{
              fontSize: "12px", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase",
              letterSpacing: "0.2em", background: "#1A1A1A", padding: "6px 12px", borderRadius: "4px",
              display: "inline-block", marginBottom: "12px",
            }}>
              Real Reviews
            </span>
            <h2 style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "42px", fontWeight: 900, margin: "8px 0",
              letterSpacing: "-1.5px", color: "#1A1A1A",
              textTransform: "uppercase", lineHeight: 1,
            }}>
              FROM OUR CUSTOMERS
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F5F5F5", padding: "12px 18px", borderRadius: "8px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map(s => <StarFilled key={s} />)}
            </div>
            <span style={{
              fontSize: "14px", fontWeight: 800, color: "#1A1A1A",
              fontFamily: "'Arial Black', Arial, sans-serif",
            }}>{testimonialsSummary}</span>
          </div>
        </div>
      </AnimateIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {testimonials.map((t, i) => (
          <AnimateIn key={i} delay={i * 100}>
            <div style={{
              background: "#FFFFFF",
              borderRadius: "8px", padding: "28px 26px",
              border: "2px solid #1A1A1A",
              height: "100%",
              transition: "all 0.2s",
              boxShadow: "4px 4px 0px #1A1A1A",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0px #FF6B35";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0px #1A1A1A";
              }}
            >
              <div style={{ display: "flex", gap: "4px", marginBottom: "18px" }}>
                {[1, 2, 3, 4, 5].map(s => <StarFilled key={s} />)}
              </div>
              <p style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "16px", lineHeight: 1.6,
                margin: "0 0 24px", color: "#1A1A1A",
                fontWeight: 400,
              }}>{t.quote}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{
                    fontSize: "14px", fontWeight: 900, color: "#1A1A1A",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                    textTransform: "uppercase",
                  }}>{t.name}</div>
                  <div style={{
                    fontSize: "12px", color: "#666666",
                    marginTop: "3px", fontWeight: 600,
                  }}>{t.location}</div>
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: 800, color: "#FFFFFF",
                  background: "#FF6B35", padding: "6px 12px",
                  borderRadius: "4px", letterSpacing: "0.05em",
                  textTransform: "uppercase",
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
