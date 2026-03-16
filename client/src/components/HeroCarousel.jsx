import { useState, useRef, useEffect } from "react";
import { products } from "../data/index.js";
import ProductImage from "./ui/ProductImage.jsx";
import { ArrowRight } from "./icons.jsx";

const HeroCarousel = ({ onVisualize, onAddToCart }) => {
  const slides = products.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const idxRef = useRef(0);
  const transitioning = useRef(false);
  const intervalRef = useRef(null);

  const goTo = (next) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setVisible(false);
    setTimeout(() => {
      idxRef.current = next;
      setIdx(next);
      setVisible(true);
      transitioning.current = false;
    }, 380);
  };

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goTo((idxRef.current + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const current = slides[idx];

  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: "55fr 45fr",
      minHeight: "86vh",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Left: product info */}
      <div style={{
        background: "#FDFAF5",
        padding: "80px 56px 100px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(10px)",
        transition: "opacity 0.38s ease, transform 0.38s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <span style={{ width: "24px", height: "1px", background: "#A0907A", display: "inline-block" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#A0907A", textTransform: "uppercase" }}>
            {current.category}
          </span>
          {current.badge && (
            <span style={{
              background: "#1C1714", color: "#FDFAF5",
              borderRadius: "4px", padding: "2px 8px",
              fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>{current.badge}</span>
          )}
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 5.5vw, 80px)",
          fontWeight: 400, lineHeight: 1.04,
          margin: "0 0 18px", color: "#1C1714",
          letterSpacing: "-1.5px",
        }}>
          {current.name}
        </h1>

        <p style={{
          color: "#6B5E50", fontSize: "16px", lineHeight: 1.8,
          margin: "0 0 10px", maxWidth: "400px", fontWeight: 300,
        }}>
          {current.desc}
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", margin: "16px 0 36px" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "28px", fontWeight: 400,
            color: current.originalPrice ? "#C31818" : "#1C1714",
            letterSpacing: "-0.3px",
          }}>{current.price}</span>
          {current.originalPrice && (
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px", fontWeight: 300,
              color: "#A0907A", textDecoration: "line-through",
              letterSpacing: "-0.2px",
            }}>{current.originalPrice}</span>
          )}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={() => onAddToCart(current)} style={{
            background: "#1C1714", color: "#FDFAF5",
            border: "none", borderRadius: "8px",
            padding: "14px 28px", fontSize: "14px", fontWeight: 500,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "opacity 0.15s", letterSpacing: "0.02em",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Shop Now</button>

          <button onClick={() => onVisualize(current)} style={{
            background: "transparent", color: "#6B5E50",
            border: "1.5px solid #DDD5C8", borderRadius: "8px",
            padding: "14px 28px", fontSize: "14px",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#A0907A"; e.currentTarget.style.color = "#1C1714"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#DDD5C8"; e.currentTarget.style.color = "#6B5E50"; }}
          >Visualize in My Room</button>
        </div>

        <div style={{ display: "flex", gap: "6px", marginTop: "24px", flexWrap: "wrap" }}>
          {current.tags.map(t => (
            <span key={t} style={{
              background: "transparent", color: "#8B7B6B",
              border: "1px solid #DDD5C8",
              borderRadius: "20px", padding: "3px 11px",
              fontSize: "11px", letterSpacing: "0.03em",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Right: atmospheric product visual */}
      <div style={{
        background: current.bg,
        transition: "background 0.9s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          width: "68%",
          aspectRatio: "1 / 1",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.38s ease, transform 0.38s ease",
          overflow: "hidden",
        }}>
          <ProductImage product={current} />
        </div>
      </div>

      {/* Slide navigation dots */}
      <div style={{
        position: "absolute",
        bottom: "32px", left: "27.5%",
        transform: "translateX(-50%)",
        display: "flex", gap: "8px", zIndex: 10,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { goTo(i); startAutoPlay(); }} style={{
            width: i === idx ? "28px" : "8px",
            height: "8px",
            borderRadius: "4px",
            background: i === idx ? "#1C1714" : "rgba(28,23,20,0.22)",
            border: "none", cursor: "pointer",
            transition: "all 0.3s ease",
            padding: 0,
          }} />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute",
        top: "32px", right: "32px",
        fontSize: "11px", color: "rgba(28,23,20,0.4)",
        letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif",
        zIndex: 10,
      }}>
        {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
};

export default HeroCarousel;