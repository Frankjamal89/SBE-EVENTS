import React from 'react';
import { PLANNING_PROCESS_STEPS, BUSINESS_INFO } from '../data/mockData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onPlanEventClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onPlanEventClick }) => {
  return (
    <section id="about" className="py-24 bg-charcoal-950 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-3">
            About SBE Events · Port Harcourt
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-6 leading-tight">
            Crafting Seamless Experiences With Precision & Creative Authority
          </h2>
          <p className="text-base sm:text-lg text-ivory/70 leading-relaxed font-light">
            Based in Woji, Port Harcourt, SBE Events is positioned as a dedicated event planning and coordination team for clients who value meticulous execution, refined aesthetic standards, and peace of mind on their most significant occasions.
          </p>
        </div>

        {/* Narrative & Verification Note Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-ivory/80 leading-relaxed font-light text-sm sm:text-base">
            <p>
              Whether orchestrating a flagship corporate summit for regional oil & gas stakeholders in Trans-Amadi, launching a transformative brand campaign in Port Harcourt city, or curating an intimate VIP anniversary in Old GRA, we manage every facet of production with dedicated discipline.
            </p>
            <p>
              We believe that true event excellence is born from the unseen details: rigorous schedule rehearsals, authoritative vendor choreography, acoustic balancing, and gracious protocol for every guest.
            </p>
            <div className="pt-2">
              <div className="text-xs text-champagne-300/80 uppercase tracking-wider font-medium mb-3">
                Core Service Capabilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-ivory/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  <span>Strategic Discovery & Concept Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  <span>Port Harcourt Vendor Procurement & Oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  <span>Staging, Audio-Visual & Lighting Supervision</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
                  <span>On-Day Master Floor Protocol & Timing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-charcoal-900 border border-charcoal-800 p-8 rounded-lg">
            <div className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-2">
              Proposed Planning Framework
            </div>
            <h3 className="font-display text-xl text-ivory mb-3">
              Tailored for Port Harcourt & Regional Clients
            </h3>
            <p className="text-xs text-ivory/60 leading-relaxed mb-6">
              The workflows outlined below represent proposed operational methodologies prepared for SBE Events management review. Final operational scopes and client agreements are confirmed prior to project kickoff.
            </p>
            <button
              onClick={onPlanEventClick}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 transition-colors rounded text-center cursor-pointer"
            >
              Discuss Your Next Event
            </button>
          </div>
        </div>

        {/* 4-Step Planning Process */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-charcoal-800">
            <div>
              <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-1">
                The 4-Stage Methodology
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-ivory">
                How We Bring Your Vision to Life
              </h3>
            </div>
            <span className="text-xs text-ivory/50 hidden sm:inline">
              Proposed Event Planning Life Cycle
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANNING_PROCESS_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-charcoal-900/60 border border-charcoal-800 hover:border-champagne-500/40 p-6 rounded-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-display text-3xl font-light text-champagne-400/80 mb-3 tabular-nums">
                    {step.stepNumber}
                  </div>
                  <h4 className="font-medium text-base text-ivory mb-1">
                    {step.title}
                  </h4>
                  <div className="text-xs text-champagne-300/80 font-medium mb-3">
                    {step.summary}
                  </div>
                  <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
