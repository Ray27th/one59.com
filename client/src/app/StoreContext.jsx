import { useEffect, useMemo, useState } from "react";

import { productsBySlug } from "../content/catalog/index.js";
import { StoreContext } from "./store.js";

const CART_STORAGE_KEY = "one59-cart";
const ANNOUNCEMENT_STORAGE_KEY = "one59-announcement-dismissed";

const getProductKey = (product) => product?.sku || product?.slug;

const buildProductSnapshot = (product) => {
  if (!product) {
    return null;
  }

  return {
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    summary: product.summary,
    price: product.price,
    priceLabel: product.priceLabel,
    image: product.image || null,
    tone: product.tone,
    shape: product.shape || null,
    color: product.color || null,
    stockStatus: product.stockStatus,
    category: product.category
      ? {
          slug: product.category.slug,
          name: product.category.name,
        }
      : null,
  };
};

const normalizeStoredCartItem = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const product = item.slug ? productsBySlug[item.slug] : null;
  const snapshot = item.snapshot || buildProductSnapshot(product);
  const quantity = Math.max(1, Number(item.quantity) || 1);
  const slug = item.slug || snapshot?.slug;

  if (!snapshot || !slug) {
    return null;
  }

  return {
    id: item.id || item.sku || snapshot.sku || slug,
    slug,
    quantity,
    snapshot,
  };
};

const readStoredCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeStoredCartItem).filter(Boolean);
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

const matchesCartItem = (item, key) => item.id === key || item.slug === key || item.snapshot?.sku === key;

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [announcementOpen, setAnnouncementOpen] = useState(readAnnouncementPreference);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!cartFeedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCartFeedback(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [cartFeedback]);

  const dismissAnnouncement = () => {
    setAnnouncementOpen(false);
    window.localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, "true");
  };

  const dismissCartFeedback = () => setCartFeedback(null);

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity < 1 || product.stockStatus === "sold_out") {
      return;
    }

    const itemKey = getProductKey(product);
    const snapshot = buildProductSnapshot(product);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => matchesCartItem(item, itemKey));

      if (existingItem) {
        return currentItems.map((item) =>
          matchesCartItem(item, itemKey)
            ? {
                ...item,
                quantity: item.quantity + quantity,
                snapshot,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: itemKey,
          slug: product.slug,
          quantity,
          snapshot,
        },
      ];
    });

    setCartFeedback({
      itemKey,
      productName: product.name,
      quantityAdded: quantity,
    });
  };

  const updateCartQuantity = (itemKey, quantity) => {
    const nextQuantity = Math.max(1, Math.floor(Number(quantity) || 1));

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        matchesCartItem(item, itemKey) ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((currentItems) => currentItems.filter((item) => !matchesCartItem(item, itemKey)));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartFeedback(null);
  };

  const getCartQuantity = (productOrKey) => {
    const itemKey = typeof productOrKey === "string" ? productOrKey : getProductKey(productOrKey);
    const item = cartItems.find((cartItem) => matchesCartItem(cartItem, itemKey));

    return item?.quantity || 0;
  };

  const cart = useMemo(() => {
    const lineItems = cartItems
      .map((item) => {
        const liveProduct = productsBySlug[item.slug];
        const snapshot = item.snapshot || buildProductSnapshot(liveProduct);
        const product = liveProduct
          ? {
              ...liveProduct,
              category: liveProduct.category || snapshot?.category,
            }
          : {
              ...snapshot,
              category: snapshot?.category,
            };

        if (!product) {
          return null;
        }

        const unitPrice = liveProduct?.price ?? snapshot?.price ?? 0;

        return {
          ...item,
          itemKey: item.id,
          product,
          lineTotal: unitPrice * item.quantity,
          unitPrice,
        };
      })
      .filter(Boolean);

    const count = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);

    return {
      lineItems,
      count,
      subtotal,
      uniqueCount: lineItems.length,
    };
  }, [cartItems]);

  const value = {
    addToCart,
    announcementOpen,
    cart,
    cartFeedback,
    clearCart,
    dismissAnnouncement,
    dismissCartFeedback,
    getCartQuantity,
    mobileNavOpen,
    removeFromCart,
    setMobileNavOpen,
    updateCartQuantity,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
