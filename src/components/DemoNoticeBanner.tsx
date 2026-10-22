import React, { useState } from 'react';
import { Info, X, ShieldAlert } from 'lucide-react';

interface DemoNoticeBannerProps {
  onOpenAdmin: () => void;
}

export const DemoNoticeBanner: React.FC<DemoNoticeBannerProps> = ({ onOpenAdmin }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="bg-charcoal-900 border-b border-charcoal-800 text-xs py-1.5 px-4 text-center text-ivory/60 flex items-center justify-between">
        <span className="truncate">
          Concept Demonstration Prototype for <strong className="text-champagne-400 font-medium">SBE Events</strong> (Port Harcourt, Nigeria)
        </span>
        <button
          onClick={() => setCollapsed(false)}
          className="text-champagne-400 hover:text-champagne-300 text-xs underline ml-2 whitespace-nowrap cursor-pointer"
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="Demo site disclosure banner" className="bg-charcoal-900 border-b border-charcoal-800/80 text-xs text-ivory/80 px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldAlert className="w-4 h-4 text-champagne-400 shrink-0 hidden sm:inline" />
          <p className="leading-relaxed">
            <span className="font-semibold text-champagne-300">Demonstration Website:</span> This website is a design proposal and technical demonstration developed for{' '}
            <strong className="text-white">SBE Events</strong> (Woji, Port Harcourt). It is not an officially authorised website. Contact details are sourced from public business directory listings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            className="text-xs text-champagne-400 hover:text-champagne-300 underline font-medium cursor-pointer"
            title="SBE Events Team / Admin Review"
          >
            Admin Management
          </button>
          <span className="text-charcoal-700">|</span>
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse demo notice"
            className="text-ivory/50 hover:text-ivory p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
