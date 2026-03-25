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
          background: "#FF6B35", color: "#FFFFFF",
          height: "42px", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", position: "relative",
          padding: "0 48px", textTransform: "uppercase",
        }}>
          <span>EVERYTHING UNDER S$159 &nbsp;·&nbsp; FACTORY DIRECT &nbsp;·&nbsp; FREE DELIVERY OVER S$200</span>
          <button onClick={() => setBannerVisible(false)} style={{
            position: "absolute", right: "16px",
            background: "none", border: "none", cursor: "pointer",
            color: "#FFFFFF", fontSize: "18px", lineHeight: 1,
            display: "flex", alignItems: "center",
            fontWeight: 700,
          }}>✕</button>
        </div>
      )}

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "72px",
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.98)" : "#FFFFFF",
        borderBottom: "3px solid",
        borderColor: scrolled ? "#FF6B35" : "#FF6B35",
        transition: "background 0.25s",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "2px", cursor: "pointer", flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "28px",
            fontWeight: 900,
            letterSpacing: "-1px",
            color: "#FF6B35",
            background: "#1A1A1A",
            padding: "4px 12px",
            borderRadius: "4px",
          }}>one59</span>
          <span style={{
            fontSize: "9px",
            color: "#FF6B35",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}>FURNITURE</span>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", flex: 1, justifyContent: "center" }}>
          {["Living", "Bedroom", "Dining", "Office", "Storage"].map(c => (
            <button key={c} onClick={onScrollToFeatured} style={{
              background: "none", border: "none",
              borderBottom: "3px solid transparent",
              fontSize: "14px", fontWeight: 700, color: "#1A1A1A", cursor: "pointer",
              letterSpacing: "0.04em", padding: "0 20px",
              height: "72px", fontFamily: "'Arial Black', Arial, sans-serif",
              textTransform: "uppercase",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#FF6B35"; e.currentTarget.style.borderBottomColor = "#FF6B35"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >{c}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: showSearch ? "#FFF0E6" : "#F5F5F5",
            border: `2px solid ${showSearch ? "#FF6B35" : "#E0E0E0"}`,
            borderRadius: "6px",
            padding: showSearch ? "0 12px" : "0",
            height: "40px",
            width: showSearch ? "200px" : "40px",
            overflow: "hidden",
            transition: "all 0.2s",
          }}>
            <button onClick={() => setShowSearch(s => !s)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0", flexShrink: 0,
              width: "40px", height: "100%",
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
                  fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginLeft: "8px",
                  fontFamily: "'Arial Black', Arial, sans-serif", width: "100%",
                }}
              />
            )}
          </div>

          <button style={{
            background: "#1A1A1A", border: "none", cursor: "pointer",
            color: "#FFFFFF", width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "6px", position: "relative",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#333333"}
            onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
          >
            <HeartIcon filled={wishlistSize > 0} />
            {wishlistSize > 0 && (
              <span style={{
                position: "absolute", top: "4px", right: "4px",
                background: "#FF6B35", color: "#FFFFFF",
                borderRadius: "50%", width: "16px", height: "16px",
                fontSize: "9px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800,
              }}>{wishlistSize}</span>
            )}
          </button>

          <button style={{
            background: "#1A1A1A", border: "none", cursor: "pointer",
            color: "#FFFFFF", width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", borderRadius: "6px",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#333333"}
            onMouseLeave={e => e.currentTarget.style.background = "#1A1A1A"}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "4px", right: "4px",
                background: "#FF6B35", color: "#FFFFFF",
                borderRadius: "50%", width: "18px", height: "18px",
                fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800,
              }}>{cartCount}</span>
            )}
          </button>

          <button onClick={onScrollToHow} style={{
            background: "#FF6B35", color: "#FFFFFF",
            border: "none", borderRadius: "6px",
            padding: "0 18px", height: "40px",
            fontSize: "13px", fontWeight: 800, cursor: "pointer",
            fontFamily: "'Arial Black', Arial, sans-serif",
            textTransform: "uppercase", letterSpacing: "0.06em",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#E55A2B"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FF6B35"; }}
          >
            Factory Tour
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
