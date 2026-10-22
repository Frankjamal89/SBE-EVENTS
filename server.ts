import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed for enquiries if not exists
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Initial seed for portfolio
const INITIAL_PORTFOLIO = [
  {
    id: "proj-1",
    title: "Pan-African Energy Leaders Gala",
    category: "Corporate Events",
    location: "Port Harcourt International Convention Centre, Rivers State",
    year: "2025 (Demo Showcase)",
    coverImage: "/src/assets/images/hero_sbe_gala_1792658802247.jpg",
    guestCount: "450 Guests",
    description: "Full event production, executive stage design, protocol management, and luxury banqueting for high-level industry leaders and international delegates.",
    highlights: [
      "Custom 18-meter architectural stage with LED visual displays",
      "VIP protocol management and security routing",
      "Synchronized ambient chandelier lighting & sound reinforcement",
      "Executive registration and digital attendee badge coordination"
    ],
    isDemo: true
  },
  {
    id: "proj-2",
    title: "NextGen Mobile Technology Pavilion",
    category: "Brand Activations",
    location: "Trans-Amadi Commercial Hub, Port Harcourt",
    year: "2025 (Demo Showcase)",
    coverImage: "/src/assets/images/brand_activation_showcase_1792658802510.jpg",
    guestCount: "1,200 Attendees across 3 days",
    description: "Immersive 360-degree experiential brand activation featuring modular product demo pods, interactive VR showcase, and dynamic audience engagement zones.",
    highlights: [
      "Bespoke modular pavilion architecture with brushed metallic finishes",
      "Interactive multi-zone product discovery touchpoints",
      "Brand ambassador briefing and live coordination team",
      "Real-time visitor lead capture and social photo moments"
    ],
    isDemo: true
  },
  {
    id: "proj-3",
    title: "Rivers State Business Leadership Summit",
    category: "Conferences",
    location: "GRA Phase 2, Port Harcourt",
    year: "2025 (Demo Showcase)",
    coverImage: "/src/assets/images/conference_summit_hall_1792658803544.jpg",
    guestCount: "600 Delegates",
    description: "Two-day high-stakes corporate conference with plenary sessions, breakout workshop halls, executive press conferences, and live streaming setup.",
    highlights: [
      "Acoustically balanced keynote sound system & translation feeds",
      "Stage backdrop featuring warm architectural timber panels",
      "Curated speaker logistics, hospitality suites, and green rooms",
      "Precision timekeeping and session transition management"
    ],
    isDemo: true
  },
  {
    id: "proj-4",
    title: "The Golden Flora Grand Reception",
    category: "Weddings & Social",
    location: "Private Estate, Peter Odili Road, Port Harcourt",
    year: "2025 (Demo Showcase)",
    coverImage: "/src/assets/images/luxury_wedding_reception_1792658804137.jpg",
    guestCount: "350 Guests",
    description: "Opulent private celebration designed around suspended floral gardens, antique champagne gold accents, bespoke culinary staging, and discreet coordination.",
    highlights: [
      "Over 40 meters of suspended cascading wisteria and white roses",
      "Bespoke monogrammed dance floor and custom gold tableware",
      "Full vendor choreography: live band, catering, and mixology bar",
      "Seamless guest flow management from cocktail hour to after-party"
    ],
    isDemo: true
  }
];

if (!fs.existsSync(PORTFOLIO_FILE)) {
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(INITIAL_PORTFOLIO, null, 2), 'utf-8');
}

app.use(express.json());

// Simple admin authentication secret
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'sbe-admin-2026';
const ADMIN_TOKEN = 'sbe-auth-token-secure-session-key-v1';

// Admin authentication middleware
const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    res.status(401).json({
      error: 'Access denied. Authorised administrator access required to view customer enquiries.'
    });
    return;
  }
  next();
};

// Admin Login Route
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: { role: 'Administrator', business: 'SBE Events' }
    });
  } else {
    res.status(401).json({ error: 'Invalid passcode. Please use the demo administrator passcode.' });
  }
});

// Submit Enquiry (Public)
app.post('/api/enquiries', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      eventType,
      preferredDate,
      venueLocation,
      guestCount,
      budgetRange,
      servicesRequired,
      additionalNotes,
      selectedPackage
    } = req.body;

    // Strict validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
      return;
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      res.status(400).json({ error: 'Please provide a valid phone number for booking coordination.' });
      return;
    }

    if (!eventType || typeof eventType !== 'string') {
      res.status(400).json({ error: 'Please select an event type.' });
      return;
    }

    if (!preferredDate || typeof preferredDate !== 'string') {
      res.status(400).json({ error: 'Please indicate your preferred event date.' });
      return;
    }

    const currentEnquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'));

    const newEnquiry = {
      id: `SBE-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? String(email).trim() : null,
      eventType: String(eventType).trim(),
      preferredDate: String(preferredDate).trim(),
      venueLocation: venueLocation ? String(venueLocation).trim() : 'Port Harcourt (Venue TBD)',
      guestCount: guestCount ? String(guestCount).trim() : 'Not specified',
      budgetRange: budgetRange ? String(budgetRange).trim() : 'To be discussed',
      servicesRequired: Array.isArray(servicesRequired) ? servicesRequired : [],
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : '',
      selectedPackage: selectedPackage ? String(selectedPackage).trim() : null,
      status: 'new',
      submittedAt: new Date().toISOString()
    };

    currentEnquiries.unshift(newEnquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(currentEnquiries, null, 2), 'utf-8');

    // Return reference without exposing any other customer details
    res.status(201).json({
      success: true,
      enquiryId: newEnquiry.id,
      message: 'Your booking enquiry has been securely received by SBE Events management.'
    });
  } catch (err) {
    console.error('Error saving enquiry:', err);
    res.status(500).json({ error: 'An unexpected server error occurred while processing your enquiry.' });
  }
});

// Admin-only: View All Enquiries
app.get('/api/enquiries', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'));
    res.json({ enquiries });
  } catch (err) {
    console.error('Error reading enquiries:', err);
    res.status(500).json({ error: 'Unable to retrieve enquiries.' });
  }
});

// Admin-only: Update Enquiry Status
app.patch('/api/enquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const enquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf-8'));
    const index = enquiries.findIndex((e: any) => e.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Enquiry not found.' });
      return;
    }

    if (status) enquiries[index].status = status;
    if (adminNotes !== undefined) enquiries[index].adminNotes = adminNotes;
    enquiries[index].updatedAt = new Date().toISOString();

    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
    res.json({ success: true, enquiry: enquiries[index] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update enquiry status.' });
  }
});

// Portfolio API (Public GET, Admin PUT)
app.get('/api/portfolio', (req: Request, res: Response) => {
  try {
    const items = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: 'Unable to load portfolio items.' });
  }
});

app.put('/api/portfolio', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      res.status(400).json({ error: 'Invalid items array.' });
      return;
    }
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(items, null, 2), 'utf-8');
    res.json({ success: true, count: items.length });
  } catch (err) {
    res.status(500).json({ error: 'Unable to update portfolio items.' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SBE Events Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
