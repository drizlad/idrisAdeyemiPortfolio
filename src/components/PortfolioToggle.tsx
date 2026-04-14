'use client';
import { useState, useRef, useEffect } from 'react';

const options = ['Ai built portfolio', 'View pre ai portfolio'];

export default function PortfolioToggle() {
  const [active, setActive] = useState('Ai built portfolio');
  const [pillStyle, setPillStyle] = useState({ left: '2px', width: '0px' });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update pill position based on active item
    if (containerRef.current) {
      const activeIndex = options.indexOf(active);
      const buttonElems = containerRef.current.querySelectorAll('button');
      if (buttonElems[activeIndex]) {
        const btn = buttonElems[activeIndex];
        setPillStyle({
          left: `${btn.offsetLeft}px`,
          width: `${btn.offsetWidth}px`,
        });
      }
    }
  }, [active]);

  const handleAction = (opt: string) => {
    setActive(opt);
    
    if (opt === 'View pre ai portfolio') {
      window.open('https://idrisade.framer.website/', '_blank', 'noopener,noreferrer');
      // Revert back to the current site state shortly after clicking
      // so when the user returns to this tab, the toggle is correct.
      setTimeout(() => {
        setActive('Ai built portfolio');
      }, 600);
    }
  };

  return (
    <div className="flex justify-center mb-[32px]">
      <div 
        ref={containerRef}
        className="relative inline-flex border border-[#dee0e3] rounded-[8px] p-[2px] bg-[#F7F7F8]"
      >
        {/* Sliding Pill */}
        <div 
          className="absolute top-[2px] bottom-[2px] bg-white rounded-[6px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            transform: `translateX(${pillStyle.left})`,
            width: pillStyle.width,
            left: 0,
          }}
        />

        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAction(opt)}
            className={`
              relative z-10 py-[8px] px-[24px] font-sans text-[13px] font-medium cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap
              ${active === opt ? 'text-[#14151A]' : 'text-[#8E8E93] hover:text-[#14151A]'}
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
