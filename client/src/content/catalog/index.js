import { formatPrice } from "../../theme.js";
import { categories } from "./categories.js";
import { drops } from "./drops.js";
import { rawProducts } from "./products.js";

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
    "slim-desk",
    "nook-nightstand",
    "stride-rack",
    "duo-side-table",
    "ronde-table",
    "haven-lounge",
    "draft-chair",
    "foyer-bench",
  ].includes(product.slug)
);

export const valueProducts = [...products]
  .filter((product) => product.stockStatus !== "sold_out")
  .sort((a, b) => a.price - b.price)
  .slice(0, 6);

export const catalogStats = {
  categoryCount: categories.length,
  totalProducts: products.length,
};

export const liveDrop = drops.find((drop) => drop.status === "live");
export const liveDropProducts = liveDrop
  ? liveDrop.productSlugs.map((slug) => productsBySlug[slug]).filter(Boolean)
  : [];

export const getProductBySlug = (slug) => productsBySlug[slug];

export const getCategoryBySlug = (slug) => categories.find((category) => category.slug === slug);

export const getProductsByCategory = (categorySlug) =>
  products.filter((product) => product.categorySlug === categorySlug);

export const getProductsByDrop = (dropSlug) =>
  products.filter((product) => product.dropSlug === dropSlug);

export const getAlternativeProducts = (product) =>
  (product.alternativeSlugs || []).map((slug) => productsBySlug[slug]).filter(Boolean);
