const WARDS = ["Chinsali Central", "Mwika", "Lubwa", "Mulilansolo", "Kabanda", "Shiwang'andu Road", "Other"];
const REPORT_CATEGORIES = [
    "Roads and potholes",
    "Water problems",
    "Waste management",
    "Streetlights",
    "Flooding and drainage",
    "Environmental issue",
    "Damaged infrastructure",
    "Public sanitation",
    "Community safety",
    "Other concern",
];
const SERVICE_CATEGORIES = [
    "All",
    "CDF & development",
    "Health services",
    "Agriculture",
    "Education",
    "Permits & licences",
    "Planning & land",
    "Fire & emergency",
    "Community life",
    "Public health",
    "Legal support",
];
const LIFECYCLE_STAGES = ["Proposed", "Assessment", "Prioritised", "Approved", "Budgeted", "Implementation", "Completed"];

const demoProjects = [
    {
        id: "mwika-boreholes",
        title: "Mwika community boreholes",
        summary: "Three new water points serving households near Mwika market and the eastern settlement.",
        category: "Water",
        ward: "Mwika",
        status: "ongoing",
        progress: 62,
        budget_kwacha: 820000,
        milestones: ["Site assessment", "Drilling and casing", "Community handover"],
        updated: "Updated 14 Nov 2026",
    },
    {
        id: "lubwa-maternity",
        title: "Lubwa maternity wing",
        summary: "A new two-room maternity wing and staff accommodation at Lubwa Rural Health Centre.",
        category: "Health",
        ward: "Lubwa",
        status: "ongoing",
        progress: 80,
        budget_kwacha: 1450000,
        milestones: ["Foundation", "Roofing", "Medical equipment"],
        updated: "Updated 08 Nov 2026",
    },
    {
        id: "central-market",
        title: "Chinsali central market shade",
        summary: "Safer covered trading space with drainage and a dedicated produce loading area.",
        category: "Markets",
        ward: "Chinsali Central",
        status: "planned",
        progress: 15,
        budget_kwacha: 2300000,
        milestones: ["Public consultation", "Design and costing", "Procurement"],
        updated: "Updated 02 Nov 2026",
    },
    {
        id: "kabanda-roads",
        title: "Kabanda feeder road repairs",
        summary: "Grading and spot improvements on the feeder road connecting farms to the main route.",
        category: "Roads",
        ward: "Kabanda",
        status: "completed",
        progress: 100,
        budget_kwacha: 980000,
        milestones: ["Community mapping", "Grading", "Completion inspection"],
        updated: "Completed 28 Oct 2026",
    },
    {
        id: "central-streetlights",
        title: "Town centre streetlights",
        summary: "Solar streetlights around the bus station and public offices for safer evening movement.",
        category: "Safety",
        ward: "Chinsali Central",
        status: "proposed",
        progress: 30,
        budget_kwacha: null,
        milestones: ["Resident proposal", "Technical assessment", "Funding decision"],
        updated: "Proposed 21 Oct 2026",
    },
    {
        id: "mulilansolo-school",
        title: "Mulilansolo classroom block",
        summary: "Additional classrooms to reduce congestion and create a dedicated early-grade learning space.",
        category: "Education",
        ward: "Mulilansolo",
        status: "ongoing",
        progress: 44,
        budget_kwacha: 1800000,
        milestones: ["Land confirmed", "Blockwork", "Furniture and handover"],
        updated: "Updated 17 Oct 2026",
    },
];

const demoPolls = [
    {
        id: "priority-2027",
        question: "Which need should receive the next community planning focus?",
        active: true,
        closes: "Closes 30 Nov 2026",
        poll_options: [
            { id: "p1", label: "Water points and boreholes", votes: 146 },
            { id: "p2", label: "Feeder road maintenance", votes: 118 },
            { id: "p3", label: "Market sanitation", votes: 86 },
            { id: "p4", label: "Youth skills centre", votes: 64 },
        ],
    },
    {
        id: "meeting-time",
        question: "What is the most accessible time for ward consultations?",
        active: true,
        closes: "Closes 12 Dec 2026",
        poll_options: [
            { id: "m1", label: "Weekday afternoons", votes: 72 },
            { id: "m2", label: "Weekday evenings", votes: 119 },
            { id: "m3", label: "Saturday mornings", votes: 98 },
        ],
    },
];

const services = [
    { id: "cdf", icon: "fund", category: "CDF & development", title: "CDF bursaries & empowerment", description: "Find current bursary calls, empowerment support, constituency development information and application guidance.", department: "CDF & Community Development", contact: "+260 975 100 245", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, CDF desk", action: "View desk details" },
    { id: "health", icon: "health", category: "Health services", title: "Health facilities", description: "Locate health centres, maternal services, immunisation information and public health guidance across the district.", department: "District Health Office", contact: "+260 975 100 302", hours: "Emergency support · 24 hours", location: "Chinsali District Hospital", action: "Find a facility" },
    { id: "agriculture", icon: "leaf", category: "Agriculture", title: "Farmer support", description: "Connect with extension officers, seasonal programme information, inputs guidance and farmer support services.", department: "Department of Agriculture", contact: "+260 975 100 118", hours: "Mon–Fri · 08:00–16:30", location: "Agriculture Camp Office", action: "View support info" },
    { id: "education", icon: "book", category: "Education", title: "Education programmes", description: "Access information about schools, skills programmes, bursaries and opportunities for learners and teachers.", department: "District Education Board", contact: "+260 975 100 188", hours: "Mon–Fri · 08:00–16:30", location: "DEBS offices", action: "View education info" },
    { id: "permits", icon: "permit", category: "Permits & licences", title: "Permits & licences", description: "Understand requirements, fees and where to apply for trading, business, event and other council permissions.", department: "Council Registry", contact: "+260 975 100 001", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, registry", action: "View requirements" },
    { id: "planning", icon: "plan", category: "Planning & land", title: "Urban planning & land", description: "Learn about development permits, planning information, plot enquiries and building approval guidance.", department: "Planning Department", contact: "+260 975 100 074", hours: "Tue–Thu · 08:00–16:30", location: "Civic Centre, planning wing", action: "View planning info" },
    { id: "emergency", icon: "alert", category: "Fire & emergency", title: "Fire & emergency", description: "Find emergency contacts and practical guidance for fire, rescue, disaster preparedness and urgent assistance.", department: "Fire & Rescue / DMMU", contact: "993 · 991 · 992", hours: "Emergency support · 24 hours", location: "Fire station, Great North Road", action: "View emergency contacts" },
    { id: "community", icon: "community", category: "Community life", title: "Markets, sports & culture", description: "See community venues, markets, sports activities, cultural events and local participation opportunities.", department: "Community Development", contact: "+260 975 100 160", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, community wing", action: "Explore community life" },
    { id: "sanitation", icon: "water", category: "Public health", title: "Sanitation & prevention", description: "Practical information on waste collection, sanitation, drainage, disease prevention and healthy communities.", department: "Public Health", contact: "+260 975 100 210", hours: "Mon–Fri · 08:00–16:30", location: "Public Health office", action: "Read guidance" },
    { id: "legal", icon: "legal", category: "Legal support", title: "Legal information & referrals", description: "Find plain-language information and referral points for common civic, family and public service questions.", department: "Council legal desk", contact: "+260 975 100 090", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, legal desk", action: "Find a referral" },
];

const representative = {
    name: "Hon. Mwansa Chanda",
    role: "Chinsali Central Member of Parliament",
    parliamentUrl: "https://www.parliament.gov.zm/node/13777",
    socialUrl: "https://www.facebook.com/p/Hon-Chanda-Mwansa-Chinsali-Central-MP-100089509806576/",
};

const heroSlides = [
    { image: "assets/chinsali-town.jpeg", category: "District Centre", label: "Chinsali Town Centre", detail: "Everyday commerce, civic services, and district life", alt: "Chinsali town centre with local businesses and trees" },
    { image: "assets/chinsali-market.jpg", category: "Local Economy", label: "Chinsali New Market", detail: "Produce trade, food supply, and small enterprise", alt: "Traders and customers at Chinsali New Market" },
    { image: "assets/lubwa-mission.jpg", category: "Heritage", label: "Lubwa Mission", detail: "Historic mission, school, and civic memory", alt: "Historic Lubwa Mission building in Chinsali" },
    { image: "assets/chipoma-falls.jpg", category: "Nature", label: "Chipoma Falls", detail: "Natural landmark and visitor destination in Chinsali", alt: "Water rushing over rocks at Chipoma Falls" },
    { image: "assets/kapasa-makasa-university.jpg", category: "Higher Education", label: "Kapasa Makasa University", detail: "Science, technology, and agricultural learning along Great North Road", alt: "Kapasa Makasa University entrance sign" },
];

const storyItems = [
    { id: "lubwa-mission", title: "Lubwa Mission", category: "Heritage", image: "assets/lubwa-mission.jpg", alt: "Historic Lubwa Mission building in Chinsali", description: "A mission, school and gathering place tied to Chinsali's religious, educational and political memory.", source: "Chinsali Municipal Council · Chalo Chatu" },
    { id: "chipoma-falls", title: "Chipoma Falls", category: "Nature", image: "assets/chipoma-falls.jpg", alt: "Water rushing over rocks at Chipoma Falls", description: "A scenic waterfall and tourism asset in the district's granite and woodland landscape.", source: "Chinsali Municipal Council · visitor listing" },
    { id: "shambalakale", title: "Shambalakale Farm", category: "History", image: "assets/shambalakale-farm.jpg", alt: "Shambalakale Farm historic residence in a green landscape", description: "A story of place, memory and the unfinished dream of a national retirement home.", source: "Shambalakale historical reference" },
    { id: "alice-lenshina", title: "Alice Lenshina & Lumpa heritage", category: "Political memory", image: "assets/alice-lenshina.png", alt: "Historic portrait of Alice Lenshina", description: "A difficult and important chapter in Chinsali's spiritual, political and post-colonial history.", source: "Alice Lenshina · Lubwa Mission history" },
    { id: "kapwepwe", title: "Kapwepwe's historical residence", category: "National politics", image: "assets/kapwepwe-heritage.jpg", alt: "Chinsali heritage story image featuring Simon Mwansa Kapwepwe", description: "Follow the places and stories that connect Chinsali to Simon Mwansa Kapwepwe and Zambia's liberation movement.", source: "Chinsali heritage story reference" },
    { id: "insonge", title: "Insonge Traditional Ceremony", category: "Culture", image: "assets/insonge-reference.jpg", alt: "Traditional ceremony dancers in Zambia, used as a regional Insonge story reference", description: "A living Bisa-speaking tradition celebrated through royal establishment, dance, music and community gathering.", source: "Chinsali Daily Articles · regional ceremony reference" },
    { id: "kmu", title: "Kapasa Makasa University", category: "Learning", image: "assets/kapasa-makasa-university.jpg", alt: "Kapasa Makasa University sign in Chinsali", description: "A university along the Great North Road, linking Chinsali to science, technology and agricultural learning.", source: "Kapasa Makasa University" },
    { id: "cultural-village", title: "Chinsali Cultural Village", category: "Culture & craft", image: "assets/chinsali-cultural-village.jpg", alt: "Traditional village setting associated with Chinsali cultural storytelling", description: "A place to imagine local craft, visitor experiences, oral history and the people behind cultural tourism.", source: "Chinsali cultural-tourism reference" },
    { id: "markets", title: "Local agriculture & markets", category: "Everyday economy", image: "assets/local-markets.jpg", alt: "Fresh produce arranged in a Zambian market", description: "From farm plots to market tables, local food systems keep households, traders and communities moving.", source: "Zambian food-market reference" },
    { id: "people", title: "Chinsali's people & stories", category: "Community life", image: "assets/chinsali-town.jpeg", alt: "People and everyday life in Chinsali town", description: "The district is best understood through neighbours, workers, learners, traders and families who make it home.", source: "Chinsali town image · Lusaka Times" },
];

const representativeUpdates = [
    { tag: "Representative updates", date: "Public feed", title: "Hon. Chanda Mwansa — Chinsali Central MP", excerpt: "Constituency updates and public activities.", type: "update", sourceUrl: "https://www.facebook.com/p/Hon-Chanda-Mwansa-Chinsali-Central-MP-100089509806576/", sourceLabel: "Public page" },
    { tag: "Parliament profile", date: "Official record", title: "Mwansa Chanda", excerpt: "National Assembly profile.", type: "notice", sourceUrl: "https://www.parliament.gov.zm/node/13777", sourceLabel: "Parliament profile" },
];

const news = [
    { tag: "Public notice", date: "18 Nov 2026", title: "Budget consultation: share your priorities for 2027", excerpt: "Residents can share development priorities through ward meetings, the online poll or the ONTECH feature-phone channel *388*133#.", type: "notice" },
    { tag: "Development update", date: "14 Nov 2026", title: "Mwika borehole works reach the drilling stage", excerpt: "The public project record now shows progress, milestones and the next community handover step.", type: "update" },
    { tag: "Community event", date: "28 Nov 2026", title: "Chinsali clean-up and drainage day", excerpt: "Join community volunteers around the market and bus station. Gloves and collection bags will be provided.", type: "event" },
    { tag: "Opportunity", date: "04 Dec 2026", title: "CDF youth empowerment information session", excerpt: "A practical session on eligibility, documentation and how to ask questions before applying.", type: "opportunity" },
];

const mapPoints = [
    { id: "pt-mwika", x: 38, y: 28, lat: -10.528, lng: 32.042, type: "project", title: "Mwika community boreholes", ward: "Mwika", status: "Ongoing · 62%" },
    { id: "pt-hospital", x: 58, y: 46, lat: -10.546, lng: 32.068, type: "facility", title: "Chinsali District Hospital", ward: "Chinsali Central", status: "Health facility" },
    { id: "pt-lubwa", x: 24, y: 66, lat: -10.59, lng: 32.008, type: "project", title: "Lubwa maternity wing", ward: "Lubwa", status: "Ongoing · 80%" },
    { id: "pt-kabanda", x: 31, y: 55, lat: -10.575, lng: 32.025, type: "project", title: "Kabanda feeder road repairs", ward: "Kabanda", status: "Completed · 100%" },
    { id: "pt-drainage", x: 72, y: 36, lat: -10.538, lng: 32.082, type: "issue", title: "Drainage report · Great North Road", ward: "Chinsali Central", status: "Under review" },
    { id: "pt-mulilansolo", x: 46, y: 78, lat: -10.61, lng: 32.048, type: "facility", title: "Mulilansolo Primary School", ward: "Mulilansolo", status: "Public facility" },
    { id: "pt-market", x: 54, y: 50, lat: -10.551, lng: 32.065, type: "project", title: "Chinsali central market shade", ward: "Chinsali Central", status: "Planned · 15%" },
];

const galleryItems = [
    { id: "town-life", category: "Town life", title: "Chinsali town life", description: "Everyday movement, trading and public life around the district centre.", image: "assets/chinsali-town.jpeg", alt: "A busy Chinsali town scene with shops, trees and residents", source: "Lusaka Times" },
    { id: "market", category: "Town life", title: "Chinsali New Market", description: "A public place for food, trade and conversations about local services.", image: "assets/chinsali-market.jpg", alt: "Traders and customers at Chinsali New Market", source: "Diamond TV Zambia" },
    { id: "lubwa", category: "Heritage", title: "Lubwa Mission Church", description: "A historic mission site connected to Chinsali's political and religious history.", image: "assets/lubwa-mission.jpg", alt: "Historic Lubwa Mission building in Chinsali", source: "Elias Munshya" },
    { id: "chipoma", category: "Nature", title: "Chipoma Falls", description: "A scenic waterfall and local tourism asset in Chinsali District.", image: "assets/chipoma-falls.jpg", alt: "Water rushing over rocks at Chipoma Falls", source: "Tripadvisor image result" },
    { id: "district-map", category: "Maps", title: "Chinsali district locator", description: "A locator view of the town and district within Zambia.", image: "assets/chinsali-map.webp", alt: "Locator map showing Chinsali town and district in Zambia", source: "Wikimedia Commons" },
];

const landmarkLocations = [
    { galleryId: "town-life", title: "Chinsali town centre", category: "Town life", lat: -10.549972, lng: 32.0660837, accuracy: "Public town reference" },
    { galleryId: "market", title: "Chinsali New Market · town reference", category: "Town life", lat: -10.549972, lng: 32.0660837, accuracy: "Market image geolocated to town centre; no distinct public market pin found" },
    { galleryId: "lubwa", title: "Lubwa Mission Church", category: "Heritage", lat: -10.58987, lng: 32.00819, accuracy: "Public locality coordinate" },
    { galleryId: "chipoma", title: "Chipoma Falls", category: "Nature", lat: -10.75015, lng: 32.00461, accuracy: "Public waterfall coordinate" },
];

const ROUTES = new Set([
    "/",
    "/search",
    "/services",
    "/community",
    "/propose",
    "/report",
    "/whistleblowing",
    "/tracker",
    "/map",
    "/gallery",
    "/polls",
    "/news",
    "/help",
    "/admin",
    "/login",
]);

function normalizeRoute(path) {
    const route = path.replace(/\/$/, "") || "/";
    return ROUTES.has(route) ? route : "/";
}

function currentRoute() {
    return window.location.hash.startsWith("#/")
        ? normalizeRoute(window.location.hash.slice(1))
        : normalizeRoute(window.location.pathname);
}

let landmarkMap = null;
let communityMap = null;
let communityMarkers = new Map();
let heroTimer = null;

const state = {
    route: currentRoute(),
    theme: localStorage.getItem("my-chinsali-theme") || "light",
    ward: localStorage.getItem("my-chinsali-ward") || "Chinsali Central",
    heroIndex: 0,
    serviceQuery: "",
    serviceCategory: "All",
    projectFilter: "all",
    projectWardFilter: "All",
    newsFilter: "all",
    mapFilter: "all",
    selectedMapPointId: "pt-mwika",
    galleryFilter: "all",
    galleryIndex: null,
    modalService: null,
    modalProject: null,
    modalStory: null,
    mobileOpen: false,
    navDropdownOpen: false,
    selectedReportKind: "issue",
    searchQuery: "",
    searchTypeFilter: "All",
    toastTimer: null,
    data: {
        projects: demoProjects,
        polls: demoPolls,
        content: { news: [], gallery: [], pollsOpen: true },
        votedPolls: {},
    },
    admin: {
        authenticated: false,
        loading: false,
        sidebarOpen: false,
        collection: "overview",
        statusFilter: "all",
        submissionWardFilter: "All",
        submissionChannelFilter: "all",
        chartView: "category",
        searchQuery: "",
        items: { news: [], gallery: [], polls: [] },
        submissions: { reports: [], submissions: [] },
        submissionTotals: { reports: 0, submissions: 0 },
        submissionsStatus: "idle", // idle | ready | unavailable | error
        submissionsLoading: false,
        health: null,
        settings: { pollsOpen: true },
        overview: null,
        editing: null,
        error: "",
        showPassword: false,
    },
};

/* ---------- Utilities ---------- */
function esc(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[ch] ?? ch);
}

function formatKwacha(value) {
    return value == null ? "Budget pending" : `K${Number(value).toLocaleString("en-ZM")}`;
}

function formatCompactKwacha(value) {
    if (value == null) return "Pending";
    if (value >= 1_000_000) return `K${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `K${Math.round(value / 1_000)}k`;
    return `K${value}`;
}

function randomRef(prefix) {
    return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function getStored(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function setStored(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* ignore quota errors */
    }
}

function getMemories() {
    const stored = getStored("my-chinsali-memories", []);
    return Array.isArray(stored) ? stored : [];
}

function readForm(form, key) {
    return String(new FormData(form).get(key) ?? "").trim();
}

function statusLabel(status) {
    if (status === "ongoing") return "Ongoing";
    if (status === "completed") return "Completed";
    if (status === "proposed") return "Proposed";
    return "Planned";
}

function statusTone(status) {
    if (status === "ongoing") return "tone-amber";
    if (status === "completed") return "tone-green";
    if (status === "proposed") return "tone-blue";
    return "tone-neutral";
}

function newsTypeTone(type) {
    if (type === "update") return "tone-green";
    if (type === "event") return "tone-amber";
    if (type === "opportunity") return "tone-blue";
    return "tone-neutral";
}

function icon(name) {
    const paths = {
        arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        chevronDown: '<path d="m6 9 6 6 6-6"/>',
        chevronLeft: '<path d="m15 18-6-6 6-6"/>',
        chevronRight: '<path d="m9 18 6-6-6-6"/>',
        alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01"/>',
        book: '<path d="M5 4.5h10a3 3 0 0 1 3 3V19H8a3 3 0 0 0-3 3V4.5Zm0 0v14.75A2.75 2.75 0 0 1 7.75 22H18"/>',
        community: '<circle cx="9" cy="8" r="3"/><path d="M3 20c.5-3 2.5-5 6-5s5.5 2 6 5"/><circle cx="17" cy="9" r="2"/><path d="M16 14.5c2.2.3 3.8 1.8 4.2 4.5"/>',
        fund: '<path d="m12 3 7 9-7 9-7-9 7-9Z"/><path d="M5 12h14"/>',
        health: '<path d="M12 5v14M5 12h14"/>',
        leaf: '<path d="M19 4C10 4 5 8.5 5 15c0 2.2 1.4 4 3.5 4C14 19 19 12.5 19 4Z"/><path d="M5.5 18.5C9 14 12 11.5 17 9"/>',
        legal: '<path d="M12 4v16M7 7h10M6 20h12"/><path d="m7 7-3 5a3 3 0 0 0 6 0L7 7Zm10 0-3 5a3 3 0 0 0 6 0l-3-5Z"/>',
        map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
        permit: '<path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h3"/>',
        plan: '<path d="M5 19 19 5M7 5h12v12"/><path d="m5 19 2-5"/>',
        project: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/>',
        report: '<path d="M12 4 21 20H3L12 4Z"/><path d="M12 10v4m0 3h.01"/>',
        services: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
        tracker: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        water: '<path d="M12 3s6 6.2 6 11a6 6 0 1 1-12 0c0-4.8 6-11 6-11Z"/>',
        poll: '<path d="M6 19V10m6 9V5m6 14v-7"/>',
        phone: '<path d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 3 3l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.8 17 7 13.2 7 8V6c0-1.1.9-2 2-2Z"/>',
        menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
        search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
        close: '<path d="m6 6 12 12M18 6 6 18"/>',
        check: '<path d="m5 12 4 4L19 6"/>',
        lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/>',
        moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
        dashboard: '<rect x="3" y="3" width="8" height="9" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/>',
        news: '<path d="M4 5h14v14H6a2 2 0 0 1-2-2V5Z"/><path d="M8 9h6M8 13h6M18 8h2v9a2 2 0 0 1-2 2"/>',
        image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 16-5-5-6 6-2-2-5 4"/>',
        inbox: '<path d="M4 13h4l2 3h4l2-3h4"/><path d="M5 5h14l2 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5l2-8Z"/>',
        settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
        logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        refresh: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>',
        external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>',
    };
    return `<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${paths[name] ?? '<circle cx="12" cy="12" r="2"/>'}</svg></span>`;
}

function link(route, label, className = "", extra = "") {
    return `<a class="${className}" href="#${route}" data-route="${route}" ${extra}>${label}</a>`;
}

function button(label, action, className = "button button-secondary", extra = "") {
    return `<button type="button" class="${className}" data-action="${action}" ${extra}>${label}</button>`;
}

function pageHeader(kicker, title, description = "", action = "") {
    return `<header class="page-header">
        <div class="page-header-copy">
            ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
            <h1>${title}</h1>
            ${description ? `<p class="lede">${description}</p>` : ""}
        </div>
        ${action ? `<div class="page-header-action">${action}</div>` : ""}
    </header>`;
}

function formSelect(name, label, values, selected = "") {
    return `<label class="field">
        <span>${label}</span>
        <select name="${name}">
            ${values.map((v) => `<option value="${esc(v)}" ${selected === v ? "selected" : ""}>${esc(v)}</option>`).join("")}
        </select>
    </label>`;
}

function projectCard(project) {
    return `<article class="card card-interactive project-card">
        <div class="project-card-top">
            <span class="project-card-meta">${esc(project.category)} · ${esc(project.ward)}</span>
            <span class="status-pill ${statusTone(project.status)}">${statusLabel(project.status)}</span>
        </div>
        <h3>${esc(project.title)}</h3>
        <p>${esc(project.summary)}</p>
        <div class="progress-block">
            <div class="progress-header">
                <span>Completion</span>
                <strong>${project.progress}%</strong>
            </div>
            <div class="progress-track"><span class="progress-fill" style="width:${project.progress}%"></span></div>
        </div>
        <div class="project-card-footer">
            <span>${esc(project.updated)}</span>
            <strong class="tabular-nums">${formatKwacha(project.budget_kwacha)}</strong>
        </div>
        <div style="margin-top:12px;">
            <button type="button" class="text-button" data-action="project-detail" data-id="${esc(project.id)}">View project record ${icon("arrow")}</button>
        </div>
    </article>`;
}

/* ---------- Header & Footer ---------- */
function renderHeader() {
    const primary = [
        { route: "/services", label: "Services" },
        { route: "/tracker", label: "Projects" },
        { route: "/community", label: "Community" },
        { route: "/map", label: "Map" },
        { route: "/news", label: "News" },
        { route: "/gallery", label: "Gallery" },
        { route: "/help", label: "Help" },
    ];
    const participation = [
        { route: "/report", label: "Report an issue", desc: "Roads, water, waste, and lights" },
        { route: "/propose", label: "Propose a project", desc: "Suggest a community priority" },
        { route: "/polls", label: "Polls & consultations", desc: "Vote on active questions" },
        { route: "/whistleblowing", label: "Sensitive reporting", desc: "Channel availability & emergency help" },
    ];
    const participateActive = participation.some((item) => state.route === item.route);

    const mobileNav = state.mobileOpen
        ? `<div class="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label="Site navigation">
            <button type="button" class="mobile-nav-backdrop" data-action="close-mobile" aria-label="Close navigation"></button>
            <nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
                <div class="mobile-nav-header">
                    <a href="#/" class="brand" data-route="/"><span class="brand-mark">M</span><span class="brand-text"><strong>My Chinsali</strong><small>Chinsali District</small></span></a>
                    <button type="button" class="icon-button" data-action="close-mobile" aria-label="Close navigation">${icon("close")}</button>
                </div>
                <div class="mobile-nav-links">
                    <span class="mobile-nav-group-label">Explore</span>
                    ${primary.map((item) => link(item.route, item.label, state.route === item.route ? "active" : "")).join("")}
                    <span class="mobile-nav-group-label">Participate</span>
                    ${participation.map((item) => link(item.route, item.label, state.route === item.route ? "active" : "")).join("")}
                </div>
                <div class="mobile-nav-footer">
                    ${link("/report", "Report an issue", "button button-primary")}
                    <div style="display:flex;gap:8px;align-items:center;justify-content:space-between;">
                        <button type="button" class="button button-secondary button-sm" data-action="toggle-theme">${icon(state.theme === "dark" ? "sun" : "moon")}<span>${state.theme === "dark" ? "Light mode" : "Dark mode"}</span></button>
                        ${link(state.admin.authenticated ? "/admin" : "/login", state.admin.authenticated ? "Staff Console" : "Staff sign in", "text-button")}
                    </div>
                </div>
            </nav>
        </div>`
        : "";

    return `<header class="site-header">
        <div class="container header-inner">
            <a href="#/" class="brand" data-route="/">
                <span class="brand-mark">M</span>
                <span class="brand-text"><strong>My Chinsali</strong><small>Chinsali Municipal Council</small></span>
            </a>
            <nav class="main-nav" aria-label="Primary navigation">
                ${primary.map((item) => link(item.route, item.label, state.route === item.route ? "active" : "")).join("")}
                <div class="nav-dropdown ${state.navDropdownOpen ? "open" : ""}">
                    <button type="button" class="nav-dropdown-trigger ${participateActive ? "active" : ""}" data-action="toggle-nav-dropdown" aria-expanded="${state.navDropdownOpen}">
                        Participate ${icon("chevronDown")}
                    </button>
                    <div class="nav-dropdown-menu" role="menu">
                        ${participation.map((item) => `<a href="#${item.route}" data-route="${item.route}" class="${state.route === item.route ? "active" : ""}" role="menuitem"><strong>${item.label}</strong><small>${item.desc}</small></a>`).join("")}
                    </div>
                </div>
            </nav>
            <form class="header-search" id="global-search-form" role="search">
                ${icon("search")}
                <input id="global-search" name="query" value="${esc(state.searchQuery)}" placeholder="Search portal..." aria-label="Search portal" autocomplete="off" />
                <button type="submit" aria-label="Submit search">↵</button>
            </form>
            <div class="header-actions">
                <button type="button" class="icon-button" data-action="toggle-theme" aria-label="Switch colour theme" title="${state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}">
                    ${icon(state.theme === "dark" ? "sun" : "moon")}
                </button>
                ${link("/report", "Report an issue", "button button-primary button-sm")}
            </div>
            <div class="mobile-actions">
                ${link("/search", icon("search"), "icon-button", 'aria-label="Search portal"')}
                <button type="button" class="icon-button" data-action="toggle-theme" aria-label="Switch colour theme">${icon(state.theme === "dark" ? "sun" : "moon")}</button>
                <button type="button" class="mobile-menu" data-action="toggle-mobile" aria-label="${state.mobileOpen ? "Close menu" : "Open menu"}" aria-expanded="${state.mobileOpen}">${icon("menu")}</button>
            </div>
        </div>
    </header>${mobileNav}`;
}

function renderFooter() {
    return `<footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <a class="brand" href="#/" data-route="/">
                        <span class="brand-mark">M</span>
                        <span class="brand-text"><strong>My Chinsali</strong><small>Public record and participation portal</small></span>
                    </a>
                    <p class="small-note" style="margin-top:12px;max-width:280px;">Connecting residents of Chinsali District with public desks, development records, and civic participation.</p>
                </div>
                <div>
                    <p class="footer-heading">Participate</p>
                    <div class="footer-links">
                        ${link("/report", "Report an issue")}
                        ${link("/propose", "Propose a project")}
                        ${link("/polls", "Polls & consultations")}
                        ${link("/community", "My community")}
                    </div>
                </div>
                <div>
                    <p class="footer-heading">Public Record</p>
                    <div class="footer-links">
                        ${link("/services", "Public services")}
                        ${link("/tracker", "Development tracker")}
                        ${link("/map", "District map")}
                        ${link("/news", "News & notices")}
                    </div>
                </div>
                <div>
                    <p class="footer-heading">Support & Access</p>
                    <div class="footer-links">
                        ${link("/whistleblowing", "Sensitive reporting")}
                        ${link("/help", "Help & FAQs")}
                        ${link(state.admin.authenticated ? "/admin" : "/login", state.admin.authenticated ? "Staff Console" : "Staff sign in")}
                        <span class="small-note" style="margin-top:4px;">USSD: <strong>*388*133#</strong></span>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2026 My Chinsali · Chinsali Municipal Council</span>
                <div style="display:flex;gap:16px;">
                    <a href="ASSET-CREDITS.md">Image credits</a>
                    <a href="MAP-SOURCES.md">Map sources</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/* ---------- Home Page ---------- */
function syncHeroDom() {
    const slides = document.querySelectorAll("#hero-bg-slides .hero-bg-slide");
    const dots = document.querySelectorAll("#hero-dots button");
    const caption = document.querySelector("#hero-slide-caption");
    const active = heroSlides[state.heroIndex % heroSlides.length];
    slides.forEach((img, idx) => img.classList.toggle("active", idx === state.heroIndex));
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === state.heroIndex));
    if (caption && active) {
        caption.innerHTML = `<small>${esc(active.category)}</small><strong>${esc(active.label)}</strong><span>· ${esc(active.detail)}</span>`;
    }
}

function renderHome() {
    const ongoing = state.data.projects.filter((p) => p.status === "ongoing").length;
    const completed = state.data.projects.filter((p) => p.status === "completed").length;
    const totalBudget = state.data.projects.reduce((sum, p) => sum + (p.budget_kwacha || 0), 0);
    const quickServices = services.slice(0, 6);
    const featuredProjects = state.data.projects.filter((p) => p.status !== "planned").slice(0, 3);
    const latestNews = [...state.data.content.news, ...news][0];
    const activeSlide = heroSlides[state.heroIndex % heroSlides.length];
    const quickPanelLinks = [
        ["/services", "services", "Find a service", "Browse council desks"],
        ["/tracker", "tracker", "Track development", "Check project milestones"],
        ["/report", "report", "Report an issue", "Roads, water & lighting"],
        ["/gallery", "map", "Explore places & map", "Heritage photos & landmarks"],
    ];

    return `<main class="home-page">
        <section class="hero-viewport" aria-label="Welcome to Chinsali">
            <div class="hero-bg-slides" id="hero-bg-slides">
                ${heroSlides.map((slide, idx) => `<img class="hero-bg-slide ${idx === state.heroIndex ? "active" : ""}" src="${esc(slide.image)}" alt="${esc(slide.alt)}" loading="${idx === 0 ? "eager" : "lazy"}" />`).join("")}
            </div>
            <div class="hero-bg-scrim"></div>
            <div class="container hero-viewport-inner">
                <div>
                    <p class="hero-kicker">Chinsali District · Muchinga Province</p>
                    <h1>Welcome to <em>Chinsali</em></h1>
                    <p class="hero-lede">Find municipal desks, follow local development works, report community issues, and take part in district consultations.</p>
                    <div class="hero-slide-caption" id="hero-slide-caption" aria-live="polite">
                        <small>${esc(activeSlide.category)}</small>
                        <strong>${esc(activeSlide.label)}</strong>
                        <span>· ${esc(activeSlide.detail)}</span>
                    </div>
                    <div class="hero-cta-row">
                        ${link("/services", "Find public services", "button button-primary button-lg")}
                        ${link("/gallery", "Explore Chinsali stories", "button button-ghost button-lg")}
                    </div>
                    <div class="hero-controls-bar">
                        <div class="hero-slide-controls">
                            <button type="button" class="hero-slide-btn" data-action="hero-prev" aria-label="Previous place">${icon("chevronLeft")}</button>
                            <div class="hero-dots" id="hero-dots" aria-label="Slide selector">
                                ${heroSlides.map((item, idx) => `<button type="button" class="${idx === state.heroIndex ? "active" : ""}" data-action="hero-dot" data-index="${idx}" aria-label="Show ${esc(item.label)}"></button>`).join("")}
                            </div>
                            <button type="button" class="hero-slide-btn" data-action="hero-next" aria-label="Next place">${icon("chevronRight")}</button>
                        </div>
                        <div class="hero-meta-inline">
                            <span>USSD <strong>*388*133#</strong></span>
                            <span>Ward: <strong>${esc(state.ward)}</strong></span>
                        </div>
                    </div>
                </div>
                <aside class="hero-glass-panel" aria-label="Quick actions">
                    <p class="hero-kicker">Quick Access</p>
                    <div class="hero-glass-links">
                        ${quickPanelLinks.map(([route, ic, title, desc]) => `<a href="#${route}" data-route="${route}" class="hero-glass-link">
                            ${icon(ic)}
                            <div><strong>${title}</strong><small>${desc}</small></div>
                            <span style="margin-left:auto;opacity:0.7;">${icon("chevronRight")}</span>
                        </a>`).join("")}
                    </div>
                </aside>
            </div>
        </section>

        <section class="container section-block" aria-labelledby="quick-services-heading">
            <div class="section-header">
                <div>
                    <p class="kicker">Local Government Services</p>
                    <h2 id="quick-services-heading">Start with the right desk</h2>
                </div>
                ${link("/services", `View all ${services.length} services ${icon("arrow")}`, "text-button")}
            </div>
            <div class="quick-links-grid">
                ${quickServices.map((service) => `<a class="card card-interactive quick-link-card" href="#/services" data-route="/services" data-category="${esc(service.category)}">
                    <span class="icon-well">${icon(service.icon)}</span>
                    <strong>${esc(service.title)}</strong>
                    <small><span>${esc(service.category)}</span> ${icon("chevronRight")}</small>
                </a>`).join("")}
            </div>
        </section>

        <section class="container section-block" aria-labelledby="projects-heading">
            <div class="section-header">
                <div>
                    <p class="kicker">Public Record</p>
                    <h2 id="projects-heading">Development projects in progress</h2>
                </div>
                ${link("/tracker", `Open full tracker ${icon("arrow")}`, "text-button")}
            </div>
            <div class="card summary-strip">
                <div class="summary-cell"><span class="summary-value">${ongoing}</span><span class="summary-label">Ongoing works</span></div>
                <div class="summary-cell"><span class="summary-value">${completed}</span><span class="summary-label">Completed works</span></div>
                <div class="summary-cell"><span class="summary-value">${formatCompactKwacha(totalBudget)}</span><span class="summary-label">Published allocations</span></div>
                <div class="summary-cell"><span class="summary-value">${services.length}</span><span class="summary-label">Service desks listed</span></div>
            </div>
            <div class="project-grid">
                ${featuredProjects.map(projectCard).join("")}
            </div>
        </section>

        <section class="container section-block" aria-labelledby="stories-heading">
            <div class="section-header">
                <div>
                    <p class="kicker">Places, People & Heritage</p>
                    <h2 id="stories-heading">Stories that shape the district</h2>
                </div>
                ${link("/gallery", `Open photo gallery & map ${icon("arrow")}`, "text-button")}
            </div>
            <div class="story-grid">
                ${storyItems.map((item) => `<button type="button" class="card card-interactive story-card" data-action="story-detail" data-id="${esc(item.id)}">
                    <div class="story-card-media">
                        <img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" />
                        <span class="story-card-tag">${esc(item.category)}</span>
                    </div>
                    <div class="story-card-body">
                        <h3>${esc(item.title)}</h3>
                        <p>${esc(item.description)}</p>
                    </div>
                </button>`).join("")}
            </div>
        </section>

        <section class="container section-block" aria-labelledby="participation-heading">
            <div class="section-header">
                <div>
                    <p class="kicker">Community Channels</p>
                    <h2 id="participation-heading">Participate and stay informed</h2>
                </div>
            </div>
            <div class="bento-grid">
                <article class="card bento-card">
                    <p class="kicker">Resident Tools</p>
                    <h3>No account required</h3>
                    <p class="small-note">Share a local concern, propose a ward priority, or take part in an active consultation.</p>
                    <div class="bento-list">
                        <a href="#/report" data-route="/report" class="bento-action-link">
                            <div><span class="icon-well">${icon("report")}</span><div><strong>Report an issue</strong><small>Roads, water, waste, or street lighting</small></div></div>
                            ${icon("chevronRight")}
                        </a>
                        <a href="#/propose" data-route="/propose" class="bento-action-link">
                            <div><span class="icon-well">${icon("project")}</span><div><strong>Propose a project</strong><small>Record a community need for review</small></div></div>
                            ${icon("chevronRight")}
                        </a>
                        <a href="#/polls" data-route="/polls" class="bento-action-link">
                            <div><span class="icon-well">${icon("poll")}</span><div><strong>Polls & consultations</strong><small>Vote on district planning topics</small></div></div>
                            ${icon("chevronRight")}
                        </a>
                    </div>
                </article>

                <article class="card bento-card">
                    <p class="kicker">Representation & Notices</p>
                    <div class="rep-lockup">
                        <div class="rep-avatar">MC</div>
                        <div>
                            <strong style="display:block;font-size:1rem;">${esc(representative.name)}</strong>
                            <span class="small-note">${esc(representative.role)}</span>
                        </div>
                    </div>
                    <div class="rep-actions">
                        <a class="button button-secondary button-sm" href="${representative.parliamentUrl}" target="_blank" rel="noreferrer">Parliament profile ${icon("external")}</a>
                        <a class="button button-secondary button-sm" href="${representative.socialUrl}" target="_blank" rel="noreferrer">Public page ${icon("external")}</a>
                    </div>
                    ${latestNews ? `<div style="margin-top:auto;padding-top:16px;border-top:1px solid var(--border);">
                        <span class="status-pill no-dot ${newsTypeTone(latestNews.type)}">${esc(latestNews.tag)}</span>
                        <strong style="display:block;margin-top:8px;font-size:0.9rem;">${esc(latestNews.title)}</strong>
                        <p class="small-note" style="margin-top:4px;">${esc(latestNews.excerpt)}</p>
                        <div style="margin-top:10px;">${link("/news", `All notices ${icon("arrow")}`, "text-button")}</div>
                    </div>` : ""}
                </article>

                <article class="card bento-card">
                    <p class="kicker">Low-Bandwidth Access</p>
                    <h3>Works on basic phones</h3>
                    <p class="small-note">Residents without smartphones or mobile data can reach the reporting menu through ONTECH USSD or visit the Civic Centre desk.</p>
                    <div class="ussd-box">
                        <span>Dial from any handset</span>
                        <strong>*388*133#</strong>
                    </div>
                    <div style="margin-top:auto;padding-top:16px;display:flex;justify-content:space-between;align-items:center;">
                        <span class="small-note">Mon–Fri · 08:00–16:30</span>
                        ${link("/help", `Channel guide ${icon("arrow")}`, "text-button")}
                    </div>
                </article>
            </div>
        </section>
    </main>`;
}

/* ---------- Public Subpages ---------- */
function renderServices() {
    const filtered = services.filter((s) =>
        (state.serviceCategory === "All" || s.category === state.serviceCategory)
        && `${s.title} ${s.description} ${s.department} ${s.category}`.toLowerCase().includes(state.serviceQuery.toLowerCase()),
    );
    return `<main class="container page-shell">
        ${pageHeader("Public Services", "Find a council service or desk", "Browse municipal departments, district offices, direct phone numbers, and visiting hours.")}
        <div class="toolbar-stack">
            <label class="search-field">
                ${icon("search")}
                <input id="service-search" value="${esc(state.serviceQuery)}" placeholder="Search services, departments, permits, health, or water..." aria-label="Search public services" />
            </label>
            <div class="filter-row">
                ${SERVICE_CATEGORIES.map((cat) => `<button type="button" class="filter-chip ${state.serviceCategory === cat ? "selected" : ""}" data-action="service-category" data-category="${esc(cat)}">${esc(cat)}</button>`).join("")}
            </div>
        </div>
        <div class="results-meta">
            <span><strong class="tabular-nums">${filtered.length}</strong> ${filtered.length === 1 ? "service" : "services"} matching current filter</span>
            <span>Updated by participating institutions</span>
        </div>
        <div class="service-grid">
            ${filtered.map((s) => `<article class="card card-interactive service-card">
                <div class="service-card-head">
                    <span class="icon-well">${icon(s.icon)}</span>
                    <span class="status-pill no-dot tone-neutral">${esc(s.category)}</span>
                </div>
                <h2>${esc(s.title)}</h2>
                <p>${esc(s.description)}</p>
                <div class="service-meta">
                    <span>${icon("community")} ${esc(s.department)}</span>
                    <span>${icon("phone")} ${esc(s.contact)}</span>
                </div>
                <button type="button" class="text-button" data-action="service-details" data-id="${esc(s.id)}">${esc(s.action)} ${icon("arrow")}</button>
            </article>`).join("") || `<div class="empty-state"><h2>No services matched your search</h2><p>Try a broader term such as health, permits, bursaries, or water.</p></div>`}
        </div>
    </main>`;
}

function renderCommunity() {
    const localProjects = state.data.projects.filter((p) => p.ward === state.ward);
    const displayedProjects = localProjects.length ? localProjects : state.data.projects.slice(0, 3);
    const wardBudget = localProjects.reduce((sum, p) => sum + (p.budget_kwacha || 0), 0);

    return `<main class="container page-shell">
        ${pageHeader("My Community", esc(state.ward), "Select your ward to follow local development works, check consultation priorities, and send neighbourhood feedback.", link("/tracker", `View all projects ${icon("arrow")}`, "button button-secondary"))}
        <div class="ward-picker" role="group" aria-label="Select ward">
            ${WARDS.map((ward) => `<button type="button" class="filter-chip ${state.ward === ward ? "selected" : ""}" data-action="select-ward" data-ward="${esc(ward)}">${esc(ward)}</button>`).join("")}
        </div>
        <div class="card summary-strip">
            <div class="summary-cell"><span class="summary-value">${localProjects.length}</span><span class="summary-label">Ward projects listed</span></div>
            <div class="summary-cell"><span class="summary-value">${formatCompactKwacha(wardBudget || null)}</span><span class="summary-label">Published allocation</span></div>
            <div class="summary-cell"><span class="summary-value">${localProjects.filter((p) => p.status === "ongoing").length}</span><span class="summary-label">Ongoing works</span></div>
            <div class="summary-cell"><span class="summary-value">${state.data.polls.filter((p) => p.active).length}</span><span class="summary-label">Open consultations</span></div>
        </div>
        <div class="community-columns">
            <section>
                <div class="section-header" style="margin-bottom:14px;">
                    <div>
                        <p class="kicker">${localProjects.length ? "Ward Record" : "District Highlights"}</p>
                        <h2>${localProjects.length ? `Projects in ${esc(state.ward)}` : `No ward-specific works listed for ${esc(state.ward)} yet`}</h2>
                    </div>
                </div>
                <div class="compact-list">
                    ${displayedProjects.map((project) => `<button type="button" class="card card-interactive compact-project-card" data-action="project-detail" data-id="${esc(project.id)}">
                        <div>
                            <span class="status-pill ${statusTone(project.status)}" style="margin-bottom:6px;">${statusLabel(project.status)}</span>
                            <h3>${esc(project.title)}</h3>
                            <p>${esc(project.category)} · ${esc(project.ward)} · ${esc(project.updated)}</p>
                        </div>
                        <span class="compact-project-pct">${project.progress}%</span>
                    </button>`).join("")}
                </div>
                <div class="card info-card" style="margin-top:16px;">
                    <p class="kicker">Next Steps</p>
                    <h3>Take part in ward planning</h3>
                    <p>Vote in open district consultations or look up a desk in the service directory.</p>
                    <div class="form-actions" style="margin-top:14px;">
                        ${link("/polls", "View consultations", "button button-primary button-sm")}
                        ${link("/services", "Service directory", "button button-secondary button-sm")}
                    </div>
                </div>
            </section>
            <section class="card civic-form">
                <p class="kicker">Community Feedback</p>
                <h2 style="margin:4px 0 6px;font-size:1.25rem;">Send feedback for ${esc(state.ward)}</h2>
                <p class="small-note" style="margin-bottom:16px;">Share a local observation or service question directly with the council intake queue.</p>
                <form id="community-feedback-form">
                    <div class="form-grid">
                        ${formSelect("kind", "Topic", ["Report an issue", "Share feedback", "Ask about a service"])}
                        ${formSelect("ward", "Ward or community", WARDS, state.ward)}
                        <label class="field field-full"><span>Location or landmark</span><input name="location" placeholder="Market, road, school, or nearby landmark" required /></label>
                        <label class="field field-full"><span>Message</span><textarea name="details" rows="4" maxlength="1500" required placeholder="Describe what is happening and what would help"></textarea></label>
                        <label class="field field-full"><span>Phone or email <small>optional</small></span><input name="contact" placeholder="Only if you would like follow-up" /></label>
                    </div>
                    <div class="form-actions">
                        <button class="button button-primary" type="submit">Send feedback ${icon("arrow")}</button>
                    </div>
                    <p class="form-privacy">${icon("lock")} Submissions are encrypted at rest and never published publicly.</p>
                </form>
            </section>
        </div>
    </main>`;
}

function renderReport() {
    const kinds = [
        { id: "issue", title: "Report an issue", copy: "Road, water, waste, lighting, or safety concern" },
        { id: "feedback", title: "Share feedback", copy: "Suggestion, observation, or service feedback" },
        { id: "service", title: "Ask about a service", copy: "Guidance on the right desk or requirements" },
    ];
    return `<main class="container page-shell">
        ${pageHeader("Resident Intake", "Report a local issue", "Reports can be submitted anonymously. Include a phone number only if you want follow-up from the council.")}
        <div class="form-layout">
            <div>
                <div class="kind-grid" role="group" aria-label="Submission type">
                    ${kinds.map((k) => `<button type="button" class="kind-card ${state.selectedReportKind === k.id ? "selected" : ""}" data-action="select-report-kind" data-kind="${k.id}">
                        <strong>${k.title}</strong>
                        <small>${k.copy}</small>
                    </button>`).join("")}
                </div>
                <form class="card civic-form" id="report-form">
                    <div class="form-section-title"><h2>Where is it located?</h2><span>Step 1 of 3</span></div>
                    <div class="form-grid">
                        ${formSelect("ward", "Ward or community", WARDS, state.ward)}
                        <label class="field"><span>Specific location</span><input name="location" placeholder="Road, market, or landmark" required /></label>
                    </div>
                    <div class="form-section-title"><h2>What is happening?</h2><span>Step 2 of 3</span></div>
                    <div class="form-grid">
                        ${formSelect("category", "Issue category", REPORT_CATEGORIES)}
                        <label class="field"><span>Supporting file <small>optional</small></span><input type="file" name="attachment" /></label>
                        <label class="field field-full"><span>Details</span><textarea name="details" rows="5" maxlength="2000" required placeholder="Describe the issue and how it affects residents nearby."></textarea><small class="field-hint">Do not include passwords or sensitive personal information.</small></label>
                    </div>
                    <div class="form-section-title"><h2>Follow-up preferences</h2><span>Step 3 of 3</span></div>
                    <div class="form-grid">
                        <label class="field"><span>Phone number <small>optional</small></span><input name="phone" inputmode="tel" placeholder="097 123 4567" /></label>
                        <label class="check-field"><input type="checkbox" name="anonymous" /><span><strong>Submit anonymously</strong><small>Discards contact details before encrypted storage.</small></span></label>
                    </div>
                    <div class="form-actions">
                        <button class="button button-primary button-lg" type="submit">Submit report ${icon("arrow")}</button>
                        <button class="button button-secondary" type="button" data-action="use-location">Use GPS coordinates</button>
                    </div>
                    <p class="form-privacy">${icon("lock")} Reports are encrypted on submission and are not publicly readable.</p>
                </form>
            </div>
            <aside class="side-stack">
                <div class="card info-card">
                    <p class="kicker">Privacy & Handling</p>
                    <h3>How reports are protected</h3>
                    <p>Public submissions are insert-only. Staff review takes place inside the authenticated workspace without exposing your report to other residents.</p>
                    <div class="info-list">
                        <div>${icon("lock")} AES-256-GCM encryption at rest</div>
                        <div>${icon("check")} Anonymous mode strips phone numbers</div>
                        <div>${icon("phone")} Offline USSD channel: *388*133#</div>
                    </div>
                </div>
                <div class="callout callout-warn">
                    <span class="callout-icon">${icon("alert")}</span>
                    <div>
                        <strong>Immediate danger or crime</strong>
                        <p>For urgent safety emergencies, call Zambia Police (991), Fire (993), or Ambulance (992) directly.</p>
                    </div>
                </div>
            </aside>
        </div>
    </main>`;
}

function renderPropose() {
    return `<main class="container page-shell">
        ${pageHeader("Community Ideas", "Propose a community project", "Record a neighbourhood need and suggested solution for district review.", link("/tracker", `See published projects ${icon("arrow")}`, "button button-secondary"))}
        <div class="form-layout">
            <form class="card civic-form" id="proposal-form">
                <div class="form-grid">
                    ${formSelect("ward", "Affected ward or community", WARDS, state.ward)}
                    ${formSelect("category", "Project sector", ["Water and boreholes", "Roads and transport", "Schools and education", "Health facilities", "Markets and livelihoods", "Drainage and sanitation", "Agriculture", "Other"])}
                    <label class="field field-full"><span>Proposal title</span><input name="title" required placeholder="e.g. A community borehole for eastern Mwika" /></label>
                    <label class="field field-full"><span>What need should this address?</span><textarea name="need" rows="4" required placeholder="Describe the current challenge and who is affected."></textarea></label>
                    <label class="field field-full"><span>Suggested practical solution</span><textarea name="solution" rows="4" required placeholder="Outline what a practical project would deliver."></textarea></label>
                    <label class="field"><span>Estimated beneficiaries</span><input name="beneficiaries" inputmode="numeric" placeholder="e.g. 350 households" /></label>
                    ${formSelect("urgency", "Priority level", ["Important this year", "Can be planned", "Urgent / safety concern"])}
                    <label class="field field-full"><span>Supporting document <small>optional</small></span><input type="file" name="attachment" /></label>
                </div>
                <div class="form-actions">
                    <button class="button button-primary button-lg" type="submit">Submit proposal ${icon("arrow")}</button>
                    <span class="small-note">Save your reference number after submitting.</span>
                </div>
            </form>
            <aside class="side-stack">
                <div class="callout callout-info">
                    <span class="callout-icon">${icon("project")}</span>
                    <div>
                        <strong>Proposals are not approvals</strong>
                        <p>Submitting an idea puts a community need on the council intake record. Funding, budgeting, and procurement follow formal review.</p>
                    </div>
                </div>
                <div class="card info-card">
                    <p class="kicker">Project Lifecycle</p>
                    <h3>What happens next</h3>
                    <p>Proposals are reviewed during ward and CDF planning cycles across seven formal stages from assessment through implementation.</p>
                    <div style="margin-top:14px;">${link("/tracker", `View lifecycle stages ${icon("arrow")}`, "text-button")}</div>
                </div>
            </aside>
        </div>
    </main>`;
}

function renderWhistleblowing() {
    return `<main class="container page-shell narrow-shell">
        ${pageHeader("Sensitive Reporting", "Channel not available yet", "Confidential whistleblowing intake is currently offline while secure agency routing is finalised.")}
        <div class="callout callout-warn" style="margin-bottom:20px;">
            <span class="callout-icon">${icon("lock")}</span>
            <div>
                <strong>Do not submit sensitive allegations through this portal</strong>
                <p>This channel is not secure or live. Reports are not saved or forwarded to DEC, Zambia Police, or the Anti-Corruption Commission (ACC).</p>
            </div>
        </div>
        <div class="card info-card">
            <p class="kicker">Immediate Assistance</p>
            <h3>Contact official emergency or oversight services directly</h3>
            <p>If you are witnessing immediate danger or require urgent law-enforcement or medical intervention, use national emergency lines or visit the Civic Centre help desk.</p>
            <div class="emergency-grid" style="max-width:440px;margin-top:18px;">
                <div class="emergency-tile"><strong>991</strong><span>Police</span></div>
                <div class="emergency-tile"><strong>993</strong><span>Fire</span></div>
                <div class="emergency-tile"><strong>992</strong><span>Ambulance</span></div>
            </div>
            <div class="form-actions">
                ${link("/help", "Help & contact information", "button button-primary")}
                ${link("/report", "Report a public infrastructure issue", "button button-secondary")}
            </div>
        </div>
    </main>`;
}

function renderTracker() {
    const localRefs = Object.entries(getStored("my-chinsali-references", {})).slice(0, 6);
    const filtered = state.data.projects.filter((p) =>
        (state.projectFilter === "all" || p.status === state.projectFilter)
        && (state.projectWardFilter === "All" || p.ward === state.projectWardFilter),
    );
    return `<main class="container page-shell">
        ${pageHeader("Development Tracker", "Track projects and references", "Search by report or proposal reference number, or filter published district projects by stage and ward.")}
        <div class="tracker-tools">
            <form id="tracker-form" style="max-width:640px;">
                <label class="search-field">
                    ${icon("tracker")}
                    <input name="reference" placeholder="Enter reference or project name, e.g. MC-4821 or Mwika" autocomplete="off" />
                    <button class="button button-primary button-sm" type="submit">Check status</button>
                </label>
            </form>
            ${localRefs.length ? `<div class="local-ref-chips">
                <span class="small-note">Saved on this device:</span>
                ${localRefs.map(([ref]) => `<button type="button" class="local-ref-chip" data-action="lookup-ref" data-ref="${esc(ref)}">${esc(ref)}</button>`).join("")}
            </div>` : ""}
        </div>
        <div id="tracker-result"></div>

        <section>
            <div class="section-header" style="flex-wrap:wrap;">
                <div>
                    <p class="kicker">Published Portfolio</p>
                    <h2>District development projects</h2>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
                    <div class="segmented-control" role="group" aria-label="Filter by status">
                        ${["all", "ongoing", "completed", "planned", "proposed"].map((f) => `<button type="button" class="${state.projectFilter === f ? "selected" : ""}" data-action="project-filter" data-filter="${f}">${f === "all" ? "All" : statusLabel(f)}</button>`).join("")}
                    </div>
                    <select class="filter-chip" id="tracker-ward-select" aria-label="Filter projects by ward">
                        <option value="All">All wards</option>
                        ${WARDS.filter((w) => w !== "Other").map((w) => `<option value="${esc(w)}" ${state.projectWardFilter === w ? "selected" : ""}>${esc(w)}</option>`).join("")}
                    </select>
                </div>
            </div>
            <div class="project-grid">
                ${filtered.map(projectCard).join("") || `<div class="empty-state"><h2>No projects match this filter</h2><p>Try switching the status or ward filter above.</p></div>`}
            </div>
        </section>

        <section class="card lifecycle-card">
            <p class="kicker">Governance Framework</p>
            <h2 style="margin:4px 0 4px;font-size:1.2rem;">Project approval lifecycle</h2>
            <p class="small-note">Community proposals enter at stage 01. Official funding and implementation depend on council and CDF approval.</p>
            <div class="lifecycle-row">
                ${LIFECYCLE_STAGES.map((step, idx) => `<div class="lifecycle-step ${idx < 2 ? "active" : ""}">
                    <span>Stage ${String(idx + 1).padStart(2, "0")}</span>
                    <strong>${step}</strong>
                </div>`).join("")}
            </div>
        </section>
    </main>`;
}

function renderMap() {
    const filteredPoints = state.mapFilter === "all"
        ? mapPoints
        : mapPoints.filter((pt) => pt.type === state.mapFilter);
    const activePoint = filteredPoints.find((pt) => pt.id === state.selectedMapPointId) || filteredPoints[0] || null;

    return `<main class="container page-shell">
        ${pageHeader("Community Map", "Explore Chinsali District", "Approximate ward-level locations for published projects, facilities, and reviewed issues — not for navigation.", link("/tracker", `Open project tracker ${icon("arrow")}`, "button button-secondary"))}
        <div class="map-toolbar">
            <div class="segmented-control" role="group" aria-label="Filter map markers">
                ${[
                    ["all", "Everything"],
                    ["project", "Projects"],
                    ["facility", "Facilities"],
                    ["issue", "Reported issues"],
                ].map(([val, label]) => `<button type="button" class="${state.mapFilter === val ? "selected" : ""}" data-action="map-filter" data-filter="${val}">${label}</button>`).join("")}
            </div>
            <span class="small-note tabular-nums">${filteredPoints.length} public markers shown</span>
        </div>
        <div class="map-layout">
            <div id="community-map" class="map-canvas-wrap" role="region" aria-label="Interactive Chinsali district map"></div>
            <aside class="card map-sidebar">
                <div class="map-legend-row">
                    <span class="map-legend-item"><span class="legend-dot dot-project"></span> Project</span>
                    <span class="map-legend-item"><span class="legend-dot dot-facility"></span> Facility</span>
                    <span class="map-legend-item"><span class="legend-dot dot-issue"></span> Issue</span>
                </div>
                ${activePoint ? `<div style="padding-bottom:10px;border-bottom:1px solid var(--border);">
                    <p class="kicker">Selected Marker</p>
                    <strong style="display:block;margin-top:4px;font-size:0.98rem;">${esc(activePoint.title)}</strong>
                    <span class="small-note">${esc(activePoint.ward)} · ${esc(activePoint.status)}</span>
                </div>` : ""}
                <div style="display:grid;gap:8px;">
                    ${filteredPoints.map((pt) => `<button type="button" class="map-point-btn ${activePoint?.id === pt.id ? "selected" : ""}" data-action="map-select" data-id="${esc(pt.id)}">
                        <div>
                            <strong>${esc(pt.title)}</strong>
                            <small>${esc(pt.ward)} · ${esc(pt.status)}</small>
                        </div>
                        <span class="legend-dot dot-${pt.type}" style="margin-top:6px;"></span>
                    </button>`).join("")}
                </div>
                <p class="small-note" style="margin-top:4px;">Precise household addresses and private reports are never shown publicly.</p>
            </aside>
        </div>
    </main>`;
}

function allGalleryItems() {
    return [...state.data.content.gallery, ...galleryItems];
}

function renderGalleryLightbox() {
    const item = allGalleryItems()[state.galleryIndex];
    if (!item) return "";
    return `<div class="gallery-lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title">
        <button type="button" class="gallery-lightbox-backdrop" data-action="gallery-close" aria-label="Close gallery"></button>
        <div class="gallery-lightbox-card">
            <button type="button" class="modal-close" style="z-index:2;" data-action="gallery-close" aria-label="Close image">${icon("close")}</button>
            <img src="${esc(item.image)}" alt="${esc(item.alt)}" />
            <div class="gallery-lightbox-copy">
                <p class="kicker">${esc(item.category)}</p>
                <h2 id="gallery-lightbox-title">${esc(item.title)}</h2>
                <p>${esc(item.description)}</p>
                ${item.source ? `<p class="small-note">Source: ${esc(item.source)}</p>` : ""}
                <div class="gallery-lightbox-actions">
                    <button type="button" class="button button-secondary button-sm" data-action="gallery-prev">${icon("chevronLeft")} Previous</button>
                    <button type="button" class="button button-primary button-sm" data-action="gallery-next">Next ${icon("chevronRight")}</button>
                </div>
            </div>
        </div>
    </div>`;
}

function memoryCardsHtml(memories) {
    if (!memories.length) {
        return `<p class="small-note" style="margin-top:12px;">No visitor memories saved in this browser yet. Use the form on the left to add one.</p>`;
    }
    return memories.map((m) => `<article class="memory-item">
        <div class="memory-item-head">
            <div><strong>${esc(m.name || "A visitor")}</strong> <span class="ward">· ${esc(m.ward || "Chinsali District")}</span></div>
            <span class="status-pill no-dot tone-neutral">${esc(m.category || "Experience")}</span>
        </div>
        <p>${esc(m.text)}</p>
    </article>`).join("");
}

function renderGallery() {
    const gallery = allGalleryItems();
    const categories = ["all", "Heritage", "Nature", "Town life", "Food and markets", "Community life", "Maps"];
    const items = state.galleryFilter === "all" ? gallery : gallery.filter((i) => i.category === state.galleryFilter);

    return `<main class="container page-shell">
        ${pageHeader("Photo Gallery", "Chinsali places & heritage", "Explore local landmarks, town scenes, OpenStreetMap locations, and browser-local visitor reflections.")}
        <div class="filter-row" style="margin-bottom:20px;">
            ${categories.map((c) => `<button type="button" class="filter-chip ${state.galleryFilter === c ? "selected" : ""}" data-action="gallery-filter" data-filter="${esc(c)}">${c === "all" ? "All photos" : esc(c)}</button>`).join("")}
        </div>
        <div class="gallery-grid">
            ${items.map((item) => `<button type="button" class="card card-interactive gallery-card" data-action="gallery-open" data-index="${gallery.indexOf(item)}">
                <span class="gallery-card-media"><img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" /></span>
                <span class="gallery-card-body">
                    <span class="kicker">${esc(item.category)}</span>
                    <strong>${esc(item.title)}</strong>
                    <small>${esc(item.description)}</small>
                </span>
            </button>`).join("") || `<div class="empty-state"><h2>No photos in this category</h2><p>Select another category above to browse all photos.</p></div>`}
        </div>

        <section class="section-block">
            <div class="section-header">
                <div>
                    <p class="kicker">OpenStreetMap Reference</p>
                    <h2>Find landmarks on the map</h2>
                    <p class="small-note">Market marker shows a Chinsali town-centre reference rather than an exact market pin. Map tiles © OpenStreetMap contributors.</p>
                </div>
                <span class="small-note tabular-nums">${landmarkLocations.length} landmarks</span>
            </div>
            <div id="landmark-map" class="landmark-map-container" role="region" aria-label="Interactive landmark map">
                <div style="display:grid;place-items:center;height:100%;color:var(--ink-soft);">Loading landmark map…</div>
            </div>
        </section>

        <section class="section-block">
            <div class="section-header">
                <div>
                    <p class="kicker">Visitor Memories</p>
                    <h2>Share a Chinsali memory</h2>
                </div>
            </div>
            <div class="memory-layout">
                <form class="card civic-form" id="memory-form">
                    <div class="form-grid">
                        <label class="field"><span>Display name <small>optional</small></span><input name="name" maxlength="80" placeholder="e.g. Chinsali neighbour" /></label>
                        ${formSelect("ward", "Ward or community", WARDS, state.ward)}
                        <div class="field-full">${formSelect("category", "Memory category", ["Heritage", "Nature", "Town life", "Food and markets", "Community life", "Other"])}</div>
                        <label class="field field-full"><span>Your experience or memory</span><textarea name="text" rows="5" maxlength="1200" required placeholder="Tell visitors what made this place meaningful to you..."></textarea></label>
                        <label class="check-field field-full"><input type="checkbox" name="consent" required /><span><strong>Save this memory in this browser</strong><small>Memories remain local to this device and are not sent to a server.</small></span></label>
                    </div>
                    <div class="form-actions">
                        <button class="button button-primary" type="submit">Share memory ${icon("arrow")}</button>
                    </div>
                </form>
                <aside class="card memory-list-card">
                    <p class="kicker">Saved Locally</p>
                    <h3 style="margin:4px 0 4px;font-size:1.1rem;">Recent browser memories</h3>
                    <div id="memory-list">${memoryCardsHtml(getMemories())}</div>
                </aside>
            </div>
        </section>
    </main>${renderGalleryLightbox()}`;
}

function renderPolls() {
    const open = state.data.content.pollsOpen !== false;
    const voted = getStored("my-chinsali-recorded-votes", {});
    return `<main class="container page-shell narrow-shell">
        ${pageHeader("Polls & Consultations", "Active district consultations", "Share your priority on planning topics. Individual votes are sent through the database vote function and tallies are not shown publicly.")}
        ${open ? `<div class="poll-stack">
            ${state.data.polls.filter((p) => p.active).map((poll) => {
                const hasVoted = state.data.votedPolls[poll.id] === true || voted[poll.id] === true;
                return `<article class="card poll-card">
                    <div class="poll-head">
                        <span class="status-pill tone-green">Open Consultation</span>
                        <span class="small-note">${esc(poll.closes)}</span>
                    </div>
                    <h2>${esc(poll.question)}</h2>
                    <div class="poll-options">
                        ${hasVoted
                            ? `<p class="poll-confirmation" role="status">Your response has been recorded. Live totals are kept private during the consultation period.</p>`
                            : poll.poll_options.map((opt, idx) => `<button type="button" class="poll-option" data-action="vote" data-poll="${esc(poll.id)}" data-option="${esc(opt.id)}">
                                <span class="poll-option-num">${idx + 1}</span>
                                <span>${esc(opt.label)}</span>
                                <span class="poll-option-arrow">→</span>
                            </button>`).join("")}
                    </div>
                    <div class="poll-footer">
                        <span>Public tallies disabled for consultation integrity</span>
                        ${hasVoted ? `<span style="color:var(--accent);font-weight:600;">✓ Recorded</span>` : ""}
                    </div>
                </article>`;
            }).join("")}
        </div>` : `<div class="empty-state"><h2>Voting is currently closed</h2><p>Check back later for the next district consultation.</p></div>`}
    </main>`;
}

function renderNews() {
    const combined = [...state.data.content.news, ...news, ...representativeUpdates];
    const featured = combined[0];
    const rest = combined.slice(1).filter((item) => state.newsFilter === "all" || item.type === state.newsFilter);

    return `<main class="container page-shell">
        ${pageHeader("News & Notices", "Council announcements & updates", "Public notices, development progress updates, community events, and parliamentary links.")}
        ${featured ? `<article class="card featured-news-card">
            <div>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                    <span class="status-pill no-dot ${newsTypeTone(featured.type)}">${esc(featured.tag)}</span>
                    ${featured.date ? `<span class="small-note">${esc(featured.date)}</span>` : ""}
                </div>
                <h2>${esc(featured.title)}</h2>
                <p>${esc(featured.excerpt)}</p>
                ${link("/polls", `Join the public consultation ${icon("arrow")}`, "button button-primary")}
            </div>
            <div class="featured-news-aside">
                <p class="kicker">Access Channels</p>
                <strong style="font-size:1rem;">Participate online or via USSD</strong>
                <p class="small-note">Residents without data can access district notices and reporting by dialling <strong>*388*133#</strong> on ONTECH.</p>
                ${link("/help", `See channel guide ${icon("arrow")}`, "text-button")}
            </div>
        </article>` : ""}

        <div class="toolbar-stack" style="margin-bottom:20px;">
            <div class="segmented-control" role="group" aria-label="Filter notices">
                ${[
                    ["all", "All updates"],
                    ["notice", "Notices"],
                    ["update", "Project updates"],
                    ["event", "Events"],
                    ["opportunity", "Opportunities"],
                ].map(([val, label]) => `<button type="button" class="${state.newsFilter === val ? "selected" : ""}" data-action="news-filter" data-filter="${val}">${label}</button>`).join("")}
            </div>
        </div>

        <div class="news-grid">
            ${rest.map((item) => `<article class="card news-card">
                ${item.image ? `<img class="news-card-media" src="${esc(item.image)}" alt="${esc(item.imageAlt || "")}" loading="lazy" />` : ""}
                <div class="news-card-meta">
                    <span class="status-pill no-dot ${newsTypeTone(item.type)}">${esc(item.tag)}</span>
                    ${item.date ? `<span class="small-note">${esc(item.date)}</span>` : ""}
                </div>
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.excerpt)}</p>
                ${item.sourceUrl ? `<a class="text-button" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${esc(item.sourceLabel || "Open source")} ${icon("external")}</a>` : ""}
            </article>`).join("") || `<div class="empty-state"><h2>No announcements in this category</h2><p>Choose another filter above to view all notices.</p></div>`}
        </div>
    </main>`;
}

function renderHelp() {
    const faqs = [
        { q: "Do I need an account to report something?", a: "No. Public reports and proposals can be submitted without an account. Add a phone number only if you want follow-up." },
        { q: "Is a community proposal an approved project?", a: "No. A proposal records a community need for council consideration. Official approval, budgets, and procurement remain separate decisions." },
        { q: "How do I follow up on a report?", a: "Keep your reference number. Use the Development Tracker to look up locally saved references or browse published project status updates." },
        { q: "Can I report anonymously?", a: "Yes for ordinary community concerns. The sensitive-reporting channel is not live; do not submit serious allegations through the public report form." },
        { q: "What if I do not have internet access?", a: "Use the ONTECH feature-phone USSD code *388*133# where available, or visit the Civic Centre help desk for assisted submissions." },
    ];
    return `<main class="container page-shell">
        ${pageHeader("Help & Information", "Answers and support channels", "Guidance on public submissions, privacy protections, offline access, and emergency contacts.")}
        <div class="help-grid">
            <section class="card faq-card">
                <p class="kicker">Frequently Asked Questions</p>
                ${faqs.map((faq, idx) => `<div class="faq-item ${idx === 0 ? "open" : ""}">
                    <button type="button" data-action="toggle-faq"><span>${esc(faq.q)}</span>${icon("chevronDown")}</button>
                    <p>${esc(faq.a)}</p>
                </div>`).join("")}
            </section>
            <aside class="side-stack">
                <div class="card info-card">
                    <p class="kicker">Visit in Person</p>
                    <h3>Civic Centre help desk</h3>
                    <p>Service navigation, assisted submissions, and SMS/USSD guidance.</p>
                    <div class="info-list">
                        <div>${icon("tracker")} Mon–Fri · 08:00–16:30</div>
                        <div>${icon("map")} Chinsali District Civic Centre</div>
                    </div>
                </div>
                <div class="card info-card">
                    <p class="kicker">Urgent Assistance</p>
                    <h3>National emergency numbers</h3>
                    <div class="emergency-grid">
                        <div class="emergency-tile"><strong>991</strong><span>Police</span></div>
                        <div class="emergency-tile"><strong>993</strong><span>Fire</span></div>
                        <div class="emergency-tile"><strong>992</strong><span>Ambulance</span></div>
                    </div>
                </div>
            </aside>
        </div>
        <section class="card access-strip">
            <div>
                <p class="kicker">Access Channels</p>
                <h2 style="margin:4px 0 0;font-size:1.25rem;">Reach the portal any way</h2>
            </div>
            <div class="access-item"><strong>Web Portal</strong><span>Full services & tracking</span></div>
            <div class="access-item"><strong>SMS</strong><span>Basic updates & alerts</span></div>
            <div class="access-item"><strong>*388*133#</strong><span>ONTECH USSD menu</span></div>
        </section>
    </main>`;
}

function searchCatalog() {
    const pages = [
        ["Public services", "Find services, departments, permits, health, agriculture, education, emergency and legal referrals.", "/services", "Page"],
        ["My community", "Ward projects, notices, community feedback and local development priorities.", "/community", "Page"],
        ["Propose a project", "Submit a community project idea for council review.", "/propose", "Participation"],
        ["Report an issue", "Report roads, water, waste, streetlights, flooding, safety and infrastructure concerns.", "/report", "Participation"],
        ["Sensitive reporting", "Channel status notice and emergency contact referrals.", "/whistleblowing", "Participation"],
        ["Development tracker", "Browse public projects, budgets, milestones, and reference numbers.", "/tracker", "Page"],
        ["Community map", "Explore approximate public markers for projects, facilities, and reviewed issues.", "/map", "Page"],
        ["Chinsali gallery", "Heritage photos, OpenStreetMap landmarks, and visitor memories.", "/gallery", "Page"],
        ["Polls & consultations", "Vote on district planning priorities.", "/polls", "Participation"],
        ["News & notices", "Announcements, public meetings, opportunities and project updates.", "/news", "Page"],
        ["Help & information", "Answers about reports, proposals, privacy and *388*133# USSD access.", "/help", "Page"],
    ].map(([title, description, route, type]) => ({ title, description, route, type }));

    return [
        ...pages,
        ...services.map((i) => ({ title: i.title, description: `${i.description} ${i.department} ${i.category}`, route: "/services", type: "Service" })),
        ...state.data.projects.map((i) => ({ title: i.title, description: `${i.summary} ${i.category} ${i.ward} ${i.status}`, route: "/tracker", type: "Project" })),
        ...[...state.data.content.news, ...news, ...representativeUpdates].map((i) => ({ title: i.title, description: `${i.excerpt} ${i.tag}`, route: "/news", type: "News" })),
        ...[...allGalleryItems(), ...storyItems].map((i) => ({ title: i.title, description: `${i.description} ${i.category}`, route: "/gallery", type: "Gallery" })),
        ...state.data.polls.map((i) => ({ title: i.question, description: `${i.poll_options.map((o) => o.label).join(" ")} ${i.closes}`, route: "/polls", type: "Consultation" })),
    ];
}

function renderSearch() {
    const query = state.searchQuery.trim().toLowerCase();
    const rawMatches = query ? searchCatalog().filter((i) => `${i.title} ${i.description} ${i.type}`.toLowerCase().includes(query)) : [];
    const results = state.searchTypeFilter === "All" ? rawMatches : rawMatches.filter((i) => i.type === state.searchTypeFilter);
    const types = ["All", "Page", "Service", "Project", "News", "Gallery", "Consultation"];

    return `<main class="container page-shell">
        ${pageHeader("Portal Search", query ? `Results for “${esc(state.searchQuery)}”` : "Search the portal", "Find services, projects, notices, consultations, and Chinsali heritage stories.")}
        <form id="search-page-form" style="max-width:680px;margin-bottom:18px;">
            <label class="search-field">
                ${icon("search")}
                <input name="query" value="${esc(state.searchQuery)}" placeholder="Search boreholes, permits, Lubwa, health, or polls..." aria-label="Search portal" required />
                <button class="button button-primary button-sm" type="submit">Search</button>
            </label>
        </form>
        ${query ? `<div class="filter-row" style="margin-bottom:16px;">
            ${types.map((t) => `<button type="button" class="filter-chip ${state.searchTypeFilter === t ? "selected" : ""}" data-action="search-filter" data-type="${t}">${t}</button>`).join("")}
        </div>
        <div class="results-meta"><span><strong class="tabular-nums">${results.length}</strong> ${results.length === 1 ? "match" : "matches"} found</span></div>
        <div class="search-results-grid">
            ${results.map((item) => `<a class="card card-interactive search-result-card" href="#${item.route}" data-route="${item.route}">
                <span class="status-pill no-dot tone-neutral">${esc(item.type)}</span>
                <h2>${esc(item.title)}</h2>
                <p>${esc(item.description)}</p>
                <span class="text-button">Open ${esc(item.type.toLowerCase())} ${icon("arrow")}</span>
            </a>`).join("") || `<div class="empty-state"><h2>No matching content found</h2><p>Try a broader term such as water, market, health, or project.</p></div>`}
        </div>` : `<div class="empty-state"><h2>Search across My Chinsali</h2><p>Enter a keyword above to search services, wards, projects, news notices, and gallery entries.</p></div>`}
    </main>`;
}

/* ---------- Interactive Modals ---------- */
function renderModals() {
    const service = state.modalService ? services.find((s) => s.id === state.modalService) : null;
    if (service) {
        return `<div class="modal-backdrop" data-action="close-modal">
            <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
                <button class="modal-close" type="button" data-action="close-modal" aria-label="Close">${icon("close")}</button>
                <p class="kicker">${esc(service.category)}</p>
                <h2 id="service-modal-title">${esc(service.title)}</h2>
                <p class="small-note" style="font-size:0.92rem;">${esc(service.description)}</p>
                <div class="detail-list">
                    <div><span>Responsible desk</span><strong>${esc(service.department)}</strong></div>
                    <div><span>Phone / contact</span><strong>${esc(service.contact)}</strong></div>
                    <div><span>Office hours</span><strong>${esc(service.hours)}</strong></div>
                    <div><span>Location</span><strong>${esc(service.location)}</strong></div>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    ${link("/report", "Ask about this service", "button button-primary")}
                    ${link("/help", "Help & guidance", "button button-secondary")}
                </div>
            </div>
        </div>`;
    }

    const project = state.modalProject ? state.data.projects.find((p) => p.id === state.modalProject) : null;
    if (project) {
        const doneCount = Math.round((project.progress / 100) * project.milestones.length);
        return `<div class="modal-backdrop" data-action="close-modal">
            <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
                <button class="modal-close" type="button" data-action="close-modal" aria-label="Close">${icon("close")}</button>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span class="status-pill ${statusTone(project.status)}">${statusLabel(project.status)}</span>
                    <span class="small-note">${esc(project.category)} · ${esc(project.ward)}</span>
                </div>
                <h2 id="project-modal-title">${esc(project.title)}</h2>
                <p class="small-note" style="font-size:0.92rem;">${esc(project.summary)}</p>
                <div class="progress-block" style="padding-top:16px;">
                    <div class="progress-header"><span>Reported progress</span><strong>${project.progress}%</strong></div>
                    <div class="progress-track"><span class="progress-fill" style="width:${project.progress}%"></span></div>
                </div>
                <div class="detail-list" style="margin-bottom:14px;">
                    <div><span>Ward</span><strong>${esc(project.ward)}</strong></div>
                    <div><span>Allocated budget</span><strong class="tabular-nums">${formatKwacha(project.budget_kwacha)}</strong></div>
                    <div><span>Last update</span><strong>${esc(project.updated)}</strong></div>
                </div>
                <p class="kicker" style="margin-bottom:8px;">Key Milestones</p>
                <ul class="milestone-list">
                    ${project.milestones.map((m, idx) => `<li class="milestone-item ${idx < doneCount ? "done" : ""}">
                        <span class="milestone-dot"></span>
                        <span>${esc(m)}</span>
                        <span style="margin-left:auto;font-size:0.75rem;color:var(--ink-faint);">${idx < doneCount ? "Reached" : "Pending"}</span>
                    </li>`).join("")}
                </ul>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    ${link("/map", "View on district map", "button button-primary")}
                    ${link("/report", "Report an issue on this project", "button button-secondary")}
                </div>
            </div>
        </div>`;
    }

    const story = state.modalStory ? storyItems.find((s) => s.id === state.modalStory) : null;
    if (story) {
        return `<div class="modal-backdrop" data-action="close-modal">
            <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="story-modal-title">
                <button class="modal-close" type="button" data-action="close-modal" aria-label="Close">${icon("close")}</button>
                <img src="${esc(story.image)}" alt="${esc(story.alt)}" style="width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:16px;" />
                <p class="kicker">${esc(story.category)}</p>
                <h2 id="story-modal-title">${esc(story.title)}</h2>
                <p style="margin:0 0 12px;color:var(--ink-secondary);font-size:0.94rem;line-height:1.65;">${esc(story.description)}</p>
                <p class="small-note" style="margin-bottom:18px;">Reference: ${esc(story.source)}</p>
                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    ${link("/gallery", "Open photo gallery & map", "button button-primary")}
                    <button type="button" class="button button-secondary" data-action="close-modal">Close</button>
                </div>
            </div>
        </div>`;
    }

    return "";
}

/* ---------- Pure SVG Charts & Pro Admin Dashboard ---------- */
function allAdminSubmissions() {
    return [...(state.admin.submissions.reports || []), ...(state.admin.submissions.submissions || [])];
}

function chartScale(rawMax) {
    const peak = Math.max(1, Math.ceil(rawMax));
    if (peak <= 4) {
        return {
            axisMax: peak,
            ticks: Array.from({ length: peak + 1 }, (_, i) => i),
        };
    }
    const step = Math.ceil(peak / 4);
    return {
        axisMax: step * 4,
        ticks: [0, step, step * 2, step * 3, step * 4],
    };
}

function buildBarChartSvg(entries, { emptyText = "No records yet", color = "var(--accent)" } = {}) {
    if (!entries.length || entries.every((e) => e.value === 0)) {
        return `<div class="empty-state" style="padding:36px 16px;"><h3>${esc(emptyText)}</h3><p>Live counts will appear here automatically once records are recorded.</p></div>`;
    }
    const { axisMax, ticks } = chartScale(Math.max(...entries.map((e) => e.value), 1));
    const width = 540;
    const height = 210;
    const padLeft = 36;
    const padRight = 14;
    const padTop = 22;
    const padBottom = 38;
    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;
    const step = chartW / entries.length;
    const barW = Math.min(38, Math.max(16, step * 0.54));

    const gridLines = ticks.map((val) => {
        const y = padTop + chartH * (1 - val / axisMax);
        return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}" class="chart-gridline" />
            <text x="${padLeft - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis-label">${val}</text>`;
    }).join("");

    const bars = entries.map((entry, idx) => {
        const barH = Math.max(entry.value > 0 ? 6 : 0, (entry.value / axisMax) * chartH);
        const x = padLeft + idx * step + (step - barW) / 2;
        const y = padTop + chartH - barH;
        const shortLabel = entry.label.length > 11 ? `${entry.label.slice(0, 10)}…` : entry.label;
        return `<g class="chart-bar">
            <title>${esc(entry.label)}: ${entry.value}</title>
            <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="6" fill="${entry.color || color}" />
            <text x="${(x + barW / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" class="chart-axis-label" style="font-weight:600;fill:var(--ink-secondary);">${entry.value}</text>
            <text x="${(x + barW / 2).toFixed(1)}" y="${height - 14}" text-anchor="middle" class="chart-axis-label">${esc(shortLabel)}</text>
        </g>`;
    }).join("");

    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Distribution bar chart">${gridLines}${bars}</svg>`;
}

function buildDonutChartSvg(segments, totalLabel = "Items") {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    const radius = 62;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const rings = total === 0
        ? `<circle cx="85" cy="85" r="${radius}" fill="none" stroke="var(--surface-muted)" stroke-width="18" />`
        : segments.filter((s) => s.value > 0).map((s) => {
            const len = (s.value / total) * circumference;
            const seg = `<circle cx="85" cy="85" r="${radius}" fill="none" stroke="${s.color}" stroke-width="18" stroke-linecap="butt" stroke-dasharray="${len.toFixed(2)} ${circumference.toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 85 85)"><title>${esc(s.label)}: ${s.value}</title></circle>`;
            offset += len;
            return seg;
        }).join("");

    return `<div class="donut-layout">
        <div class="donut-wrap">
            <svg width="170" height="170" viewBox="0 0 170 170" role="img" aria-label="Editorial content distribution chart">
                ${rings}
            </svg>
            <div class="donut-center">
                <strong>${total}</strong>
                <span>${esc(totalLabel)}</span>
            </div>
        </div>
        <div class="chart-legend">
            ${segments.map((s) => `<div class="legend-row">
                <span class="legend-row-left"><span class="legend-swatch" style="background:${s.color};"></span>${esc(s.label)}</span>
                <strong class="tabular-nums">${s.value}</strong>
            </div>`).join("")}
        </div>
    </div>`;
}

function buildTrendAreaSvg(submissions) {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i -= 1) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("en-GB", { weekday: "short" });
        days.push({ key, label, count: 0 });
    }
    const dayMap = new Map(days.map((d) => [d.key, d]));
    for (const rec of submissions) {
        const key = String(rec.receivedAt || "").slice(0, 10);
        if (dayMap.has(key)) dayMap.get(key).count += 1;
    }

    const width = 540;
    const height = 180;
    const padL = 32;
    const padR = 16;
    const padT = 18;
    const padB = 30;
    const w = width - padL - padR;
    const h = height - padT - padB;
    const { axisMax, ticks } = chartScale(Math.max(...days.map((d) => d.count), 2));

    const pts = days.map((d, idx) => {
        const x = padL + (idx / (days.length - 1)) * w;
        const y = padT + h - (d.count / axisMax) * h;
        return { ...d, x, y };
    });

    const linePath = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const areaPath = `${linePath} L${pts.at(-1).x.toFixed(1)},${padT + h} L${pts[0].x.toFixed(1)},${padT + h} Z`;

    const grid = ticks.map((val) => {
        const y = padT + h * (1 - val / axisMax);
        return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - padR}" y2="${y.toFixed(1)}" class="chart-gridline" />
            <text x="${padL - 7}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis-label">${val}</text>`;
    }).join("");

    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="7-day submission trend">
        <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.28" />
                <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.01" />
            </linearGradient>
        </defs>
        ${grid}
        <path d="${areaPath}" fill="url(#trendGrad)" />
        <path d="${linePath}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${pts.map((p) => `<g>
            <title>${esc(p.label)} (${p.key}): ${p.count} submissions</title>
            <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2.5" />
            <text x="${p.x.toFixed(1)}" y="${height - 8}" text-anchor="middle" class="chart-axis-label">${esc(p.label)}</text>
        </g>`).join("")}
    </svg>`;
}

function renderLogin() {
    return `<main>
        <section class="card login-card">
            <div class="login-brand">
                <span class="brand-mark">M</span>
                <span class="brand-text"><strong>My Chinsali</strong><small>Staff Management Console</small></span>
            </div>
            <h1>Sign in to Staff Console</h1>
            <p class="small-note">Enter your local staff credentials to manage notices, gallery items, poll drafts, portal controls, and encrypted resident intake.</p>
            <form id="admin-form" class="login-form">
                <label class="field">
                    <span>Username</span>
                    <input name="username" autocomplete="username" autocapitalize="none" placeholder="admin" required />
                </label>
                <label class="field">
                    <span>Password</span>
                    <div class="password-wrap">
                        <input type="${state.admin.showPassword ? "text" : "password"}" name="password" autocomplete="current-password" placeholder="••••••••••••" required />
                        <button type="button" class="password-toggle" data-action="toggle-password">${state.admin.showPassword ? "Hide" : "Show"}</button>
                    </div>
                </label>
                <button class="button button-primary button-lg" type="submit" ${state.admin.loading ? "disabled" : ""}>
                    ${state.admin.loading ? "Verifying session..." : "Sign in"} ${icon("arrow")}
                </button>
            </form>
            ${state.admin.error ? `<p class="form-error" style="margin-top:14px;" role="alert">${esc(state.admin.error)}</p>` : ""}
            <div class="login-footer">
                ${link("/", `${icon("chevronLeft")} Back to public portal`, "text-button")}
                <span class="small-note">Session expires after 8h</span>
            </div>
        </section>
    </main>`;
}

function renderAdminOverview() {
    const overview = state.admin.overview ?? { news: 0, publishedNews: 0, gallery: 0, publishedGallery: 0, pollDrafts: 0 };
    const totalPublished = overview.publishedNews + overview.publishedGallery;
    const totalDrafts = (overview.news - overview.publishedNews) + (overview.gallery - overview.publishedGallery) + overview.pollDrafts;
    const reportsTotal = state.admin.submissionTotals.reports;
    const otherTotal = state.admin.submissionTotals.submissions;
    const totalIntake = reportsTotal + otherTotal;
    const allSubs = allAdminSubmissions();
    const pollsOpen = state.admin.settings.pollsOpen === true;
    const totalBudget = state.data.projects.reduce((sum, p) => sum + (p.budget_kwacha || 0), 0);
    const avgProgress = Math.round(state.data.projects.reduce((sum, p) => sum + p.progress, 0) / state.data.projects.length);

    // Chart 1 data based on selected chartView
    let barTitle = "Intake by Category";
    let barSubtitle = "Live decrypted resident submissions";
    let barEntries = [];
    if (state.admin.chartView === "projects") {
        barTitle = "Projects by Ward";
        barSubtitle = "Published district project distribution";
        const wardCounts = new Map(WARDS.filter((w) => w !== "Other").map((w) => [w, 0]));
        for (const p of state.data.projects) {
            wardCounts.set(p.ward, (wardCounts.get(p.ward) ?? 0) + 1);
        }
        barEntries = [...wardCounts.entries()].map(([label, value]) => ({ label, value, color: "var(--blue)" }));
    } else if (state.admin.chartView === "ward") {
        barTitle = "Submissions by Ward";
        barSubtitle = allSubs.length ? "Latest encrypted intake across wards" : "No encrypted resident records yet";
        const counts = new Map();
        for (const r of allSubs) {
            const w = r.submission?.ward || "Unspecified";
            counts.set(w, (counts.get(w) ?? 0) + 1);
        }
        barEntries = [...counts.entries()].map(([label, value]) => ({ label, value }));
    } else {
        barTitle = "Submissions by Category";
        barSubtitle = allSubs.length ? "Breakdown across issue & proposal categories" : "No encrypted resident records yet";
        const counts = new Map();
        for (const r of allSubs) {
            const c = r.submission?.category || r.submission?.kind || "Other";
            counts.set(c, (counts.get(c) ?? 0) + 1);
        }
        barEntries = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));
    }

    // Chart 2: Content Donut
    const donutSegments = [
        { label: "Published News", value: overview.publishedNews, color: "#146c43" },
        { label: "Draft News", value: Math.max(0, overview.news - overview.publishedNews), color: "#94a3b8" },
        { label: "Published Photos", value: overview.publishedGallery, color: "#0066cc" },
        { label: "Draft Photos", value: Math.max(0, overview.gallery - overview.publishedGallery), color: "#cbd5e1" },
        { label: "Poll Drafts", value: overview.pollDrafts, color: "#d97706" },
    ];

    const health = state.admin.health;

    return `<div class="kpi-grid">
        <article class="card kpi-card">
            <div class="kpi-head"><span class="kpi-label">Published Content</span><span class="icon-well" style="width:32px;height:32px;">${icon("news")}</span></div>
            <div class="kpi-value">${totalPublished}</div>
            <div class="kpi-foot"><span>${overview.publishedNews} news · ${overview.publishedGallery} photos</span><span>${totalDrafts} drafts</span></div>
        </article>
        <article class="card kpi-card">
            <div class="kpi-head"><span class="kpi-label">Resident Intake</span><span class="icon-well" style="width:32px;height:32px;">${icon("inbox")}</span></div>
            <div class="kpi-value">${state.admin.submissionsStatus === "ready" ? totalIntake : "—"}</div>
            <div class="kpi-foot"><span>${state.admin.submissionsStatus === "ready" ? `${reportsTotal} reports · ${otherTotal} other` : "Encryption key required"}</span><button type="button" class="text-button" style="font-size:0.75rem;" data-action="admin-tab" data-collection="reports">Review →</button></div>
        </article>
        <article class="card kpi-card">
            <div class="kpi-head"><span class="kpi-label">Consultation Voting</span><span class="icon-well" style="width:32px;height:32px;">${icon("poll")}</span></div>
            <div class="kpi-value">${pollsOpen ? "Open" : "Closed"}</div>
            <div class="kpi-foot"><span class="status-pill ${pollsOpen ? "tone-green" : "tone-amber"}">${pollsOpen ? "Accepting votes" : "Paused"}</span><span>${overview.pollDrafts} drafts</span></div>
        </article>
        <article class="card kpi-card">
            <div class="kpi-head"><span class="kpi-label">Tracked Portfolio</span><span class="icon-well" style="width:32px;height:32px;">${icon("fund")}</span></div>
            <div class="kpi-value">${formatCompactKwacha(totalBudget)}</div>
            <div class="kpi-foot"><span>${state.data.projects.length} projects</span><span>${avgProgress}% avg progress</span></div>
        </article>
    </div>

    <div class="charts-grid">
        <article class="card chart-card">
            <div class="chart-header">
                <div>
                    <h2>${esc(barTitle)}</h2>
                    <p>${esc(barSubtitle)}</p>
                </div>
                <div class="segmented-control" role="group" aria-label="Chart metric view">
                    ${[
                        ["category", "Category"],
                        ["ward", "Ward"],
                        ["projects", "Projects"],
                    ].map(([id, lbl]) => `<button type="button" class="${state.admin.chartView === id ? "selected" : ""}" data-action="admin-chart-view" data-view="${id}">${lbl}</button>`).join("")}
                </div>
            </div>
            <div class="chart-body">
                ${buildBarChartSvg(barEntries, {
                    emptyText: state.admin.submissionsStatus === "unavailable"
                        ? "Encrypted intake store not configured"
                        : "No resident submissions recorded yet",
                })}
            </div>
        </article>

        <article class="card chart-card">
            <div class="chart-header">
                <div>
                    <h2>Editorial Inventory</h2>
                    <p>Published items vs. pending drafts across collections</p>
                </div>
                <button type="button" class="button button-secondary button-sm" data-action="admin-tab" data-collection="news">Manage</button>
            </div>
            <div class="chart-body">
                ${buildDonutChartSvg(donutSegments, "Total records")}
            </div>
        </article>

        <article class="card chart-card">
            <div class="chart-header">
                <div>
                    <h2>7-Day Intake Trend</h2>
                    <p>Daily encrypted submissions received (web &amp; USSD)</p>
                </div>
                <span class="status-pill no-dot ${state.admin.submissionsStatus === "ready" ? "tone-green" : "tone-neutral"}">${state.admin.submissionsStatus === "ready" ? "Live" : "Offline"}</span>
            </div>
            <div class="chart-body">
                ${buildTrendAreaSvg(allSubs)}
            </div>
        </article>

        <article class="card chart-card">
            <div class="chart-header">
                <div>
                    <h2>District Project Execution</h2>
                    <p>Completion progress &amp; budget across active wards</p>
                </div>
                <button type="button" class="button button-secondary button-sm" data-action="admin-tab" data-collection="projects">Portfolio</button>
            </div>
            <div class="bar-list">
                ${state.data.projects.map((p) => `<div class="bar-row">
                    <div class="bar-row-head">
                        <strong>${esc(p.title)} <small style="color:var(--ink-faint);font-weight:450;">· ${esc(p.ward)}</small></strong>
                        <span>${p.progress}% · ${formatCompactKwacha(p.budget_kwacha)}</span>
                    </div>
                    <div class="bar-track"><div class="bar-fill" style="width:${p.progress}%;background:${p.status === "completed" ? "var(--accent)" : p.status === "ongoing" ? "#d97706" : "var(--blue)"};"></div></div>
                </div>`).join("")}
            </div>
        </article>
    </div>

    <div class="dashboard-lower-grid">
        <section class="card control-card">
            <div class="chart-header" style="margin-bottom:0;">
                <div><h2>Portal Controls</h2><p>Instant operational toggles &amp; actions</p></div>
            </div>
            <div class="control-row">
                <div>
                    <strong>Public Consultation Voting</strong>
                    <small>${pollsOpen ? "Portal currently accepts votes via cast_vote" : "Voting is blocked across public portal"}</small>
                </div>
                <label class="ios-switch" aria-label="Toggle public voting">
                    <input type="checkbox" data-action="admin-toggle-polls" ${pollsOpen ? "checked" : ""} />
                    <span class="ios-switch-track"></span>
                </label>
            </div>
            <div class="quick-action-grid">
                <button type="button" class="button button-secondary" data-action="admin-new" data-collection="news">${icon("plus")} New Notice</button>
                <button type="button" class="button button-secondary" data-action="admin-new" data-collection="gallery">${icon("plus")} Add Photo</button>
                <button type="button" class="button button-secondary" data-action="admin-new" data-collection="polls">${icon("plus")} Draft Poll</button>
                <button type="button" class="button button-secondary" data-action="admin-tab" data-collection="reports">${icon("inbox")} Intake Queue</button>
            </div>
        </section>

        <section class="card control-card">
            <div class="chart-header" style="margin-bottom:0;">
                <div><h2>System Health</h2><p>Live service status from /api/health</p></div>
            </div>
            <div>
                <div class="health-row">
                    <span>Encrypted Intake (AES-256-GCM)</span>
                    <span class="status-pill ${health?.submissions ? "tone-green" : "tone-amber"}">${health?.submissions ? "Active" : "Unconfigured"}</span>
                </div>
                <div class="health-row">
                    <span>Supabase cast_vote RPC</span>
                    <span class="status-pill ${health?.voting ? "tone-green" : "tone-amber"}">${health?.voting ? "Connected" : "Unconfigured"}</span>
                </div>
                <div class="health-row">
                    <span>ONTECH *388*133# USSD</span>
                    <span class="status-pill ${health?.ussd ? "tone-green" : "tone-amber"}">${health?.ussd ? "Ready" : "Unavailable"}</span>
                </div>
                <div class="health-row">
                    <span>Editorial Content &amp; Media</span>
                    <span class="status-pill tone-green">Operational</span>
                </div>
            </div>
        </section>

        <section class="card control-card">
            <div class="chart-header" style="margin-bottom:0;">
                <div><h2>Recent Intake</h2><p>Latest encrypted resident submissions</p></div>
                <button type="button" class="text-button" style="font-size:0.78rem;" data-action="admin-tab" data-collection="reports">All →</button>
            </div>
            <div class="activity-feed">
                ${allSubs.slice(0, 4).map((rec) => `<div class="activity-item">
                    <div>
                        <strong>${esc(rec.submission?.title || rec.submission?.category || "Submission")}</strong>
                        <small>${esc(rec.submission?.ward || "Unspecified")} · ${esc(rec.submission?.channel || "Web")} · ${esc(rec.reference)}</small>
                    </div>
                    <span class="status-pill no-dot tone-neutral">${esc(rec.submission?.kind || "record")}</span>
                </div>`).join("") || `<p class="small-note">No resident submissions loaded. ${state.admin.submissionsStatus === "unavailable" ? "Configure SUBMISSION_ENCRYPTION_KEY to enable intake." : "New reports will appear here as they arrive."}</p>`}
            </div>
        </section>
    </div>`;
}

function renderAdminEditor() {
    const { collection, editing } = state.admin;
    const val = (k) => esc(editing?.[k] ?? "");
    if (collection === "news") {
        return `<form class="card admin-editor-card" id="admin-news-form">
            <input type="hidden" name="id" value="${val("id")}" />
            <input type="hidden" name="image" value="${val("image")}" />
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                <div><p class="kicker">${editing ? "Editing Record" : "Create Content"}</p><h2 style="margin:2px 0 0;font-size:1.15rem;">${editing ? "Edit news item" : "New news item"}</h2></div>
                ${editing ? button("Cancel edit", "admin-cancel-edit", "button button-secondary button-sm") : ""}
            </div>
            ${editing?.image ? `<img class="admin-image-preview" src="${val("image")}" alt="" />` : ""}
            <div class="form-grid">
                <label class="field field-full"><span>Headline</span><input name="title" maxlength="140" value="${val("title")}" required placeholder="e.g. Ward budget meeting schedule" /></label>
                <label class="field"><span>Short label</span><input name="tag" maxlength="40" value="${val("tag")}" placeholder="Public notice" required /></label>
                <label class="field"><span>Publication date</span><input type="date" name="date" value="${val("date") || new Date().toISOString().slice(0, 10)}" required /></label>
                <label class="field"><span>Type</span><select name="type">${["notice", "update", "event", "opportunity"].map((t) => `<option value="${t}" ${editing?.type === t ? "selected" : ""}>${t[0].toUpperCase()}${t.slice(1)}</option>`).join("")}</select></label>
                <label class="field"><span>Visibility</span><select name="status"><option value="draft" ${editing?.status !== "published" ? "selected" : ""}>Draft</option><option value="published" ${editing?.status === "published" ? "selected" : ""}>Published</option></select></label>
                <label class="field field-full"><span>Summary</span><textarea name="excerpt" rows="4" maxlength="800" required placeholder="Concise public summary...">${val("excerpt")}</textarea></label>
                <label class="field"><span>Featured image <small>JPEG/PNG/WebP · max 5 MB</small></span><input type="file" name="imageFile" accept="image/jpeg,image/png,image/webp" /></label>
                <label class="field"><span>Image alt text</span><input name="imageAlt" maxlength="240" value="${val("imageAlt")}" placeholder="Required if image attached" /></label>
            </div>
            <div class="form-actions">
                <button class="button button-primary" type="submit">${editing ? "Save changes" : "Create news item"}</button>
            </div>
        </form>`;
    }
    if (collection === "gallery") {
        return `<form class="card admin-editor-card" id="admin-gallery-form">
            <input type="hidden" name="id" value="${val("id")}" />
            <input type="hidden" name="image" value="${val("image")}" />
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                <div><p class="kicker">${editing ? "Editing Photo" : "Upload Media"}</p><h2 style="margin:2px 0 0;font-size:1.15rem;">${editing ? "Edit gallery item" : "Add gallery photo"}</h2></div>
                ${editing ? button("Cancel edit", "admin-cancel-edit", "button button-secondary button-sm") : ""}
            </div>
            ${editing?.image ? `<img class="admin-image-preview" src="${val("image")}" alt="" />` : ""}
            <div class="form-grid">
                <label class="field field-full"><span>Photo title</span><input name="title" maxlength="140" value="${val("title")}" required /></label>
                <label class="field"><span>Category</span><select name="category">${["Heritage", "Nature", "Town life", "Food and markets", "Community life"].map((c) => `<option ${editing?.category === c ? "selected" : ""}>${c}</option>`).join("")}</select></label>
                <label class="field"><span>Visibility</span><select name="status"><option value="draft" ${editing?.status !== "published" ? "selected" : ""}>Draft</option><option value="published" ${editing?.status === "published" ? "selected" : ""}>Published</option></select></label>
                <label class="field field-full"><span>Description</span><textarea name="description" rows="3" maxlength="800" required>${val("description")}</textarea></label>
                <label class="field"><span>Alt text</span><input name="alt" maxlength="240" value="${val("alt")}" required /></label>
                <label class="field"><span>Source / credit</span><input name="source" maxlength="200" value="${val("source")}" required /></label>
                <label class="field field-full"><span>Image file <small>JPEG/PNG/WebP · max 5 MB</small></span><input type="file" name="imageFile" accept="image/jpeg,image/png,image/webp" ${editing?.image ? "" : "required"} /></label>
            </div>
            <div class="form-actions">
                <button class="button button-primary" type="submit">${editing ? "Save changes" : "Upload & save photo"}</button>
            </div>
        </form>`;
    }
    return `<form class="card admin-editor-card" id="admin-poll-form">
        <input type="hidden" name="id" value="${val("id")}" />
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <div><p class="kicker">${editing ? "Editing Draft" : "Consultation Draft"}</p><h2 style="margin:2px 0 0;font-size:1.15rem;">${editing ? "Edit poll draft" : "Create poll draft"}</h2></div>
            ${editing ? button("Cancel edit", "admin-cancel-edit", "button button-secondary button-sm") : ""}
        </div>
        <div class="callout callout-info" style="margin-bottom:14px;">
            <span class="callout-icon">${icon("poll")}</span>
            <div><strong>Polls save as local drafts</strong><p>Live public voting uses an existing database poll record and the cast_vote function.</p></div>
        </div>
        <div class="form-grid">
            <label class="field field-full"><span>Consultation question</span><textarea name="question" rows="3" maxlength="240" required>${val("question")}</textarea></label>
            <label class="field"><span>Closing date</span><input type="date" name="closes" value="${val("closes") || new Date().toISOString().slice(0, 10)}" required /></label>
            <label class="field field-full"><span>Options <small>one per line · 2–6 options</small></span><textarea name="options" rows="5" maxlength="800" required>${esc(editing?.options?.join("\n") ?? "")}</textarea></label>
        </div>
        <div class="form-actions">
            <button class="button button-primary" type="submit">${editing ? "Save poll draft" : "Create poll draft"}</button>
        </div>
    </form>`;
}

function renderAdminContentManager() {
    const collection = state.admin.collection;
    const raw = state.admin.items[collection] ?? [];
    const q = state.admin.searchQuery.trim().toLowerCase();
    const filtered = raw.filter((item) => {
        const statusMatch = collection === "polls" || state.admin.statusFilter === "all" || item.status === state.admin.statusFilter;
        const text = `${item.title || item.question || ""} ${item.excerpt || item.description || ""} ${item.tag || item.category || ""}`.toLowerCase();
        return statusMatch && (!q || text.includes(q));
    });

    return `<div class="admin-toolbar">
        ${collection !== "polls" ? `<div class="segmented-control" role="group" aria-label="Filter by status">
            ${[["all", "All"], ["published", "Published"], ["draft", "Drafts"]].map(([k, lbl]) => `<button type="button" class="${state.admin.statusFilter === k ? "selected" : ""}" data-action="admin-status-filter" data-status="${k}">${lbl}</button>`).join("")}
        </div>` : `<span class="small-note"><strong class="tabular-nums">${raw.length}</strong> poll drafts saved</span>`}
        <div style="display:flex;gap:8px;align-items:center;">
            <span class="small-note tabular-nums">${filtered.length} shown</span>
            <button type="button" class="button button-primary button-sm" data-action="admin-new" data-collection="${collection}">${icon("plus")} New ${collection === "news" ? "Notice" : collection === "gallery" ? "Photo" : "Poll Draft"}</button>
        </div>
    </div>
    <div class="admin-workspace">
        <div class="admin-item-list">
            ${filtered.map((item) => {
                const title = collection === "polls" ? item.question : item.title;
                const desc = collection === "news" ? item.excerpt : collection === "gallery" ? item.description : `${item.options.join(" · ")} · Closes ${item.closes}`;
                const isEditing = state.admin.editing?.id === item.id;
                return `<article class="card admin-item-card ${isEditing ? "editing" : ""}">
                    ${item.image ? `<img class="admin-item-thumb" src="${esc(item.image)}" alt="" loading="lazy" />` : ""}
                    <div class="admin-item-main">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            <span class="status-pill ${item.status === "published" ? "tone-green" : "tone-neutral"}">${item.status === "published" ? "Published" : "Draft"}</span>
                            ${item.tag || item.category ? `<span class="small-note">${esc(item.tag || item.category)}</span>` : ""}
                            ${item.date ? `<span class="small-note">· ${esc(item.date)}</span>` : ""}
                        </div>
                        <h3>${esc(title)}</h3>
                        <p>${esc(desc)}</p>
                    </div>
                    <div class="admin-item-actions">
                        <button type="button" class="button button-secondary button-sm" data-action="admin-edit" data-collection="${collection}" data-id="${esc(item.id)}">Edit</button>
                        ${collection !== "polls" ? `<button type="button" class="button button-secondary button-sm" data-action="admin-toggle-publish" data-collection="${collection}" data-id="${esc(item.id)}">${item.status === "published" ? "Unpublish" : "Publish"}</button>` : ""}
                        <button type="button" class="button button-danger button-sm" data-action="admin-delete" data-collection="${collection}" data-id="${esc(item.id)}">Delete</button>
                    </div>
                </article>`;
            }).join("") || `<div class="empty-state"><h3>No items match this view</h3><p>Create a new record on the right or adjust your filter.</p></div>`}
        </div>
        ${renderAdminEditor()}
    </div>`;
}

function renderAdminSubmissionsView() {
    const view = state.admin.collection;
    if (state.admin.submissionsLoading) {
        return `<div class="card" style="padding:36px;text-align:center;"><p class="small-note">Decrypting recent resident records…</p></div>`;
    }
    if (state.admin.submissionsStatus === "unavailable") {
        return `<div class="callout callout-warn">
            <span class="callout-icon">${icon("lock")}</span>
            <div>
                <strong>Encrypted intake store is not configured</strong>
                <p>Start the backend with a 32-byte base64 <code>SUBMISSION_ENCRYPTION_KEY</code> environment variable (see <code>backend/README.md</code>) to inspect decrypted resident records.</p>
            </div>
        </div>`;
    }
    if (state.admin.submissionsStatus === "error") {
        return `<div class="callout callout-warn">
            <span class="callout-icon">${icon("alert")}</span>
            <div>
                <strong>Could not load resident submissions</strong>
                <p>Try refreshing the encrypted intake queue.</p>
            </div>
            <button type="button" class="button button-secondary button-sm" style="margin-left:auto;" data-action="admin-refresh-submissions">${icon("refresh")} Retry</button>
        </div>`;
    }
    const items = state.admin.submissions[view] ?? [];
    const q = state.admin.searchQuery.trim().toLowerCase();
    const filtered = items.filter((rec) => {
        const sub = rec.submission ?? {};
        const wardMatch = state.admin.submissionWardFilter === "All" || (sub.ward || "Other") === state.admin.submissionWardFilter;
        const chan = (sub.channel || "web").toLowerCase();
        const chanMatch = state.admin.submissionChannelFilter === "all" || chan === state.admin.submissionChannelFilter;
        const text = `${rec.reference} ${sub.title || ""} ${sub.category || ""} ${sub.ward || ""} ${sub.details || ""}`.toLowerCase();
        return wardMatch && chanMatch && (!q || text.includes(q));
    });

    return `<div class="callout callout-info">
        <span class="callout-icon">${icon("lock")}</span>
        <div>
            <strong>Staff-only encrypted intake · Read-only</strong>
            <p>Resident records are encrypted with AES-256-GCM at rest and never exposed on public endpoints. Showing up to the latest 100 entries.</p>
        </div>
    </div>
    <div class="admin-toolbar">
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
            <div class="segmented-control" role="group" aria-label="Channel filter">
                ${[["all", "All channels"], ["web", "Web"], ["ussd", "USSD"]].map(([k, lbl]) => `<button type="button" class="${state.admin.submissionChannelFilter === k ? "selected" : ""}" data-action="admin-channel-filter" data-channel="${k}">${lbl}</button>`).join("")}
            </div>
            <select class="filter-chip" id="admin-sub-ward-select" aria-label="Filter by ward">
                <option value="All">All wards</option>
                ${WARDS.map((w) => `<option value="${esc(w)}" ${state.admin.submissionWardFilter === w ? "selected" : ""}>${esc(w)}</option>`).join("")}
            </select>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
            <span class="small-note tabular-nums">${filtered.length} of ${state.admin.submissionTotals[view] ?? items.length} records</span>
            <button type="button" class="button button-secondary button-sm" data-action="admin-refresh-submissions">${icon("refresh")} Refresh</button>
        </div>
    </div>
    <div class="admin-item-list">
        ${filtered.map((rec) => {
            const sub = rec.submission ?? {};
            const dt = new Date(rec.receivedAt);
            const dateLabel = Number.isNaN(dt.getTime()) ? rec.receivedAt : dt.toLocaleString();
            const contact = [sub.phone, sub.contact].filter(Boolean).join(" · ");
            return `<article class="card admin-submission-card">
                <div class="admin-submission-head">
                    <div>
                        <span class="status-pill no-dot tone-blue">${esc(sub.kind || "submission")}</span>
                        <h3>${esc(sub.title || sub.category || "Resident submission")}</h3>
                    </div>
                    <div class="admin-submission-ref">
                        <strong>${esc(rec.reference)}</strong>
                        <span>${esc(dateLabel)}</span>
                    </div>
                </div>
                <dl class="admin-submission-meta">
                    <div><dt>Ward</dt><dd>${esc(sub.ward || "Not provided")}</dd></div>
                    <div><dt>Category</dt><dd>${esc(sub.category || "Not provided")}</dd></div>
                    <div><dt>Channel</dt><dd>${esc((sub.channel || "Web").toUpperCase())}</dd></div>
                    <div><dt>Contact</dt><dd>${esc(contact || (sub.anonymous ? "Anonymous" : "Not provided"))}</dd></div>
                </dl>
                <p class="admin-submission-body">${esc(sub.details || "")}</p>
            </article>`;
        }).join("") || `<div class="empty-state"><h3>No matching records</h3><p>Try adjusting the ward, channel, or search filter.</p></div>`}
    </div>`;
}

function renderAdminProjectsView() {
    const q = state.admin.searchQuery.trim().toLowerCase();
    const list = state.data.projects.filter((p) => !q || `${p.title} ${p.ward} ${p.category} ${p.status}`.toLowerCase().includes(q));
    const sectorTotals = new Map();
    for (const p of state.data.projects) {
        sectorTotals.set(p.category, (sectorTotals.get(p.category) ?? 0) + (p.budget_kwacha || 0));
    }
    const palette = ["#146c43", "#0066cc", "#d97706", "#6366f1", "#0891b2", "#64748b"];
    const donutSegs = [...sectorTotals.entries()].map(([label, val], i) => ({
        label,
        value: Math.round(val / 1000),
        color: palette[i % palette.length],
    }));

    return `<div class="charts-grid">
        <article class="card chart-card">
            <div class="chart-header"><div><h2>Budget Allocation by Sector</h2><p>Values shown in ZMW thousands (K'000)</p></div></div>
            <div class="chart-body">${buildDonutChartSvg(donutSegs, "K'000 total")}</div>
        </article>
        <article class="card chart-card">
            <div class="chart-header"><div><h2>Completion Progress</h2><p>Current stage across published district works</p></div></div>
            <div class="chart-body">${buildBarChartSvg(state.data.projects.map((p) => ({ label: p.ward, value: p.progress, color: p.status === "completed" ? "var(--accent)" : "#0066cc" })))}</div>
        </article>
    </div>
    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead>
                <tr><th>Project</th><th>Ward</th><th>Category</th><th>Status</th><th>Progress</th><th>Budget</th><th>Updated</th><th></th></tr>
            </thead>
            <tbody>
                ${list.map((p) => `<tr>
                    <td><strong>${esc(p.title)}</strong></td>
                    <td>${esc(p.ward)}</td>
                    <td>${esc(p.category)}</td>
                    <td><span class="status-pill ${statusTone(p.status)}">${statusLabel(p.status)}</span></td>
                    <td class="tabular-nums" style="min-width:130px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <div class="progress-track" style="flex:1;margin:0;"><span class="progress-fill" style="width:${p.progress}%"></span></div>
                            <strong>${p.progress}%</strong>
                        </div>
                    </td>
                    <td class="tabular-nums">${formatKwacha(p.budget_kwacha)}</td>
                    <td>${esc(p.updated)}</td>
                    <td><button type="button" class="button button-secondary button-sm" data-action="project-detail" data-id="${esc(p.id)}">Inspect</button></td>
                </tr>`).join("")}
            </tbody>
        </table>
    </div>
    <p class="small-note">Showing curated district baseline records. Connect a council project database table to edit live project milestones.</p>`;
}

function renderAdminSettingsView() {
    const pollsOpen = state.admin.settings.pollsOpen === true;
    const health = state.admin.health;
    return `<div class="charts-grid">
        <section class="card control-card">
            <div><p class="kicker">Consultation Gate</p><h2>Voting Controls</h2></div>
            <form id="admin-settings-form" style="display:grid;gap:14px;">
                <div class="control-row">
                    <div>
                        <strong>Allow public voting through portal</strong>
                        <small>Currently ${pollsOpen ? "open — forwarding votes to cast_vote RPC" : "closed — public poll cards show closed notice"}</small>
                    </div>
                    <label class="ios-switch">
                        <input type="checkbox" name="pollsOpen" ${pollsOpen ? "checked" : ""} />
                        <span class="ios-switch-track"></span>
                    </label>
                </div>
                <div>
                    <button class="button button-primary" type="submit">Save portal settings</button>
                </div>
            </form>
            <p class="small-note">Closing voting blocks submissions through <code>POST /api/votes</code>. It does not alter underlying Supabase poll rows.</p>
        </section>

        <section class="card control-card">
            <div><p class="kicker">Environment Telemetry</p><h2>Active Services &amp; Security</h2></div>
            <div>
                <div class="health-row"><span>AES-256-GCM Submissions</span><span class="status-pill ${health?.submissions ? "tone-green" : "tone-amber"}">${health?.submissions ? "Active" : "Unconfigured"}</span></div>
                <div class="health-row"><span>Supabase cast_vote RPC</span><span class="status-pill ${health?.voting ? "tone-green" : "tone-amber"}">${health?.voting ? "Configured" : "Unconfigured"}</span></div>
                <div class="health-row"><span>ONTECH *388*133# USSD</span><span class="status-pill ${health?.ussd ? "tone-green" : "tone-amber"}">${health?.ussd ? "Ready" : "Unavailable"}</span></div>
                <div class="health-row"><span>Session Cookie Policy</span><span class="status-pill tone-green">HttpOnly · SameSite=Strict</span></div>
            </div>
        </section>
    </div>`;
}

function renderAdmin() {
    if (state.admin.loading && !state.admin.authenticated) {
        return `<main class="container page-shell narrow-shell"><div class="card" style="padding:36px;text-align:center;"><p class="kicker">Staff Console</p><h1 style="margin:8px 0;">Checking staff session…</h1></div></main>`;
    }
    if (!state.admin.authenticated) {
        return `<main class="container page-shell narrow-shell">
            ${pageHeader("Staff Console", "Sign-in required", "The management dashboard is available to authenticated council staff only.", link("/login", `Go to staff sign in ${icon("arrow")}`, "button button-primary"))}
        </main>`;
    }

    const meta = {
        overview: { title: "Executive Dashboard", sub: "Chinsali Municipal Council · Overview & telemetry", cta: null },
        news: { title: "News & Notices", sub: "Publish announcements, development updates, and events", cta: { label: "New Notice", col: "news" } },
        gallery: { title: "Photo Gallery", sub: "Upload and curate public Chinsali imagery", cta: { label: "Add Photo", col: "gallery" } },
        polls: { title: "Poll Drafts", sub: "Prepare consultation questions and closing dates", cta: { label: "Draft Poll", col: "polls" } },
        reports: { title: "Issue Reports", sub: "Encrypted resident infrastructure & service reports", cta: null },
        submissions: { title: "Proposals & Feedback", sub: "Community proposals and ward feedback", cta: null },
        projects: { title: "District Projects", sub: "Portfolio budgets, allocations, and milestones", cta: null },
        settings: { title: "Portal Controls", sub: "Voting gate, channel health, and security posture", cta: null },
    }[state.admin.collection] || { title: "Staff Console", sub: "", cta: null };

    const navGroups = [
        {
            label: "Overview",
            items: [{ id: "overview", label: "Dashboard", icon: "dashboard" }],
        },
        {
            label: "Publishing",
            items: [
                { id: "news", label: "News & Notices", icon: "news", badge: state.admin.items.news.length },
                { id: "gallery", label: "Photo Gallery", icon: "image", badge: state.admin.items.gallery.length },
                { id: "polls", label: "Poll Drafts", icon: "poll", badge: state.admin.items.polls.length },
            ],
        },
        {
            label: "Resident Intake",
            items: [
                { id: "reports", label: "Issue Reports", icon: "report", badge: state.admin.submissionsStatus === "ready" ? state.admin.submissionTotals.reports : null },
                { id: "submissions", label: "Proposals & Feedback", icon: "inbox", badge: state.admin.submissionsStatus === "ready" ? state.admin.submissionTotals.submissions : null },
            ],
        },
        {
            label: "Operations",
            items: [
                { id: "projects", label: "Projects & Budgets", icon: "project", badge: state.data.projects.length },
                { id: "settings", label: "Portal Controls", icon: "settings" },
            ],
        },
    ];

    let viewBody = "";
    if (state.admin.collection === "overview") viewBody = renderAdminOverview();
    else if (["news", "gallery", "polls"].includes(state.admin.collection)) viewBody = renderAdminContentManager();
    else if (["reports", "submissions"].includes(state.admin.collection)) viewBody = renderAdminSubmissionsView();
    else if (state.admin.collection === "projects") viewBody = renderAdminProjectsView();
    else viewBody = renderAdminSettingsView();

    const pollsOpen = state.admin.settings.pollsOpen === true;

    return `<main class="admin-shell">
        ${state.admin.sidebarOpen ? `<div class="admin-sidebar-backdrop" data-action="admin-close-sidebar"></div>` : ""}
        <aside class="admin-sidebar ${state.admin.sidebarOpen ? "open" : ""}" aria-label="Management navigation">
            <div class="admin-sidebar-brand">
                <a href="#/" class="brand" data-route="/"><span class="brand-mark">M</span><span class="brand-text"><strong>My Chinsali</strong><small>Staff Console</small></span></a>
            </div>
            ${navGroups.map((group) => `<div class="admin-nav-group">
                <p class="admin-nav-label">${group.label}</p>
                <div class="admin-nav-list">
                    ${group.items.map((item) => `<button type="button" class="admin-nav-item ${state.admin.collection === item.id ? "selected" : ""}" data-action="admin-tab" data-collection="${item.id}">
                        ${icon(item.icon)}
                        <span>${item.label}</span>
                        ${item.badge != null ? `<span class="admin-nav-badge">${item.badge}</span>` : ""}
                    </button>`).join("")}
                </div>
            </div>`).join("")}
            <div class="admin-sidebar-footer">
                ${link("/", `${icon("external")} <span>View Public Portal</span>`, "admin-nav-item")}
                <button type="button" class="admin-nav-item" data-action="toggle-theme">${icon(state.theme === "dark" ? "sun" : "moon")} <span>${state.theme === "dark" ? "Light Mode" : "Dark Mode"}</span></button>
                <button type="button" class="admin-nav-item" data-action="admin-logout">${icon("logout")} <span>Sign Out</span></button>
            </div>
        </aside>

        <div class="admin-main">
            <header class="admin-topbar">
                <div class="admin-topbar-left">
                    <button type="button" class="icon-button admin-sidebar-toggle" data-action="admin-open-sidebar" aria-label="Open management menu">${icon("menu")}</button>
                    <div class="admin-topbar-title">
                        <h1>${meta.title}</h1>
                        <p>${meta.sub}</p>
                    </div>
                </div>
                <div class="admin-topbar-actions">
                    ${state.admin.collection !== "overview" && state.admin.collection !== "settings" ? `<label class="search-field admin-search">
                        ${icon("search")}
                        <input id="admin-search-input" value="${esc(state.admin.searchQuery)}" placeholder="Filter current view..." aria-label="Filter current view" />
                    </label>` : ""}
                    <button type="button" class="status-pill ${pollsOpen ? "tone-green" : "tone-amber"}" style="border:0;cursor:pointer;" data-action="admin-tab" data-collection="settings" title="Open voting controls">
                        ${pollsOpen ? "Voting Open" : "Voting Closed"}
                    </button>
                    ${meta.cta ? `<button type="button" class="button button-primary button-sm" data-action="admin-new" data-collection="${meta.cta.col}">${icon("plus")} ${meta.cta.label}</button>` : ""}
                </div>
            </header>
            <div class="admin-content">
                ${state.admin.error ? `<p class="form-error" role="alert">${esc(state.admin.error)}</p>` : ""}
                ${viewBody}
            </div>
        </div>
    </main>`;
}

/* ---------- Routing & Rendering ---------- */
function renderPage() {
    switch (state.route) {
        case "/search": return renderSearch();
        case "/services": return renderServices();
        case "/community": return renderCommunity();
        case "/propose": return renderPropose();
        case "/report": return renderReport();
        case "/whistleblowing": return renderWhistleblowing();
        case "/tracker": return renderTracker();
        case "/map": return renderMap();
        case "/gallery": return renderGallery();
        case "/polls": return renderPolls();
        case "/news": return renderNews();
        case "/help": return renderHelp();
        case "/admin": return renderAdmin();
        case "/login": return renderLogin();
        default: return renderHome();
    }
}

function syncHeroTimer() {
    if (heroTimer) {
        window.clearInterval(heroTimer);
        heroTimer = null;
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (state.route === "/" && !reduced) {
        heroTimer = window.setInterval(() => {
            if (!document.querySelector("#hero-bg-slides")) return;
            state.heroIndex = (state.heroIndex + 1) % heroSlides.length;
            syncHeroDom();
        }, 5500);
    }
}

function initLandmarkMap() {
    const element = document.querySelector("#landmark-map");
    if (!element) return;
    if (!window.L) {
        element.innerHTML = `<div class="empty-state" style="border:0;height:100%;display:grid;place-content:center;"><h3>Map unavailable offline</h3><p>Connect to the internet to load OpenStreetMap landmark tiles.</p></div>`;
        return;
    }
    landmarkMap = window.L.map(element, { scrollWheelZoom: false });
    const tiles = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(landmarkMap);
    tiles.on("tileerror", () => {
        if (!element.querySelector(".map-tile-warning")) {
            element.insertAdjacentHTML("beforeend", `<div style="position:absolute;z-index:500;right:12px;bottom:12px;padding:8px 12px;border-radius:8px;background:var(--surface);border:1px solid var(--border);font-size:0.78rem;">Map tiles could not be loaded.</div>`);
        }
    });
    const gallery = allGalleryItems();
    const markers = landmarkLocations.map((loc) => {
        const item = galleryItems.find((g) => g.id === loc.galleryId);
        const marker = window.L.marker([loc.lat, loc.lng]).addTo(landmarkMap);
        marker.bindPopup(`<strong>${esc(loc.title)}</strong><br><span>${esc(loc.category)} · ${esc(loc.accuracy)}</span><br><button type="button" class="text-button" style="margin-top:6px;font-size:0.78rem;" data-action="gallery-open" data-index="${gallery.indexOf(item)}">Open gallery photo →</button>`);
        return marker;
    });
    if (markers.length) landmarkMap.fitBounds(window.L.featureGroup(markers).getBounds().pad(0.15));
    window.setTimeout(() => landmarkMap?.invalidateSize(), 0);
}

function initCommunityMap() {
    const element = document.querySelector("#community-map");
    if (!element) return;
    communityMarkers = new Map();
    const filtered = state.mapFilter === "all" ? mapPoints : mapPoints.filter((p) => p.type === state.mapFilter);

    if (!window.L) {
        element.innerHTML = `<svg viewBox="0 0 800 480" style="width:100%;height:100%;background:var(--surface-muted);" role="img" aria-label="District coordinate reference">
            <g stroke="var(--border)" stroke-width="1">${[1, 2, 3, 4].map((i) => `<line x1="0" y1="${i * 96}" x2="800" y2="${i * 96}" /><line x1="${i * 160}" y1="0" x2="${i * 160}" y2="480" />`).join("")}</g>
            ${filtered.map((pt) => `<g style="cursor:pointer;" data-action="map-select" data-id="${esc(pt.id)}">
                <circle cx="${pt.x * 8}" cy="${pt.y * 4.8}" r="${state.selectedMapPointId === pt.id ? 13 : 9}" fill="${pt.type === "project" ? "#146c43" : pt.type === "facility" ? "#0066cc" : "#d97706"}" stroke="#ffffff" stroke-width="3" />
                <text x="${pt.x * 8}" y="${pt.y * 4.8 - 16}" text-anchor="middle" style="font-size:11px;font-weight:600;fill:var(--ink);">${esc(pt.title)}</text>
            </g>`).join("")}
        </svg>`;
        return;
    }

    communityMap = window.L.map(element, { scrollWheelZoom: false });
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(communityMap);

    const group = [];
    for (const pt of filtered) {
        const iconHtml = `<div class="leaflet-pin pin-${pt.type}">${pt.type === "project" ? "P" : pt.type === "facility" ? "+" : "!"}</div>`;
        const markerIcon = window.L.divIcon({ className: "", html: iconHtml, iconSize: [26, 26], iconAnchor: [13, 13] });
        const marker = window.L.marker([pt.lat, pt.lng], { icon: markerIcon }).addTo(communityMap);
        marker.bindPopup(`<strong>${esc(pt.title)}</strong><br><span>${esc(pt.ward)} · ${esc(pt.status)}</span>`);
        marker.on("click", () => {
            state.selectedMapPointId = pt.id;
            document.querySelectorAll(".map-point-btn").forEach((el) => {
                el.classList.toggle("selected", el.dataset.id === pt.id);
            });
        });
        communityMarkers.set(pt.id, marker);
        group.push(marker);
    }

    if (group.length) {
        communityMap.fitBounds(window.L.featureGroup(group).getBounds().pad(0.18));
    } else {
        communityMap.setView([-10.55, 32.06], 12);
    }
    window.setTimeout(() => communityMap?.invalidateSize(), 0);
}

function render(options = {}) {
    const app = document.querySelector("#app");
    if (!app) return;

    document.documentElement.dataset.theme = state.theme;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", state.theme === "dark" ? "#0c0f0e" : "#f5f5f7");

    const isAdminShell = state.route === "/admin" && state.admin.authenticated;
    document.body.classList.toggle("mobile-menu-open", state.mobileOpen);
    document.body.classList.toggle("login-route", state.route === "/login");
    document.body.classList.toggle("admin-route", isAdminShell);

    landmarkMap?.remove();
    landmarkMap = null;
    communityMap?.remove();
    communityMap = null;

    const routeName = state.route === "/" ? "My Chinsali" : `${state.route.slice(1).replaceAll("-", " ")} · My Chinsali`;
    document.title = routeName;

    if (state.route === "/login" || isAdminShell) {
        app.innerHTML = `${renderPage()}${renderModals()}`;
    } else {
        app.innerHTML = `${renderHeader()}${renderPage()}${renderFooter()}${renderModals()}`;
    }

    initLandmarkMap();
    initCommunityMap();
    syncHeroTimer();

    if (options.transition) {
        app.classList.remove("route-exit");
        app.classList.add("route-enter");
        window.setTimeout(() => app.classList.remove("route-enter"), 290);
    }

    const modalOpen = Boolean(state.modalService || state.modalProject || state.modalStory || state.galleryIndex !== null);
    document.body.classList.toggle("modal-open", modalOpen);
}

function showToast(message, tone = "success") {
    document.querySelector(".toast")?.remove();
    const toast = document.createElement("div");
    toast.className = `toast toast-${tone}`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `${icon(tone === "success" ? "check" : "alert")}<span>${esc(message)}</span>`;
    document.body.append(toast);
    if (state.toastTimer) window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.remove(), 4200);
}

function navigate(route) {
    const next = normalizeRoute(route);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    state.navDropdownOpen = false;
    state.mobileOpen = false;
    if (next === state.route) {
        render();
        if ((next === "/admin" || next === "/login") && !state.admin.loading) void refreshAdminSession();
        return;
    }
    const commit = () => {
        state.route = next;
        state.modalService = null;
        state.modalProject = null;
        state.modalStory = null;
        state.galleryIndex = null;
        window.history.pushState({}, "", `#${next}`);
        render({ transition: !reduced });
        if ((next === "/admin" || next === "/login") && !state.admin.loading) void refreshAdminSession();
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    };
    const app = document.querySelector("#app");
    if (!app || reduced) {
        commit();
        return;
    }
    app.classList.remove("route-enter");
    app.classList.add("route-exit");
    window.setTimeout(commit, 140);
}

/* ---------- Backend API & State Sync ---------- */
async function adminRequest(path, { method = "GET", body } = {}) {
    const options = { method, credentials: "same-origin", headers: {} };
    if (body !== undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    const response = await fetch(path, options);
    let result = {};
    if (response.status !== 204) {
        try {
            result = await response.json();
        } catch {
            throw new Error("The staff service returned an invalid response.");
        }
    }
    if (!response.ok) throw new Error(result.error ?? "The staff request could not be completed.");
    return result;
}

async function loadPublicContent() {
    try {
        const response = await fetch("/api/content/public");
        if (!response.ok) return;
        const content = await response.json();
        if (!Array.isArray(content.news) || !Array.isArray(content.gallery) || typeof content.pollsOpen !== "boolean") return;
        state.data.content = content;
        if (state.route !== "/admin") render();
    } catch {
        /* offline static mode */
    }
}

async function fetchSubmissionSlices() {
    state.admin.submissionsLoading = true;
    try {
        const [reportsRes, otherRes] = await Promise.all([
            adminRequest("/api/admin/submissions?kind=reports&limit=100"),
            adminRequest("/api/admin/submissions?kind=submissions&limit=100"),
        ]);
        state.admin.submissions = {
            reports: Array.isArray(reportsRes.items) ? reportsRes.items : [],
            submissions: Array.isArray(otherRes.items) ? otherRes.items : [],
        };
        state.admin.submissionTotals = {
            reports: reportsRes.total ?? state.admin.submissions.reports.length,
            submissions: otherRes.total ?? state.admin.submissions.submissions.length,
        };
        state.admin.submissionsStatus = "ready";
    } catch (error) {
        const msg = error instanceof Error ? error.message : "";
        state.admin.submissionsStatus = /not configured|encrypted/i.test(msg) ? "unavailable" : "error";
    } finally {
        state.admin.submissionsLoading = false;
    }
}

async function loadAdminWorkspace() {
    state.admin.loading = true;
    state.admin.error = "";
    render();
    try {
        const [overview, newsItems, galleryRes, pollsRes, settings, health] = await Promise.all([
            adminRequest("/api/admin/overview"),
            adminRequest("/api/admin/content/news"),
            adminRequest("/api/admin/content/gallery"),
            adminRequest("/api/admin/content/polls"),
            adminRequest("/api/admin/settings"),
            fetch("/api/health").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ]);
        state.admin.overview = overview;
        state.admin.items = { news: newsItems.items, gallery: galleryRes.items, polls: pollsRes.items };
        state.admin.settings = settings;
        state.admin.health = health;
        state.admin.authenticated = true;
        await fetchSubmissionSlices();
        state.admin.loading = false;
        render();
    } catch (error) {
        state.admin.loading = false;
        state.admin.error = error instanceof Error ? error.message : "The staff workspace could not be loaded.";
        if (/sign in|session/i.test(state.admin.error)) {
            state.admin.authenticated = false;
            if (state.route === "/admin") {
                state.route = "/login";
                window.history.replaceState({}, "", "#/login");
            }
        }
        render();
    }
}

async function loadAdminSubmissions() {
    state.admin.submissionsLoading = true;
    render();
    await fetchSubmissionSlices();
    render();
}

async function updatePortalPollsOpen(pollsOpen) {
    const settings = await adminRequest("/api/admin/settings", { method: "PUT", body: { pollsOpen } });
    state.admin.settings = settings;
    await loadPublicContent();
    render();
    showToast(pollsOpen ? "Public voting reopened." : "Public voting closed.");
}

async function refreshAdminSession() {
    state.admin.loading = true;
    state.admin.error = "";
    render();
    try {
        const session = await adminRequest("/api/admin/session");
        state.admin.authenticated = session.authenticated === true;
        state.admin.loading = false;
        if (state.admin.authenticated) {
            if (state.route === "/login") {
                state.route = "/admin";
                window.history.replaceState({}, "", "#/admin");
            }
            await loadAdminWorkspace();
        } else if (state.route === "/admin") {
            state.route = "/login";
            window.history.replaceState({}, "", "#/login");
            render();
        } else {
            render();
        }
    } catch {
        state.admin.loading = false;
        state.admin.authenticated = false;
        state.admin.error = "The local staff service is unavailable. Start the backend and try again.";
        if (state.route === "/admin") {
            state.route = "/login";
            window.history.replaceState({}, "", "#/login");
        }
        render();
    }
}

async function handleAdminLogin(form) {
    const submitButton = form.querySelector("button[type=submit]");
    if (submitButton) submitButton.disabled = true;
    state.admin.loading = true;
    state.admin.error = "";
    render();
    try {
        await adminRequest("/api/admin/session", {
            method: "POST",
            body: { username: readForm(form, "username"), password: readForm(form, "password") },
        });
        state.admin.authenticated = true;
        state.route = "/admin";
        window.history.replaceState({}, "", "#/admin");
        await loadAdminWorkspace();
        showToast("Signed in to Staff Console.");
    } catch (error) {
        state.admin.loading = false;
        state.admin.authenticated = false;
        state.admin.error = error instanceof Error ? error.message : "Sign-in failed.";
        render();
    }
}

function readImageAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("The selected image could not be read."));
        reader.onload = () => {
            const result = String(reader.result ?? "");
            const separator = result.indexOf(",");
            if (separator < 0) reject(new Error("The selected image could not be encoded."));
            else resolve(result.slice(separator + 1));
        };
        reader.readAsDataURL(file);
    });
}

async function handleAdminContentSubmit(form) {
    const formId = form.getAttribute("id");
    const collection = formId === "admin-news-form" ? "news" : formId === "admin-gallery-form" ? "gallery" : "polls";
    const id = form.querySelector('input[name="id"]')?.value ?? "";
    const payload = collection === "news"
        ? {
            title: readForm(form, "title"),
            tag: readForm(form, "tag"),
            date: readForm(form, "date"),
            type: readForm(form, "type"),
            excerpt: readForm(form, "excerpt"),
            image: readForm(form, "image"),
            imageAlt: readForm(form, "imageAlt"),
            status: readForm(form, "status"),
        }
        : collection === "gallery"
            ? {
                title: readForm(form, "title"),
                category: readForm(form, "category"),
                description: readForm(form, "description"),
                alt: readForm(form, "alt"),
                source: readForm(form, "source"),
                status: readForm(form, "status"),
                image: readForm(form, "image"),
            }
            : {
                question: readForm(form, "question"),
                closes: readForm(form, "closes"),
                options: readForm(form, "options").split(/\r?\n/).map((o) => o.trim()).filter(Boolean),
            };

    let uploadedImage = "";
    const file = form.querySelector('input[name="imageFile"]')?.files?.[0];
    if ((collection === "news" || collection === "gallery") && file) {
        const data = await readImageAsBase64(file);
        const upload = await adminRequest("/api/admin/uploads", {
            method: "POST",
            body: { contentType: file.type, data },
        });
        uploadedImage = upload.image;
        payload.image = uploadedImage;
    }

    try {
        await adminRequest(`/api/admin/content/${collection}${id ? `/${id}` : ""}`, {
            method: id ? "PUT" : "POST",
            body: payload,
        });
    } catch (error) {
        if (uploadedImage) {
            await adminRequest(`/api/admin/uploads/${uploadedImage.split("/").at(-1)}`, { method: "DELETE" }).catch(() => {});
        }
        throw error;
    }
    state.admin.editing = null;
    await loadAdminWorkspace();
    await loadPublicContent();
    showToast(id ? "Changes saved." : collection === "polls" ? "Poll draft created." : "Item created.");
}

async function togglePublishItem(collection, id) {
    const item = state.admin.items[collection]?.find((e) => e.id === id);
    if (!item) return;
    const nextStatus = item.status === "published" ? "draft" : "published";
    const body = collection === "news"
        ? { title: item.title, tag: item.tag, date: item.date, type: item.type, excerpt: item.excerpt, image: item.image || "", imageAlt: item.imageAlt || "", status: nextStatus }
        : { title: item.title, category: item.category, description: item.description, alt: item.alt, source: item.source, status: nextStatus, image: item.image || "" };
    try {
        await adminRequest(`/api/admin/content/${collection}/${id}`, { method: "PUT", body });
        await loadAdminWorkspace();
        await loadPublicContent();
        showToast(nextStatus === "published" ? "Published to public portal." : "Moved back to draft.");
    } catch (error) {
        showToast(error instanceof Error ? error.message : "Could not update status.", "error");
    }
}

async function deleteAdminItem(collection, id) {
    const item = state.admin.items[collection]?.find((e) => e.id === id);
    if (!item || !window.confirm(`Delete “${collection === "polls" ? item.question : item.title}”?`)) return;
    try {
        await adminRequest(`/api/admin/content/${collection}/${id}`, { method: "DELETE" });
        if (state.admin.editing?.id === id) state.admin.editing = null;
        await loadAdminWorkspace();
        await loadPublicContent();
        showToast("Item deleted.");
    } catch (error) {
        showToast(error instanceof Error ? error.message : "Could not delete item.", "error");
    }
}

async function handleAdminLogout() {
    try {
        await adminRequest("/api/admin/session", { method: "DELETE" });
        state.admin.authenticated = false;
        state.admin.items = { news: [], gallery: [], polls: [] };
        state.admin.submissions = { reports: [], submissions: [] };
        state.admin.submissionTotals = { reports: 0, submissions: 0 };
        state.admin.overview = null;
        state.admin.editing = null;
        state.admin.error = "";
        state.route = "/login";
        window.history.replaceState({}, "", "#/login");
        render();
        showToast("Signed out of Staff Console.");
    } catch (error) {
        showToast(error instanceof Error ? error.message : "Could not sign out.", "error");
    }
}

async function submitPublicRecord(payload) {
    const saveLocally = () => {
        const ref = randomRef(payload.kind === "proposal" ? "PROP" : "MC");
        const records = getStored("my-chinsali-references", {});
        records[ref] = {
            title: String(payload.title ?? payload.category ?? "Community submission"),
            status: "Saved locally in this browser",
            kind: String(payload.kind ?? "report"),
        };
        setStored("my-chinsali-references", records);
        return { ok: true, ref, local: true };
    };
    let response;
    try {
        response = await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        if (!(error instanceof TypeError)) throw error;
        return saveLocally();
    }
    if ([404, 501].includes(response.status) && !response.headers.get("content-type")?.includes("application/json")) {
        return saveLocally();
    }
    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error("The backend returned an invalid response.");
    }
    if (!response.ok) throw new Error(result.error ?? "The submission could not be saved.");
    if (typeof result.reference !== "string") throw new Error("Invalid submission reference returned.");
    return { ok: true, ref: result.reference, local: false };
}

async function handleSubmit(form) {
    const formId = form.id;
    const submitButton = form.querySelector("button[type=submit]");
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.original = submitButton.innerHTML;
        submitButton.textContent = "Submitting…";
    }
    try {
        if (formId === "report-form") {
            const details = readForm(form, "details");
            if (details.length < 10) throw new Error("Please add at least 10 characters of detail so the team can act.");
            const res = await submitPublicRecord({
                kind: state.selectedReportKind,
                details: `${readForm(form, "location")} — ${details}`,
                ward: readForm(form, "ward"),
                category: readForm(form, "category"),
                anonymous: form.querySelector("input[name=anonymous]")?.checked === true,
                phone: form.querySelector("input[name=anonymous]")?.checked ? "" : readForm(form, "phone"),
            });
            form.innerHTML = `<div class="success-state">
                <span class="success-mark">${icon("check")}</span>
                <p class="kicker" style="margin-top:12px;">Reference Created</p>
                <h2>Thank you for speaking up</h2>
                <p>${res.local ? "Offline mode: saved locally in this browser." : "Your report was encrypted and received by the council backend."}</p>
                <strong class="reference-pill">${esc(res.ref)}</strong>
                <div class="success-actions">
                    ${res.local ? link("/tracker", "View local reference", "button button-primary") : ""}
                    ${button("Submit another report", "reset-report", "button button-secondary")}
                </div>
            </div>`;
            showToast(`Reference ${res.ref} created.`);
        } else if (formId === "proposal-form") {
            const title = readForm(form, "title");
            if (title.length < 5) throw new Error("Please give your proposal a clear title (at least 5 characters).");
            const res = await submitPublicRecord({
                kind: "proposal",
                title,
                details: `${readForm(form, "need")} Solution: ${readForm(form, "solution")}`,
                ward: readForm(form, "ward"),
                category: readForm(form, "category"),
                phone: "",
            });
            form.innerHTML = `<div class="success-state">
                <span class="success-mark">${icon("check")}</span>
                <p class="kicker" style="margin-top:12px;">Proposal Recorded</p>
                <h2>${esc(title)}</h2>
                <p>${res.local ? "Offline mode: saved locally in this browser." : "Your proposal was encrypted and added to the council intake queue."}</p>
                <strong class="reference-pill">${esc(res.ref)}</strong>
                <div class="success-actions">
                    ${res.local ? link("/tracker", "View local reference", "button button-primary") : ""}
                    ${button("Propose another idea", "reset-proposal", "button button-secondary")}
                </div>
            </div>`;
            showToast(`Proposal ${res.ref} received.`);
        } else if (formId === "community-feedback-form") {
            const details = readForm(form, "details");
            if (details.length < 10) throw new Error("Please share at least 10 characters so the feedback is actionable.");
            const res = await submitPublicRecord({
                kind: "community-feedback",
                title: readForm(form, "kind"),
                details: `${readForm(form, "location")} — ${details}`,
                ward: readForm(form, "ward"),
                contact: readForm(form, "contact"),
            });
            form.innerHTML = `<div class="success-state">
                <span class="success-mark">${icon("check")}</span>
                <p class="kicker" style="margin-top:12px;">Feedback Received</p>
                <h2>Thank you for helping ${esc(state.ward)} improve</h2>
                <p>${res.local ? "Offline mode: saved locally in this browser." : "Your feedback was encrypted and logged with the council."}</p>
                <strong class="reference-pill">${esc(res.ref)}</strong>
                <div class="success-actions">
                    ${button("Send another note", "reset-community-feedback", "button button-secondary")}
                </div>
            </div>`;
            showToast(`Feedback ${res.ref} received.`);
        } else if (formId === "memory-form") {
            const text = readForm(form, "text");
            if (text.length < 10) throw new Error("Please write a bit more about your Chinsali memory.");
            if (!form.querySelector("input[name=consent]")?.checked) throw new Error("Please confirm saving this memory in this browser.");
            const memories = getMemories();
            memories.unshift({
                name: readForm(form, "name") || "A visitor",
                ward: readForm(form, "ward"),
                category: readForm(form, "category"),
                text,
            });
            setStored("my-chinsali-memories", memories);
            form.reset();
            const list = document.querySelector("#memory-list");
            if (list) list.innerHTML = memoryCardsHtml(memories);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = submitButton.dataset.original ?? "Share memory";
            }
            showToast("Memory saved in this browser.");
        }
    } catch (error) {
        showToast(error instanceof Error ? error.message : "Please check the form and try again.", "error");
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButton.dataset.original ?? "Submit";
        }
    }
}

async function vote(pollId, optionId) {
    const voted = getStored("my-chinsali-recorded-votes", {});
    if (voted[pollId] || state.data.votedPolls[pollId]) return;
    const optionButtons = [...document.querySelectorAll(".poll-option")].filter((b) => b.dataset.poll === pollId);
    optionButtons.forEach((b) => { b.disabled = true; });
    try {
        const response = await fetch("/api/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pollId, optionId }),
        });
        let result = {};
        try {
            result = await response.json();
        } catch {
            throw new Error("The voting service returned an invalid response.");
        }
        if (!response.ok || result.accepted !== true) {
            throw new Error(result.error ?? "Your vote could not be recorded.");
        }
        state.data.votedPolls[pollId] = true;
        voted[pollId] = true;
        setStored("my-chinsali-recorded-votes", voted);
        render();
        showToast("Your vote was recorded.");
    } catch (error) {
        optionButtons.forEach((b) => { if (b.isConnected) b.disabled = false; });
        showToast(error instanceof Error ? error.message : "Voting service unavailable.", "error");
    }
}

function showTrackerResult(reference) {
    const target = document.querySelector("#tracker-result");
    if (!target || !reference) return;
    const refs = getStored("my-chinsali-references", {});
    const local = refs[reference.toUpperCase()];
    if (local) {
        target.innerHTML = `<div class="card tracker-result">
            <div>
                <p class="kicker">${esc(local.kind)} · ${esc(reference.toUpperCase())}</p>
                <h2>${esc(local.title)}</h2>
                <p>Saved locally on this device. Live status updates appear once connected to a council tracking feed.</p>
            </div>
            <span class="status-pill tone-amber">${esc(local.status)}</span>
        </div>`;
        return;
    }
    const project = state.data.projects.find((p) => p.id.toLowerCase().includes(reference.toLowerCase()) || p.title.toLowerCase().includes(reference.toLowerCase()));
    if (project) {
        target.innerHTML = `<div class="card tracker-result">
            <div>
                <p class="kicker">Public Project Record · ${esc(project.ward)}</p>
                <h2>${esc(project.title)}</h2>
                <p>${esc(project.summary)}</p>
            </div>
            <div style="display:grid;gap:8px;justify-items:end;">
                <span class="status-pill ${statusTone(project.status)}">${statusLabel(project.status)} · ${project.progress}%</span>
                <button type="button" class="text-button" data-action="project-detail" data-id="${esc(project.id)}">Inspect milestones →</button>
            </div>
        </div>`;
        return;
    }
    target.innerHTML = `<div class="card tracker-result">
        <div>
            <p class="kicker">Lookup Result</p>
            <h2>Reference not found</h2>
            <p>Check the reference code or browse the published district projects below.</p>
        </div>
        <span class="status-pill tone-neutral">Not matched</span>
    </div>`;
}

/* ---------- Event Listeners ---------- */
function handleClick(event) {
    const insideDropdown = event.target.closest(".nav-dropdown");
    if (!insideDropdown && state.navDropdownOpen) {
        state.navDropdownOpen = false;
        document.querySelector(".nav-dropdown")?.classList.remove("open");
    }

    const target = event.target.closest("[data-route], [data-action]");
    if (!target) return;

    const route = target.dataset.route;
    if (route) {
        event.preventDefault();
        if (route === "/services" && target.dataset.category) state.serviceCategory = target.dataset.category;
        navigate(route);
        return;
    }

    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
        case "toggle-theme":
            state.theme = state.theme === "dark" ? "light" : "dark";
            localStorage.setItem("my-chinsali-theme", state.theme);
            render();
            break;
        case "toggle-nav-dropdown":
            state.navDropdownOpen = !state.navDropdownOpen;
            target.closest(".nav-dropdown")?.classList.toggle("open", state.navDropdownOpen);
            target.setAttribute("aria-expanded", String(state.navDropdownOpen));
            break;
        case "toggle-mobile":
            state.mobileOpen = !state.mobileOpen;
            render();
            break;
        case "close-mobile":
            state.mobileOpen = false;
            render();
            break;
        case "hero-prev":
            state.heroIndex = (state.heroIndex - 1 + heroSlides.length) % heroSlides.length;
            syncHeroDom();
            syncHeroTimer();
            break;
        case "hero-next":
            state.heroIndex = (state.heroIndex + 1) % heroSlides.length;
            syncHeroDom();
            syncHeroTimer();
            break;
        case "hero-dot":
            state.heroIndex = Number(target.dataset.index ?? 0) % heroSlides.length;
            syncHeroDom();
            syncHeroTimer();
            break;
        case "select-ward":
            state.ward = target.dataset.ward ?? WARDS[0];
            localStorage.setItem("my-chinsali-ward", state.ward);
            render();
            showToast(`Community view set to ${state.ward}.`);
            break;
        case "service-category":
            state.serviceCategory = target.dataset.category ?? "All";
            render();
            break;
        case "service-details":
            state.modalService = target.dataset.id ?? null;
            render();
            break;
        case "project-detail":
            state.modalProject = target.dataset.id ?? null;
            render();
            break;
        case "story-detail":
            state.modalStory = target.dataset.id ?? null;
            render();
            break;
        case "close-modal":
            if (!(target.closest(".modal-card") && target.dataset.action !== "close-modal")) {
                state.modalService = null;
                state.modalProject = null;
                state.modalStory = null;
                render();
            }
            break;
        case "select-report-kind":
            state.selectedReportKind = target.dataset.kind ?? "issue";
            render();
            break;
        case "use-location":
            if (!navigator.geolocation) {
                showToast("Geolocation is unavailable. Add a landmark instead.", "info");
                break;
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const input = document.querySelector("input[name=location]");
                    if (input) input.value = `GPS ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
                    showToast("GPS coordinates added.");
                },
                () => showToast("Could not read GPS location. Enter a landmark instead.", "info"),
            );
            break;
        case "lookup-ref": {
            const input = document.querySelector('#tracker-form input[name="reference"]');
            if (input) input.value = target.dataset.ref ?? "";
            showTrackerResult(target.dataset.ref ?? "");
            break;
        }
        case "project-filter":
            state.projectFilter = target.dataset.filter ?? "all";
            render();
            break;
        case "map-filter":
            state.mapFilter = target.dataset.filter ?? "all";
            render();
            break;
        case "map-select": {
            const id = target.dataset.id;
            if (!id) break;
            state.selectedMapPointId = id;
            const pt = mapPoints.find((p) => p.id === id);
            const marker = communityMarkers.get(id);
            if (communityMap && marker && pt) {
                communityMap.setView([pt.lat, pt.lng], 13, { animate: true });
                marker.openPopup();
            }
            render();
            break;
        }
        case "news-filter":
            state.newsFilter = target.dataset.filter ?? "all";
            render();
            break;
        case "search-filter":
            state.searchTypeFilter = target.dataset.type ?? "All";
            render();
            break;
        case "gallery-filter":
            state.galleryFilter = target.dataset.filter ?? "all";
            state.galleryIndex = null;
            render();
            break;
        case "gallery-open":
            state.galleryIndex = Number(target.dataset.index ?? 0);
            render();
            break;
        case "gallery-close":
            state.galleryIndex = null;
            render();
            break;
        case "gallery-next":
            state.galleryIndex = (state.galleryIndex + 1) % allGalleryItems().length;
            render();
            break;
        case "gallery-prev":
            state.galleryIndex = (state.galleryIndex - 1 + allGalleryItems().length) % allGalleryItems().length;
            render();
            break;
        case "vote":
            void vote(target.dataset.poll ?? "", target.dataset.option ?? "");
            break;
        case "toggle-faq":
            target.closest(".faq-item")?.classList.toggle("open");
            break;
        case "reset-report":
            navigate("/report");
            break;
        case "reset-community-feedback":
            navigate("/community");
            break;
        case "reset-proposal":
            navigate("/propose");
            break;
        /* Admin Actions */
        case "toggle-password":
            state.admin.showPassword = !state.admin.showPassword;
            render();
            break;
        case "admin-open-sidebar":
            state.admin.sidebarOpen = true;
            render();
            break;
        case "admin-close-sidebar":
            state.admin.sidebarOpen = false;
            render();
            break;
        case "admin-tab":
            state.admin.collection = target.dataset.collection ?? "overview";
            state.admin.editing = null;
            state.admin.sidebarOpen = false;
            state.admin.searchQuery = "";
            if (["reports", "submissions"].includes(state.admin.collection) && state.admin.submissionsStatus === "idle") {
                void loadAdminSubmissions();
            } else {
                render();
            }
            break;
        case "admin-new":
            state.admin.collection = target.dataset.collection ?? state.admin.collection;
            state.admin.editing = null;
            state.admin.sidebarOpen = false;
            render();
            document.querySelector(".admin-editor-card input, .admin-editor-card textarea")?.focus();
            break;
        case "admin-status-filter":
            state.admin.statusFilter = target.dataset.status ?? "all";
            render();
            break;
        case "admin-channel-filter":
            state.admin.submissionChannelFilter = target.dataset.channel ?? "all";
            render();
            break;
        case "admin-chart-view":
            state.admin.chartView = target.dataset.view ?? "category";
            render();
            break;
        case "admin-refresh-submissions":
            void loadAdminSubmissions();
            break;
        case "admin-edit": {
            const col = target.dataset.collection ?? state.admin.collection;
            state.admin.collection = col;
            state.admin.editing = state.admin.items[col]?.find((i) => i.id === target.dataset.id) ?? null;
            render();
            break;
        }
        case "admin-cancel-edit":
            state.admin.editing = null;
            render();
            break;
        case "admin-toggle-publish":
            void togglePublishItem(target.dataset.collection ?? "", target.dataset.id ?? "");
            break;
        case "admin-delete":
            void deleteAdminItem(target.dataset.collection ?? "", target.dataset.id ?? "");
            break;
        case "admin-logout":
            void handleAdminLogout();
            break;
    }
}

document.addEventListener("click", handleClick);

document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.id === "tracker-ward-select") {
        state.projectWardFilter = target.value;
        render();
    } else if (target.id === "admin-sub-ward-select") {
        state.admin.submissionWardFilter = target.value;
        render();
    } else if (target.dataset.action === "admin-toggle-polls") {
        const nextVal = target.checked === true;
        target.disabled = true;
        void updatePortalPollsOpen(nextVal).catch((err) => {
            showToast(err instanceof Error ? err.message : "Could not update voting state.", "error");
            render();
        });
    }
});

document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.id === "service-search") {
        const pos = target.selectionStart ?? target.value.length;
        state.serviceQuery = target.value;
        render();
        const el = document.querySelector("#service-search");
        el?.focus();
        el?.setSelectionRange(pos, pos);
    } else if (target.id === "admin-search-input") {
        const pos = target.selectionStart ?? target.value.length;
        state.admin.searchQuery = target.value;
        render();
        const el = document.querySelector("#admin-search-input");
        el?.focus();
        el?.setSelectionRange(pos, pos);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (state.navDropdownOpen) {
            state.navDropdownOpen = false;
            document.querySelector(".nav-dropdown")?.classList.remove("open");
        }
        if (state.mobileOpen) {
            state.mobileOpen = false;
            render();
            return;
        }
        if (state.modalService || state.modalProject || state.modalStory || state.galleryIndex !== null) {
            state.modalService = null;
            state.modalProject = null;
            state.modalStory = null;
            state.galleryIndex = null;
            render();
            return;
        }
    }
    if (state.galleryIndex !== null) {
        if (event.key === "ArrowRight") {
            state.galleryIndex = (state.galleryIndex + 1) % allGalleryItems().length;
            render();
        } else if (event.key === "ArrowLeft") {
            state.galleryIndex = (state.galleryIndex - 1 + allGalleryItems().length) % allGalleryItems().length;
            render();
        }
    }
});

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formId = form.getAttribute("id");
    if (formId === "global-search-form" || formId === "search-page-form") {
        state.searchQuery = readForm(form, "query");
        state.searchTypeFilter = "All";
        navigate("/search");
        return;
    }
    if (formId === "tracker-form") {
        showTrackerResult(readForm(form, "reference"));
        return;
    }
    if (formId === "admin-form") {
        void handleAdminLogin(form);
        return;
    }
    if (formId === "admin-settings-form") {
        const btn = form.querySelector("button[type=submit]");
        if (btn) btn.disabled = true;
        const pollsOpen = form.querySelector('input[name="pollsOpen"]')?.checked === true;
        void updatePortalPollsOpen(pollsOpen)
            .catch((err) => showToast(err instanceof Error ? err.message : "Could not save settings.", "error"))
            .finally(() => { if (btn?.isConnected) btn.disabled = false; });
        return;
    }
    if (["admin-news-form", "admin-gallery-form", "admin-poll-form"].includes(formId)) {
        const btn = form.querySelector("button[type=submit]");
        const orig = btn?.textContent ?? "Save";
        if (btn) {
            btn.disabled = true;
            btn.textContent = "Saving…";
        }
        void handleAdminContentSubmit(form)
            .catch((err) => showToast(err instanceof Error ? err.message : "Could not save item.", "error"))
            .finally(() => {
                if (btn?.isConnected) {
                    btn.disabled = false;
                    btn.textContent = orig;
                }
            });
        return;
    }
    void handleSubmit(form);
});

function renderHistoryRoute() {
    const next = currentRoute();
    state.route = next;
    state.mobileOpen = false;
    state.navDropdownOpen = false;
    render();
    if ((next === "/admin" || next === "/login") && !state.admin.loading) void refreshAdminSession();
}

window.addEventListener("popstate", renderHistoryRoute);
window.addEventListener("hashchange", renderHistoryRoute);

render();
void loadPublicContent();
if (state.route === "/admin" || state.route === "/login") void refreshAdminSession();
