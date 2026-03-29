import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import { useStore } from "../app/store.js";
import { categories } from "../content/catalog/categories.js";
import { announcement, footerGroups, supportChannels } from "../content/site/index.js";
import { formatPrice } from "../theme.js";
import CartToast from "./CartToast.jsx";
import {
  ArrowUpRightIcon,
  CartIcon,
  CloseIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
} from "./icons.jsx";

const primaryNav = [
  { label: "Shop", href: "/shop" },
  { label: "Drops", href: "/drops" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
];

export default function Layout() {
  const location = useLocation();
  const {
    announcementOpen,
    cart,
    cartFeedback,
    dismissAnnouncement,
    mobileNavOpen,
    setMobileNavOpen,
  } = useStore();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  const cartMeta = cart.count ? formatPrice(cart.subtotal) : "Ready when you are";

  return (
    <div className="site-shell">
      {announcementOpen ? (
        <div className="announcement">
          <div className="announcement__inner">
            <div className="announcement__copy">
              <span className="announcement__label">Now browsing</span>
              <span>{announcement}</span>
            </div>

            <div className="announcement__meta">
              <button
                aria-label="Dismiss announcement"
                className="announcement__dismiss"
                onClick={dismissAnnouncement}
                type="button"
              >
                <CloseIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className={`site-header ${announcementOpen ? "site-header--with-banner" : ""}`}>
        <div className="site-header__inner">
          <div className="site-header__row">
            <Link aria-label="one59 home" className="brand" to="/">
              <div className="brand__lockup">
                <span className="brand__name">one59</span>
                <span className="brand__tag">Singapore furniture under S$159</span>
              </div>
              <span className="brand__signal">Factory-direct pricing. No fake markdown theatre.</span>
            </Link>

            <nav aria-label="Primary" className="site-nav">
              {primaryNav.map((item) => (
                <NavLink
                  className={({ isActive }) => `site-nav__link${isActive ? " active" : ""}`}
                  key={item.href}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="site-header__actions">
              <Link aria-label="Cart" className={`cart-pill${cartFeedback ? " cart-pill--updated" : ""}`} to="/cart">
                <span className="cart-pill__icon">
                  <CartIcon />
                </span>
                <div className="cart-pill__copy">
                  <span className="cart-pill__label">Cart</span>
                  <span className="cart-pill__meta">{cartMeta}</span>
                </div>
                <span className="cart-pill__count-wrap">
                  <span className="cart-pill__count-label">Items</span>
                  <span className="cart-pill__count">{cart.count}</span>
                </span>
              </Link>

              <button
                aria-expanded={mobileNavOpen}
                aria-label="Toggle navigation"
                className="icon-btn mobile-menu"
                onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
                type="button"
              >
                {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {mobileNavOpen ? (
            <div className="mobile-drawer mobile-menu">
              {primaryNav.map((item) => (
                <NavLink
                  className={({ isActive }) => `site-nav__link${isActive ? " active" : ""}`}
                  key={item.href}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <CartToast />

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer section--tight">
        <div className="site-footer__inner site-footer__panel surface">
          <div className="footer-grid">
            <div className="footer-grid__brand">
              <div className="brand">
                <div className="brand__lockup">
                  <span className="brand__name">one59</span>
                  <span className="brand__tag">GST included · mainland Singapore only</span>
                </div>
              </div>

              <p className="body-copy">
                Calm, compact furniture built for Singapore homes — with guest checkout, clear policies,
                and a value story that does not need fake before-and-after prices to make sense.
              </p>

              <div className="badge-row">
                <span className="badge badge--dark">Under S$159 per item</span>
                <span className="badge">3 to 5 day delivery</span>
                <span className="badge">7 day returns</span>
              </div>
            </div>

            <div className="footer-grid__links">
              <span className="footer-heading">Shop</span>
              {footerGroups.shop.map((item) => (
                <Link className="footer-link" key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="footer-grid__help">
              <span className="footer-heading">Help</span>
              {footerGroups.help.map((item) => (
                <Link className="footer-link" key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="footer-grid__policy">
              <span className="footer-heading">Explore</span>
              {footerGroups.company.map((item) => (
                <Link className="footer-link" key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="footer-grid__support">
              <span className="footer-heading">Support</span>
              {supportChannels.map((channel) => (
                <a className="footer-link" href={channel.href} key={channel.href} rel="noreferrer" target="_blank">
                  {channel.title} · {channel.value}
                </a>
              ))}
              <div className="support-points">
                <span className="badge">Replies within 24 hours</span>
                <span className="badge">Guest checkout only</span>
              </div>
            </div>
          </div>

          <div className="footer-meta">
            <span>© 2026 one59. Built for Singapore homes, not global edge cases.</span>
            <div className="support-points">
              <a href="https://instagram.com/one59home" rel="noreferrer" target="_blank">
                <InstagramIcon />
              </a>
              <a href="mailto:hello@one59.sg">
                <MailIcon />
              </a>
              <Link to="/contact">
                Support details <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function CategoryLinkRow() {
  return (
    <div className="badge-row">
      {categories.map((category) => (
        <Link className="badge" key={category.slug} to={`/shop/${category.slug}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
