import { useState } from "react";

const presets = [
  { label: "HDB Classic", prompt: "Bright HDB living room, white walls, parquet flooring, warm ambient lighting" },
  { label: "Modern Condo", prompt: "Modern condo with floor-to-ceiling windows, grey concrete floors, natural daylight" },
  { label: "Japandi", prompt: "Japandi bedroom, white oak floors, neutral linen tones, soft diffused light, minimal" },
  { label: "Industrial", prompt: "Industrial home office, exposed brick wall, concrete flooring, Edison bulb pendant lighting" },
];

const RoomVisualizer = ({ product, onClose }) => {
  const [roomDesc, setRoomDesc] = useState(product._heroPrompt || "");
  const [loading, setLoading] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState("input");
  const [activePreset, setActivePreset] = useState(null);

  const generate = async () => {
    if (!roomDesc.trim()) return;
    setLoading(true);
    setError(null);
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
          roomDesc,
          productImageBase64,
          productImageMimeType,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setImageResult({ data: data.imageData, mimeType: data.mimeType });
      setStep("result");
    } catch (e) {
      setError(e.message || "Could not generate the image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(12,10,8,0.78)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: "20px",
    }}>
      <div style={{
        background: "#FAF8F4",
        borderRadius: "18px",
        width: "100%", maxWidth: "620px",
        maxHeight: "90vh", overflowY: "auto",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 32px 80px rgba(0,0,0,0.32)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          padding: "22px 26px 18px",
          borderBottom: "1px solid #EDE8DF",
        }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#A0907A", textTransform: "uppercase", marginBottom: "4px" }}>
              AI Visualization Studio
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 600, color: "#1C1714", lineHeight: 1.2 }}>
              {product.name}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "#EDEBE7", border: "none", cursor: "pointer",
            width: "30px", height: "30px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6B5E50", fontSize: "14px", flexShrink: 0,
          }}>✕</button>
        </div>

        {step === "input" && (
          <div style={{ padding: "22px 26px 26px" }}>
            <p style={{ color: "#6B5E50", fontSize: "14px", lineHeight: 1.75, margin: "0 0 20px" }}>
              Describe your room and we'll render the <strong style={{ color: "#1C1714" }}>{product.name}</strong> placed naturally in your space.
            </p>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#A0907A", textTransform: "uppercase", marginBottom: "10px" }}>
                Room style
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {presets.map((p) => (
                  <button key={p.label} onClick={() => { setRoomDesc(p.prompt); setActivePreset(p.label); }} style={{
                    background: activePreset === p.label ? "#1C1714" : "transparent",
                    color: activePreset === p.label ? "#FDFAF5" : "#6B5E50",
                    border: `1.5px solid ${activePreset === p.label ? "#1C1714" : "#DDD5C8"}`,
                    borderRadius: "6px", padding: "6px 14px",
                    fontSize: "12px", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                  }}>{p.label}</button>
                ))}
              </div>
            </div>

            <textarea
              value={roomDesc}
              onChange={(e) => { setRoomDesc(e.target.value); setActivePreset(null); }}
              placeholder="Or describe freely — walls, floors, lighting, style..."
              rows={4}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#FFFFFF", border: "1.5px solid #DDD5C8",
                borderRadius: "10px", padding: "13px 15px",
                fontSize: "14px", color: "#1C1714", resize: "none", outline: "none",
                fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65,
                marginBottom: "16px", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#A0907A"}
              onBlur={e => e.target.style.borderColor = "#DDD5C8"}
            />

            {error && (
              <div style={{ color: "#B94040", fontSize: "13px", marginBottom: "14px", padding: "10px 14px", background: "#FEF2F2", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            <button onClick={generate} disabled={loading || !roomDesc.trim()} style={{
              width: "100%",
              background: loading || !roomDesc.trim() ? "#BFA75D" : "#1C1714",
              color: "#FDFAF5", border: "none", borderRadius: "10px",
              padding: "14px", fontSize: "14px", fontWeight: 500,
              cursor: loading || !roomDesc.trim() ? "not-allowed" : "pointer",
              letterSpacing: "0.02em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s",
            }}>
              {loading
                ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span> Generating your room…</>
                : "Generate Room Visualization"
              }
            </button>
          </div>
        )}

        {step === "result" && imageResult && (
          <div style={{ padding: "22px 26px 26px" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
              <img
                src={`data:${imageResult.mimeType};base64,${imageResult.data}`}
                alt={`${product.name} in your room`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setStep("input"); setImageResult(null); }} style={{
                flex: 1, background: "transparent", color: "#6B5E50",
                border: "1.5px solid #DDD5C8", borderRadius: "10px", padding: "13px",
                fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#A0907A"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#DDD5C8"}
              >Try another room</button>
              <button style={{
                flex: 2, background: "#1C1714", color: "#FDFAF5",
                border: "none", borderRadius: "10px", padding: "13px",
                fontSize: "13px", fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >Add to Cart — {product.price}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomVisualizer;