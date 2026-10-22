import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Phone, Calendar, Clock, DollarSign, MapPin, Users } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';

interface BookingSectionProps {
  preselectedEventType?: string;
  preselectedPackage?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedEventType,
  preselectedPackage,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(preselectedEventType || 'Corporate Events');
  const [preferredDate, setPreferredDate] = useState('');
  const [venueLocation, setVenueLocation] = useState('Port Harcourt (Venue TBD)');
  const [guestCount, setGuestCount] = useState('100 - 250 Guests');
  const [budgetRange, setBudgetRange] = useState('₦1,500,000 - ₦3,500,000');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Concept & Theming',
    'On-Day Coordination'
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage || '');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ id: string; message: string } | null>(null);

  // Update when props change
  useEffect(() => {
    if (preselectedEventType) {
      setEventType(preselectedEventType);
    }
  }, [preselectedEventType]);

  useEffect(() => {
    if (preselectedPackage) {
      setSelectedPackage(preselectedPackage);
    }
  }, [preselectedPackage]);

  const serviceOptions = [
    'Concept & Theming',
    'Stage Architecture & LED Backdrops',
    'Sound Reinforcement & Lighting',
    'Vendor & Logistics Management',
    'On-Day Protocol & Floor Coordination',
    'Hostess & Ushering Brigade',
    'Guest Registration & Badging',
    'Photography & Media Choreography'
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number for booking coordination.');
      return;
    }

    if (!preferredDate) {
      setErrorMsg('Please select an estimated or preferred date for the event.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email: email.trim() || undefined,
          eventType,
          preferredDate,
          venueLocation,
          guestCount,
          budgetRange,
          servicesRequired: selectedServices,
          additionalNotes,
          selectedPackage: selectedPackage || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking enquiry.');
      }

      setSuccessResult({
        id: data.enquiryId,
        message: data.message
      });

    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while connecting to the database.');
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp CTA URL generator with prefilled message
  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello SBE Events management, I would like to request a quotation for an upcoming event in Port Harcourt.\n\n` +
      `• Event Type: ${eventType}\n` +
      `• Estimated Date: ${preferredDate || 'Pending final schedule'}\n` +
      `• Location: ${venueLocation}\n` +
      `• Estimated Guests: ${guestCount}\n` +
      `• Indicative Budget: ${budgetRange}\n` +
      (selectedPackage ? `• Package Tier: ${selectedPackage}\n` : '') +
      `• My Name: ${fullName || 'Client'}\n\n` +
      `Please let me know your availability for a consultation.`
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="enquiry" className="py-24 bg-charcoal-950 border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-champagne-400 font-semibold mb-2">
            Initiate Consultation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ivory mb-4">
            Plan Your Event With SBE Events
          </h2>
          <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
            Provide your event specifications below. Submissions are recorded directly in our planning registry, and a coordinator will review your requirements.
          </p>
        </div>

        {/* WhatsApp Direct Option Banner */}
        <div className="bg-charcoal-900 border border-charcoal-800 p-6 rounded-lg mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-1">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Prefer Direct WhatsApp Communication?</span>
            </div>
            <p className="text-xs sm:text-sm text-ivory/70 max-w-xl font-light">
              Connect immediately with SBE Events via WhatsApp using the public directory contact (<span className="tabular-nums font-mono text-ivory">{BUSINESS_INFO.phoneDisplay}</span>). Prefilled with your current selections.
            </p>
          </div>
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>

        {/* Main Booking Form Container */}
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 sm:p-10 max-w-4xl mx-auto">
          
          {successResult ? (
            <div className="text-center py-12 px-4 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-champagne-500/20 border border-champagne-500 rounded-full flex items-center justify-center mx-auto text-champagne-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto">
                <h3 className="font-display text-2xl sm:text-3xl text-ivory mb-2">
                  Enquiry Registered Successfully
                </h3>
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed mb-4">
                  {successResult.message}
                </p>
                <div className="bg-charcoal-950 border border-charcoal-800 p-3 rounded font-mono text-xs text-champagne-400 mb-6 tabular-nums">
                  Reference: {successResult.id}
                </div>
                <p className="text-xs text-ivory/50 mb-6">
                  Our lead event coordinator will review your requirements and reach out via phone (<span className="font-medium text-ivory">{phone}</span>) with an initial scope proposal.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Reference on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSuccessResult(null);
                      setFullName('');
                      setPhone('');
                      setAdditionalNotes('');
                    }}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory bg-charcoal-800 hover:bg-charcoal-700 transition-colors rounded cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Selected Package Banner if active */}
              {selectedPackage && (
                <div className="bg-charcoal-950 border border-champagne-500/40 p-4 rounded flex items-center justify-between text-xs">
                  <div>
                    <span className="text-ivory/60">Selected Package Framework:</span>{' '}
                    <strong className="text-champagne-300">{selectedPackage}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage('')}
                    className="text-ivory/40 hover:text-ivory underline text-[11px] cursor-pointer"
                  >
                    Clear selection
                  </button>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-950/40 border border-red-800 text-red-200 text-xs p-4 rounded flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Contact Information */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-4 pb-2 border-b border-charcoal-800">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Full Name <span className="text-champagne-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Emeka Amadi"
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Phone Number (Nigerian Mobile) <span className="text-champagne-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0806 228 3515 or +234..."
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Email Address <span className="text-ivory/40">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@organisation.com"
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Event Specification */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-4 pb-2 border-b border-charcoal-800">
                  2. Event Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Event Category <span className="text-champagne-400">*</span>
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400 transition-colors"
                    >
                      <option value="Corporate Events">Corporate Events & Galas</option>
                      <option value="Brand Activations">Brand Activations & Product Launches</option>
                      <option value="Conferences">Conferences & Executive Seminars</option>
                      <option value="Exhibitions">Exhibitions & Trade Expos</option>
                      <option value="Roadshows">Roadshows & Regional Tours</option>
                      <option value="Weddings & Social">Weddings & Social Celebrations</option>
                      <option value="Training Programmes">Training Programmes & Retreats</option>
                      <option value="Other Function">Other Specialised Function</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Preferred Event Date <span className="text-champagne-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Event Venue or Location in Port Harcourt
                    </label>
                    <select
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400 transition-colors"
                    >
                      <option value="Port Harcourt (Venue TBD)">Port Harcourt (Venue TBD)</option>
                      <option value="Woji Area / Vicinity">Woji Area / Vicinity</option>
                      <option value="Trans-Amadi Industrial Layout">Trans-Amadi Industrial Layout</option>
                      <option value="Old GRA / GRA Phase 2">Old GRA / GRA Phase 2</option>
                      <option value="Peter Odili Road Corridor">Peter Odili Road Corridor</option>
                      <option value="Hotel Presidential / Polo Club Area">Hotel Presidential / Polo Club Area</option>
                      <option value="Greater Port Harcourt / Airport Axis">Greater Port Harcourt / Airport Axis</option>
                      <option value="Other Rivers State Location">Other Rivers State Location</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Estimated Guest Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400 transition-colors"
                    >
                      <option value="Under 50 Guests (Intimate)">Under 50 Guests (Intimate)</option>
                      <option value="50 - 150 Guests">50 - 150 Guests</option>
                      <option value="150 - 350 Guests">150 - 350 Guests</option>
                      <option value="350 - 700 Guests">350 - 700 Guests</option>
                      <option value="700 - 1,500+ Guests (Large Scale)">700 - 1,500+ Guests (Large Scale)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                      Estimated Budget Range (Nigerian Naira)
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400 transition-colors"
                    >
                      <option value="₦750,000 - ₦1,500,000">₦750,000 - ₦1,500,000</option>
                      <option value="₦1,500,000 - ₦3,500,000">₦1,500,000 - ₦3,500,000</option>
                      <option value="₦3,500,000 - ₦7,500,000">₦3,500,000 - ₦7,500,000</option>
                      <option value="₦7,500,000 - ₦15,000,000+">₦7,500,000 - ₦15,000,000+ (Comprehensive Production)</option>
                      <option value="To be determined / Tailored Consultation">To be determined / Tailored Consultation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Services Required Checkboxes */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne-400 mb-3 pb-2 border-b border-charcoal-800">
                  3. Key Services Required
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2.5 p-2.5 rounded bg-charcoal-950/50 hover:bg-charcoal-950 border border-charcoal-800/80 cursor-pointer text-xs text-ivory/80"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-charcoal-700 text-champagne-500 focus:ring-0 focus:ring-offset-0 bg-charcoal-900 w-4 h-4"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs text-ivory/80 font-medium mb-1.5">
                  Additional Event Details or Special Requests
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Tell us about the desired ambience, keynote guests, specific milestones, or vendor requirements..."
                  className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne-400 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-ivory/40 text-center sm:text-left">
                  Submissions are stored securely in the SBE Events database and strictly restricted to authorized administrators.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 disabled:opacity-50 transition-all rounded shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Registering Enquiry...' : 'Submit Booking Enquiry'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
