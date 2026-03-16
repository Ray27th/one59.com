import { useState } from "react";
import { StarFilled, CheckIcon } from "./icons.jsx";

const ROOM_PRESETS = [
  { label: "HDB Classic", prompt: "Bright HDB living room, white walls, parquet flooring, warm ambient lighting" },
  { label: "Modern Condo", prompt: "Modern condo with floor-to-ceiling windows, grey concrete floors, natural daylight" },
  { label: "Japandi", prompt: "Japandi interior, white oak floors, neutral linen tones, soft diffused light, minimal" },
  { label: "Industrial", prompt: "Industrial loft, exposed brick wall, concrete flooring, Edison bulb pendant lighting" },
];

const BundleDetailModal = ({ bundle, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(bundle.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

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
      if (bundle.image) {
        try {
          const imgRes = await fetch(bundle.image);
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
          productName: bundle.name,
          productDesc: bundle.desc,
          productCategory: "Bundle",
          productTags: bundle.contents,
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
    onAddToCart({ name: bundle.name, price: bundle.price });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(12,10,8,0.76)",
        backdropFilter: "blur(8px)",
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
          borderRadius: "20px",
          overflow: "hidden",
          background: "#FDFAF5",
          boxShadow: "0 40px 100px rgba(0,0,0,0.36)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Left: bundle image ── */}
        <div style={{
          width: "42%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}>
          <img
            src={bundle.image}
            alt={bundle.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradient overlay for readability */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(20,16,12,0.55) 0%, transparent 50%)",
          }} />
          {/* Contents pills pinned to bottom of image */}
          <div style={{
            position: "absolute", bottom: "20px", left: "20px", right: "20px",
            display: "flex", flexWrap: "wrap", gap: "6px",
          }}>
            {bundle.contents.map(item => (
              <span key={item} style={{
                background: "rgba(253,250,245,0.18)",
                backdropFilter: "blur(6px)",
                color: "#FDFAF5",
                border: "1px solid rgba(253,250,245,0.3)",
                borderRadius: "20px", padding: "4px 12px",
                fontSize: "11px", letterSpacing: "0.03em",
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── Right: detail panel ── */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* Sticky header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "22px 28px 0",
            position: "sticky", top: 0,
            background: "#FDFAF5",
            zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#BFA75D", textTransform: "uppercase" }}>
                Curated Set
              </span>
              {bundle.originalPrice && (
                <span style={{
                  background: "#C31818", color: "#FDFAF5",
                  borderRadius: "4px", padding: "2px 8px",
                  fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>Save</span>
              )}
            </div>
            <button onClick={onClose} style={{
              background: "#EDEBE7", border: "none", cursor: "pointer",
              width: "30px", height: "30px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6B5E50", fontSize: "14px",
            }}>✕</button>
          </div>

          <div style={{ padding: "14px 28px 32px", display: "flex", flexDirection: "column" }}>
            {/* Title + price */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 400, lineHeight: 1.08,
              margin: "0 0 10px", color: "#1C1714",
              letterSpacing: "-0.8px",
            }}>{bundle.name}</h2>

            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "24px", fontWeight: 400, color: "#C31818",
                letterSpacing: "-0.3px",
              }}>{bundle.price}</span>
              {bundle.originalPrice && (
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px", color: "#A0907A", textDecoration: "line-through",
                }}>{bundle.originalPrice}</span>
              )}
              <div style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
                {[1,2,3,4,5].map(s => <StarFilled key={s} />)}
              </div>
            </div>

            {/* Hook quote */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontSize: "17px",
              color: "#2A1F18", lineHeight: 1.55,
              margin: "0 0 10px",
            }}>"{bundle.hook}"</p>

            {/* Description */}
            <p style={{
              color: "#6B5E50", fontSize: "14px", lineHeight: 1.8,
              margin: "0 0 22px", fontWeight: 300,
            }}>{bundle.desc}</p>

            <hr style={{ border: "none", borderTop: "1px solid #EDE8DF", margin: "0 0 22px" }} />

            {/* ── Size options ── */}
            {bundle.sizes?.length > 1 && (
              <>
                <div style={{ marginBottom: "22px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#A0907A", textTransform: "uppercase", marginBottom: "14px" }}>
                    Configuration
                  </div>
                  <div style={{ fontSize: "12px", color: "#1C1714", fontWeight: 500, marginBottom: "10px" }}>
                    Size — <span style={{ fontWeight: 300, color: "#6B5E50" }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {bundle.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          background: selectedSize === s ? "#1C1714" : "transparent",
                          color: selectedSize === s ? "#FDFAF5" : "#6B5E50",
                          border: `1.5px solid ${selectedSize === s ? "#1C1714" : "#DDD5C8"}`,
                          borderRadius: "6px", padding: "7px 16px",
                          fontSize: "12px", cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                          transition: "all 0.15s",
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #EDE8DF", margin: "0 0 22px" }} />
              </>
            )}

            {/* ── AI Visualizer ── */}
            <div style={{ marginBottom: "22px" }}>
              <button
                onClick={() => setVizOpen(o => !o)}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", padding: 0, marginBottom: vizOpen ? "16px" : "0",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#A0907A", textTransform: "uppercase" }}>
                    AI Room Visualizer
                  </span>
                  <span style={{ fontSize: "10px", color: "#BFA75D", background: "rgba(191,167,93,0.1)", padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.06em" }}>
                    BETA
                  </span>
                </div>
                <span style={{
                  fontSize: "16px", color: "#A0907A",
                  transform: vizOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s", display: "inline-block",
                }}>⌄</span>
              </button>

              {vizOpen && (
                <div style={{ background: "#F5F2EE", borderRadius: "12px", padding: "18px" }}>
                  {vizStep === "input" && (
                    <>
                      <p style={{ fontSize: "13px", color: "#6B5E50", lineHeight: 1.7, margin: "0 0 14px" }}>
                        Describe your room and we'll render the <strong style={{ color: "#1C1714" }}>{bundle.name}</strong> set placed naturally in your space.
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                        {ROOM_PRESETS.map(p => (
                          <button key={p.label} onClick={() => { setRoomDesc(p.prompt); setActivePreset(p.label); }} style={{
                            background: activePreset === p.label ? "#1C1714" : "transparent",
                            color: activePreset === p.label ? "#FDFAF5" : "#6B5E50",
                            border: `1.5px solid ${activePreset === p.label ? "#1C1714" : "#DDD5C8"}`,
                            borderRadius: "6px", padding: "5px 12px",
                            fontSize: "11px", cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
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
                          background: "#FFFFFF", border: "1.5px solid #DDD5C8",
                          borderRadius: "8px", padding: "11px 13px",
                          fontSize: "13px", color: "#1C1714", resize: "none", outline: "none",
                          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
                          marginBottom: "12px", transition: "border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#A0907A"}
                        onBlur={e => e.target.style.borderColor = "#DDD5C8"}
                      />
                      {vizError && (
                        <div style={{ color: "#B94040", fontSize: "12px", marginBottom: "10px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" }}>
                          {vizError}
                        </div>
                      )}
                      <button onClick={generate} disabled={loading || !roomDesc.trim()} style={{
                        width: "100%",
                        background: loading || !roomDesc.trim() ? "#A09082" : "#1C1714",
                        color: "#FDFAF5", border: "none", borderRadius: "8px",
                        padding: "12px", fontSize: "13px", fontWeight: 500,
                        cursor: loading || !roomDesc.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s",
                      }}>
                        {loading
                          ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>◌</span> Generating…</>
                          : "Generate Visualization"
                        }
                      </button>
                    </>
                  )}
                  {vizStep === "result" && imageResult && (
                    <>
                      <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
                        <img
                          src={`data:${imageResult.mimeType};base64,${imageResult.data}`}
                          alt={`${bundle.name} in your room`}
                          style={{ width: "100%", display: "block" }}
                        />
                      </div>
                      <button onClick={() => { setVizStep("input"); setImageResult(null); }} style={{
                        width: "100%", background: "transparent", color: "#6B5E50",
                        border: "1.5px solid #DDD5C8", borderRadius: "8px", padding: "10px",
                        fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                      }}>Try a different room</button>
                    </>
                  )}
                </div>
              )}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #EDE8DF", margin: "0 0 22px" }} />

            {/* ── Quantity + Add to Cart ── */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{
                display: "flex", alignItems: "center",
                border: "1.5px solid #DDD5C8", borderRadius: "8px",
                overflow: "hidden", flexShrink: 0,
              }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: "38px", height: "44px", background: "none", border: "none",
                    cursor: "pointer", fontSize: "16px", color: "#6B5E50",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5EFE6"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >−</button>
                <span style={{
                  width: "36px", textAlign: "center",
                  fontSize: "14px", fontWeight: 500, color: "#1C1714",
                  borderLeft: "1px solid #EDE8DF", borderRight: "1px solid #EDE8DF",
                  lineHeight: "44px",
                }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: "38px", height: "44px", background: "none", border: "none",
                    cursor: "pointer", fontSize: "16px", color: "#6B5E50",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F5EFE6"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, background: "#1C1714", color: "#FDFAF5",
                  border: "none", borderRadius: "8px", height: "44px",
                  fontSize: "13px", fontWeight: 500, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  letterSpacing: "0.02em", transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <CheckIcon /> Add Bundle to Cart — {bundle.price}
              </button>
            </div>
            <p style={{ fontSize: "11px", color: "#A0907A", margin: "12px 0 0", textAlign: "center" }}>
              Free delivery on orders over S$500 · 30-day hassle-free returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleDetailModal;
