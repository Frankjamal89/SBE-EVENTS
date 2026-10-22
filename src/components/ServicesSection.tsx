import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForEnquiry }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_DATA[0].id);

  const activeService = SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-24 bg-charcoal-900 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-charcoal-800">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
              Our Capabilities & Disciplines
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory">
              Specialised Event Planning & Production
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ivory/60 max-w-md font-light leading-relaxed">
            Tailored solutions for corporations, institutions, and discerning private hosts across Port Harcourt and the Niger Delta.
          </p>
        </div>

        {/* Desktop Interactive Layout: Left Menu, Right Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Service Selector Tabs / List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {SERVICES_DATA.map((service, index) => {
              const isActive = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`text-left p-4 rounded-lg transition-all flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? 'bg-charcoal-800 border-champagne-500/50 text-ivory shadow-sm'
                      : 'bg-charcoal-950/60 border-charcoal-800/80 text-ivory/70 hover:bg-charcoal-800/40 hover:text-ivory'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-champagne-400/80 tabular-nums">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="text-sm sm:text-base font-medium">{service.title}</div>
                      <div className="text-xs text-ivory/50 line-clamp-1">{service.summary}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-champagne-400 translate-x-1' : 'text-ivory/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase Card */}
          <div className="lg:col-span-7 bg-charcoal-950 border border-charcoal-800 rounded-lg overflow-hidden flex flex-col justify-between">
            {/* Visual Cover */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-charcoal-900">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center filter brightness-[0.85] transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-champagne-300 font-medium">
                  {activeService.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-ivory mt-1">
                  {activeService.title}
                </h3>
              </div>
            </div>

            {/* Description & Deliverables */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm sm:text-base text-ivory/80 font-light leading-relaxed mb-6">
                  {activeService.description}
                </p>

                <div className="mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3">
                    Key Scope & Inclusions
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ivory/70">
                        <Check className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contextual Action Button */}
              <div className="pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-ivory/50">
                  Ready to specify requirements for your upcoming event?
                </div>
                <button
                  onClick={() => onSelectServiceForEnquiry(activeService.category)}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 transition-colors rounded flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Request Quote For This Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
