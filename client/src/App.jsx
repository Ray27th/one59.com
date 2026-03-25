import { useState, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import RoomVisualizer from "./components/RoomVisualizer.jsx";
import ProductDetailModal from "./components/ProductDetailModal.jsx";
import BundleDetailModal from "./components/BundleDetailModal.jsx";
import Footer from "./components/Footer.jsx";

import TrustStrip from "./components/sections/TrustStrip.jsx";
import NewArrivals from "./components/sections/NewArrivals.jsx";
import RoomCategories from "./components/sections/RoomCategories.jsx";
import CuratedBundles from "./components/sections/CuratedBundles.jsx";
import FeaturedProducts from "./components/sections/FeaturedProducts.jsx";
import HowItWorks from "./components/sections/HowItWorks.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import CtaBanner from "./components/sections/CtaBanner.jsx";

import { CheckIcon } from "./components/icons.jsx";

export default function One59() {
  const [selected, setSelected] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailBundle, setDetailBundle] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const [toastItem, setToastItem] = useState(null);

  const featuredRef = useRef(null);
  const howRef = useRef(null);
  const newArrivalsRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  const addToCart = (p) => {
    setCartCount(c => c + 1);
    setToastItem(p.name);
    setTimeout(() => setToastItem(null), 2800);
  };

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Arial Black', Arial, sans-serif", color: "#1A1A1A", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Anton&display=swap" rel="stylesheet" />

      <Navbar
        cartCount={cartCount}
        wishlistSize={wishlist.size}
        onScrollToFeatured={() => scrollTo(featuredRef)}
        onScrollToHow={() => scrollTo(howRef)}
      />

      <HeroCarousel
        onVisualize={(p) => setSelected(p)}
        onAddToCart={addToCart}
      />

      <TrustStrip />

      <NewArrivals
        ref={newArrivalsRef}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onOpenDetail={setDetailProduct}
        onScrollToFeatured={() => scrollTo(featuredRef)}
      />

      <RoomCategories />

      <CuratedBundles onOpenBundleDetail={setDetailBundle} />

      <FeaturedProducts
        ref={featuredRef}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onVisualize={(p) => setSelected(p)}
        onOpenDetail={setDetailProduct}
      />

      <HowItWorks ref={howRef} />

      <Testimonials />

      <CtaBanner
        onVisualize={(p) => setSelected(p)}
        onScrollToFeatured={() => scrollTo(featuredRef)}
      />

      <Footer />

      {toastItem && (
        <div style={{
          position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          background: "#FF6B35", color: "#FFFFFF", borderRadius: "8px",
          padding: "14px 24px", fontSize: "14px", fontWeight: 700,
          boxShadow: "0 8px 32px rgba(255,107,53,0.4)", zIndex: 300,
          animation: "fadeInUp 0.25s ease", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: "10px",
          whiteSpace: "nowrap",
        }}>
          <CheckIcon /> {toastItem} added to cart
        </div>
      )}

      {selected && <RoomVisualizer product={selected} onClose={() => setSelected(null)} />}
      {detailBundle && (
        <BundleDetailModal
          bundle={detailBundle}
          onClose={() => setDetailBundle(null)}
          onAddToCart={addToCart}
          onOpenDetail={(item) => { setDetailBundle(null); setDetailProduct(item); }}
        />
      )}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToCart={addToCart}
          onOpenDetail={(p) => setDetailProduct(p)}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: "#F0F0F0"; }
        ::-webkit-scrollbar-thumb { background: "#FF6B35"; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: "#E55A2B"; }

        .product-img-wrap > img,
        .product-img-wrap > svg {
          transition: transform 0.35s ease;
        }
        .product-img-wrap:hover > img,
        .product-img-wrap:hover > svg {
          transform: scale(1.07);
        }
        .product-quick-add {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(255,107,53,0.95);
          color: #FFFFFF;
          border: none;
          padding: 14px 16px;
          font-family: 'Arial Black', Arial, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          transform: translateY(100%);
          transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }
        .product-card:hover .product-quick-add {
          transform: translateY(0);
        }
        .product-quick-add:hover {
          background: rgba(255,107,53,1);
        }
      `}</style>
    </div>
  );
}
