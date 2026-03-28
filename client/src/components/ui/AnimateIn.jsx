import { useEffect, useRef, useState } from "react";

const AnimateIn = ({ children, className = "", delay = 0, distance = 24, style = {} }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const wrapperClassName = ["animate-in", className].filter(Boolean).join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={wrapperClassName}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${distance}px)`,
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AnimateIn;
