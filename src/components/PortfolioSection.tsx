import React, { useState } from 'react';
import { PortfolioItem, EventCategory } from '../types';
import { MapPin, Users, ArrowUpRight, Settings2, ShieldAlert } from 'lucide-react';

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
  onOpenProjectModal: (project: PortfolioItem) => void;
  onOpenAdmin: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolioItems,
  onOpenProjectModal,
  onOpenAdmin
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterCategories = [
    'All',
    'Corporate Events',
    'Brand Activations',
    'Conferences',
    'Weddings & Social'
  ];

  const filteredItems = selectedFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedFilter);

  return (
    <section id="portfolio" className="py-24 bg-charcoal-950 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header and Filter Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
              Demonstration Showcase
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4">
              Selected Work & Production Standards
            </h2>
            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
              Illustrative project cards demonstrating scale, atmospheric styling, and technical execution for SBE Events clients in Port Harcourt.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-charcoal-900 border border-charcoal-800 rounded-lg self-start lg:self-end">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-champagne-400 text-charcoal-950 font-semibold shadow-sm'
                    : 'text-ivory/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Administrator / Business Owner Quick Bar */}
        <div className="bg-charcoal-900/60 border border-charcoal-800/80 px-4 py-2.5 rounded-lg mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ivory/60">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-champagne-400 shrink-0" />
            <span>
              All showcase cards display licensed demo photography. SBE Events administrators can replace images and details with actual project archives.
            </span>
          </div>
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-champagne-400 hover:text-champagne-300 font-medium shrink-0 cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Manage Project Gallery</span>
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProjectModal(project)}
              className="group bg-charcoal-900 border border-charcoal-800 hover:border-champagne-500/50 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-950">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />

                {/* Quiet demo badge */}
                {project.isDemo && (
                  <div className="absolute top-3 right-3 bg-charcoal-950/80 text-[11px] text-ivory/70 px-2 py-0.5 rounded backdrop-blur-sm border border-charcoal-700">
                    Demonstration Asset
                  </div>
                )}
              </div>

              {/* Card Content - Clean unboxed metadata (NO PILLS) */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-champagne-400/90 font-medium mb-2">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-charcoal-600">·</span>
                    <span className="text-ivory/50">{project.year}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-ivory group-hover:text-champagne-300 transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory/70 line-clamp-2 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs text-ivory/50">
                  <span className="flex items-center gap-1.5 truncate max-w-[70%]">
                    <MapPin className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </span>

                  <span className="text-champagne-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                    <span>View Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
