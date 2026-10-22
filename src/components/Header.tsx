import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface HeaderProps {
  onPlanEventClick: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlanEventClick, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <a
          href="#"
          className="font-display text-2xl md:text-3xl font-bold tracking-wider text-ivory uppercase whitespace-nowrap shrink-0 hover:text-champagne-300 transition-colors"
        >
          SBE Events
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 text-sm font-medium text-ivory/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-champagne-300 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phoneDisplay}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-ivory/60 hover:text-champagne-400 transition-colors whitespace-nowrap"
            title="Public listing phone number"
          >
            <PhoneCall className="w-3.5 h-3.5 text-champagne-500" />
            <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
          </a>

          <button
            onClick={onPlanEventClick}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 active:scale-[0.98] transition-all rounded shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Plan Your Event
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-ivory/80 hover:text-white p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-charcoal-900 border-b border-charcoal-800 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-ivory/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-champagne-300 border-b border-charcoal-800/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneDisplay}`}
                className="flex items-center gap-2 text-sm text-champagne-400 py-1"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phoneDisplay} (Directory Listing)</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left text-xs text-ivory/50 hover:text-champagne-400 py-1"
              >
                Admin Management Portal
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
