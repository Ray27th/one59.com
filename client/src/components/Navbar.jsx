import { useState, useEffect } from "react";
import { SearchIcon, CartIcon, HeartIcon } from "./icons.jsx";

const Navbar = ({ cartCount, wishlistSize, onScrollToFeatured, onScrollToHow }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {bannerVisible && (
        <div style={{
          background: "#1C1714", color: "#BFA75D",
          height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "12px", letterSpacing: "0.04em", position: "relative",
          padding: "0 48px",
        }}>
          <span>Free delivery over S$500 &nbsp;·&nbsp; 30-day returns, no questions &nbsp;·&nbsp; Showroom open daily 10am–8pm</span>
          <button onClick={() => setBannerVisible(false)} style={{
            position: "absolute", right: "16px",
            background: "none", border: "none", cursor: "pointer",
            color: "#A0907A", fontSize: "15px", lineHeight: 1,
            display: "flex", alignItems: "center",
          }}>✕</button>
        </div>
      )}

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px",
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(253,250,245,0.97)" : "#FDFAF5",
        borderBottom: "1px solid",
        borderColor: scrolled ? "#EDE8DF" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.25s, border-color 0.25s",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", cursor: "pointer", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 600, letterSpacing: "-0.3px", color: "#1C1714" }}>Livora</span>
          <span style={{ fontSize: "8px", color: "#A0907A", letterSpacing: "0.22em", textTransform: "uppercase" }}>Studio</span>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", flex: 1, justifyContent: "center" }}>
          {["Living Room", "Bedroom", "Dining", "Home Office"].map(c => (
            <button key={c} onClick={onScrollToFeatured} style={{
              background: "none", border: "none",
              borderBottom: "2px solid transparent",
              fontSize: "13px", color: "#6B5E50", cursor: "pointer",
              letterSpacing: "0.02em", padding: "0 18px",
              height: "64px", fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.15s, border-color 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#1C1714"; e.currentTarget.style.borderBottomColor = "#1C1714"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#6B5E50"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >{c}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: showSearch ? "#F5EFE6" : "transparent",
            border: `1px solid ${showSearch ? "#DDD5C8" : "transparent"}`,
            borderRadius: "8px",
            padding: showSearch ? "0 12px" : "0",
            height: "36px",
            width: showSearch ? "180px" : "36px",
            overflow: "hidden",
            transition: "all 0.2s",
          }}>
            <button onClick={() => setShowSearch(s => !s)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#6B5E50", display: "flex", alignItems: "center",
              padding: "0", flexShrink: 0,
            }}>
              <SearchIcon />
            </button>
            {showSearch && (
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  border: "none", outline: "none", background: "transparent",
                  fontSize: "13px", color: "#1C1714", marginLeft: "8px",
                  fontFamily: "'DM Sans', sans-serif", width: "100%",
                }}
              />
            )}
          </div>

          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6B5E50", width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "8px", position: "relative",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#F5EFE6"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <HeartIcon filled={wishlistSize > 0} />
            {wishlistSize > 0 && (
              <span style={{
                position: "absolute", top: "4px", right: "4px",
                background: "#BFA75D", color: "#FDFAF5",
                borderRadius: "50%", width: "13px", height: "13px",
                fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 600,
              }}>{wishlistSize}</span>
            )}
          </button>

          <button style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#6B5E50", width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", borderRadius: "8px",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#F5EFE6"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "4px", right: "4px",
                background: "#1C1714", color: "#FDFAF5",
                borderRadius: "50%", width: "14px", height: "14px",
                fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 600,
              }}>{cartCount}</span>
            )}
          </button>

          <button onClick={onScrollToHow} style={{
            background: "transparent", color: "#6B5E50",
            border: "1px solid #DDD5C8", borderRadius: "8px",
            padding: "0 16px", height: "36px",
            fontSize: "12px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginLeft: "6px", whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#A0907A"; e.currentTarget.style.color = "#1C1714"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#DDD5C8"; e.currentTarget.style.color = "#6B5E50"; }}
          >
            AI Studio
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;