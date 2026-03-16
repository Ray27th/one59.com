import { forwardRef } from "react";
import AnimateIn from "../ui/AnimateIn.jsx";

const steps = [
  {
    n: "1", title: "Describe your room",
    body: "Write naturally — style, walls, floors, lighting. Try: \"Bright HDB living room, parquet floors, warm light.\"",
  },
  {
    n: "2", title: "Pick a piece",
    body: "Choose any product from the catalog. It'll be composited intelligently into your described scene.",
  },
  {
    n: "3", title: "See your room",
    body: "A photorealistic render with the furniture placed naturally. Regenerate or adjust your prompt anytime.",
  },
];

const HowItWorks = forwardRef((_, ref) => (
  <section ref={ref} style={{
    padding: "80px 48px",
    background: "#F9F9F9",
    borderTop: "1px solid #EDE8DF",
  }}>
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "88px", alignItems: "center" }}>
        <AnimateIn>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ width: "28px", height: "1px", background: "#A0907A", display: "inline-block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#A0907A", textTransform: "uppercase" }}>
              AI Visualization
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 300, margin: "0 0 20px", lineHeight: 1.08,
            letterSpacing: "-0.8px",
          }}>
            See it before<br />you commit.
          </h2>
          <p style={{ color: "#6B5E50", fontSize: "15px", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
            The only furniture platform in Southeast Asia that lets you render any piece in your room — from a single sentence.
          </p>
        </AnimateIn>

        <div>
          {steps.map((step, i) => (
            <AnimateIn key={step.n} delay={i * 120}>
              <div style={{
                display: "flex", gap: "24px",
                paddingBottom: i < 2 ? "32px" : "0",
                marginBottom: i < 2 ? "32px" : "0",
                borderBottom: i < 2 ? "1px solid #E8DFD0" : "none",
              }}>
                <div style={{
                  width: "34px", height: "34px", flexShrink: 0,
                  background: "#1C1714", color: "#FDFAF5",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: 600,
                }}>{step.n}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, marginBottom: "6px" }}>{step.title}</div>
                  <div style={{ color: "#8B7B6B", fontSize: "14px", lineHeight: 1.7 }}>{step.body}</div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  </section>
));

HowItWorks.displayName = "HowItWorks";
export default HowItWorks;