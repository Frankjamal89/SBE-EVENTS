import { ServiceItem, PackageTier, PortfolioItem } from '../types';
import heroImage from '../assets/images/hero_sbe_gala_1792658802247.jpg';

export const HERO_IMAGE = heroImage;
export const BRAND_ACTIVATION_IMAGE = '/src/assets/images/brand_activation_showcase_1792658802510.jpg';
export const CONFERENCE_IMAGE = '/src/assets/images/conference_summit_hall_1792658803544.jpg';
export const WEDDING_IMAGE = '/src/assets/images/luxury_wedding_reception_1792658804137.jpg';

export const BUSINESS_INFO = {
  name: 'SBE Events',
  tagline: 'You Imagine It. We Bring It to Life.',
  phoneDisplay: '0806 228 3515',
  phoneInternational: '+2348062283515',
  whatsappNumber: '2348062283515',
  provisionalAddress: 'Federal Housing Estate, Woji, Port Harcourt, Rivers State, Nigeria',
  serviceAreas: [
    'Woji',
    'Trans-Amadi Industrial Layout',
    'Old GRA & GRA Phase 2',
    'Peter Odili Corridor',
    'D-Line & Waterlines',
    'Greater Port Harcourt & Onne Corridor',
    'Rivers State & Niger Delta Region'
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-activations',
    title: 'Brand Activations & Product Launches',
    category: 'Brand Activations',
    summary: 'High-impact experiential setups that immerse consumers and establish commanding market presence.',
    description: 'We translate your marketing strategy into live architectural brand pavilions, interactive test-drive environments, and experiential product reveal moments that ignite customer conversation across Port Harcourt.',
    deliverables: [
      'Bespoke promotional booth architecture',
      'Interactive consumer engagement zones',
      'Brand ambassador and hostess staffing',
      'Social media visual moments and live coverage'
    ],
    image: BRAND_ACTIVATION_IMAGE
  },
  {
    id: 'corporate-events',
    title: 'Corporate Galas & Executive Functions',
    category: 'Corporate Events',
    summary: 'Refined corporate banquets, awards ceremonies, annual general meetings, and stakeholder galas.',
    description: 'Discreet, high-caliber event production tailored to executive standards. We handle comprehensive protocol, dignified staging, audio-visual excellence, and polished hospitality management.',
    deliverables: [
      'VIP protocol and high-table guest routing',
      'Keynote stage architecture and LED backdrops',
      'Synchronized lighting, audio, and acoustics',
      'Detailed running orders and stage management'
    ],
    image: HERO_IMAGE
  },
  {
    id: 'conferences-seminars',
    title: 'Conferences & Executive Seminars',
    category: 'Conferences',
    summary: 'Multi-day business summits, technical symposiums, and academic conferences with precise logistics.',
    description: 'Flawlessly coordinated plenary sessions, breakout rooms, delegate registration management, and digital projection systems designed for seamless knowledge exchange.',
    deliverables: [
      'Delegate badge generation & check-in flow',
      'Speaker hospitality and green room management',
      'Concurrent breakout room audio-visual support',
      'Post-session reporting and attendance analytics'
    ],
    image: CONFERENCE_IMAGE
  },
  {
    id: 'exhibitions',
    title: 'Exhibitions & Trade Expos',
    category: 'Exhibitions',
    summary: 'Multi-vendor exhibition floorplans, shell schemes, sponsor booths, and visitor flow management.',
    description: 'End-to-end management of commercial expos and trade displays, from safety clearances and exhibitor manual management to floor layout design and electrical distribution.',
    deliverables: [
      'Comprehensive exhibition floorplan design',
      'Exhibitor technical coordination & load-in schedule',
      'Signage, wayfinding, and registration gantries',
      'On-site crowd control and hall marshals'
    ],
    image: BRAND_ACTIVATION_IMAGE
  },
  {
    id: 'roadshows',
    title: 'Roadshows & Regional Tours',
    category: 'Roadshows',
    summary: 'Mobile marketing tours, multi-stop activations, and community awareness roadshows across the Niger Delta.',
    description: 'Dynamic mobile stage setups, branded vehicle convoys, sound reinforcement, and rapid deployment coordination for regional market penetration campaigns.',
    deliverables: [
      'Route planning, police permits, and local clearances',
      'Mobile staging, sound trucks, and power generation',
      'MC, talent, and hype team coordination',
      'Daily field progress and engagement reporting'
    ],
    image: BRAND_ACTIVATION_IMAGE
  },
  {
    id: 'weddings-social',
    title: 'Weddings & Private Social Celebrations',
    category: 'Weddings & Social',
    summary: 'Elegantly curated bespoke weddings, milestone birthdays, and private anniversaries.',
    description: 'Transforming ballrooms and private properties into enchanting visual celebrations. We balance lavish aesthetic styling with military-grade vendor coordination so hosts enjoy their milestone.',
    deliverables: [
      'Thematic concept development and mood boarding',
      'Opulent floral arrangements and lighting design',
      'Guest seating choreography and discreet protocol',
      'Vendor management (catering, band, photography)'
    ],
    image: WEDDING_IMAGE
  },
  {
    id: 'training-programmes',
    title: 'Corporate Training Programmes & Retreats',
    category: 'Training Programmes',
    summary: 'Executive learning environments, leadership masterclasses, and offsite team alignment retreats.',
    description: 'Focused, distraction-free physical setups optimized for high employee engagement, collaborative whiteboarding, and executive comfort.',
    deliverables: [
      'Ergonomic venue selection and seating layouts',
      'Presentation tech, recording, and digital screens',
      'Catering break schedules and executive refreshments',
      'Offsite team-building logistics and coordination'
    ],
    image: CONFERENCE_IMAGE
  }
];

export const PACKAGES_DATA: PackageTier[] = [
  {
    id: 'essential',
    name: 'Essential Coordination',
    tagline: 'Precision On-the-Day Execution',
    suitability: 'For clients who have planned their vendors and require an authoritative team to manage the event day.',
    inclusions: [
      'Handover meeting 4 weeks prior to event date',
      'Master timeline creation & minute-by-minute running order',
      'Full vendor contract audit and arrival schedule confirmation',
      'Lead coordinator + 2 assistant coordinators on event day',
      'Guest arrival protocol and registration supervision',
      'Post-event vendor checkout and handover report'
    ],
    recommendedFor: 'Private anniversary dinners, intimate seminars, single-day workshops'
  },
  {
    id: 'signature',
    name: 'Signature Planning',
    tagline: 'Comprehensive Concept to Delivery',
    suitability: 'Our flagship full-service planning model covering design, vendor curation, and complete management.',
    inclusions: [
      'Concept development, mood board, and 3D floor layout plan',
      'Curated vendor recommendations and contract negotiation',
      'Complete budget tracking and milestone allocation schedule',
      'Audio-visual, lighting, and décor creative direction',
      'Senior coordination team (Lead, Stage, Protocol, Logistics)',
      'Rehearsal coordination and speaker / VIP briefing',
      'Dedicated client concierge throughout planning and event'
    ],
    recommendedFor: 'Corporate annual galas, luxury weddings, brand activation launches'
  },
  {
    id: 'bespoke',
    name: 'Bespoke Production',
    tagline: 'High-Touch Tailored Architecture',
    suitability: 'Designed for high-stakes corporate summits, multi-day exhibitions, and ultra-luxury private celebrations.',
    inclusions: [
      'End-to-end bespoke event architecture & custom staging fabrication',
      'Government / corporate VIP protocol and security agency liaisons',
      'Full multi-camera broadcast, live-streaming & press coordination',
      'Customized attendee registration portals & QR-code access gantries',
      'Comprehensive risk assessment and contingency emergency plans',
      'Dedicated senior director on-site alongside complete production brigade',
      'Multi-day breakdown, debriefing metrics, and archival media compilation'
    ],
    recommendedFor: 'Regional business summits, multi-stop brand roadshows, grand society weddings'
  }
];

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'proj-1',
    title: 'Pan-African Energy Leaders Gala',
    category: 'Corporate Events',
    location: 'Port Harcourt International Convention Centre, Rivers State',
    year: '2025 (Demo Showcase)',
    coverImage: HERO_IMAGE,
    guestCount: '450 Guests',
    description: 'Full event production, executive stage design, protocol management, and luxury banqueting for high-level industry leaders and international delegates.',
    highlights: [
      'Custom 18-meter architectural stage with LED visual displays',
      'VIP protocol management and security routing',
      'Synchronized ambient chandelier lighting & sound reinforcement',
      'Executive registration and digital attendee badge coordination'
    ],
    isDemo: true
  },
  {
    id: 'proj-2',
    title: 'NextGen Mobile Technology Pavilion',
    category: 'Brand Activations',
    location: 'Trans-Amadi Commercial Hub, Port Harcourt',
    year: '2025 (Demo Showcase)',
    coverImage: BRAND_ACTIVATION_IMAGE,
    guestCount: '1,200 Attendees across 3 days',
    description: 'Immersive 360-degree experiential brand activation featuring modular product demo pods, interactive VR showcase, and dynamic audience engagement zones.',
    highlights: [
      'Bespoke modular pavilion architecture with brushed metallic finishes',
      'Interactive multi-zone product discovery touchpoints',
      'Brand ambassador briefing and live coordination team',
      'Real-time visitor lead capture and social photo moments'
    ],
    isDemo: true
  },
  {
    id: 'proj-3',
    title: 'Rivers State Business Leadership Summit',
    category: 'Conferences',
    location: 'GRA Phase 2, Port Harcourt',
    year: '2025 (Demo Showcase)',
    coverImage: CONFERENCE_IMAGE,
    guestCount: '600 Delegates',
    description: 'Two-day high-stakes corporate conference with plenary sessions, breakout workshop halls, executive press conferences, and live streaming setup.',
    highlights: [
      'Acoustically balanced keynote sound system & translation feeds',
      'Stage backdrop featuring warm architectural timber panels',
      'Curated speaker logistics, hospitality suites, and green rooms',
      'Precision timekeeping and session transition management'
    ],
    isDemo: true
  },
  {
    id: 'proj-4',
    title: 'The Golden Flora Grand Reception',
    category: 'Weddings & Social',
    location: 'Private Estate, Peter Odili Road, Port Harcourt',
    year: '2025 (Demo Showcase)',
    coverImage: WEDDING_IMAGE,
    guestCount: '350 Guests',
    description: 'Opulent private celebration designed around suspended floral gardens, antique champagne gold accents, bespoke culinary staging, and discreet coordination.',
    highlights: [
      'Over 40 meters of suspended cascading wisteria and white roses',
      'Bespoke monogrammed dance floor and custom gold tableware',
      'Full vendor choreography: live band, catering, and mixology bar',
      'Seamless guest flow management from cocktail hour to after-party'
    ],
    isDemo: true
  }
];

export const PLANNING_PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Understand the Client’s Vision',
    summary: 'Discovery & Strategic Alignment',
    description: 'We begin with an in-depth consultation exploring your objectives, stakeholder expectations, desired guest experience, and budget parameters to formulate a concrete design brief.'
  },
  {
    stepNumber: '02',
    title: 'Develop an Event Concept & Plan',
    summary: 'Creative & Technical Blueprint',
    description: 'We draft realistic 3D floor plans, mood boards, run-of-show timelines, and resource allocation models, ensuring all aesthetic and technical dimensions are rigorously mapped.'
  },
  {
    stepNumber: '03',
    title: 'Coordinate Vendors & Logistics',
    summary: 'Precision Production Management',
    description: 'We handle vendor vetting, contracts, site inspections, municipal/security clearances, staging installation, and delivery schedules across Port Harcourt under one accountable team.'
  },
  {
    stepNumber: '04',
    title: 'Manage Event Preparation & Delivery',
    summary: 'Live Day Choreography',
    description: 'On event day, our senior floor directors execute the master running order, coordinate audio-visual cues, manage VIP protocol, and resolve contingencies with calm authority.'
  }
];

export const FAQS = [
  {
    question: 'Where is SBE Events based, and which areas do you serve?',
    answer: 'SBE Events is listed in the Federal Housing Estate, Woji, Port Harcourt. We serve corporate and private clients throughout Greater Port Harcourt (including Woji, Trans-Amadi, Old GRA, GRA Phase 2, and Peter Odili corridor) as well as wider Rivers State and the Niger Delta region.'
  },
  {
    question: 'How do I request a formal quotation or event proposal?',
    answer: 'You can submit an enquiry using the online booking form on this website, or connect directly via our dedicated WhatsApp channel (0806 228 3515). Our team evaluates your dates, venue requirements, and scope to prepare an itemized proposal.'
  },
  {
    question: 'How far in advance should we engage SBE Events?',
    answer: 'For large corporate conferences, exhibitions, and grand weddings, we recommend engaging 3 to 6 months in advance. For executive seminars and private dinners, a minimum of 4 to 8 weeks allows thorough vendor coordination and venue styling.'
  },
  {
    question: 'Do you manage vendor payments and third-party contracts?',
    answer: 'Depending on your selected package tier, we can either coordinate your existing preferred vendors or provide full procurement and contract supervision with vetted staging, audio-visual, and decor specialists.'
  }
];
