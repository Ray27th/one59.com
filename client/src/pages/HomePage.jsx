import { Link } from "react-router-dom";

import { CategoryLinkRow } from "../components/Layout.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { DeliveryIcon, ShieldIcon, SparkIcon } from "../components/icons.jsx";
import AnimateIn from "../components/ui/AnimateIn.jsx";
import {
  catalogStats,
  categories,
  featuredProducts,
  liveDrop,
  liveDropProducts,
  valueProducts,
} from "../content/catalog/index.js";
import { homeStory, testimonials, trustPoints } from "../content/site/index.js";

const heroPoints = [
  {
    icon: <SparkIcon />,
    title: `${catalogStats.totalProducts} room-ready pieces`,
    body: "Evergreen staples and sharper drops sit side by side, so there is always something useful to browse.",
  },
  {
    icon: <DeliveryIcon />,
    title: "Mainland Singapore only",
    body: "Every product, delivery note, and support promise is tuned for the local shopping reality.",
  },
  {
    icon: <ShieldIcon />,
    title: "Clear details up front",
    body: "GST included, 3 to 5 day delivery, returns, and support details stay visible while you browse.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="section">
        <div className="container hero">
          <AnimateIn className="hero__copy surface">
            <div className="hero__kicker-row">
              <span className="eyebrow">Under S$159, always</span>
              <div className="hero__highlight">
                <SparkIcon size={16} />
                <span>{homeStory.highlight}</span>
              </div>
            </div>

            <div className="hero__stack">
              <h1 className="display-title">Furniture under S$159 that feels calm, credible, and worth sharing.</h1>
              <p className="lede">{homeStory.body}</p>
            </div>

            <div className="badge-row hero__badge-row">
              <span className="badge badge--dark">GST included</span>
              <span className="badge">3 to 5 day delivery</span>
              <span className="badge">Mainland Singapore only</span>
            </div>

            <div className="button-row">
              <Link className="btn btn--primary" to="/shop">
                Shop the full catalogue
              </Link>
              <Link className="btn btn--ghost" to="/drops">
                Browse live drops
              </Link>
            </div>

            <div className="hero-stat-grid">
              {heroPoints.map((item) => (
                <div className="hero-stat" key={item.title}>
                  <span className="eyebrow">{item.icon} Store truth</span>
                  <h2 className="hero-stat__title">{item.title}</h2>
                  <p className="body-copy">{item.body}</p>
                </div>
              ))}
            </div>

            <CategoryLinkRow />
          </AnimateIn>

          <AnimateIn className="hero__visual surface" delay={120}>
            <div className="hero__image-wrap">
              <img alt="One59 room starter scene" src="/images/room-starter.webp" />
            </div>

            <div className="hero__spotlight-grid">
              <div className="mini-card hero-spotlight-card">
                <span className="eyebrow">Live now</span>
                <h2 className="hero-spotlight-card__title">{liveDrop.name}</h2>
                <p className="body-copy">{liveDrop.summary}</p>
                <p className="fine-copy">{liveDrop.windowLabel}</p>
              </div>

              <div className="mini-card hero-spotlight-card">
                <span className="eyebrow">Why it lands</span>
                <h2 className="hero-spotlight-card__title">Calm design, honest value.</h2>
                <p className="body-copy">
                  Clean shapes, useful details, and GST-included pricing keep the focus on pieces that look good and make sense at home.
                </p>
              </div>
            </div>

            <div className="hero__floating">
              <p className="fine-copy">Guest checkout stays simple.</p>
              <p className="body-copy">Choose your pieces, review your quantities, and check out with just the details needed for delivery.</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section--tight">
        <div className="container metrics-grid">
          {trustPoints.map((item, index) => (
            <AnimateIn className="metric-card" delay={index * 60} key={item.title}>
              <span className="eyebrow">Store promise</span>
              <h2 className="metric-card__title">{item.title}</h2>
              <p className="body-copy">{item.body}</p>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Shop by room"
            title="Start with the room, then narrow down to the pieces that actually earn their space."
            body="Living, bedroom, dining, workspace, and storage collections make it easier to find the right piece for the way your room actually works."
          />

          <div className="info-grid">
            {categories.map((category, index) => (
              <AnimateIn
                className="category-card"
                delay={index * 60}
                key={category.slug}
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="category-card__overlay" />
                <span className="eyebrow">{category.eyebrow}</span>
                <h3 className="category-card__title">{category.name}</h3>
                <p className="category-card__body body-copy">{category.description}</p>
                <Link className="btn btn--ghost" to={`/shop/${category.slug}`}>
                  Browse {category.name}
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-shell home-section-shell--featured surface">
            <SectionHeading
              action={
                <Link className="btn btn--ghost" to="/shop">
                  Shop all {catalogStats.totalProducts}
                </Link>
              }
              eyebrow="Most-shopped right now"
              title="The pieces customers keep coming back to for easy room upgrades."
              body="These best-loved picks bring together compact sizing, useful materials, and the under-S$159 value story that makes One59 easy to return to."
            />

            <div className="catalog-grid">
              {featuredProducts.map((product, index) => (
                <AnimateIn delay={index * 40} key={product.slug}>
                  <ProductCard product={product} showCategory />
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-shell home-section-shell--drop surface">
            <SectionHeading
              action={
                <Link className="btn btn--accent" to="/drops">
                  See all drops
                </Link>
              }
              eyebrow="Current drop"
              title={`${liveDrop.name} brings together compact wins for homes that need every piece to work harder.`}
              body={liveDrop.story}
            />

            <div className="drop-grid">
              <AnimateIn className="drop-card drop-card--feature">
                <div className="drop-card__image">
                  <img alt={liveDrop.name} src={liveDrop.image} />
                </div>

                <div className="drop-card__content">
                  <div className="badge-row">
                    <span className="badge badge--solid">{liveDrop.status}</span>
                    <span className="badge">{liveDrop.windowLabel}</span>
                    <span className="badge">{liveDropProducts.length} products</span>
                  </div>
                  <h3 className="drop-card__title">Compact seating, dining, and storage wins that feel immediate in the room.</h3>
                  <p className="body-copy">
                    This live selection makes it easier to mix seating, dining, and storage pieces without losing the clear One59 pricing and delivery story.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn className="drop-card drop-card--stack" delay={120}>
                <SectionHeading
                  eyebrow="Why shoppers like it"
                  title="Fast room upgrades, clear details, and no guesswork on the basics."
                  body="From price to delivery timing to support, the things people usually have to hunt for stay visible while they browse."
                />

                <div className="mini-card">
                  <span className="eyebrow">Easy to shop</span>
                  <p className="body-copy">Add a piece from the product card or product page, then head to cart whenever you are ready to review everything together.</p>
                </div>

                <div className="mini-card">
                  <span className="eyebrow">More to explore</span>
                  <p className="body-copy">A broader mix of living, bedroom, dining, workspace, and storage pieces makes it easier to build out the room in one browse.</p>
                </div>
              </AnimateIn>
            </div>

            <div className="catalog-grid catalog-grid--spaced">
              {liveDropProducts.map((product, index) => (
                <AnimateIn delay={index * 50} key={product.slug}>
                  <ProductCard product={product} showCategory />
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-section-shell surface">
            <SectionHeading
              action={
                <Link className="btn btn--ghost" to="/shop?sort=price-low">
                  Shop price-low first
                </Link>
              }
              eyebrow="Under S$79 picks"
              title="The smaller-spend products still need to feel designed, not disposable."
              body="These are the fast entry points into the brand — tidy desk upgrades, extra seating, and storage wins that make the room feel better without waiting for a major purchase."
            />

            <div className="catalog-grid">
              {valueProducts.map((product, index) => (
                <AnimateIn delay={index * 40} key={product.slug}>
                  <ProductCard product={product} showCategory />
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Customer trust"
            title="Premium feel depends on what the site says before it asks for commitment."
            body="These notes keep the value story grounded: clear support, clear SG-only delivery, and policies that stay visible before checkout."
          />

          <div className="info-grid">
            {testimonials.map((item, index) => (
              <AnimateIn className="testimonial-card" delay={index * 70} key={item.name}>
                <span className="eyebrow">Customer note</span>
                <p className="body-copy">“{item.quote}”</p>
                <div>
                  <h3 className="testimonial-card__title">{item.name}</h3>
                  <p className="fine-copy">{item.meta}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
