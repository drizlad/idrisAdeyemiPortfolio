import React from 'react';

export default function NameBanner() {
  // SVG coordinates:
  // Left 'I' spans from x=0 to x=19.66. Midpoint is ~9.8
  // Right 'i' spans from x=1370.17 to x=1388.88. Midpoint is ~1379.5
  // Total visible width = 1379.5 - 9.8 = 1369.7
  // SVG total width = 1393.
  
  return (
    <div className="w-[100vw] overflow-hidden pt-[24px] pb-0 bg-white block">
      <div 
        className="relative overflow-hidden" 
        style={{ 
          width: 'calc(100vw * (1393 / 1369.7))',
          marginLeft: 'calc(-100vw * (9.8 / 1369.7))',
          aspectRatio: "1393 / 142" 
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/projects/IDRIS.svg" 
          alt="Idris Adeyemi" 
          className="absolute top-0 left-0 w-full h-auto max-w-none pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
