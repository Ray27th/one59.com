import { useState } from "react";
import ProductImage from "./ui/ProductImage.jsx";
import { StarFilled, CheckIcon, HeartIcon } from "./icons.jsx";
import { products } from "../data/index.js";

// ─── Customisation config ─────────────────────────────────────────────────────
const COLOUR_OPTIONS = {
  Sofas: [
    { name: "Oat", hex: "#D4B896" },
    { name: "Sage", hex: "#7A9E7E" },
    { name: "Slate", hex: "#8A9BA8" },
    { name: "Dusk", hex: "#C4A8B4" },
  ],
  Tables: [
    { name: "Ash", hex: "#C8A87A" },
    { name: "Walnut", hex: "#5C3D2E" },
    { name: "Ebony", hex: "#2A2420" },
    { name: "Natural", hex: "#BFA75D" },
  ],
  Beds: [
    { name: "Walnut", hex: "#8B6E52" },
    { name: "White Oak", hex: "#D4C4A8" },
    { name: "Ebony", hex: "#3A2E28" },
    { name: "Ivory", hex: "#EDE8DC" },
  ],
  Storage: [
    { name: "Black Oak", hex: "#6B5E52" },
    { name: "Natural", hex: "#B8A88A" },
    { name: "White", hex: "#EDEAE4" },
    { name: "Walnut", hex: "#8B6E52" },
  ],
  Lighting: [
    { name: "Brass", hex: "#C4A864" },
    { name: "Matte Black", hex: "#2A2420" },
    { name: "Chrome", hex: "#B0B8C0" },
    { name: "Copper", hex: "#B87333" },
  ],
};

const SIZE_OPTIONS = {
  Sofas: ["2-Seater", "3-Seater", "L-Shape"],
  Tables: ["120 cm", "160 cm", "200 cm"],
  Beds: ["Single", "Queen", "King"],
  Storage: ["Small", "Medium", "Large"],
  Lighting: ["Standard"],
};

const ROOM_PRESETS = [
  { label: "HDB Classic", prompt: "Bright HDB living room, white walls, parquet flooring, warm ambient lighting" },
  { label: "Modern Condo", prompt: "Modern condo with floor-to-ceiling windows, grey concrete floors, natural daylight" },
  { label: "Japandi", prompt: "Japandi bedroom, white oak floors, neutral linen tones, soft diffused light, minimal" },
  { label: "Industrial", prompt: "Industrial loft, exposed brick wall, concrete flooring, Edison bulb pendant lighting" },
];

const badgeColor = (badge) => {
  if (badge === "New") return "#1A1A1A";
  if (badge === "Sale") return "#FF6B35";
  if (badge === "Ships Fast") return "#2E6B3E";
  return "#FF6B35";
};

// ─── Component ────────────────────────────────────────────────────────────────
const ProductDetailModal = ({ product, onClose, onAddToCart, onOpenDetail }) => {
  // Customisation state
  const colours = COLOUR_OPTIONS[product.category] || [];
  const sizes = SIZE_OPTIONS[product.category] || [];
  const [selectedColour, setSelectedColour] = useState(colours[0]?.name || null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [quantity, setQuantity] = useState(1);

  // Get recommended products
  const complementaryPairs = {
    Chairs: ["Tables", "Storage"],
    Tables: ["Chairs", "Lighting", "Decor"],
    Storage: ["Decor", "Lighting"],
    Lighting: ["Tables", "Storage", "Decor"],
    Decor: ["Storage", "Lighting", "Beds"],
    Beds: ["Storage", "Lighting", "Decor"],
    Living: ["Tables", "Storage", "Lighting"],
    Bedroom: ["Storage", "Lighting", "Decor"],
  };
  const recommendedIds = products
    .filter(p =>
      p.id !== product.id &&
      (p.category === product.category ||
       (complementaryPairs[product.category] || []).includes(p.category))
    )
    .slice(0, 6)
    .map(p => p.id);
  const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));

  const [recIndex, setRecIndex] = useState(0);
  const [recVisualizing, setRecVisualizing] = useState(false);
  const [recVizOpen, setRecVizOpen] = useState(false);
  const [recRoomDesc, setRecRoomDesc] = useState("");
  const [recActivePreset, setRecActivePreset] = useState(null);
  const [recVizLoading, setRecVizLoading] = useState(false);
  const [recImageResult, setRecImageResult] = useState(null);
  const [recVizError, setRecVizError] = useState(null);

  // AI Visualizer state
  const [vizOpen, setVizOpen] = useState(false);
  const [roomDesc, setRoomDesc] = useState("");
  const [activePreset, setActivePreset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [vizError, setVizError] = useState(null);
  const [vizStep, setVizStep] = useState("input");

  const generate = async () => {
    if (!roomDesc.trim()) return;
    setLoading(true);
    setVizError(null);
    try {
      let productImageBase64 = null;
      let productImageMimeType = null;
      if (product.image) {
        try {
          const imgRes = await fetch(product.image);
          if (imgRes.ok) {
            const blob = await imgRes.blob();
            productImageMimeType = blob.type || "image/webp";
            productImageBase64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result.split(",")[1]);
              reader.readAsDataURL(blob);
            });
          }
        } catch {}
      }
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          productDesc: product.desc,
          productCategory: product.category,
          productTags: product.tags,
          selectedColour,
          selectedSize,
          roomDesc,
          productImageBase64,
          productImageMimeType,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setImageResult({ data: data.imageData, mimeType: data.mimeType });
      setVizStep("result");
    } catch (e) {
      setVizError(e.message || "Could not generate the image. Please try again.");
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const navigateRecommendations = (dir) => {
    setRecIndex(i => {
      const newIdx = i + dir;
      if (newIdx < 0) return recommendedProducts.length - 1;
      if (newIdx >= recommendedProducts.length) return 0;
      return newIdx;
    });
    setRecVizOpen(false);
    setRecImageResult(null);
  };

  const generateRecViz = async () => {
    if (!recRoomDesc.trim()) return;
    setRecVizLoading(true);
    setRecVizError(null);
    try {
      let productImageBase64 = null;
      let productImageMimeType = null;
      const recProduct = recommendedProducts[recIndex];
      if (recProduct.image) {
        const imgRes = await fetch(recProduct.image);
        if (imgRes.ok) {
          const blob = await imgRes.blob();
          productImageMimeType = blob.type || "image/webp";
          productImageBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.readAsDataURL(blob);
          });
        }
      }
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: recProduct.name,
          productDesc: recProduct.desc,
          productCategory: recProduct.category,
          productTags: recProduct.tags,
          roomDesc: recRoomDesc,
          productImageBase64,
          productImageMimeType,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRecImageResult({ data: data.imageData, mimeType: data.mimeType });
    } catch (e) {
      setRecVizError(e.message || "Could not generate the image. Please try again.");
    }
    setRecVizLoading(false);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex",
          width: "100%", maxWidth: "960px",
          maxHeight: "90vh",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#FFFFFF",
          boxShadow: "8px 8px 0px #1A1A1A",
          border: "2px solid #1A1A1A",
          fontFamily: "'Arial Black', Arial, sans-serif",
        }}
      >
        {/* ── Left: image panel ── */}
        <div style={{
          width: "42%",
          flexShrink: 0,
          background: product.bg || "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          gap: "20px",
          position: "relative",
        }}>
          {/* White product card */}
          <div style={{
            background: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "4px 4px 0px #1A1A1A",
            width: "100%",
            aspectRatio: "1 / 1",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            border: "2px solid #1A1A1A",
          }}>
            <ProductImage product={product} />
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
            {product.tags.map(t => (
              <span key={t} style={{
                background: "#1A1A1A",
                color: "#FFFFFF",
                borderRadius: "4px", padding: "4px 10px",
                fontSize: "10px", fontWeight: 700,
                textTransform: "uppercase",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Sticky header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 20px",
            position: "sticky", top: 0,
            background: "#FFFFFF",
            zIndex: 10,
            borderBottom: "2px solid #1A1A1A",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", fontWeight: 800 }}>
                {product.category}
              </span>
              {product.badge && (
                <span style={{
                  background: badgeColor(product.badge), color: "#FFFFFF",
                  borderRadius: "4px", padding: "2px 8px",
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 800,
                }}>{product.badge}</span>
              )}
            </div>
            <button onClick={onClose} style={{
              background: "#F5F5F5", border: "2px solid #1A1A1A", cursor: "pointer",
              width: "32px", height: "32px", borderRadius: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1A1A1A", fontSize: "16px",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#1A1A1A"; }}
            >✕</button>
          </div>

          <div style={{ padding: "18px 20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Title */}
            <h2 style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "24px",
              fontWeight: 900, lineHeight: 1.1,
              margin: "0", color: "#1A1A1A",
              textTransform: "uppercase",
            }}>{product.name}</h2>

            {/* Price + stars */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "22px", fontWeight: 900,
                color: "#FF6B35",
              }}>{product.price}</span>
              {product.originalPrice && (
                <span style={{
                  fontSize: "14px", color: "#999999",
                  textDecoration: "line-through", fontWeight: 400,
                }}>{product.originalPrice}</span>
              )}
              <div style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
                {[1,2,3,4,5].map(s => <StarFilled key={s} />)}
              </div>
            </div>

            {/* Description */}
            <p style={{
              color: "#666666", fontSize: "14px", lineHeight: 1.6,
              margin: "0", fontFamily: "Arial, sans-serif",
            }}>{product.desc}</p>

            {/* ── Customisation ── */}
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "12px", fontWeight: 800 }}>
                Customise
              </div>

              {/* Colour swatches */}
              {colours.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#1A1A1A", fontWeight: 800, marginBottom: "8px", fontFamily: "'Arial Black', Arial, sans-serif" }}>
                    COLOUR — <span style={{ fontWeight: 700, color: "#666666", fontFamily: "Arial, sans-serif" }}>{selectedColour}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {colours.map(c => (
                      <button
                        key={c.name}
                        title={c.name}
                        onClick={() => setSelectedColour(c.name)}
                        style={{
                          width: "32px", height: "32px",
                          borderRadius: "50%",
                          background: c.hex,
                          border: selectedColour === c.name ? "3px solid #1A1A1A" : "3px solid transparent",
                          cursor: "pointer",
                          transition: "transform 0.15s, border-color 0.15s",
                          boxShadow: "2px 2px 0px #1A1A1A",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size options */}
              {sizes.length > 1 && (
                <div>
                  <div style={{ fontSize: "12px", color: "#1A1A1A", fontWeight: 800, marginBottom: "8px", fontFamily: "'Arial Black', Arial, sans-serif" }}>
                    SIZE — <span style={{ fontWeight: 700, color: "#666666", fontFamily: "Arial, sans-serif" }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          background: selectedSize === s ? "#1A1A1A" : "#F5F5F5",
                          color: selectedSize === s ? "#FFFFFF" : "#1A1A1A",
                          border: `2px solid ${selectedSize === s ? "#1A1A1A" : "#E0E0E0"}`,
                          borderRadius: "6px", padding: "8px 14px",
                          fontSize: "11px", fontWeight: 800, cursor: "pointer",
                          fontFamily: "'Arial Black', Arial, sans-serif",
                          textTransform: "uppercase",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { if (selectedSize !== s) { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; e.currentTarget.style.borderColor = "#FF6B35"; }}}
                        onMouseLeave={e => { if (selectedSize !== s) { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderColor = "#E0E0E0"; }}}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── AI Visualizer ── */}
            <div>
              <button
                onClick={() => setVizOpen(o => !o)}
                style={{
                  width: "100%", background: "#F5F5F5", border: "2px solid #1A1A1A",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", padding: "12px 14px", marginBottom: vizOpen ? "14px" : "0",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  borderRadius: "6px",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0E6"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", fontWeight: 800 }}>
                    AI ROOM VISUALIZER
                  </span>
                  <span style={{ fontSize: "9px", color: "#FFFFFF", background: "#FF6B35", padding: "2px 6px", borderRadius: "4px", letterSpacing: "0.05em", fontWeight: 800 }}>
                    BETA
                  </span>
                </div>
                <span style={{
                  fontSize: "18px", color: "#1A1A1A", fontWeight: 800,
                  transform: vizOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                  display: "inline-block",
                }}>⌄</span>
              </button>

              {vizOpen && (
                <div style={{ background: "#F5F5F5", borderRadius: "6px", padding: "16px", border: "2px solid #E0E0E0" }}>
                  {vizStep === "input" && (
                    <>
                      <p style={{ fontSize: "13px", color: "#666666", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "Arial, sans-serif" }}>
                        Describe your room and see the <strong style={{ color: "#1A1A1A" }}>{product.name}</strong> placed naturally in your space.
                      </p>

                      {/* Presets */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                        {ROOM_PRESETS.map(p => (
                          <button key={p.label} onClick={() => { setRoomDesc(p.prompt); setActivePreset(p.label); }} style={{
                            background: activePreset === p.label ? "#1A1A1A" : "#FFFFFF",
                            color: activePreset === p.label ? "#FFFFFF" : "#1A1A1A",
                            border: `2px solid ${activePreset === p.label ? "#1A1A1A" : "#E0E0E0"}`,
                            borderRadius: "6px", padding: "6px 12px",
                            fontSize: "10px", fontWeight: 800, cursor: "pointer",
                            fontFamily: "'Arial Black', Arial, sans-serif",
                            textTransform: "uppercase",
                            transition: "all 0.15s",
                          }}>{p.label}</button>
                        ))}
                      </div>

                      <textarea
                        value={roomDesc}
                        onChange={e => { setRoomDesc(e.target.value); setActivePreset(null); }}
                        placeholder="Or describe freely — walls, floors, lighting, style..."
                        rows={3}
                        style={{
                          width: "100%", boxSizing: "border-box",
                          background: "#FFFFFF", border: "2px solid #E0E0E0",
                          borderRadius: "6px", padding: "11px 13px",
                          fontSize: "13px", color: "#1A1A1A", resize: "none", outline: "none",
                          fontFamily: "Arial, sans-serif", lineHeight: 1.5,
                          marginBottom: "12px", transition: "border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#FF6B35"}
                        onBlur={e => e.target.style.borderColor = "#E0E0E0"}
                      />

                      {vizError && (
                        <div style={{ color: "#B94040", fontSize: "12px", marginBottom: "10px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px", border: "2px solid #B94040", fontFamily: "Arial, sans-serif" }}>
                          {vizError}
                        </div>
                      )}

                      <button onClick={generate} disabled={loading || !roomDesc.trim()} style={{
                        width: "100%",
                        background: loading || !roomDesc.trim() ? "#999999" : "#1A1A1A",
                        color: "#FFFFFF", border: "none", borderRadius: "6px",
                        padding: "12px", fontSize: "12px", fontWeight: 800,
                        cursor: loading || !roomDesc.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        fontFamily: "'Arial Black', Arial, sans-serif",
                        textTransform: "uppercase",
                        transition: "background 0.15s",
                      }}>
                        {loading
                          ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> GENERATING…</>
                          : "GENERATE VISUALIZATION"
                        }
                      </button>
                    </>
                  )}

                  {vizStep === "result" && imageResult && (
                    <>
                      <div style={{ borderRadius: "6px", overflow: "hidden", marginBottom: "12px", border: "2px solid #1A1A1A" }}>
                        <img
                          src={`data:${imageResult.mimeType};base64,${imageResult.data}`}
                          alt={`${product.name} in your room`}
                          style={{ width: "100%", display: "block" }}
                        />
                      </div>
                      <button onClick={() => { setVizStep("input"); setImageResult(null); }} style={{
                        width: "100%", background: "#F5F5F5", color: "#1A1A1A",
                        border: "2px solid #1A1A1A", borderRadius: "6px", padding: "11px",
                        fontSize: "11px", fontWeight: 800, cursor: "pointer",
                        fontFamily: "'Arial Black', Arial, sans-serif",
                        textTransform: "uppercase",
                        transition: "all 0.15s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#1A1A1A"; }}
                      >TRY ANOTHER ROOM</button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* ── Pairs Well With (Carousel) ── */}
            {recommendedProducts.length > 0 && (
              <div>
                <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "12px", fontWeight: 800 }}>
                  Pairs Well With
                </div>

                <div style={{
                  background: "#F5F5F5",
                  border: "2px solid #E0E0E0",
                  borderRadius: "8px",
                  padding: "16px",
                }}>
                  {/* Navigation arrows */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <button
                      onClick={() => navigateRecommendations(-1)}
                      style={{
                        background: "#1A1A1A",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        fontSize: "18px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Arial Black', Arial, sans-serif",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                      onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
                    >‹</button>
                    <div style={{ fontSize: "11px", color: "#999999", fontFamily: "Arial, sans-serif" }}>
                      {recIndex + 1} of {recommendedProducts.length}
                    </div>
                    <button
                      onClick={() => navigateRecommendations(1)}
                      style={{
                        background: "#1A1A1A",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        fontSize: "18px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Arial Black', Arial, sans-serif",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                      onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
                    >›</button>
                  </div>

                  {/* Current recommendation */}
                  {(() => {
                    const rec = recommendedProducts[recIndex];
                    return (
                      <div>
                        <div
                          onClick={() => onOpenDetail && onOpenDetail(rec)}
                          style={{
                            display: "flex",
                            gap: "14px",
                            alignItems: "center",
                            marginBottom: "14px",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{
                            background: "#FFFFFF",
                            borderRadius: "6px",
                            width: "100px",
                            height: "100px",
                            border: "2px solid #1A1A1A",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}>
                            <img src={rec.image} alt={rec.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: "13px",
                              fontWeight: 900,
                              color: "#1A1A1A",
                              textTransform: "uppercase",
                              marginBottom: "4px",
                            }}>{rec.name}</div>
                            <div style={{
                              fontSize: "11px",
                              color: "#666666",
                              fontFamily: "Arial, sans-serif",
                              marginBottom: "6px",
                            }}>{rec.desc}</div>
                            <div style={{
                              fontSize: "16px",
                              fontWeight: 900,
                              color: "#FF6B35",
                            }}>{rec.price}</div>
                          </div>
                        </div>

                        {/* AI Visualize button */}
                        <button
                          onClick={() => setRecVizOpen(o => !o)}
                          style={{
                            width: "100%",
                            background: "#FF6B35",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "6px",
                            padding: "10px",
                            fontSize: "11px",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontFamily: "'Arial Black', Arial, sans-serif",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#E55A2B"}
                          onMouseLeave={e => e.currentTarget.style.background = "#FF6B35"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>
                          Visualize This Item In Your Room
                        </button>

                        {/* AI Visualizer panel */}
                        {recVizOpen && (
                          <div style={{
                            marginTop: "12px",
                            background: "#FFFFFF",
                            borderRadius: "6px",
                            padding: "14px",
                            border: "2px solid #E0E0E0",
                          }}>
                            {!recImageResult ? (
                              <>
                                <p style={{ fontSize: "12px", color: "#666666", lineHeight: 1.5, margin: "0 0 10px", fontFamily: "Arial, sans-serif" }}>
                                  Describe your room and see the <strong style={{ color: "#1A1A1A" }}>{rec.name}</strong> placed naturally in your space.
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                                  {ROOM_PRESETS.map(p => (
                                    <button
                                      key={p.label}
                                      onClick={() => { setRecRoomDesc(p.prompt); setRecActivePreset(p.label); }}
                                      style={{
                                        background: recActivePreset === p.label ? "#1A1A1A" : "#F5F5F5",
                                        color: recActivePreset === p.label ? "#FFFFFF" : "#1A1A1A",
                                        border: `2px solid ${recActivePreset === p.label ? "#1A1A1A" : "#E0E0E0"}`,
                                        borderRadius: "4px",
                                        padding: "5px 10px",
                                        fontSize: "9px",
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        fontFamily: "'Arial Black', Arial, sans-serif",
                                        textTransform: "uppercase",
                                        transition: "all 0.15s",
                                      }}
                                    >{p.label}</button>
                                  ))}
                                </div>
                                <textarea
                                  value={recRoomDesc}
                                  onChange={e => { setRecRoomDesc(e.target.value); setRecActivePreset(null); }}
                                  placeholder="Or describe freely — walls, floors, lighting..."
                                  rows={3}
                                  style={{
                                    width: "100%",
                                    boxSizing: "border-box",
                                    background: "#F5F5F5",
                                    border: "2px solid #E0E0E0",
                                    borderRadius: "6px",
                                    padding: "10px",
                                    fontSize: "12px",
                                    color: "#1A1A1A",
                                    resize: "none",
                                    outline: "none",
                                    fontFamily: "Arial, sans-serif",
                                    lineHeight: 1.5,
                                    marginBottom: "10px",
                                  }}
                                  onFocus={e => e.target.style.borderColor = "#FF6B35"}
                                  onBlur={e => e.target.style.borderColor = "#E0E0E0"}
                                />
                                {recVizError && (
                                  <div style={{
                                    color: "#B94040",
                                    fontSize: "11px",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    background: "#FEF2F2",
                                    borderRadius: "4px",
                                    border: "2px solid #B94040",
                                    fontFamily: "Arial, sans-serif",
                                  }}>
                                    {recVizError}
                                  </div>
                                )}
                                <button
                                  onClick={generateRecViz}
                                  disabled={recVizLoading || !recRoomDesc.trim()}
                                  style={{
                                    width: "100%",
                                    background: recVizLoading || !recRoomDesc.trim() ? "#999999" : "#1A1A1A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "10px",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    cursor: recVizLoading || !recRoomDesc.trim() ? "not-allowed" : "pointer",
                                    fontFamily: "'Arial Black', Arial, sans-serif",
                                    textTransform: "uppercase",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                  }}
                                >
                                  {recVizLoading
                                    ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span> GENERATING…</>
                                    : "GENERATE VISUALIZATION"
                                  }
                                </button>
                              </>
                            ) : (
                              <div>
                                <div style={{
                                  borderRadius: "6px",
                                  overflow: "hidden",
                                  marginBottom: "10px",
                                  border: "2px solid #1A1A1A",
                                }}>
                                  <img
                                    src={`data:${recImageResult.mimeType};base64,${recImageResult.data}`}
                                    alt={`${rec.name} in your room`}
                                    style={{ width: "100%", display: "block" }}
                                  />
                                </div>
                                <button
                                  onClick={() => { setRecImageResult(null); setRecRoomDesc(""); setRecActivePreset(null); }}
                                  style={{
                                    width: "100%",
                                    background: "#F5F5F5",
                                    color: "#1A1A1A",
                                    border: "2px solid #1A1A1A",
                                    borderRadius: "6px",
                                    padding: "9px",
                                    fontSize: "10px",
                                    fontWeight: 800,
                                    cursor: "pointer",
                                    fontFamily: "'Arial Black', Arial, sans-serif",
                                    textTransform: "uppercase",
                                  }}
                                >TRY ANOTHER ROOM</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            <hr style={{ border: "none", borderTop: "2px solid #1A1A1A", margin: "0 0 16px" }} />

            {/* ── Quantity + Add to Cart ── */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Quantity stepper */}
              <div style={{
                display: "flex", alignItems: "center",
                border: "2px solid #E0E0E0", borderRadius: "6px",
                overflow: "hidden", flexShrink: 0,
              }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: "36px", height: "40px",
                    background: "#F5F5F5", border: "none", borderRight: "2px solid #E0E0E0", cursor: "pointer",
                    fontSize: "18px", color: "#1A1A1A", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#E0E0E0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#F5F5F5"}
                >−</button>
                <span style={{
                  width: "40px", textAlign: "center",
                  fontSize: "14px", fontWeight: 800, color: "#1A1A1A",
                  lineHeight: "40px",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: "36px", height: "40px",
                    background: "#F5F5F5", border: "none", borderLeft: "2px solid #E0E0E0", cursor: "pointer",
                    fontSize: "18px", color: "#1A1A1A", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#E0E0E0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#F5F5F5"}
                >+</button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, background: "#1A1A1A", color: "#FFFFFF",
                  border: "none", borderRadius: "6px", height: "40px",
                  fontSize: "12px", fontWeight: 800, cursor: "pointer",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  textTransform: "uppercase",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#333333"}
                onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
              >
                <CheckIcon /> ADD TO CART — {product.price}
              </button>
            </div>

            {/* Delivery note */}
            <p style={{ fontSize: "11px", color: "#999999", margin: "8px 0 0", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
              FREE DELIVERY OVER S$500 · 30-DAY RETURNS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;