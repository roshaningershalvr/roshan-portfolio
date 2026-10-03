import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  // Disable on mobile devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden transition-opacity duration-700"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute rounded-full opacity-50 mix-blend-screen blur-[50px]"
        style={{
          width: 200,
          height: 200,
          top: position.y - 100,
          left: position.x - 100,
          background: "radial-gradient(circle, var(--color-primary) 0%, var(--color-accent) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}
