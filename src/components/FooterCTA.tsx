'use client';

import React, { useState } from 'react';

export default function FooterCTA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("drizlad@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailTo = () => {
    window.location.href = "mailto:drizlad@gmail.com";
  };

  return (
    <div className="w-[100vw] bg-white flex flex-col items-center pt-[64px] pb-0">
      <p className="font-inter font-regular text-[14px] text-[#14151a] text-center mb-[20px]">
        Open to a full time role or any exciting project
      </p>
      
      <button 
        onClick={handleMailTo}
        className="w-[calc(100%-48px)] md:w-[calc(100%-200px)] max-w-[100vw] md:max-w-[calc(100vw-200px)] h-[80px] md:h-[96px] bg-[#CC00FF] rounded-full border-none flex items-center justify-center gap-[8px] md:gap-[16px] cursor-pointer relative hover:bg-[#BB00EE] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 ease-in-out"
      >
        <span className="font-inter font-medium text-[clamp(20px,4vw,40px)] text-white tracking-[-0.5px]">
          drizlad@gmail.com
        </span>
        
        <div 
          onClick={handleCopy}
          className="cursor-pointer p-2 flex items-center justify-center transition-opacity duration-150 ease-in-out"
        >
          {copied ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
