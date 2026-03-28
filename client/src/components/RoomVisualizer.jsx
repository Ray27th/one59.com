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
        } catch {
          productImageBase64 = null;
          productImageMimeType = null;
        }
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
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 200, padding: "20px",
    }}>
      <div style={{
        background: "#FFFFFF",
        borderRadius: "8px",
        width: "100%", maxWidth: "620px",
        maxHeight: "90vh", overflowY: "auto",
        fontFamily: "'Arial Black', Arial, sans-serif",
        boxShadow: "8px 8px 0px #1A1A1A",
        border: "2px solid #1A1A1A",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 22px",
          borderBottom: "2px solid #1A1A1A",
        }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "4px", fontWeight: 800 }}>
              AI Visualization Studio
            </div>
            <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "18px", fontWeight: 900, color: "#1A1A1A", textTransform: "uppercase" }}>
              {product.name}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "#F5F5F5", border: "2px solid #1A1A1A", cursor: "pointer",
            width: "32px", height: "32px", borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#1A1A1A", fontSize: "16px", flexShrink: 0,
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#1A1A1A"; }}
          >✕</button>
        </div>

        {step === "input" && (
          <div style={{ padding: "22px 22px 26px" }}>
            <p style={{ color: "#666666", fontSize: "14px", lineHeight: 1.5, margin: "0 0 20px", fontFamily: "Arial, sans-serif" }}>
              Describe your room and we'll render the <strong style={{ color: "#1A1A1A" }}>{product.name}</strong> placed naturally in your space.
            </p>

            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "10px", fontWeight: 800 }}>
                Room style
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {presets.map((p) => (
                  <button key={p.label} onClick={() => { setRoomDesc(p.prompt); setActivePreset(p.label); }} style={{
                    background: activePreset === p.label ? "#FF6B35" : "#F5F5F5",
                    color: activePreset === p.label ? "#FFFFFF" : "#1A1A1A",
                    border: `2px solid ${activePreset === p.label ? "#FF6B35" : "#E0E0E0"}`,
                    borderRadius: "6px", padding: "8px 14px",
                    fontSize: "11px", cursor: "pointer",
                    fontFamily: "'Arial Black', Arial, sans-serif",
                    fontWeight: 700, textTransform: "uppercase",
                    transition: "all 0.15s",
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
                background: "#FFFFFF", border: "2px solid #E0E0E0",
                borderRadius: "6px", padding: "12px 14px",
                fontSize: "14px", color: "#1A1A1A", resize: "none", outline: "none",
                fontFamily: "Arial, sans-serif", lineHeight: 1.5,
                marginBottom: "16px", transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "#FF6B35"}
              onBlur={e => e.target.style.borderColor = "#E0E0E0"}
            />

            {error && (
              <div style={{ color: "#B94040", fontSize: "13px", marginBottom: "14px", padding: "10px 14px", background: "#FEF2F2", borderRadius: "6px", border: "2px solid #B94040", fontFamily: "Arial, sans-serif" }}>
                {error}
              </div>
            )}

            <button onClick={generate} disabled={loading || !roomDesc.trim()} style={{
              width: "100%",
              background: loading || !roomDesc.trim() ? "#999999" : "#1A1A1A",
              color: "#FFFFFF", border: "none", borderRadius: "6px",
              padding: "14px", fontSize: "13px", fontWeight: 800,
              cursor: loading || !roomDesc.trim() ? "not-allowed" : "pointer",
              letterSpacing: "0.05em", textTransform: "uppercase",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              fontFamily: "'Arial Black', Arial, sans-serif", transition: "background 0.15s",
            }}>
              {loading
                ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span> Generating your room…</>
                : "Generate Room Visualization"
              }
            </button>
          </div>
        )}

        {step === "result" && imageResult && (
          <div style={{ padding: "22px 22px 26px" }}>
            <div style={{ borderRadius: "6px", overflow: "hidden", marginBottom: "16px", border: "2px solid #1A1A1A" }}>
              <img
                src={`data:${imageResult.mimeType};base64,${imageResult.data}`}
                alt={`${product.name} in your room`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setStep("input"); setImageResult(null); }} style={{
                flex: 1, background: "#F5F5F5", color: "#1A1A1A",
                border: "2px solid #1A1A1A", borderRadius: "6px", padding: "13px",
                fontSize: "12px", fontWeight: 800, cursor: "pointer",
                fontFamily: "'Arial Black', Arial, sans-serif",
                textTransform: "uppercase",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FF6B35"; e.currentTarget.style.borderColor = "#FF6B35"; e.currentTarget.style.color = "#FFFFFF"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#1A1A1A"; }}
              >Try Another Room</button>
              <button style={{
                flex: 2, background: "#FF6B35", color: "#FFFFFF",
                border: "none", borderRadius: "6px", padding: "13px",
                fontSize: "12px", fontWeight: 800, cursor: "pointer",
                fontFamily: "'Arial Black', Arial, sans-serif",
                textTransform: "uppercase",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#E55A2B"}
                onMouseLeave={e => e.currentTarget.style.background = "#FF6B35"}
              >Add to Cart — {product.price}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomVisualizer;
