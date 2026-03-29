import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { useStore } from "../app/store.js";
import EmptyState from "../components/EmptyState.jsx";
import ProductCard from "../components/ProductCard.jsx";
import AnimateIn from "../components/ui/AnimateIn.jsx";
import { catalogStats, categories, getCategoryBySlug, products } from "../content/catalog/index.js";

const sortOptions = {
  featured: (a, b) => (a.stockStatus === "sold_out") - (b.stockStatus === "sold_out"),
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export default function ShopPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cart } = useStore();

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const invalidCategory = Boolean(categorySlug && !category);

  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  const availability = searchParams.get("availability") || "all";
  const sort = searchParams.get("sort") || "featured";

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);

    if (!value || value === "all" || value === "featured") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredProducts = useMemo(() => {
    const matchingSearch = products.filter((product) => {
      const matchesCategory = category ? product.categorySlug === category.slug : true;
      const matchesType = type === "all" ? true : product.catalogType === type;
      const matchesAvailability =
        availability === "all"
          ? true
          : availability === "available"
            ? product.stockStatus !== "sold_out"
            : product.stockStatus === "sold_out";
      const term = q.trim().toLowerCase();
      const matchesQuery = term
        ? `${product.name} ${product.summary} ${product.category.name} ${product.materials}`
            .toLowerCase()
            .includes(term)
        : true;

      return matchesCategory && matchesType && matchesAvailability && matchesQuery;
    });

    return [...matchingSearch].sort(sortOptions[sort]);
  }, [availability, category, q, sort, type]);

  if (invalidCategory) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            action={
              <Link className="btn btn--primary" to="/shop">
                Browse all products
              </Link>
            }
            body="That category is not available. Browse living, bedroom, dining, workspace, or storage instead."
            title="Category not found"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero">
          <AnimateIn className="page-hero__panel surface">
            <span className="eyebrow">Shop One59</span>
            <h1 className="page-title">
              {category
                ? `${category.name} furniture for compact Singapore homes.`
                : "Furniture for Singapore homes, all under the One59 promise."}
            </h1>
            <p className="lede">
              {category
                ? category.description
                : "Search, filter, and compare across the full catalogue with clear availability and room-led browsing built for everyday Singapore homes."}
            </p>

            <div className="badge-row page-hero__badge-row">
              <span className="badge badge--dark">GST included</span>
              <span className="badge">3 to 5 day delivery</span>
            </div>

            <div className="shop-hero-stats">
              <div className="mini-card shop-hero-stat">
                <span className="fine-copy">Catalogue size</span>
                <strong className="shop-hero-stat__value">{catalogStats.totalProducts}</strong>
                <span className="body-copy">Products live across {catalogStats.categoryCount} core rooms.</span>
              </div>
              <div className="mini-card shop-hero-stat">
                <span className="fine-copy">In your cart</span>
                <strong className="shop-hero-stat__value">{cart.count}</strong>
                <span className="body-copy">Keep track of what you have picked while you browse the rest of the store.</span>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn className="page-hero__aside surface" delay={120}>
            <img alt={category ? category.name : "One59 shop"} src={category ? category.image : "/images/entryway-reset.webp"} />

            <div className="page-hero__aside-copy">
              <h2 className="page-hero__aside-title">Browse by room, compare by details, and shop with confidence.</h2>
              <p className="body-copy">
                From materials to category fit to price, the essentials stay easy to scan so choosing the right piece feels straightforward.
              </p>

              <div className="page-hero__aside-points">
                <div className="mini-card page-hero__aside-point">
                  <span className="fine-copy">Returns</span>
                  <p className="body-copy">7-day returns, with customer-paid change-of-mind return delivery.</p>
                </div>

                <div className="mini-card page-hero__aside-point">
                  <span className="fine-copy">Support</span>
                  <p className="body-copy">Instagram DM is fastest for stock or delivery questions, with email for longer notes.</p>
                </div>
              </div>
            </div>
          </AnimateIn>
          </div>

          <div className="shop-toolbar surface">
            <div className="shop-toolbar__header">
              <div>
                <span className="eyebrow">Refine the view</span>
                <h2 className="shop-toolbar__title">Filter by room, stock, and catalogue type.</h2>
                <p className="fine-copy shop-toolbar__body">Search, sort, and compare the range without adding noise to the page.</p>
              </div>

              <button className="btn btn--ghost" onClick={clearFilters} type="button">
                Clear filters
              </button>
            </div>

            <div className="field">
              <label htmlFor="shop-search">Search</label>
              <input
                id="shop-search"
                onChange={(event) => setParam("q", event.target.value)}
                placeholder="Search by product, room, or material"
                type="search"
                value={q}
              />
            </div>

            <div className="field">
              <label htmlFor="shop-type">Catalogue type</label>
              <select id="shop-type" onChange={(event) => setParam("type", event.target.value)} value={type}>
                <option value="all">All</option>
                <option value="evergreen">Evergreen</option>
                <option value="drop">Drops</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="shop-availability">Availability</label>
              <select
                id="shop-availability"
                onChange={(event) => setParam("availability", event.target.value)}
                value={availability}
              >
                <option value="all">All</option>
                <option value="available">Available only</option>
                <option value="sold_out">Sold out only</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="shop-sort">Sort</label>
              <select id="shop-sort" onChange={(event) => setParam("sort", event.target.value)} value={sort}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

        <div className="results-meta surface">
          <div>
            <p className="filter-note">
              Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              {category ? ` in ${category.name}` : ""}.
            </p>
          </div>

          <div className="results-meta__actions">
            <div className="badge-row">
              {categories.map((item) => (
                <Link className={`badge${category?.slug === item.slug ? " badge--dark" : ""}`} key={item.slug} to={`/shop/${item.slug}`}>
                  {item.name}
                </Link>
              ))}
              {category ? (
                <Link className="badge" to="/shop">
                  View all
                </Link>
              ) : null}
            </div>

            <Link className="btn btn--ghost" to="/cart">
              Cart ({cart.count})
            </Link>
          </div>
        </div>

        {filteredProducts.length ? (
          <div className="catalog-grid catalog-grid--dense">
            {filteredProducts.map((product, index) => (
              <AnimateIn delay={index * 20} key={product.slug}>
                <ProductCard product={product} showCategory={!category} />
              </AnimateIn>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <button className="btn btn--primary" onClick={clearFilters} type="button">
                Reset this view
              </button>
            }
            body="Try removing a filter, searching a broader term, or browsing a different room collection."
            title="No products match this combination"
          />
        )}
      </div>
    </section>
  );
}
