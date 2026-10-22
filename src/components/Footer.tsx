import React from 'react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/mockData';
import { Phone, MessageSquare, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onPlanEventClick: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPlanEventClick, onOpenAdmin }) => {
  return (
    <footer className="bg-charcoal-950 text-ivory/70 border-t border-charcoal-800 text-xs font-light">
      {/* Top CTA Row */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-charcoal-850">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
              Ready To Create an Unforgettable Experience?
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ivory font-normal">
              Partner With SBE Events For Your Next Function
            </h3>
            <p className="text-xs text-ivory/60 mt-1">
              Serving corporate organisations, brands, and private families throughout Port Harcourt and Rivers State.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onPlanEventClick}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 transition-colors rounded shadow-sm cursor-pointer whitespace-nowrap"
            >
              Plan Your Event
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Hello SBE Events, I would like to discuss an event quotation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand & Positioning */}
        <div className="space-y-4">
          <div className="font-display text-xl text-ivory font-bold tracking-wider uppercase">
            SBE Events
          </div>
          <p className="text-xs text-ivory/60 leading-relaxed font-light">
            &ldquo;{BUSINESS_INFO.tagline}&rdquo;
          </p>
          <p className="text-xs text-ivory/50 leading-relaxed font-light">
            Professional event planning, technical staging, and coordination partner in Port Harcourt, Rivers State, Nigeria.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneDisplay}`}
              className="inline-flex items-center gap-2 text-champagne-400 hover:text-champagne-300 font-medium tabular-nums"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Core Services */}
        <div>
          <div className="text-xs uppercase tracking-wider text-champagne-400 font-semibold mb-4">
            Event Disciplines
          </div>
          <ul className="space-y-2.5">
            {SERVICES_DATA.slice(0, 5).map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="hover:text-champagne-300 transition-colors block text-xs"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Navigation */}
        <div>
          <div className="text-xs uppercase tracking-wider text-champagne-400 font-semibold mb-4">
            Navigation
          </div>
          <ul className="space-y-2.5">
            <li>
              <a href="#about" className="hover:text-champagne-300 transition-colors">
                About SBE Events
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-champagne-300 transition-colors">
                Portfolio Showcase
              </a>
            </li>
            <li>
              <a href="#packages" className="hover:text-champagne-300 transition-colors">
                Event Packages
              </a>
            </li>
            <li>
              <a href="#enquiry" className="hover:text-champagne-300 transition-colors">
                Booking & Enquiries
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-champagne-300 transition-colors">
                Contact & Territory
              </a>
            </li>
            <li>
              <button
                onClick={onOpenAdmin}
                className="hover:text-champagne-300 transition-colors text-left text-ivory/50 cursor-pointer"
              >
                Administrator Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Territory & Listing Disclosure */}
        <div>
          <div className="text-xs uppercase tracking-wider text-champagne-400 font-semibold mb-4">
            Directory Listing
          </div>
          <p className="text-xs text-ivory/60 leading-relaxed mb-3">
            Federal Housing Estate, Woji, Port Harcourt, Rivers State, Nigeria.
          </p>
          <div className="text-[11px] text-ivory/40 leading-relaxed space-y-1.5">
            <div>• Woji & Trans-Amadi Hub</div>
            <div>• Old GRA & GRA Phase 2</div>
            <div>• Peter Odili Corridor & D-Line</div>
            <div>• Rivers State & Niger Delta</div>
          </div>
        </div>

      </div>

      {/* Mandatory Demo Disclaimer Bar */}
      <div className="bg-charcoal-900 border-t border-charcoal-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-ivory/50 text-center md:text-left">
          <div className="flex items-start gap-2 max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-ivory/80 font-medium">Demonstration Notice:</strong> This website is an independent demonstration and design proposal for SBE Events (Woji, Port Harcourt). It is not an officially authorised website, and no commercial endorsement is implied. Phone listings and address reference public business directories.
            </p>
          </div>
          <div className="shrink-0 text-ivory/40">
            © {new Date().getFullYear()} SBE Events Demo Proposal
          </div>
        </div>
      </div>
    </footer>
  );
};
