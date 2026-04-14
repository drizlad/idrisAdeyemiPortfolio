'use client';

import { useEffect, useRef, useState } from 'react';

export default function MagneticFieldPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(SVGSVGElement | null)[]>([]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);

    const timeout = setTimeout(updateDims, 150);
    return () => {
      window.removeEventListener('resize', updateDims);
      clearTimeout(timeout);
    };
  }, []);

  const isMobile = dimensions.width > 0 && dimensions.width < 768;
  const gridSize = isMobile ? 32 : 80;
  const svgSize = isMobile ? 16 : 40;

  const cols = Math.floor(dimensions.width / gridSize) + 1;
  const rows = Math.floor(dimensions.height / gridSize) + 1;
  const totalElements = Math.max(0, cols * rows);

  useEffect(() => {
    if (totalElements === 0) return;

    let rafId: number;
    // Default to the exact center of the screen so mobile points inward
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      elementsRef.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(cursorY - cy, cursorX - cx);
        el.style.transform = `rotate(${angle}rad)`;
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [totalElements]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${gridSize}px)`,
        gridAutoRows: `${gridSize}px`,
        alignContent: 'start',
        justifyContent: 'center'
      }}
    >
      {Array.from({ length: totalElements }).map((_, i) => (
        <div key={i} className="flex items-center justify-center w-full h-full">
          <svg
            ref={(el) => {
              elementsRef.current[i] = el;
            }}
            viewBox="0 0 40 40"
            width={svgSize}
            height={svgSize}
            style={{
              opacity: 0.7,
              transition: 'transform 80ms ease-out'
            }}
          >
            <path
              d="M 4 20 L 36 20 M 36 20 L 24 10 M 36 20 L 24 30"
              stroke="#cc01ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
