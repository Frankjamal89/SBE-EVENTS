import React from 'react';
import { PACKAGES_DATA } from '../data/mockData';
import { Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { PackageTier } from '../types';

interface PackagesSectionProps {
  onSelectPackageForQuote: (packageTier: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackageForQuote }) => {
  return (
    <section id="packages" className="py-24 bg-charcoal-900 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
            Engagement Models
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4">
            Structured Event Planning Tiers
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
            Transparent frameworks designed to adapt to your event scale. All pricing is determined on a bespoke quotation basis based on verified venue requirements and guest capacity.
          </p>
        </div>

        {/* Clear Notice Banner regarding Proposed Pricing & Inclusions */}
        <div className="bg-charcoal-950/80 border border-charcoal-800 p-4 rounded-lg mb-12 flex items-start gap-3 text-xs text-ivory/70">
          <ShieldAlert className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-champagne-300 font-medium">Proposed Package Framework:</strong> To prevent misrepresentation, actual prices are not invented. All tier inclusions listed below are proposed examples requiring formal business approval. Click &ldquo;Request a Quote&rdquo; to receive a tailored quotation.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg, idx) => {
            const isFeatured = pkg.id === 'signature';

            return (
              <div
                key={pkg.id}
                className={`rounded-lg p-8 flex flex-col justify-between transition-all duration-300 border relative ${
                  isFeatured
                    ? 'bg-charcoal-950 border-champagne-500 shadow-xl'
                    : 'bg-charcoal-950/60 border-charcoal-800 hover:border-charcoal-700'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-8 bg-champagne-400 text-charcoal-950 text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded shadow-sm">
                    Most Popular Tier
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <div className="mb-4">
                    <div className="text-xs font-mono text-champagne-400/80 uppercase tracking-widest">
                      Tier 0{idx + 1}
                    </div>
                    <h3 className="font-display text-2xl text-ivory mt-1">
                      {pkg.name}
                    </h3>
                    <div className="text-xs text-champagne-300 font-medium mt-1">
                      {pkg.tagline}
                    </div>
                  </div>

                  {/* Suitability */}
                  <p className="text-xs text-ivory/70 font-light leading-relaxed mb-6 pb-6 border-b border-charcoal-800">
                    {pkg.suitability}
                  </p>

                  {/* Indicative Inclusions */}
                  <div className="mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-4">
                      Proposed Inclusions
                    </div>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-ivory/75">
                          <Check className="w-3.5 h-3.5 text-champagne-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended For */}
                  <div className="pt-4 border-t border-charcoal-800/80 mb-8">
                    <div className="text-[11px] uppercase tracking-wider text-ivory/40 font-medium mb-1">
                      Ideal For
                    </div>
                    <div className="text-xs text-ivory/80 font-medium">
                      {pkg.recommendedFor}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPackageForQuote(pkg.name)}
                  className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-champagne-400 text-charcoal-950 hover:bg-champagne-300 shadow-md'
                      : 'bg-charcoal-800 text-ivory hover:bg-charcoal-700 border border-charcoal-700'
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
