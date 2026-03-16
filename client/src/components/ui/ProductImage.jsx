import { useState } from "react";

export const FurnitureIcon = ({ shape, color, size = 52 }) => {
  const s = size;
  if (shape === "sofa") return (
    <svg width={s * 2} height={s} viewBox="0 0 200 80">
      <rect x="15" y="32" width="170" height="38" rx="10" fill={color} />
      <rect x="15" y="18" width="170" height="22" rx="8" fill={color} opacity="0.82" />
      <rect x="8" y="38" width="20" height="28" rx="6" fill={color} opacity="0.88" />
      <rect x="172" y="38" width="20" height="28" rx="6" fill={color} opacity="0.88" />
      <rect x="22" y="66" width="14" height="8" rx="3" fill="#9B8060" opacity="0.7" />
      <rect x="164" y="66" width="14" height="8" rx="3" fill="#9B8060" opacity="0.7" />
      <ellipse cx="100" cy="78" rx="80" ry="5" fill="rgba(0,0,0,0.05)" />
    </svg>
  );
  if (shape === "chair") return (
    <svg width={s * 1.1} height={s * 1.3} viewBox="0 0 88 104">
      <rect x="12" y="8" width="64" height="52" rx="12" fill={color} />
      <rect x="12" y="54" width="64" height="18" rx="7" fill={color} opacity="0.82" />
      <rect x="6" y="14" width="14" height="42" rx="5" fill={color} opacity="0.75" />
      <rect x="68" y="14" width="14" height="42" rx="5" fill={color} opacity="0.75" />
      <rect x="18" y="70" width="10" height="22" rx="4" fill="#9B8060" opacity="0.65" />
      <rect x="60" y="70" width="10" height="22" rx="4" fill="#9B8060" opacity="0.65" />
      <ellipse cx="44" cy="96" rx="32" ry="4" fill="rgba(0,0,0,0.06)" />
    </svg>
  );
  if (shape === "table") return (
    <svg width={s * 2} height={s} viewBox="0 0 200 80">
      <rect x="4" y="18" width="192" height="14" rx="6" fill={color} />
      <rect x="18" y="32" width="14" height="40" rx="4" fill={color} opacity="0.78" />
      <rect x="168" y="32" width="14" height="40" rx="4" fill={color} opacity="0.78" />
      <ellipse cx="100" cy="76" rx="80" ry="4" fill="rgba(0,0,0,0.05)" />
    </svg>
  );
  if (shape === "bed") return (
    <svg width={s * 2.2} height={s} viewBox="0 0 220 80">
      <rect x="10" y="38" width="200" height="32" rx="6" fill={color} />
      <rect x="10" y="18" width="58" height="26" rx="8" fill={color} opacity="0.88" />
      <rect x="152" y="18" width="58" height="26" rx="8" fill={color} opacity="0.88" />
      <rect x="12" y="68" width="18" height="8" rx="3" fill="#9B8060" opacity="0.65" />
      <rect x="190" y="68" width="18" height="8" rx="3" fill="#9B8060" opacity="0.65" />
      <ellipse cx="110" cy="78" rx="96" ry="4" fill="rgba(0,0,0,0.05)" />
    </svg>
  );
  if (shape === "sidetable") return (
    <svg width={s * 1.2} height={s} viewBox="0 0 96 80">
      <ellipse cx="48" cy="16" rx="42" ry="10" fill={color} />
      <rect x="44" y="26" width="8" height="44" rx="4" fill={color} opacity="0.7" />
      <ellipse cx="48" cy="78" rx="30" ry="4" fill="rgba(0,0,0,0.05)" />
    </svg>
  );
  if (shape === "shelf") return (
    <svg width={s * 1.4} height={s * 1.6} viewBox="0 0 112 128">
      <rect x="4" y="4" width="104" height="10" rx="4" fill={color} />
      <rect x="4" y="46" width="104" height="10" rx="4" fill={color} opacity="0.85" />
      <rect x="4" y="86" width="104" height="10" rx="4" fill={color} opacity="0.7" />
      <rect x="4" y="4" width="10" height="118" rx="4" fill={color} opacity="0.9" />
      <rect x="98" y="4" width="10" height="118" rx="4" fill={color} opacity="0.9" />
    </svg>
  );
  return null;
};

const ProductImage = ({ product, objectFit = "contain" }) => {
  const [errored, setErrored] = useState(false);
  if (product.image && !errored) {
    return (
      <img
        src={product.image}
        alt={product.name}
        onError={() => setErrored(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }}
      />
    );
  }
  return <FurnitureIcon shape={product.shape} color={product.color} size={52} />;
};

export default ProductImage;