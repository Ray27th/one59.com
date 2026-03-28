export const COL_DARK = "#1A1A1A";
export const COL_ORANGE = "#FF6B35";
export const COL_WHITE = "#FFFFFF";
export const COL_LIGHT = "#F5F5F5";
export const COL_GREEN = "#2E6B3E";

export const FONT_HEAD = "'Arial Black', Arial, sans-serif";
export const FONT_BODY = "Arial, sans-serif";

export const SHADOW = `4px 4px 0px ${COL_DARK}`;

export const badgeColor = (badge) => {
  if (badge === "New") return COL_DARK;
  if (badge === "Sale") return COL_ORANGE;
  if (badge === "Ships Fast") return COL_GREEN;
  return COL_ORANGE;
};
