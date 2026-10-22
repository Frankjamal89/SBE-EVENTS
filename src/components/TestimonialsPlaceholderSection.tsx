import React from 'react';
import { Quote, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const TestimonialsPlaceholderSection: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal-950 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Testimonials Framework Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
            Client Assurance & Review Framework
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4">
            Committed to Exceptional Standards
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
            In accordance with strict brand integrity standards, customer testimonials and corporate references will be published exclusively upon direct written authorization from verified SBE Events clients.
          </p>
        </div>

        {/* Placeholder Feedback Grid clearly marked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-charcoal-900/60 border border-charcoal-800 p-6 rounded-lg flex flex-col justify-between">
            <div>
              <Quote className="w-6 h-6 text-champagne-400/40 mb-4" />
              <div className="text-xs uppercase tracking-wider text-champagne-400/90 font-medium mb-1">
                Corporate Summit Delivery
              </div>
              <p className="text-xs sm:text-sm text-ivory/75 font-light leading-relaxed mb-4 italic">
                &ldquo;Sample client feedback slot reserved for verified Port Harcourt corporate summit organizers and executive event directors.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal-800 text-[11px] text-ivory/50">
              [Review Placeholder · Pending Client Approval]
            </div>
          </div>

          <div className="bg-charcoal-900/60 border border-charcoal-800 p-6 rounded-lg flex flex-col justify-between">
            <div>
              <Quote className="w-6 h-6 text-champagne-400/40 mb-4" />
              <div className="text-xs uppercase tracking-wider text-champagne-400/90 font-medium mb-1">
                Brand Experiential Pavilion
              </div>
              <p className="text-xs sm:text-sm text-ivory/75 font-light leading-relaxed mb-4 italic">
                &ldquo;Sample client feedback slot reserved for national brands launching experiential activations and roadshows in the Niger Delta.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal-800 text-[11px] text-ivory/50">
              [Review Placeholder · Pending Client Approval]
            </div>
          </div>

          <div className="bg-charcoal-900/60 border border-charcoal-800 p-6 rounded-lg flex flex-col justify-between">
            <div>
              <Quote className="w-6 h-6 text-champagne-400/40 mb-4" />
              <div className="text-xs uppercase tracking-wider text-champagne-400/90 font-medium mb-1">
                Luxury Private Celebration
              </div>
              <p className="text-xs sm:text-sm text-ivory/75 font-light leading-relaxed mb-4 italic">
                &ldquo;Sample client feedback slot reserved for private wedding clients and families celebrating milestone occasions in Rivers State.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-charcoal-800 text-[11px] text-ivory/50">
              [Review Placeholder · Pending Client Approval]
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="pt-8 border-t border-charcoal-800">
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
              Common Enquiries
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ivory font-medium">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-charcoal-900/40 border border-charcoal-800 p-6 rounded-lg"
              >
                <h4 className="text-sm font-medium text-ivory mb-2">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
