import { useEffect, useMemo, useState } from "react";

import { productsBySlug } from "../content/catalog/index.js";
import { StoreContext } from "./store.js";

const CART_STORAGE_KEY = "one59-cart";
const ANNOUNCEMENT_STORAGE_KEY = "one59-announcement-dismissed";

const readStoredCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const readAnnouncementPreference = () => {
  if (typeof window === "undefined") {
    return true;
  }

  return window.localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY) !== "true";
};

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [announcementOpen, setAnnouncementOpen] = useState(readAnnouncementPreference);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const dismissAnnouncement = () => {
    setAnnouncementOpen(false);
    window.localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "true");
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity < 1 || product.stockStatus === "sold_out") {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.slug === product.slug);

      if (existingItem) {
        return currentItems.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { slug: product.slug, quantity }];
    });
  };

  const updateCartQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      setCartItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => (item.slug === slug ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (slug) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.slug !== slug));
  };

  const clearCart = () => setCartItems([]);

  const cart = useMemo(() => {
    const lineItems = cartItems
      .map((item) => {
        const product = productsBySlug[item.slug];

        if (!product) {
          return null;
        }

        return {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean);

    const count = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

    return { lineItems, count, subtotal };
  }, [cartItems]);

  const value = useMemo(
    () => ({
      addToCart,
      announcementOpen,
      cart,
      clearCart,
      dismissAnnouncement,
      mobileNavOpen,
      removeFromCart,
      setMobileNavOpen,
      updateCartQuantity,
    }),
    [announcementOpen, cart, mobileNavOpen]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
