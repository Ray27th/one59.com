import { categories } from "./categories.js";
import { drops } from "./drops.js";
import { rawProducts } from "./products.js";
import { formatPrice } from "../../theme.js";

export { categories, drops };

const categoryMap = Object.fromEntries(categories.map((category) => [category.slug, category]));
const dropMap = Object.fromEntries(drops.map((drop) => [drop.slug, drop]));

export const products = rawProducts.map((product) => ({
  ...product,
  priceLabel: formatPrice(product.price),
  category: categoryMap[product.categorySlug],
  drop: product.dropSlug ? dropMap[product.dropSlug] : null,
}));

export const productsBySlug = Object.fromEntries(products.map((product) => [product.slug, product]));
export const dropsBySlug = Object.fromEntries(drops.map((drop) => [drop.slug, drop]));

export const featuredProducts = products.filter((product) =>
  [
    "paya-laptop-desk",
    "joo-chiat-bedside-table",
    "bedok-shoe-rack",
    "tanjong-floor-cushion",
    "marina-tray-table",
    "hougang-cube-bin",
  ].includes(product.slug)
);

export const liveDrop = drops.find((drop) => drop.status === "live");
export const liveDropProducts = liveDrop ? liveDrop.productSlugs.map((slug) => productsBySlug[slug]).filter(Boolean) : [];

export const getProductBySlug = (slug) => productsBySlug[slug];

export const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug);

export const getProductsByCategory = (categorySlug) =>
  products.filter((product) => product.categorySlug === categorySlug);

export const getProductsByDrop = (dropSlug) =>
  products.filter((product) => product.dropSlug === dropSlug);

export const getAlternativeProducts = (product) =>
  (product.alternativeSlugs || []).map((slug) => productsBySlug[slug]).filter(Boolean);
