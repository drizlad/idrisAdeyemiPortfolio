'use client';

import React, { useState } from 'react';

export default function ProfileCard() {
  const [copied, setCopied] = useState(false);

  const tags = [
    { label: "Product Designer", color: "var(--color-tag-purple)", fontSize: "14px", ls: "normal" },
    { label: "Fintech", color: "var(--color-tag-blue)", fontSize: "16px", ls: "-0.48px" },
    { label: "Design System", color: "var(--color-tag-green)", fontSize: "16px", ls: "-0.48px" },
    { label: "Framer.", color: "var(--color-tag-orange)", fontSize: "16px", ls: "-0.48px" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('Drizlad@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[calc(100vw-32px)] max-w-[600px] md:w-fit min-w-0 md:min-w-[480px] bg-white border border-[var(--color-border-action)] rounded-[var(--radius-card-outer)] p-[6px]">
      <div className="h-[32px] px-[8px] flex items-center">
        <span className="font-sans text-[16px] text-[#14151a]">Details</span>
      </div>

      <div className="bg-[#f7f7f8] border border-[var(--color-border-action)] rounded-[var(--radius-card-inner)] pt-[16px] px-[16px] pb-[16px] flex flex-col gap-[20px] flex-1">

        <div className="flex items-start justify-between gap-[16px] md:gap-[24px]">
          <h2 className="font-sans font-medium text-[24px] text-[#14151a] m-0 break-words leading-tight">
            Idris Adeyemi
          </h2>

          <button
            onClick={handleCopy}
            className="flex items-center gap-[8px] text-[15px] text-[#6b7280] font-sans hover:text-[#14151a] transition-colors bg-transparent border-none cursor-pointer p-0 m-0"
          >
            <span>Drizlad@gmail.com</span>
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </button>
        </div>

        <p className="font-sans text-[16px] text-[#6b7280] leading-[1.5] m-0 pr-[12px]">
          Leveraging my design expertise and market experience to drive business growth, enhance user experiences, and deliver solutions that align user needs with business goals.
        </p>

        <div className="flex flex-wrap gap-[10px]">
          {tags.map(tag => (
            <span
              key={tag.label}
              className="bg-white border border-[var(--color-border-action)] rounded-[var(--radius-tag)] py-[6px] px-[12px] font-sans font-normal whitespace-nowrap"
              style={{
                color: tag.color,
                fontSize: tag.fontSize,
                letterSpacing: tag.ls === "normal" ? "normal" : tag.ls
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
