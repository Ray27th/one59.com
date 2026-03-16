import { roomCategories } from "../../data/index.js";
import { ArrowRight } from "../icons.jsx";
import AnimateIn from "../ui/AnimateIn.jsx";

const RoomCategories = () => (
  <section style={{ padding: "0 48px 72px" }}>
    <AnimateIn>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 400, margin: 0, letterSpacing: "-0.3px" }}>
          Shop by Room
        </h2>
        <span style={{ fontSize: "11px", color: "#A0907A", letterSpacing: "0.1em", textTransform: "uppercase" }}>5 spaces</span>
      </div>
      <p style={{ fontSize: "13px", color: "#8B7B6B", margin: "0 0 20px", fontWeight: 300 }}>
        Curated looks for every corner of your home.
      </p>
    </AnimateIn>

    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr",
      gridTemplateRows: "220px 220px",
      gap: "10px",
    }}>
      {roomCategories.map((room, i) => (
        <AnimateIn key={room.name} delay={i * 80} style={{ gridRow: i === 0 ? "span 2" : "span 1" }}>
          <div style={{
            borderRadius: "10px",
            padding: "20px",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            cursor: "pointer",
            overflow: "hidden",
            height: "100%",
            backgroundImage: `linear-gradient(to top, rgba(20,16,12,0.62) 0%, rgba(20,16,12,0.08) 55%), url(${room.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.25s ease",
            position: "relative",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.012)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "4px" }}>
              {room.desc}
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: i === 0 ? "32px" : "22px",
              fontWeight: 500, color: "#FFFFFF", lineHeight: 1.1,
            }}>{room.name}</div>
            <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
              Explore <ArrowRight />
            </div>
          </div>
        </AnimateIn>
      ))}
    </div>
  </section>
);

export default RoomCategories;