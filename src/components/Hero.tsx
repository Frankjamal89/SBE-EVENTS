import React from 'react';
import { ArrowRight, Sparkles, MapPin, Phone } from 'lucide-react';
import { HERO_IMAGE, BUSINESS_INFO } from '../data/mockData';

interface HeroProps {
  onPlanEventClick: () => void;
  onExploreWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlanEventClick, onExploreWorkClick }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-charcoal-800">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Luxury corporate gala banquet and stage production in Port Harcourt"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/75 to-charcoal-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-charcoal-950/30 to-charcoal-950/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center">
        
        {/* Brand Tagline & Regional Location Kicker (Quiet unboxed text) */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-medium text-champagne-300 uppercase tracking-widest mb-6">
          <span>{BUSINESS_INFO.tagline}</span>
          <span aria-hidden="true" className="text-charcoal-600">·</span>
          <span className="flex items-center gap-1.5 text-ivory/70">
            <MapPin className="w-3.5 h-3.5 text-champagne-400" />
            Woji, Port Harcourt, Rivers State
          </span>
        </div>

        {/* Primary Headline with Balance */}
        <h1 
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-ivory leading-[1.1] mb-6 max-w-4xl"
          style={{ textWrap: 'balance' }}
        >
          Every Event Deserves to Be Exceptional.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-ivory/80 max-w-2xl font-light leading-relaxed mb-10">
          From corporate experiences to unforgettable celebrations, we help turn your vision into an event worth remembering.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onPlanEventClick}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 active:scale-[0.98] transition-all rounded shadow-md flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreWorkClick}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wider text-ivory bg-charcoal-900/80 hover:bg-charcoal-800/90 border border-charcoal-700 active:scale-[0.98] transition-all rounded flex items-center justify-center cursor-pointer"
          >
            Explore Our Work
          </button>
        </div>

        {/* Subtle Proof / Capability Strip */}
        <div className="mt-16 pt-8 border-t border-ivory/10 w-full max-w-3xl grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <div>
            <div className="text-xs uppercase tracking-wider text-champagne-400/80 font-medium mb-1">Service Specialisation</div>
            <div className="text-sm font-medium text-ivory">Corporate & Luxury Functions</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-champagne-400/80 font-medium mb-1">Operational Territory</div>
            <div className="text-sm font-medium text-ivory">Port Harcourt & Rivers State</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-xs uppercase tracking-wider text-champagne-400/80 font-medium mb-1">Enquiry Channel</div>
            <a href={`tel:${BUSINESS_INFO.phoneDisplay}`} className="text-sm font-medium text-ivory hover:text-champagne-300 flex items-center gap-1.5 tabular-nums">
              <Phone className="w-3.5 h-3.5 text-champagne-400" />
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
