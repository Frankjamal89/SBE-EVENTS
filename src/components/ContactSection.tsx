import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface ContactSectionProps {
  onPlanEventClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onPlanEventClick }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    setLoading(true);
    // Submit quick query via API
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: name,
        phone: contact,
        eventType: 'General Consultation',
        preferredDate: 'Flexible / General Query',
        venueLocation: 'Port Harcourt',
        guestCount: 'General Query',
        budgetRange: 'To be discussed',
        servicesRequired: ['General Consultation & Planning Advice'],
        additionalNotes: message,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitted(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-24 bg-charcoal-900 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
            Regional Enquiries & Consultations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4">
            Connect With SBE Events
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
            We are available for on-site consultations, venue walkthroughs, and executive briefings across Port Harcourt and Rivers State.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details & Directory disclosures */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Listing Card */}
            <div className="bg-charcoal-950 border border-charcoal-800 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-2">
                <Phone className="w-4 h-4" />
                <span>Direct Telephone Listing</span>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneDisplay}`}
                className="font-display text-2xl sm:text-3xl text-ivory hover:text-champagne-300 block mb-2 tabular-nums"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
              <div className="text-xs text-ivory/50 leading-relaxed">
                <span className="text-champagne-300/80 font-medium">Directory Listing Notice:</span> This telephone number is sourced from public business listings for SBE Events in Port Harcourt and is presented for verification during this demonstration.
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-800 flex items-center gap-3">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Hello SBE Events, I would like to make an enquiry regarding an event in Port Harcourt.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phoneDisplay}`}
                  className="text-xs text-ivory/70 hover:text-white px-3 py-2 rounded border border-charcoal-800 hover:border-charcoal-700 transition-colors"
                >
                  Direct Voice Call
                </a>
              </div>
            </div>

            {/* Address & Service Area Card */}
            <div className="bg-charcoal-950 border border-charcoal-800 p-6 rounded-lg">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>Operating Territory & Listing</span>
              </div>

              <div className="text-sm font-medium text-ivory mb-1">
                Federal Housing Estate, Woji
              </div>
              <div className="text-xs text-ivory/60 mb-4">
                Port Harcourt, Rivers State, Nigeria (Provisional directory location)
              </div>

              <div className="pt-4 border-t border-charcoal-800">
                <div className="text-xs uppercase tracking-wider text-champagne-300/80 font-medium mb-2">
                  Active Service Coverage Areas
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {BUSINESS_INFO.serviceAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-ivory/70 bg-charcoal-900 border border-charcoal-800 px-2.5 py-1 rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Disclaimer */}
            <div className="bg-charcoal-950/50 border border-charcoal-800/80 p-4 rounded text-xs text-ivory/50 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
              <span>
                To maintain transparency, this website does not invent corporate email addresses or exact GPS coordinates until verified and approved by the owner of SBE Events.
              </span>
            </div>

          </div>

          {/* Right Column: Quick Consultation Request Form */}
          <div className="lg:col-span-7 bg-charcoal-950 border border-charcoal-800 p-8 rounded-lg">
            <h3 className="font-display text-2xl text-ivory mb-2">
              Send a General Consultation Message
            </h3>
            <p className="text-xs text-ivory/60 mb-6 font-light">
              Have an initial query or looking for advisory feedback? Send a note directly to our team registry.
            </p>

            {submitted ? (
              <div className="bg-charcoal-900 border border-champagne-500/40 p-6 rounded text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-champagne-400 mx-auto" />
                <h4 className="font-display text-lg text-ivory">Message Received</h4>
                <p className="text-xs text-ivory/70">
                  Thank you, {name}. Your inquiry has been securely stored. Our coordinator will contact you at {contact}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-champagne-400 hover:underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickContact} className="space-y-4">
                <div>
                  <label className="block text-xs text-ivory/80 font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chief B. Briggs"
                    className="w-full bg-charcoal-900 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ivory/80 font-medium mb-1">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. 0806 228 3515"
                    className="w-full bg-charcoal-900 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ivory/80 font-medium mb-1">
                    Message / Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your event timeframe, approximate guest count, or questions..."
                    className="w-full bg-charcoal-900 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onPlanEventClick}
                    className="text-xs text-champagne-400 hover:underline cursor-pointer"
                  >
                    Open Comprehensive Event Booking Form →
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 disabled:opacity-50 transition-colors rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
