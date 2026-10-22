import React from 'react';
import { PortfolioItem } from '../types';
import { X, MapPin, Users, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onEnquireSimilar: (category: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onEnquireSimilar }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-charcoal-900 border border-charcoal-800 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-charcoal-950">
          <div className="flex items-center gap-2 text-xs text-champagne-300">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-ivory/60">{project.year}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-ivory/60 hover:text-white p-1 rounded hover:bg-charcoal-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Visual */}
          <div className="relative aspect-video w-full rounded-md overflow-hidden bg-charcoal-950 border border-charcoal-800">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {project.isDemo && (
              <div className="absolute top-3 right-3 bg-charcoal-950/90 border border-charcoal-700 text-ivory/70 text-[11px] px-2.5 py-1 rounded flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-champagne-400" />
                <span>Demonstration Showcase</span>
              </div>
            )}
          </div>

          {/* Project Title & Metadata */}
          <div>
            <h2 id="modal-project-title" className="font-display text-2xl sm:text-3xl text-ivory mb-3">
              {project.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/70 pb-4 border-b border-charcoal-800">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-champagne-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-champagne-400" />
                {project.guestCount}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-2">
              Event Scope & Executive Overview
            </h3>
            <p className="text-sm text-ivory/80 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Coordination Highlights */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3">
              Coordination & Production Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-ivory/70 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo disclaimer in modal */}
          <div className="bg-charcoal-950 p-4 rounded border border-charcoal-800 text-xs text-ivory/60 leading-relaxed">
            <span className="text-champagne-300 font-medium">Administrator Notice:</span> This case study showcases illustrative visual standards for the SBE Events website demo. Authorized management can replace images and details via the Admin Management drawer.
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 bg-charcoal-950 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-ivory/50">
            Planning a function with similar scale or requirements?
          </div>
          <button
            onClick={() => {
              onClose();
              onEnquireSimilar(project.category);
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 transition-colors rounded flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Plan Similar Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
