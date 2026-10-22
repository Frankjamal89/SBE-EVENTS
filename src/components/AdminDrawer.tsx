import React, { useState, useEffect } from 'react';
import { EnquirySubmission, PortfolioItem } from '../types';
import { X, Lock, Key, Users, Briefcase, CheckCircle2, AlertCircle, RefreshCw, Phone, MessageSquare, Plus, Save } from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItems: PortfolioItem[];
  onUpdatePortfolio: (items: PortfolioItem[]) => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  portfolioItems,
  onUpdatePortfolio,
}) => {
  const [passcode, setPasscode] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'portfolio' | 'verify'>('enquiries');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  // Editable portfolio items
  const [editableProjects, setEditableProjects] = useState<PortfolioItem[]>(portfolioItems);
  const [savingPortfolio, setSavingPortfolio] = useState(false);
  const [portfolioSuccessMsg, setPortfolioSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setEditableProjects(portfolioItems);
  }, [portfolioItems]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      fetchEnquiries(data.token);
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const fetchEnquiries = async (authToken: string) => {
    setLoadingEnquiries(true);
    setEnquiryError(null);

    try {
      const res = await fetch('/api/enquiries', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Access denied. Administrator privileges required.');
      }

      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err: any) {
      setEnquiryError(err.message);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    if (!token) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSavePortfolio = async () => {
    if (!token) return;
    setSavingPortfolio(true);
    setPortfolioSuccessMsg(null);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: editableProjects }),
      });

      if (!res.ok) throw new Error('Failed to save portfolio items.');

      onUpdatePortfolio(editableProjects);
      setPortfolioSuccessMsg('Portfolio items updated successfully in database.');
      setTimeout(() => setPortfolioSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingPortfolio(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-charcoal-900 border-l border-charcoal-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-charcoal-950">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-champagne-400" />
            <h2 className="font-display text-lg text-ivory font-medium">
              SBE Events · Administrator Console
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-ivory/60 hover:text-white p-1 rounded hover:bg-charcoal-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!token ? (
            /* Authentication Screen */
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-12 h-12 bg-charcoal-800 border border-charcoal-700 rounded-full flex items-center justify-center mx-auto text-champagne-400 mb-4">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-ivory mb-2">
                Administrator Access Required
              </h3>
              <p className="text-xs text-ivory/60 leading-relaxed mb-6 font-light">
                To protect client privacy, customer enquiries and portfolio administration require authentication. For demonstration testing, use the preset passcode below.
              </p>

              <div className="bg-charcoal-950 border border-charcoal-800 p-3 rounded mb-6 text-xs text-ivory/80 text-left">
                <span className="text-champagne-400 font-semibold block mb-1">Demo Access Credentials:</span>
                <div>Passcode: <code className="text-champagne-300 font-mono bg-charcoal-900 px-1.5 py-0.5 rounded">sbe-admin-2026</code></div>
              </div>

              {authError && (
                <div className="bg-red-950/40 border border-red-800 text-red-300 text-xs p-3 rounded mb-4 text-left">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter administrator passcode"
                  className="w-full bg-charcoal-950 border border-charcoal-800 rounded px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-champagne-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 transition-colors rounded cursor-pointer"
                >
                  Authenticate & View Registry
                </button>
              </form>
            </div>
          ) : (
            /* Logged-In Console */
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-charcoal-800 gap-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'enquiries'
                      ? 'border-champagne-400 text-champagne-300'
                      : 'border-transparent text-ivory/60 hover:text-ivory'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Inbound Enquiries ({enquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'portfolio'
                      ? 'border-champagne-400 text-champagne-300'
                      : 'border-transparent text-ivory/60 hover:text-ivory'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfolio Content Customizer</span>
                </button>

                <button
                  onClick={() => setActiveTab('verify')}
                  className={`pb-3 px-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'verify'
                      ? 'border-champagne-400 text-champagne-300'
                      : 'border-transparent text-ivory/60 hover:text-ivory'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Business Verification Checklist</span>
                </button>
              </div>

              {/* Tab 1: Enquiries */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-ivory/60">
                      Real inquiries received via the website booking form, saved in the server database.
                    </p>
                    <button
                      onClick={() => fetchEnquiries(token)}
                      className="text-xs text-champagne-400 hover:text-champagne-300 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="text-center py-12 bg-charcoal-950 border border-charcoal-800 rounded p-6 text-xs text-ivory/50">
                      No customer enquiries in the database yet. Test submitting a booking on the website!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enquiries.map((enquiry) => (
                        <div
                          key={enquiry.id}
                          className="bg-charcoal-950 border border-charcoal-800 p-5 rounded-lg space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-charcoal-850">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-ivory">
                                  {enquiry.fullName}
                                </span>
                                <span className="font-mono text-[11px] text-champagne-400/80">
                                  {enquiry.id}
                                </span>
                              </div>
                              <div className="text-xs text-ivory/50">
                                Submitted {new Date(enquiry.submittedAt).toLocaleDateString()} at{' '}
                                {new Date(enquiry.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-ivory/40">Status:</span>
                              <select
                                value={enquiry.status}
                                onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                                className="bg-charcoal-900 border border-charcoal-700 text-xs text-ivory rounded px-2 py-1 focus:outline-none focus:border-champagne-400"
                              >
                                <option value="new">New Enquiry</option>
                                <option value="reviewing">Under Review</option>
                                <option value="contacted">Client Contacted</option>
                                <option value="quote_sent">Quote Sent</option>
                                <option value="confirmed">Confirmed / Booked</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                              <span className="text-ivory/40 block text-[11px]">Event Type:</span>
                              <span className="text-ivory font-medium">{enquiry.eventType}</span>
                            </div>
                            <div>
                              <span className="text-ivory/40 block text-[11px]">Target Date:</span>
                              <span className="text-ivory font-medium">{enquiry.preferredDate}</span>
                            </div>
                            <div>
                              <span className="text-ivory/40 block text-[11px]">Guest Count:</span>
                              <span className="text-ivory font-medium">{enquiry.guestCount}</span>
                            </div>
                            <div>
                              <span className="text-ivory/40 block text-[11px]">Budget:</span>
                              <span className="text-champagne-300 font-medium">{enquiry.budgetRange}</span>
                            </div>
                          </div>

                          <div className="text-xs text-ivory/70 bg-charcoal-900/60 p-2.5 rounded border border-charcoal-800">
                            <span className="text-ivory/40 block text-[10px] uppercase font-semibold mb-1">
                              Location & Services:
                            </span>
                            <div>Venue: {enquiry.venueLocation}</div>
                            {enquiry.servicesRequired?.length > 0 && (
                              <div className="mt-1 text-champagne-300/80">
                                Services: {enquiry.servicesRequired.join(', ')}
                              </div>
                            )}
                            {enquiry.additionalNotes && (
                              <div className="mt-1 text-ivory/60 italic">
                                &ldquo;{enquiry.additionalNotes}&rdquo;
                              </div>
                            )}
                          </div>

                          {/* Quick Follow-up Buttons */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href={`tel:${enquiry.phone}`}
                              className="text-xs bg-charcoal-800 hover:bg-charcoal-700 text-ivory px-3 py-1.5 rounded inline-flex items-center gap-1.5"
                            >
                              <Phone className="w-3 h-3 text-champagne-400" />
                              <span>Call {enquiry.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${enquiry.fullName}, this is SBE Events regarding your enquiry (${enquiry.id}) for your upcoming ${enquiry.eventType}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/80 px-3 py-1.5 rounded inline-flex items-center gap-1.5"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-400" />
                              <span>WhatsApp Follow-up</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Portfolio Customizer */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-ivory/60">
                      Edit demonstration project cards or replace with real photos and descriptions.
                    </p>
                    <button
                      onClick={handleSavePortfolio}
                      disabled={savingPortfolio}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal-950 bg-champagne-400 hover:bg-champagne-300 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingPortfolio ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>

                  {portfolioSuccessMsg && (
                    <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs p-3 rounded">
                      {portfolioSuccessMsg}
                    </div>
                  )}

                  <div className="space-y-6">
                    {editableProjects.map((project, pIdx) => (
                      <div key={project.id} className="bg-charcoal-950 border border-charcoal-800 p-4 rounded-lg space-y-3">
                        <div className="text-xs font-semibold text-champagne-400">
                          Project #{pIdx + 1} ({project.category})
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-ivory/60 block mb-1">Project Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const copy = [...editableProjects];
                                copy[pIdx].title = e.target.value;
                                setEditableProjects(copy);
                              }}
                              className="w-full bg-charcoal-900 border border-charcoal-800 rounded p-2 text-ivory"
                            />
                          </div>

                          <div>
                            <label className="text-ivory/60 block mb-1">Location in Port Harcourt</label>
                            <input
                              type="text"
                              value={project.location}
                              onChange={(e) => {
                                const copy = [...editableProjects];
                                copy[pIdx].location = e.target.value;
                                setEditableProjects(copy);
                              }}
                              className="w-full bg-charcoal-900 border border-charcoal-800 rounded p-2 text-ivory"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-ivory/60 block mb-1">Project Description</label>
                            <textarea
                              rows={2}
                              value={project.description}
                              onChange={(e) => {
                                const copy = [...editableProjects];
                                copy[pIdx].description = e.target.value;
                                setEditableProjects(copy);
                              }}
                              className="w-full bg-charcoal-900 border border-charcoal-800 rounded p-2 text-ivory"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Verification Checklist */}
              {activeTab === 'verify' && (
                <div className="space-y-4 text-xs text-ivory/80 leading-relaxed">
                  <div className="bg-charcoal-950 border border-charcoal-800 p-5 rounded-lg space-y-3">
                    <h3 className="font-display text-base text-champagne-300 font-semibold">
                      Required Business Authorisations Before Official Deployment
                    </h3>
                    <p className="text-ivory/60">
                      As an independent demonstration, the following items must be verified directly with the owner of SBE Events prior to presenting this as an official digital asset:
                    </p>
                    <ul className="space-y-2 pt-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1 shrink-0" />
                        <span><strong>Phone Number Verification:</strong> Confirm that <code>0806 228 3515</code> is the current, active business WhatsApp and voice line.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1 shrink-0" />
                        <span><strong>Premises Confirmation:</strong> Validate the Federal Housing Estate, Woji address or update to the company&apos;s current registered studio.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1 shrink-0" />
                        <span><strong>Photography Rights:</strong> Replace illustrative demonstration imagery with genuine, verified photography from past SBE Events productions.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 mt-1 shrink-0" />
                        <span><strong>Package Tiers:</strong> Review the Essential, Signature, and Bespoke tiers to match the company&apos;s exact service scope and pricing structures.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
