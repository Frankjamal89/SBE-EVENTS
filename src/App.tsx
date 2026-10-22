/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PackagesSection } from './components/PackagesSection';
import { BookingSection } from './components/BookingSection';
import { TestimonialsPlaceholderSection } from './components/TestimonialsPlaceholderSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminDrawer } from './components/AdminDrawer';
import { PortfolioItem } from './types';
import { INITIAL_PORTFOLIO_ITEMS } from './data/mockData';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('Corporate Events');
  const [preselectedPackage, setPreselectedPackage] = useState<string>('');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO_ITEMS);

  // Fetch portfolio items from server API
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setPortfolioItems(data.items);
        }
      })
      .catch((err) => {
        console.warn('Using client fallback portfolio:', err);
      });
  }, []);

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceCategory: string) => {
    setPreselectedService(serviceCategory);
    scrollToEnquiry();
  };

  const handleSelectPackage = (packageName: string) => {
    setPreselectedPackage(packageName);
    scrollToEnquiry();
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory selection:bg-champagne-400 selection:text-charcoal-950 font-sans">
      {/* Demonstration Disclosure Banner */}
      <DemoNoticeBanner onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <Header
        onPlanEventClick={scrollToEnquiry}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          onPlanEventClick={scrollToEnquiry}
          onExploreWorkClick={scrollToPortfolio}
        />

        {/* 2. About & 4-Stage Methodology */}
        <AboutSection onPlanEventClick={scrollToEnquiry} />

        {/* 3. Seven Event Disciplines & Services */}
        <ServicesSection onSelectServiceForEnquiry={handleSelectService} />

        {/* 4. Filterable Portfolio & Detail Modal */}
        <PortfolioSection
          portfolioItems={portfolioItems}
          onOpenProjectModal={(project) => setActiveProject(project)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 5. Proposed Packages: Essential, Signature, Bespoke */}
        <PackagesSection onSelectPackageForQuote={handleSelectPackage} />

        {/* 6. Testimonials Placeholder & Client Assurance */}
        <TestimonialsPlaceholderSection />

        {/* 7. Comprehensive Booking & Enquiry System with Database & WhatsApp */}
        <BookingSection
          preselectedEventType={preselectedService}
          preselectedPackage={preselectedPackage}
        />

        {/* 8. Contact & Service Area Details */}
        <ContactSection onPlanEventClick={scrollToEnquiry} />
      </main>

      {/* 9. Refined Footer */}
      <Footer
        onPlanEventClick={scrollToEnquiry}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Project Scope Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onEnquireSimilar={handleSelectService}
      />

      {/* Administrator Portal Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        portfolioItems={portfolioItems}
        onUpdatePortfolio={(newItems) => setPortfolioItems(newItems)}
      />
    </div>
  );
}
