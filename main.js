const WARDS = ["Chinsali Central", "Mwika", "Lubwa", "Mulilansolo", "Kabanda", "Shiwang'andu Road", "Other"];
const REPORT_CATEGORIES = ["Roads and potholes", "Water problems", "Waste management", "Streetlights", "Flooding and drainage", "Environmental issue", "Damaged infrastructure", "Public sanitation", "Community safety", "Other concern"];
const SERVICE_CATEGORIES = ["All", "CDF & development", "Health services", "Agriculture", "Education", "Permits & licences", "Planning & land", "Fire & emergency", "Community life", "Public health", "Legal support"];
const demoProjects = [
    { id: "mwika-boreholes", title: "Mwika community boreholes", summary: "Three new water points serving households near Mwika market and the eastern settlement.", category: "Water", ward: "Mwika", status: "ongoing", progress: 62, budget_kwacha: 820000, milestones: ["Site assessment", "Drilling and casing", "Community handover"], updated: "Updated 14 Nov 2026" },
    { id: "lubwa-maternity", title: "Lubwa maternity wing", summary: "A new two-room maternity wing and staff accommodation at Lubwa Rural Health Centre.", category: "Health", ward: "Lubwa", status: "ongoing", progress: 80, budget_kwacha: 1450000, milestones: ["Foundation", "Roofing", "Medical equipment"], updated: "Updated 08 Nov 2026" },
    { id: "central-market", title: "Chinsali central market shade", summary: "Safer covered trading space with drainage and a dedicated produce loading area.", category: "Markets", ward: "Chinsali Central", status: "planned", progress: 15, budget_kwacha: 2300000, milestones: ["Public consultation", "Design and costing", "Procurement"], updated: "Updated 02 Nov 2026" },
    { id: "kabanda-roads", title: "Kabanda feeder road repairs", summary: "Grading and spot improvements on the feeder road connecting farms to the main route.", category: "Roads", ward: "Kabanda", status: "completed", progress: 100, budget_kwacha: 980000, milestones: ["Community mapping", "Grading", "Completion inspection"], updated: "Completed 28 Oct 2026" },
    { id: "central-streetlights", title: "Town centre streetlights", summary: "Solar streetlights around the bus station and public offices for safer evening movement.", category: "Safety", ward: "Chinsali Central", status: "proposed", progress: 30, budget_kwacha: null, milestones: ["Resident proposal", "Technical assessment", "Funding decision"], updated: "Proposed 21 Oct 2026" },
    { id: "mulilansolo-school", title: "Mulilansolo classroom block", summary: "Additional classrooms to reduce congestion and create a dedicated early-grade learning space.", category: "Education", ward: "Mulilansolo", status: "ongoing", progress: 44, budget_kwacha: 1800000, milestones: ["Land confirmed", "Blockwork", "Furniture and handover"], updated: "Updated 17 Oct 2026" },
];
const demoPolls = [
    { id: "priority-2027", question: "Which need should receive the next community planning focus?", active: true, closes: "Closes 30 Nov 2026", poll_options: [{ id: "p1", label: "Water points and boreholes", votes: 146 }, { id: "p2", label: "Feeder road maintenance", votes: 118 }, { id: "p3", label: "Market sanitation", votes: 86 }, { id: "p4", label: "Youth skills centre", votes: 64 }] },
    { id: "meeting-time", question: "What is the most accessible time for ward consultations?", active: true, closes: "Closes 12 Dec 2026", poll_options: [{ id: "m1", label: "Weekday afternoons", votes: 72 }, { id: "m2", label: "Weekday evenings", votes: 119 }, { id: "m3", label: "Saturday mornings", votes: 98 }] },
];
const services = [
    { id: "cdf", icon: "fund", category: "CDF & development", title: "CDF bursaries & empowerment", description: "Find current bursary calls, empowerment support, constituency development information and application guidance.", department: "CDF & Community Development", contact: "+260 975 100 245", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, CDF desk", action: "View opportunities" },
    { id: "health", icon: "health", category: "Health services", title: "Health facilities", description: "Locate health centres, maternal services, immunisation information and public health guidance across the district.", department: "District Health Office", contact: "+260 975 100 302", hours: "Emergency support · 24 hours", location: "Chinsali District Hospital", action: "Find a facility" },
    { id: "agriculture", icon: "leaf", category: "Agriculture", title: "Farmer support", description: "Connect with extension officers, seasonal programme information, inputs guidance and farmer support services.", department: "Department of Agriculture", contact: "+260 975 100 118", hours: "Mon–Fri · 08:00–16:30", location: "Agriculture Camp Office", action: "Get support" },
    { id: "education", icon: "book", category: "Education", title: "Education programmes", description: "Access information about schools, skills programmes, bursaries and opportunities for learners and teachers.", department: "District Education Board", contact: "+260 975 100 188", hours: "Mon–Fri · 08:00–16:30", location: "DEBS offices", action: "View education info" },
    { id: "permits", icon: "permit", category: "Permits & licences", title: "Permits & licences", description: "Understand requirements, fees and where to apply for trading, business, event and other council permissions.", department: "Council Registry", contact: "+260 975 100 001", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, registry", action: "See requirements" },
    { id: "planning", icon: "plan", category: "Planning & land", title: "Urban planning & land", description: "Learn about development permits, planning information, plot enquiries and building approval guidance.", department: "Planning Department", contact: "+260 975 100 074", hours: "Tue–Thu · 08:00–16:30", location: "Civic Centre, planning wing", action: "Ask planning" },
    { id: "emergency", icon: "alert", category: "Fire & emergency", title: "Fire & emergency", description: "Find emergency contacts and practical guidance for fire, rescue, disaster preparedness and urgent assistance.", department: "Fire & Rescue / DMMU", contact: "993 · 991 · 992", hours: "Emergency support · 24 hours", location: "Fire station, Great North Road", action: "View emergency contacts" },
    { id: "community", icon: "community", category: "Community life", title: "Markets, sports & culture", description: "See community venues, markets, sports activities, cultural events and local participation opportunities.", department: "Community Development", contact: "+260 975 100 160", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, community wing", action: "Explore community life" },
    { id: "sanitation", icon: "water", category: "Public health", title: "Sanitation & prevention", description: "Practical information on waste collection, sanitation, drainage, disease prevention and healthy communities.", department: "Public Health", contact: "+260 975 100 210", hours: "Mon–Fri · 08:00–16:30", location: "Public Health office", action: "Read guidance" },
    { id: "legal", icon: "legal", category: "Legal support", title: "Legal information & referrals", description: "Find plain-language information and referral points for common civic, family and public service questions.", department: "Council legal desk", contact: "+260 975 100 090", hours: "Mon–Fri · 08:00–16:30", location: "Civic Centre, legal desk", action: "Find a referral" },
];
const representative = {
    name: "Hon. Mwansa Chanda",
    role: "Chinsali Central Member of Parliament",
    summary: "The National Assembly profile lists Mwansa Chanda as the current Chinsali representative. Use the official parliamentary profile and public page below to verify current constituency updates.",
    parliamentUrl: "https://www.parliament.gov.zm/node/13777",
    socialUrl: "https://www.facebook.com/p/Hon-Chanda-Mwansa-Chinsali-Central-MP-100089509806576/",
};
const heroSlides = [
    { image: "assets/chinsali-town.jpeg", label: "Chinsali town centre", detail: "Everyday movement and public life" },
    { image: "assets/chinsali-market.jpg", label: "Chinsali New Market", detail: "Trade, food and local enterprise" },
    { image: "assets/lubwa-mission.jpg", label: "Lubwa Mission", detail: "Heritage and civic memory" },
    { image: "assets/chipoma-falls.jpg", label: "Chipoma Falls", detail: "Nature and local tourism" },
];
const storyItems = [
    { id: "lubwa-mission", title: "Lubwa Mission", category: "Heritage", image: "assets/lubwa-mission.jpg", alt: "Historic Lubwa Mission building in Chinsali", description: "A mission, school and gathering place tied to Chinsali's religious, educational and political memory.", source: "Chinsali Municipal Council · Chalo Chatu" },
    { id: "chipoma-falls", title: "Chipoma Falls", category: "Nature", image: "assets/chipoma-falls.jpg", alt: "Water rushing over rocks at Chipoma Falls", description: "A scenic waterfall and tourism asset in the district's granite and woodland landscape.", source: "Chinsali Municipal Council · visitor listing" },
    { id: "shambalakale", title: "Shambalakale Farm", category: "History", image: "assets/shambalakale-farm.jpg", alt: "Shambalakale Farm historic residence in a green landscape", description: "A story of place, memory and the unfinished dream of a national retirement home.", source: "Search result: Shambalakale: The forgotten mansion" },
    { id: "alice-lenshina", title: "Alice Lenshina and Lumpa heritage", category: "Political memory", image: "assets/alice-lenshina.png", alt: "Historic portrait of Alice Lenshina", description: "A difficult and important chapter in Chinsali's spiritual, political and post-colonial history.", source: "Alice Lenshina · Lubwa Mission history" },
    { id: "kapwepwe", title: "Kapwepwe's historical residence", category: "National politics", image: "assets/kapwepwe-heritage.jpg", alt: "Chinsali freedom-fighter heritage story image featuring Simon Mwansa Kapwepwe", description: "Follow the places and stories that connect Chinsali to Simon Mwansa Kapwepwe and Zambia's liberation movement.", source: "Chinsali heritage story reference" },
    { id: "insonge", title: "Insonge Traditional Ceremony", category: "Culture", image: "assets/insonge-reference.jpg", alt: "Traditional ceremony dancers in Zambia, used as a regional Insonge story reference", description: "A living Bisa-speaking tradition celebrated through royal establishment, dance, music and community gathering.", source: "Chinsali Daily Articles · regional ceremony reference" },
    { id: "kmu", title: "Kapasa Makasa University", category: "Learning", image: "assets/kapasa-makasa-university.jpg", alt: "Kapasa Makasa University sign in Chinsali", description: "A university along the Great North Road, linking Chinsali to science, technology and agricultural learning.", source: "Kapasa Makasa University" },
    { id: "cultural-village", title: "Chinsali Cultural Village", category: "Culture & craft", image: "assets/chinsali-cultural-village.jpg", alt: "Traditional village setting associated with Chinsali cultural storytelling", description: "A place to imagine local craft, visitor experiences, oral history and the people behind cultural tourism.", source: "Chinsali cultural-tourism image reference" },
    { id: "markets", title: "Local agriculture and markets", category: "Everyday economy", image: "assets/local-markets.jpg", alt: "Fresh produce arranged in a Zambian market", description: "From farm plots to market tables, local food systems keep households, traders and communities moving.", source: "Zambian food-market image reference" },
    { id: "people", title: "Chinsali's people and community stories", category: "Community life", image: "assets/chinsali-town.jpeg", alt: "People and everyday life in Chinsali town", description: "The district is best understood through neighbours, workers, learners, traders and families who make it home.", source: "Chinsali town image · Lusaka Times" },
];

const representativeUpdates = [
    { tag: "Representative updates", date: "Public feed", title: "Follow Hon. Chanda Mwansa — Chinsali Central MP", excerpt: "Constituency updates and activity posts are published through the representative's public page. Check the source directly for the latest dates, venues and announcements.", type: "update", sourceUrl: "https://www.facebook.com/p/Hon-Chanda-Mwansa-Chinsali-Central-MP-100089509806576/", sourceLabel: "Open public page" },
    { tag: "Parliament profile", date: "Verified profile", title: "Mwansa Chanda on the National Assembly record", excerpt: "The official parliamentary profile provides the representative's public biographical record and constituency context.", type: "notice", sourceUrl: "https://www.parliament.gov.zm/node/13777", sourceLabel: "View Parliament profile" },
];
const news = [
    { tag: "Public notice", date: "18 Nov 2026", title: "Budget consultation: tell us what should come next", excerpt: "Residents can share development priorities through ward meetings, the online poll or the feature-phone channel.", type: "notice" },
    { tag: "Development update", date: "14 Nov 2026", title: "Mwika borehole works reach the drilling stage", excerpt: "The public project record now shows progress, milestones and the next community handover step.", type: "update" },
    { tag: "Community event", date: "28 Nov 2026", title: "Chinsali clean-up and drainage day", excerpt: "Join community volunteers around the market and bus station. Gloves and collection bags will be provided.", type: "event" },
    { tag: "Opportunity", date: "04 Dec 2026", title: "CDF youth empowerment information session", excerpt: "A practical session on eligibility, documentation and how to ask questions before applying.", type: "notice" },
];
const mapPoints = [
    { x: 36, y: 34, type: "project", title: "Mwika boreholes", ward: "Mwika", status: "Ongoing · 62%" },
    { x: 57, y: 42, type: "facility", title: "Chinsali District Hospital", ward: "Chinsali Central", status: "Health facility" },
    { x: 66, y: 57, type: "project", title: "Lubwa maternity wing", ward: "Lubwa", status: "Ongoing · 80%" },
    { x: 26, y: 61, type: "project", title: "Kabanda feeder roads", ward: "Kabanda", status: "Completed" },
    { x: 73, y: 29, type: "issue", title: "Drainage report · Great North Road", ward: "Chinsali Central", status: "Under review" },
    { x: 48, y: 75, type: "facility", title: "Mulilansolo primary school", ward: "Mulilansolo", status: "Public facility" },
];
const galleryItems = [
    { id: "town-life", category: "Town life", title: "Chinsali town life", description: "Everyday movement, trading and public life around the district centre.", image: "assets/chinsali-town.jpeg", alt: "A busy Chinsali town scene with shops, trees and residents", source: "Lusaka Times" },
    { id: "market", category: "Town life", title: "Chinsali New Market", description: "A public place for food, trade and conversations about local services.", image: "assets/chinsali-market.jpg", alt: "Traders and customers at Chinsali New Market", source: "Diamond TV Zambia" },
    { id: "lubwa", category: "Heritage", title: "Lubwa Mission Church", description: "A historic mission site connected to Chinsali's political and religious history.", image: "assets/lubwa-mission.jpg", alt: "Historic Lubwa Mission building in Chinsali", source: "Elias Munshya" },
    { id: "chipoma", category: "Nature", title: "Chipoma Falls", description: "A scenic waterfall and local tourism asset in Chinsali District.", image: "assets/chipoma-falls.jpg", alt: "Water rushing over rocks at Chipoma Falls", source: "Tripadvisor image result" },
    { id: "district-map", category: "Maps", title: "Chinsali district", description: "A locator view of the town and district within Zambia.", image: "assets/chinsali-map.webp", alt: "Locator map showing Chinsali town and district in Zambia", source: "Wikimedia Commons" },
];
const landmarkLocations = [
    { galleryId: "town-life", title: "Chinsali town centre", category: "Town life", lat: -10.5499720, lng: 32.0660837, accuracy: "Public town reference" },
    { galleryId: "market", title: "Chinsali New Market · town reference", category: "Town life", lat: -10.5499720, lng: 32.0660837, accuracy: "Market image geolocated to town centre; no distinct public market pin found" },
    { galleryId: "lubwa", title: "Lubwa Mission Church", category: "Heritage", lat: -10.58987, lng: 32.00819, accuracy: "Public locality coordinate" },
    { galleryId: "chipoma", title: "Chipoma Falls", category: "Nature", lat: -10.75015, lng: 32.00461, accuracy: "Public waterfall coordinate" },
];
const demoMemories = [
    { name: "A Chinsali neighbour", ward: "Lubwa", category: "Heritage", text: "Lubwa Mission is one of the places that makes visitors slow down and ask about the history of the district.", date: "Shared for illustration" },
    { name: "A returning visitor", ward: "Chinsali Central", category: "Town life", text: "The market is where I remember hearing many different stories in one afternoon — produce, journeys and plans for the community.", date: "Shared for illustration" },
];

function currentRoute() { return window.location.hash.startsWith("#/") ? normalizeRoute(window.location.hash.slice(1)) : normalizeRoute(window.location.pathname); }
const initialRoute = currentRoute();
let landmarkMap = null;
const state = { route: initialRoute, theme: localStorage.getItem("my-chinsali-theme") || "light", ward: localStorage.getItem("my-chinsali-ward") ?? "Chinsali Central", serviceQuery: "", serviceCategory: "All", projectFilter: "all", mapFilter: "all", galleryFilter: "all", galleryIndex: null, mobileOpen: false, selectedReportKind: "issue", modalService: null, searchQuery: "", toastTimer: null, data: { projects: demoProjects, polls: demoPolls, live: false } };
function normalizeRoute(path) {
    const route = path.replace(/\/$/, "") || "/";
    return ["/", "/search", "/services", "/community", "/propose", "/report", "/whistleblowing", "/tracker", "/map", "/gallery", "/polls", "/news", "/help", "/admin"].includes(route) ? route : "/";
}
function esc(value) { return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character); }
function formatKwacha(value) { return value == null ? "Budget pending" : `K${value.toLocaleString("en-ZM")}`; }
function randomRef(prefix) { return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`; }
function getStored(key, fallback) { try {
    return JSON.parse(localStorage.getItem(key) ?? "");
}
catch {
    return fallback;
} }
function setStored(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getMemories() { const stored = getStored("my-chinsali-memories", null); return Array.isArray(stored) ? stored : demoMemories; }
function memoryCards(memories) { return memories.map((memory) => `<article class="memory-card"><div class="memory-card-head"><div><strong>${esc(memory.name || "A visitor")}</strong><span>${esc(memory.ward || "Chinsali District")}</span></div><span class="status tone-neutral">${esc(memory.category || "Experience")}</span></div><p>${esc(memory.text)}</p><small>${esc(memory.date || "Shared locally")}</small></article>`).join(""); }
function readForm(form, key) { return String(new FormData(form).get(key) ?? "").trim(); }
function icon(name) { const paths = { arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>', alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4m0 4h.01"/>', book: '<path d="M5 4.5h10a3 3 0 0 1 3 3V19H8a3 3 0 0 0-3 3V4.5Zm0 0v14.75A2.75 2.75 0 0 1 7.75 22H18"/>', community: '<circle cx="8" cy="9" r="2.5"/><circle cx="16" cy="9" r="2.5"/><path d="M3.5 19c.5-2.2 2-3.5 4.5-3.5S12 16.8 12.5 19m-1 0c.5-1.7 1.7-2.7 3.5-2.7s3 1 3.5 2.7"/>', fund: '<path d="m12 3 7 9-7 9-7-9 7-9Z"/><path d="M5 12h14"/>', health: '<path d="M12 5v14M5 12h14"/>', leaf: '<path d="M19 4C10 4 5 8.5 5 15c0 2.2 1.4 4 3.5 4C14 19 19 12.5 19 4Z"/><path d="M5.5 18.5C9 14 12 11.5 17 9"/>', legal: '<path d="M12 4v16M7 7h10M6 20h12"/><path d="m7 7-3 5a3 3 0 0 0 6 0L7 7Zm10 0-3 5a3 3 0 0 0 6 0l-3-5Z"/>', map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>', permit: '<path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h3"/>', plan: '<path d="M5 19 19 5M7 5h12v12"/><path d="m5 19 2-5"/>', project: '<path d="M4 5h16v14H4zM8 9h8M8 13h5"/>', report: '<path d="M12 4 21 20H3L12 4Z"/><path d="M12 9v5m0 3h.01"/>', services: '<path d="M4 6h16M4 12h16M4 18h16"/>', tracker: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>', water: '<path d="M12 3s6 6.2 6 11a6 6 0 1 1-12 0c0-4.8 6-11 6-11Z"/>', whistle: '<path d="M5 12h14M7 8l10 8M17 8 7 16"/><circle cx="12" cy="12" r="8.5"/>', poll: '<path d="M5 19V9m7 10V5m7 14v-7"/>', phone: '<path d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 3 3l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.8 17 7 13.2 7 8V6c0-1.1.9-2 2-2Z"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', check: '<path d="m5 12 4 4L19 6"/>', lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>' }; return `<span class="icon icon-${name}" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${paths[name] ?? '<circle cx="12" cy="12" r="2"/>'}</svg></span>`; }
function link(route, label, className = "") { return `<a class="${className}" href="#${route}" data-route="${route}">${label}</a>`; }
function button(label, action, className = "button button-secondary", extra = "") { return `<button type="button" class="${className}" data-action="${action}" ${extra}>${label}</button>`; }
function statusLabel(status) { return status === "ongoing" ? "Ongoing" : status === "completed" ? "Completed" : status === "proposed" ? "Proposed" : "Planned"; }
function statusTone(status) { return status === "ongoing" ? "tone-orange" : status === "completed" ? "tone-green" : status === "proposed" ? "tone-blue" : "tone-neutral"; }
function projectCard(project) { return `<article class="project-card card-rise"><div class="project-top"><span class="eyebrow">${esc(project.category)} · ${esc(project.ward)}</span><span class="status ${statusTone(project.status)}">${statusLabel(project.status)}</span></div><h3>${esc(project.title)}</h3><p>${esc(project.summary)}</p><div class="progress-wrap"><div class="progress-label"><span>Public progress</span><strong>${project.progress}%</strong></div><div class="progress-track"><span style="width:${project.progress}%"></span></div></div><div class="project-footer"><span>${esc(project.updated)}</span><span>${formatKwacha(project.budget_kwacha)}</span></div><button class="text-button" type="button" data-action="project-detail" data-id="${esc(project.id)}">View project record <span>→</span></button></article>`; }
function pageIntro(eyebrow, title, description, action = "") { return `<section class="page-intro"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lede">${description}</p></div>${action}</section>`; }
function navDropdown(label, items) {
    const active = items.some((item) => state.route === item.route);
    return `<details class="nav-dropdown"><summary class="nav-dropdown-toggle ${active ? "active" : ""}">${label}<span aria-hidden="true">⌄</span></summary><div class="nav-dropdown-menu">${items.map((item) => link(item.route, item.label, state.route === item.route ? "active" : "")).join("")}</div></details>`;
}
function renderHeader() {
    const primary = [{ route: "/services", label: "Services" }, { route: "/tracker", label: "Projects" }, { route: "/map", label: "Map" }, { route: "/news", label: "News" }, { route: "/gallery", label: "Gallery" }, { route: "/help", label: "Help" }, ];
    const participation = [{ route: "/propose", label: "Propose a project" }, { route: "/polls", label: "Polls & consultations" }, { route: "/report", label: "Report an issue" }, { route: "/whistleblowing", label: "Whistleblowing" }];
    const navLinks = `${primary.map((item) => link(item.route, item.label, state.route === item.route ? "active" : "")).join("")}${navDropdown("Participate", participation)}`;
    const mobileNavigation = state.mobileOpen ? `<div class="mobile-nav-overlay" role="dialog" aria-modal="true" aria-label="Site navigation"><button class="mobile-nav-backdrop" type="button" data-action="close-mobile" aria-label="Close navigation"></button><nav id="mobile-navigation" class="mobile-nav" aria-label="Expanded mobile navigation"><div class="mobile-nav-header"><a href="#/" class="brand" data-route="/"><span class="brand-mark">M</span><span><strong>My Chinsali</strong><small>Your voice in local development</small></span></a><button class="mobile-nav-close" type="button" data-action="close-mobile" aria-label="Close navigation">${icon("close")}</button></div>${navLinks}<div class="mobile-nav-divider"></div>${link("/report", "Report an issue", "button button-primary")}</nav></div>` : "";
    return `<header class="site-header"><div class="container header-inner"><a href="#/" class="brand" data-route="/"><span class="brand-mark">M</span><span><strong>My Chinsali</strong><small>Your voice in local development</small></span></a><form class="header-search" id="global-search-form" role="search"><span class="header-search-icon">${icon("search")}</span><input id="global-search" name="query" value="${esc(state.searchQuery)}" placeholder="Search pages and content" aria-label="Search pages and content" autocomplete="off" /><button type="submit" aria-label="Submit search">↵</button></form><nav class="main-nav" aria-label="Primary navigation">${navLinks}</nav><div class="header-actions"><button type="button" class="theme-toggle" data-action="toggle-theme" aria-label="Switch colour theme">${state.theme === "dark" ? "☀" : "◐"}<span>${state.theme === "dark" ? "Light" : "Dark"}</span></button>${link("/report", "Report an issue", "button button-primary header-cta")}</div><button class="mobile-menu" type="button" data-action="toggle-mobile" aria-label="${state.mobileOpen ? "Close menu" : "Open menu"}" aria-expanded="${state.mobileOpen}" aria-controls="mobile-navigation">${icon(state.mobileOpen ? "close" : "menu")}</button></div></header>${mobileNavigation}`;
}
function renderFooter() { return `<footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="/" data-route="/"><span class="brand-mark">M</span><span><strong>My Chinsali</strong><small>Public participation platform</small></span></a><p class="footer-copy">A practical public record for residents, communities and the institutions serving Chinsali District.</p></div><div><p class="footer-heading">Take part</p>${link("/report", "Report an issue")} ${link("/propose", "Propose a project")} ${link("/polls", "Vote in a consultation")}</div><div><p class="footer-heading">Need a basic phone?</p><p class="footer-copy">Use ONTECH <strong>*388*133#</strong> when the USSD service is available, or ask at the Civic Centre help desk.</p></div><div><p class="footer-heading">Safety & privacy</p>${link("/whistleblowing", "Confidential reporting")} ${link("/help", "Help and FAQs")}</div></div><div class="container footer-bottom"><span>© 2026 My Chinsali · Chinsali Town Council</span><span><a href="ASSET-CREDITS.md">Image credits</a> · verify official notices before acting</span></div></footer>`; }
function renderQuickLinks() {
    const quickServices = services.slice(0, 6);
    return `<section class="container quick-links-section" aria-labelledby="quick-links-title"><div class="section-heading compact"><div><p class="eyebrow">LOCAL GOVERNMENT SERVICES</p><h2 id="quick-links-title">Start with the right desk.</h2></div>${link("/services", "View all services →", "text-button")}</div><div class="quick-links-grid">${quickServices.map((service) => `<a class="quick-link-card" href="#/services" data-route="/services" data-category="${esc(service.category)}"><span class="quick-link-icon">${icon(service.icon)}</span><strong>${esc(service.title)}</strong><small>${esc(service.category)} <span>→</span></small></a>`).join("")}</div></section>`;
}
function renderStoryHero() {
    const slides = storyItems.map((item, index) => `<img class="story-hero-slide" src="${item.image}" alt="${esc(item.alt)}" loading="${index === 0 ? "eager" : "lazy"}" />`).join("");
    const copySlides = storyItems.map((item, index) => `<article class="story-hero-copy-slide" style="animation-delay: ${index * 5}s"><p class="eyebrow">${esc(item.category)}</p><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p><small>${esc(item.source)}</small></article>`).join("");
    const quickActions = [
        ["/services", "services", "Find a service", "Start with the right desk"],
        ["/tracker", "tracker", "Track development", "See what is moving"],
        ["/report", "report", "Report an issue", "Send a clear signal"],
        ["/gallery", "map", "Explore the gallery", "See places and memory"],
    ].map(([route, iconName, title, copy]) => link(route, `${icon(iconName)}<span><strong>${title}</strong><small>${copy}</small></span>`, "story-quick-action")).join("");
    return `<section class="story-hero"><div class="story-hero-slides">${slides}</div><div class="story-hero-overlay"></div><div class="container story-hero-content"><div class="story-hero-copy"><p class="eyebrow story-hero-eyebrow">CHINSALI DISTRICT · MUCHINGA PROVINCE</p><h1>Welcome to <em>Chinsali.</em></h1><div class="story-hero-copy-slides" aria-live="polite">${copySlides}</div><div class="hero-actions">${link("/services", "Find public services", "button button-primary button-large")} ${link("/gallery", "Explore Chinsali stories", "button button-ghost button-large")}</div><div class="story-hero-scroll"><span>Scroll to explore the stories</span><strong>↓</strong></div></div><aside class="story-hero-actions" aria-label="Quick actions"><p class="eyebrow">QUICK ACTIONS</p><div class="story-quick-actions">${quickActions}</div></aside></div><div class="story-hero-dots" aria-hidden="true">${storyItems.map((_, index) => `<span class="${index === 0 ? "active" : ""}"></span>`).join("")}</div></section>`;
}
function renderStorySection() {
    return `<section class="container section-block story-section" aria-labelledby="story-section-title"><div class="section-heading"><div><p class="eyebrow">PLACES, PEOPLE & MEMORY / CHINSALI</p><h2 id="story-section-title">Stories that make the district.</h2><p class="section-lede">Move from Lubwa Mission and Chipoma Falls to the people, institutions, traditions and everyday economies that give Chinsali its character.</p></div>${link("/gallery", "Open the full gallery →", "text-button")}</div><div class="story-grid">${storyItems.map((item) => `<article class="story-card"><div class="story-card-image"><img src="${item.image}" alt="${esc(item.alt)}" loading="lazy" /><span>${esc(item.category)}</span></div><div class="story-card-copy"><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><small>${esc(item.source)}</small></div></article>`).join("")}</div><p class="small-note story-note">Some images are sourced references used for storytelling and orientation. Confirm site access, event dates and image permissions with the responsible institution before publication or travel.</p></section>`;
}

function renderRepresentativeProfile() {
    return `<section class="container section-block representative-feature home-representative-profile" aria-labelledby="representative-name"><div class="representative-card"><div class="representative-monogram">MC</div><div class="representative-copy"><p class="eyebrow">CHINSALI CENTRAL / MP PROFILE</p><h2 id="representative-name">${esc(representative.name)}</h2><p class="representative-role">${esc(representative.role)}</p><p>${esc(representative.summary)}</p><div class="representative-links"><a class="button button-primary" href="${representative.parliamentUrl}" target="_blank" rel="noreferrer">Parliament profile ↗</a><a class="button button-secondary" href="${representative.socialUrl}" target="_blank" rel="noreferrer">Public activity page ↗</a></div></div><div class="representative-note"><span class="eyebrow">SOURCE NOTE</span><strong>Keep updates current.</strong><span>This portal links to public sources; it does not publish unverified social posts as official council notices.</span></div></div></section>`;
}

function renderDevelopmentHighlight() {
    const project = state.data.projects.find((item) => item.id === "mwika-boreholes");
    if (!project)
        return "";
    return `<section class="container featured-news home-project-highlight" aria-labelledby="home-project-highlight-title"><div class="featured-news-copy"><p class="eyebrow">DEVELOPMENT HIGHLIGHT · ${esc(project.ward)}</p><h2 id="home-project-highlight-title">Mwika borehole works reach the drilling stage</h2><p>${esc(project.summary)}</p><div class="project-highlight-meta"><span>${esc(project.updated)}</span><strong>${esc(project.progress)}% complete</strong></div>${link("/tracker", "Follow project progress →", "button button-primary")}</div><div class="featured-stamp"><span>PROJECT<br>UPDATE</span><strong>${esc(project.progress)}%</strong><small>${esc(project.ward)}</small></div></section>`;
}

function renderHome() {
    const ongoing = state.data.projects.filter((project) => project.status === "ongoing").length;
    const completed = state.data.projects.filter((project) => project.status === "completed").length;
    return `<main>
      ${renderStoryHero()}
      ${renderRepresentativeProfile()}
      ${renderDevelopmentHighlight()}
      ${renderStorySection()}
      ${renderQuickLinks()}
      <section class="container stat-strip"><div class="stat-card"><span class="stat-number">${ongoing}</span><span class="stat-label">projects moving now</span></div><div class="stat-card"><span class="stat-number">${completed}</span><span class="stat-label">completed works published</span></div><div class="stat-card"><span class="stat-number">*388*133#</span><span class="stat-label">feature-phone channel</span></div><div class="stat-card stat-card-accent"><span class="stat-number">${services.length}</span><span class="stat-label">public services to find</span></div></section>
      ${renderGallerySection(true)}
      <section class="container section-block"><div class="section-heading"><div><p class="eyebrow">RESIDENT TOOLS</p><h2>Take the next useful step.</h2></div><span class="heading-aside">No account needed for public participation.</span></div><div class="action-grid"><a class="action-card action-card-orange" href="#/report" data-route="/report"><span class="action-icon">${icon("report")}</span><span class="action-title">Report an issue</span><span class="action-copy">Roads, water, waste, lights and more.</span><span class="action-arrow">→</span></a><a class="action-card action-card-blue" href="#/propose" data-route="/propose"><span class="action-icon">${icon("project")}</span><span class="action-title">Propose a project</span><span class="action-copy">Put a community need on the record.</span><span class="action-arrow">→</span></a><a class="action-card action-card-green" href="#/polls" data-route="/polls"><span class="action-icon">${icon("poll")}</span><span class="action-title">Have your say</span><span class="action-copy">Vote in consultations and see the results.</span><span class="action-arrow">→</span></a><a class="action-card action-card-ink" href="#/tracker" data-route="/tracker"><span class="action-icon">${icon("tracker")}</span><span class="action-title">Track progress</span><span class="action-copy">Check a report or public project reference.</span><span class="action-arrow">→</span></a></div></section>
      <section class="container section-block public-record"><div class="section-heading"><div><p class="eyebrow">PUBLIC RECORD</p><h2>See what is planned and moving.</h2></div>${link("/tracker", "View all development", "text-button")}</div><div class="project-grid">${state.data.projects.filter((project) => project.status !== "planned").slice(0, 3).map(projectCard).join("")}</div></section>
      <section class="container section-block split-feature"><div class="participation-card"><p class="eyebrow">HOW IT WORKS</p><h2>One place for the public record.</h2><p>Find a service, share a concern or follow a project. Community input is shown alongside the official decisions that move work forward.</p><div class="participation-lines"><div><strong>01</strong><span>Find the right office or service.</span></div><div><strong>02</strong><span>Share a need from your community.</span></div><div><strong>03</strong><span>Follow the response and project trail.</span></div></div>${link("/community", "Open my community view", "button button-secondary")}</div><div class="news-card"><div class="card-heading"><p class="eyebrow">LATEST NOTICE</p>${link("/news", "All news →", "text-button")}</div><p class="news-date">${news[0]?.date}</p><h3>${news[0]?.title}</h3><p>${news[0]?.excerpt}</p>${link("/news", "Read the public notice", "text-button")}</div></section>
      <section class="container channel-banner"><div><p class="eyebrow">NEED A BASIC PHONE?</p><h2>Use the channel that works for you.</h2><p>Use the web portal, SMS and feature-phone access. Visit help or the Civic Centre desk for the current channel guide.</p></div><div class="ussd-display"><span class="display-top">MY CHINSALI</span><strong>*388*133#</strong><span>feature-phone access</span></div></section>
    </main>`;
}
function renderServices() {
    const filtered = services.filter((service) => (state.serviceCategory === "All" || service.category === state.serviceCategory) && `${service.title} ${service.description} ${service.department}`.toLowerCase().includes(state.serviceQuery.toLowerCase()));
    return `<main class="container page-shell">${pageIntro("PUBLIC SERVICES / DIRECTORY", "Find the service behind the question.", "A plain-language directory of council and institutional services, with the department, location and next step in one place.", link("/help", "Need help finding the right desk? →", "text-button"))}<section class="service-tools"><label class="search-box">${icon("services")}<input id="service-search" value="${esc(state.serviceQuery)}" placeholder="Search services, departments or topics" aria-label="Search public services" /></label><div class="filter-row">${SERVICE_CATEGORIES.map((category) => button(category, "service-category", `filter-chip ${state.serviceCategory === category ? "selected" : ""}`, `data-category="${esc(category)}"`)).join("")}</div></section><div class="service-count"><span><strong>${filtered.length}</strong> services match this view</span><span>Information is updated by participating institutions.</span></div><div class="service-grid">${filtered.map((service) => `<article class="service-card"><div class="service-card-top"><span class="service-icon">${icon(service.icon)}</span><span class="eyebrow">${esc(service.category)}</span></div><h2>${esc(service.title)}</h2><p>${esc(service.description)}</p><div class="service-meta"><span>${icon("community")} ${esc(service.department)}</span><span>${icon("phone")} ${esc(service.contact)}</span></div><button class="service-link" type="button" data-action="service-details" data-id="${esc(service.id)}">${esc(service.action)} <span>→</span></button></article>`).join("") || `<div class="empty-state"><h2>No service matched that search.</h2><p>Try a broader term such as “health”, “permit” or “water”.</p></div>`}</div>${renderServiceModal()}</main>`;
}
function renderServiceModal() { const service = services.find((item) => item.id === state.modalService); if (!service)
    return ""; return `<div class="modal-backdrop" data-action="close-modal"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button class="modal-close" type="button" data-action="close-modal" aria-label="Close">×</button><p class="eyebrow">${esc(service.category)}</p><h2 id="service-modal-title">${esc(service.title)}</h2><p class="modal-lede">${esc(service.description)}</p><div class="detail-list"><div><span>Responsible desk</span><strong>${esc(service.department)}</strong></div><div><span>Contact</span><strong>${esc(service.contact)}</strong></div><div><span>Office hours</span><strong>${esc(service.hours)}</strong></div><div><span>Location</span><strong>${esc(service.location)}</strong></div></div><div class="modal-actions">${link("/help", "Ask for help", "button button-primary")} ${button("Close", "close-modal", "button button-secondary")}</div></div></div>`; }
function renderCommunityFeedback() {
    return `<section class="community-feedback"><div class="community-feedback-copy"><p class="eyebrow">COMMUNITY FEEDBACK / ISSUE REPORTING</p><h2>Tell us what your community needs.</h2><p>Share a local issue, suggestion or service question. This prototype creates a reference in your browser so you can see the flow before a live council submission service is connected.</p>${link("/report", "Open the full report form →", "text-button")}</div><form class="community-feedback-form civic-form" id="community-feedback-form"><div class="form-grid">${formSelect("kind", "What would you like to share?", ["Report an issue", "Share feedback", "Ask about a service"])}${formSelect("ward", "Ward or community", WARDS, state.ward)}</div><label class="field"><span>Location or landmark</span><input name="location" placeholder="Market, road, school or nearby place" required /></label><label class="field"><span>Your message</span><textarea name="details" rows="4" maxlength="1500" required placeholder="What is happening, and what would help?"></textarea></label><label class="field"><span>Phone or email <small>optional</small></span><input name="contact" placeholder="Only if you want a response" /></label><div class="form-actions"><button class="button button-primary" type="submit">Send feedback <span>→</span></button></div><p class="form-privacy">${icon("lock")} Do not include passwords, accusations or sensitive personal information.</p></form></section>`;
}

function renderCommunity() {
    const localProjects = state.data.projects.filter((project) => project.ward === state.ward);
    return `<main class="container page-shell">${pageIntro("MY COMMUNITY / ${esc(state.ward).toUpperCase()}", "Your local view of the public record.", "Choose a ward or community to see the projects, concerns, conversations and notices closest to you.", button("Change ward", "cycle-ward", "button button-primary"))}<section class="community-hero"><div class="community-profile"><div class="community-seal">${state.ward.slice(0, 1)}</div><div><p class="eyebrow">SELECTED COMMUNITY</p><h2>${esc(state.ward)}</h2><p>Chinsali District · Muchinga Province</p></div></div><div class="community-metrics"><div><strong>${localProjects.length}</strong><span>published projects</span></div><div><strong>3</strong><span>open participation items</span></div><div><strong>2</strong><span>recent notices</span></div></div></section><div class="community-columns"><section><div class="section-heading compact"><div><p class="eyebrow">LOCAL DEVELOPMENT</p><h2>Projects in ${esc(state.ward)}</h2></div>${link("/tracker", "Open tracker →", "text-button")}</div><div class="compact-project-list">${(localProjects.length ? localProjects : state.data.projects.slice(0, 2)).map((project) => `<div class="compact-project"><span class="compact-project-mark ${statusTone(project.status)}"></span><div><h3>${esc(project.title)}</h3><p>${esc(project.category)} · ${esc(project.updated)}</p></div><strong>${project.progress}%</strong></div>`).join("")}</div></section><aside class="community-side"><div class="side-card"><p class="eyebrow">NEXT COMMUNITY MOMENT</p><h3>Budget consultation</h3><p>Share your ward’s top development priority before the next public planning session.</p>${link("/polls", "Join the consultation →", "text-button")}</div><div class="side-card side-card-dark"><p class="eyebrow">LOCAL HELP</p><h3>Find a service</h3><p>Search public services by topic, department or location.</p>${link("/services", "Open service directory →", "button button-light")}</div></aside></div><section class="community-pulse"><div><p class="eyebrow">COMMUNITY PULSE</p><h2>What residents are asking about</h2></div><div class="pulse-tags"><span>Water access <strong>46</strong></span><span>Road maintenance <strong>31</strong></span><span>Market sanitation <strong>24</strong></span><span>Skills opportunities <strong>18</strong></span></div><p class="small-note">Pulse themes are a presentation view of public submissions, not an official needs assessment.</p></section>${renderCommunityFeedback()}</main>`;
}
function formSelect(name, label, values, selected = "") { return `<label class="field"><span>${label}</span><select name="${name}">${values.map((value) => `<option ${selected === value ? "selected" : ""}>${esc(value)}</option>`).join("")}</select></label>`; }
function reportKindButtons() { const kinds = [{ id: "issue", title: "Report an issue", copy: "Road, water, waste or safety concern", icon: "report" }, { id: "feedback", title: "Share feedback", copy: "Question, suggestion or commendation", icon: "community" }, { id: "service", title: "Ask about a service", copy: "Find the right desk or requirement", icon: "services" }]; return `<div class="kind-grid">${kinds.map((kind) => `<button type="button" class="kind-card ${state.selectedReportKind === kind.id ? "selected" : ""}" data-action="select-report-kind" data-kind="${kind.id}"><span>${icon(kind.icon)}</span><strong>${kind.title}</strong><small>${kind.copy}</small></button>`).join("")}</div>`; }
function renderReport() { return `<main class="container page-shell narrow-shell">${pageIntro("CITIZEN VOICE / ${state.selectedReportKind.toUpperCase()}", "Send a clear signal to the right desk.", "You do not need an account. Add a phone number only if you want SMS follow-up. Anonymous reports can still receive a reference number.", "")}${reportKindButtons()}<form class="civic-form" id="report-form"><div class="form-section-heading"><span class="step-number">01</span><div><h2>Where is it?</h2><p>Location helps the responsible team act faster.</p></div></div><div class="form-grid">${formSelect("ward", "Ward or community", WARDS, state.ward)}<label class="field"><span>Specific location</span><input name="location" placeholder="Road, landmark or nearby place" required /></label></div><div class="form-section-heading"><span class="step-number">02</span><div><h2>What is happening?</h2><p>Be specific. A few useful details are better than a long message.</p></div></div><div class="form-grid">${formSelect("category", "Topic", REPORT_CATEGORIES)}<label class="field"><span>Photo or document <small>optional</small></span><input type="file" name="attachment" /></label></div><label class="field"><span>Details</span><textarea name="details" rows="5" maxlength="2000" required placeholder="What did you see? How is it affecting people? Include a landmark if helpful."></textarea><small class="field-hint">Do not include passwords or sensitive personal information.</small></label><div class="form-section-heading"><span class="step-number">03</span><div><h2>How should we follow up?</h2><p>Your choice does not affect whether the report is reviewed.</p></div></div><div class="form-grid"><label class="field"><span>Phone number <small>optional</small></span><input name="phone" inputmode="tel" placeholder="097 123 4567" /></label><label class="check-field"><input type="checkbox" name="anonymous" /><span><strong>Keep me anonymous</strong><small>We will not display your name in public records.</small></span></label></div><div class="form-actions"><button class="button button-primary button-large" type="submit">Send to the council <span>→</span></button><button class="button button-secondary" type="button" data-action="use-location">Use my current location</button></div><p class="form-privacy">${icon("lock")} Submitted information is handled according to the platform’s privacy and access controls. This prototype stores a local fallback if live submission is unavailable.</p></form></main>`; }
function renderPropose() { return `<main class="container page-shell narrow-shell">${pageIntro("COMMUNITY IDEAS / PROPOSALS", "Put a better idea on the record.", "Community proposals help the council and partners understand what residents need, where the gap is and who would benefit.", link("/tracker", "See published project records →", "text-button"))}<div class="callout callout-blue"><span class="callout-icon">${icon("project")}</span><div><strong>Public proposal ≠ official approval.</strong><p>Publishing an idea makes it visible for assessment and support. It does not commit public funds or guarantee implementation.</p></div></div><form class="civic-form" id="proposal-form"><div class="form-grid">${formSelect("ward", "Affected ward or community", WARDS, state.ward)}${formSelect("category", "Project category", ["Water and boreholes", "Roads and transport", "Schools and education", "Health facilities", "Markets and livelihoods", "Drainage and sanitation", "Agriculture", "Other"])}<label class="field field-full"><span>Proposal title</span><input name="title" required placeholder="e.g. A borehole for the eastern side of Mwika" /></label><label class="field field-full"><span>What need should this solve?</span><textarea name="need" rows="4" required placeholder="Describe the current problem and how it affects people."></textarea></label><label class="field field-full"><span>What solution do you suggest?</span><textarea name="solution" rows="4" required placeholder="What would a useful, practical response look like?"></textarea></label><label class="field"><span>Estimated beneficiaries</span><input name="beneficiaries" inputmode="numeric" placeholder="e.g. 350 households" /></label><label class="field">${formSelect("urgency", "Urgency", ["Important this year", "Can be planned", "Urgent / safety concern"]).replace("<label class=\"field\">", "")}</label><label class="field field-full"><span>Supporting photo or document <small>optional</small></span><input type="file" name="attachment" /></label></div><div class="form-actions"><button class="button button-primary button-large" type="submit">Submit proposal <span>→</span></button><span class="form-note">You will receive a reference number to keep.</span></div></form></main>`; }
function renderWhistleblowing() { return `<main class="container page-shell narrow-shell">${pageIntro("RESTRICTED CHANNEL / SENSITIVE REPORTING", "A separate door for serious allegations.", "Use this channel for suspected corruption, abuse of public office, fraud, trafficking or other serious misconduct. Do not use it for a pothole or a routine service request.", "")}<div class="privacy-panel"><div class="privacy-panel-icon">${icon("lock")}</div><div><p class="eyebrow">BEFORE YOU SUBMIT</p><h2>This channel requires formal safeguards.</h2><p>This interface is a front-end concept. Operational referrals to DEC, Zambia Police or ACC require formal agency arrangements, restricted access, encryption, retention controls and protected follow-up before launch.</p><div class="privacy-points"><span>${icon("check")} Separate case reference</span><span>${icon("check")} Restricted review</span><span>${icon("check")} No public display</span></div></div></div><form class="civic-form" id="whistle-form"><div class="form-grid">${formSelect("category", "Allegation category", ["Suspected corruption or bribery", "Abuse of public office", "Misuse of public resources", "Theft or fraud", "Human trafficking or exploitation", "Organised criminal activity", "Other serious misconduct"])}${formSelect("followup", "Follow-up preference", ["Remain fully anonymous", "Confidential follow-up by phone", "Confidential follow-up by email"])}<label class="field field-full"><span>What would you like to report?</span><textarea name="details" rows="7" required placeholder="Describe what happened, when and where. Avoid naming people unless it is necessary to identify the allegation."></textarea></label><label class="field"><span>Contact detail <small>optional</small></span><input name="contact" placeholder="Phone or email for protected follow-up" /></label><label class="field"><span>Evidence attachment <small>optional</small></span><input type="file" name="attachment" /></label></div><div class="form-actions"><button class="button button-dark button-large" type="submit">Create confidential reference <span>→</span></button><span class="form-note">For immediate danger, contact Zambia Police or emergency services.</span></div></form></main>`; }
function renderTracker() { const localRefs = getStored("my-chinsali-references", {}); return `<main class="container page-shell">${pageIntro("PROJECTS / PUBLIC PROGRESS", "Follow the trail, not just the headline.", "Search a report or proposal reference to see the latest known status. Official projects are published with budgets, milestones and progress updates.", "")}<form class="tracker-search" id="tracker-form"><label class="search-box">${icon("tracker")}<input name="reference" placeholder="Enter a reference, e.g. MC-4821" autocomplete="off" /><button class="button button-primary" type="submit">Check status</button></label></form><div id="tracker-result"></div><section class="tracker-section"><div class="section-heading compact"><div><p class="eyebrow">OFFICIAL PROJECTS</p><h2>Development in motion</h2></div><div class="filter-row compact-filters">${["all", "ongoing", "completed", "proposed"].map((filter) => button(filter, "project-filter", `filter-chip ${state.projectFilter === filter ? "selected" : ""}`, `data-filter="${filter}"`)).join("")}</div></div><div class="project-grid tracker-grid">${state.data.projects.filter((project) => state.projectFilter === "all" || project.status === state.projectFilter).map(projectCard).join("")}</div></section><section class="lifecycle"><p class="eyebrow">PUBLIC PROJECT LIFECYCLE</p><div class="lifecycle-row">${["Proposed", "Assessment", "Prioritised", "Approved", "Budgeted", "Implementation", "Completed"].map((step, index) => `<div class="lifecycle-step ${index < 2 ? "past" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${step}</strong></div>`).join("")}</div><p class="small-note">The public record distinguishes community support and official approval. A proposal can be visible before it becomes a funded project.</p></section></main>`; }
function renderMap() { const filteredPoints = state.mapFilter === "all" ? mapPoints : mapPoints.filter((point) => point.type === state.mapFilter); return `<main class="container page-shell">${pageIntro("COMMUNITY MAP / DISTRICT VIEW", "See the district as a living public record.", "Explore where work is happening, where facilities are located and where community concerns have been reported. Pins are approximate in this prototype.", link("/tracker", "View project tracker →", "text-button"))}<div class="map-toolbar"><div class="filter-row">${["all", "project", "facility", "issue"].map((filter) => button(filter === "all" ? "Everything" : filter === "project" ? "Projects" : filter === "facility" ? "Public facilities" : "Reported issues", "map-filter", `filter-chip ${state.mapFilter === filter ? "selected" : ""}`, `data-filter="${filter}"`)).join("")}</div><span class="map-note">${filteredPoints.length} markers · approximate presentation data</span></div><div class="map-layout"><div class="district-map"><div class="map-compass">N<br><span>↑</span></div><div class="map-road road-a"></div><div class="map-road road-b"></div><div class="map-road road-c"></div><div class="map-river-large"></div><div class="map-district-label label-1">CHINSALI<br><small>CENTRAL</small></div><div class="map-district-label label-2">MWIKA</div><div class="map-district-label label-3">LUBWA</div><div class="map-district-label label-4">KABANDA</div>${filteredPoints.map((point) => `<button type="button" class="map-marker marker-${point.type}" style="left:${point.x}%;top:${point.y}%" data-action="map-marker" data-title="${esc(point.title)}" data-status="${esc(point.status)}" aria-label="${esc(point.title)}">${point.type === "project" ? "◆" : point.type === "facility" ? "+" : "!"}</button>`).join("")}<div class="map-scale">Approximate public map view</div></div><aside class="map-legend"><p class="eyebrow">MAP KEY</p><div><span class="legend-dot legend-project"></span><span>Development project</span></div><div><span class="legend-dot legend-facility"></span><span>School / health / amenity</span></div><div><span class="legend-dot legend-issue"></span><span>Reported community issue</span></div><hr><p class="eyebrow">VISIBLE HERE</p><p class="small-note">${filteredPoints.length} public markers in this view. Precise addresses and sensitive reports are not displayed.</p><div id="map-selection" class="map-selection"><span class="small-note">Select a marker to inspect it.</span></div></aside></div></main>`; }
function pollCard(poll) { const voted = getStored("my-chinsali-votes", {}); const total = poll.poll_options.reduce((sum, option) => sum + option.votes, 0); return `<article class="poll-card"><div class="poll-card-head"><span class="eyebrow">ACTIVE CONSULTATION</span><span class="poll-closes">${esc(poll.closes)}</span></div><h2>${esc(poll.question)}</h2><p class="poll-helper">Choose one response. Results update after you vote.</p><div class="poll-options">${poll.poll_options.map((option, index) => { const percentage = total ? Math.round(option.votes / total * 100) : 0; return voted[poll.id] ? `<div class="poll-result"><div class="poll-result-label"><span>${index + 1}. ${esc(option.label)}</span><strong>${percentage}%</strong></div><div class="poll-track"><span style="width:${percentage}%"></span></div></div>` : `<button type="button" class="poll-option" data-action="vote" data-poll="${esc(poll.id)}" data-option="${esc(option.id)}"><span>${index + 1}</span>${esc(option.label)}<strong>→</strong></button>`; }).join("")}</div><div class="poll-footer"><span>${total.toLocaleString()} responses so far</span>${voted[poll.id] ? "<span class=\"voted-badge\">✓ Your response is recorded</span>" : ""}</div></article>`; }
function renderPolls() { return `<main class="container page-shell narrow-shell">${pageIntro("POLLS & CONSULTATIONS / HAVE YOUR SAY", "Your opinion belongs in the record.", "Community priorities help shape conversations and planning. They do not replace formal assessment or official project approval.", link("/community", "See community context →", "text-button"))}<div class="consultation-note"><span>${icon("poll")}</span><div><strong>One browser, one response per consultation.</strong><p>For feature-phone access, ask about the current ONTECH USSD channel at your ward office.</p></div></div><div class="poll-stack">${state.data.polls.filter((poll) => poll.active).map(pollCard).join("")}</div></main>`; }
function renderNews() { const combinedNews = [...news, ...representativeUpdates]; return `<main class="container page-shell">${pageIntro("NEWS, NOTICES & EVENTS / PUBLIC INFORMATION", "Know what is changing around you.", "Announcements, public meetings, opportunities and project updates in one place. Always confirm time-sensitive details with the responsible institution.", link("/help", "How to verify a notice →", "text-button"))}<div class="featured-news"><div class="featured-news-copy"><p class="eyebrow">FEATURED NOTICE · ${news[0]?.date}</p><h2>${news[0]?.title}</h2><p>${news[0]?.excerpt}</p>${link("/polls", "Join the public consultation →", "button button-light")}</div><div class="featured-stamp"><span>PUBLIC<br>NOTICE</span><strong>26</strong><small>MY CHINSALI</small></div></div><div class="news-layout"><div class="news-list">${combinedNews.slice(1).map((item) => `<article class="news-item"><span class="news-type type-${item.type}">${esc(item.tag)}</span><p class="news-date">${esc(item.date)}</p><h2>${esc(item.title)}</h2><p>${esc(item.excerpt)}</p>${item.sourceUrl ? `<a class="text-button" href="${item.sourceUrl}" target="_blank" rel="noreferrer">${esc(item.sourceLabel || "Open source")} ↗</a>` : `<button type="button" class="text-button" data-action="notice-toast">Read notice →</button>`}</article>`).join("")}</div><aside class="documents-card"><p class="eyebrow">PUBLIC DOCUMENTS</p><h2>Useful downloads</h2><div class="document-link"><span>PDF</span><div><strong>Community participation guide</strong><small>How to submit, support and track</small></div><span>↓</span></div><div class="document-link"><span>PDF</span><div><strong>Public service contacts</strong><small>Departments and opening hours</small></div><span>↓</span></div><div class="document-link"><span>PDF</span><div><strong>Project record explainer</strong><small>How progress and budgets are shown</small></div><span>↓</span></div><p class="small-note">Download links become official documents when published by the council.</p></aside></div></main>`; }
function galleryCard(item, index) { return `<button type="button" class="gallery-card" data-action="gallery-open" data-index="${index}"><span class="gallery-card-image"><img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" /><span class="gallery-card-arrow">↗</span></span><span class="gallery-card-copy"><span class="eyebrow">${esc(item.category)}</span><strong>${esc(item.title)}</strong><small>${esc(item.description)}</small></span></button>`; }
function renderGalleryLightbox() { const item = galleryItems[state.galleryIndex]; if (!item) return ""; return `<div class="gallery-lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title"><button type="button" class="gallery-lightbox-backdrop" data-action="gallery-close" aria-label="Close gallery"></button><div class="gallery-lightbox-card"><button type="button" class="gallery-close" data-action="gallery-close" aria-label="Close image">×</button><img src="${esc(item.image)}" alt="${esc(item.alt)}" /><div class="gallery-lightbox-copy"><p class="eyebrow">${esc(item.category)} · ${esc(item.source)}</p><h2 id="gallery-lightbox-title">${esc(item.title)}</h2><p>${esc(item.description)}</p><div class="gallery-lightbox-actions"><button type="button" class="button button-secondary" data-action="gallery-prev">← Previous</button><button type="button" class="button button-primary" data-action="gallery-next">Next →</button></div></div></div></div>`; }
function renderGallerySection(preview = false) { const items = state.galleryFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === state.galleryFilter); const visible = preview ? items.slice(0, 4) : items; return `<section class="${preview ? "container section-block gallery-preview" : "gallery-section"}"><div class="section-heading"><div><p class="eyebrow">PLACES & MEMORY / CHINSALI</p><h2>${preview ? "See the places that shape the district." : "A district worth seeing slowly."}</h2><p class="section-lede">${preview ? "From Lubwa Mission to Chipoma Falls, explore the landmarks, cultural memory and everyday places that make Chinsali home." : "Explore a growing visual record of heritage, nature and town life. Images are for orientation; confirm access and current conditions locally."}</p></div>${preview ? link("/gallery", "Open photo gallery →", "text-button") : ""}</div>${preview ? "" : `<div class="filter-row gallery-filters">${["all", "Heritage", "Nature", "Town life", "Maps"].map((filter) => button(filter === "all" ? "Everything" : filter, "gallery-filter", `filter-chip ${state.galleryFilter === filter ? "selected" : ""}`, `data-filter="${esc(filter)}"`)).join("")}</div>`}<div class="gallery-grid">${visible.map((item) => galleryCard(item, galleryItems.indexOf(item))).join("")}</div>${preview ? `<p class="small-note gallery-credit-note">Landmarks and cultural descriptions follow the Chinsali Municipal Council tourism and heritage overview. ${link("/gallery", "View sources and the full gallery →", "text-button")}</p>` : ""}</section>${renderGalleryLightbox()}`; }
function renderLandmarkMapSection() { return `<section class="landmark-map-section"><div class="section-heading"><div><p class="eyebrow">LANDMARK MAP / OPENSTREETMAP</p><h2>Find the places in the gallery.</h2><p class="section-lede">Tap a marker to see the public coordinate, then open the matching gallery image. The market image uses a Chinsali town-centre reference because no distinct public market pin was available.</p></div><span class="map-reference-note">${landmarkLocations.length} gallery references</span></div><div id="landmark-map" class="landmark-map" role="application" aria-label="Interactive map of Chinsali gallery landmarks"><div class="map-loading">Loading the landmark map…</div></div><p class="small-note map-disclaimer">Coordinates are map references, not a surveyed access route. Confirm permission, road conditions and current local guidance before visiting. Map tiles © OpenStreetMap contributors.</p></section>`; }
function renderVisitorMemories() { return `<section class="visitor-memories"><div class="section-heading"><div><p class="eyebrow">VISITOR MEMORIES / COMMUNITY VOICE</p><h2>What do you remember about Chinsali?</h2><p class="section-lede">Share a place, a feeling or a story from your visit. Keep it respectful and avoid private contact details.</p></div></div><div class="memory-layout"><form class="civic-form memory-form" id="memory-form"><div class="form-grid"><label class="field"><span>Name or display name <small>optional</small></span><input name="name" maxlength="80" placeholder="e.g. Chinsali neighbour" /></label><label class="field">${formSelect("ward", "Ward or community", WARDS, state.ward).replace('<label class="field">', "").replace('</label>', "")}</label><label class="field field-full">${formSelect("category", "What kind of memory is this?", ["Heritage", "Nature", "Town life", "Food and markets", "Community life", "Other"]).replace('<label class="field">', "").replace('</label>', "")}</label><label class="field field-full"><span>Your experience or memory</span><textarea name="text" rows="6" maxlength="1200" required placeholder="Tell visitors what made this place meaningful to you…"></textarea></label><label class="check-field field-full"><input type="checkbox" name="consent" required /><span><strong>I understand this may be shown publicly on this browser.</strong><small>Do not include personal phone numbers, accusations or private information.</small></span></label></div><div class="form-actions"><button class="button button-primary button-large" type="submit">Share this memory <span>→</span></button></div><p class="form-privacy">${icon("lock")} Saved in this browser only until a moderated public submission service is connected.</p></form><aside class="memory-aside"><div class="memory-notice"><p class="eyebrow">A CLEAR DISTINCTION</p><h3>Stories are not council statements.</h3><p>These are visitor-facing suggestions and memories. They are not automatically verified, endorsed or published as official council information.</p></div><div class="memory-list" id="memory-list"><p class="eyebrow">RECENTLY SHARED</p>${memoryCards(getMemories())}</div></aside></div></section>`; }
function initLandmarkMap() { const element = document.querySelector("#landmark-map"); if (!element) return; if (!window.L) { element.innerHTML = `<div class="map-fallback"><strong>Interactive map unavailable right now.</strong><span>Use the landmark coordinates listed in the gallery sources, or try again with an internet connection.</span></div>`; return; } landmarkMap = window.L.map(element, { scrollWheelZoom: false }); const tiles = window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(landmarkMap); tiles.on("tileerror", () => { if (!element.querySelector(".map-tile-warning")) element.insertAdjacentHTML("beforeend", `<div class="map-tile-warning">Map tiles could not be loaded. The gallery coordinates remain available below.</div>`); }); const map = landmarkMap; const markers = landmarkLocations.map((location) => { const item = galleryItems.find((entry) => entry.id === location.galleryId); const marker = window.L.marker([location.lat, location.lng]).addTo(map); marker.bindPopup(`<strong>${esc(location.title)}</strong><br><span>${esc(location.category)} · ${esc(location.accuracy)}</span><br><span>${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}</span><br><button type="button" class="map-gallery-link" data-action="gallery-open" data-index="${galleryItems.indexOf(item)}">Open gallery image →</button>`); return marker; }); if (markers.length) map.fitBounds(window.L.featureGroup(markers).getBounds().pad(0.12)); window.setTimeout(() => map.invalidateSize(), 0); }
function renderGallery() { return `<main class="container page-shell">${pageIntro("PHOTO GALLERY / LANDMARKS & CULTURE", "See Chinsali through its places.", "A lightweight gallery of heritage sites, nature and everyday public life across Chinsali District.", link("/community", "Open my community view →", "text-button"))}${renderGallerySection(false)}${renderLandmarkMapSection()}${renderVisitorMemories()}</main>`; }
function renderHelp() { const faqs = [{ q: "Do I need an account to report something?", a: "No. Public reports and proposals can be submitted without an account. Add a phone number only if you want follow-up." }, { q: "Is a community proposal an approved project?", a: "No. A proposal records a community need and can collect public support. Official approval, budgets and procurement remain separate decisions." }, { q: "How do I follow up on a report?", a: "Keep your reference number. Use Development Tracker when the council or participating institution has made a status update." }, { q: "Can I report anonymously?", a: "Yes for ordinary community concerns. For serious allegations, use the separate whistleblowing surface and do not put sensitive information in a public report." }, { q: "What if I do not have internet?", a: "Use the current ONTECH feature-phone channel where available, ask at your ward office or visit the Civic Centre help desk for supported SMS and USSD guidance." }]; return `<main class="container page-shell">${pageIntro("HELP & INFORMATION / START HERE", "A clearer way to get unstuck.", "Find answers about reports, proposals, public records, privacy and feature-phone access.", link("/services", "Browse public services →", "text-button"))}<div class="help-grid"><section class="faq-card"><p class="eyebrow">COMMON QUESTIONS</p>${faqs.map((faq, index) => `<div class="faq-item ${index === 0 ? "open" : ""}"><button type="button" data-action="toggle-faq"><span>${esc(faq.q)}</span><strong>${index === 0 ? "−" : "+"}</strong></button><p>${esc(faq.a)}</p></div>`).join("")}</section><aside class="help-aside"><div class="help-contact"><p class="eyebrow">VISIT IN PERSON</p><h2>Civic Centre help desk</h2><p>For service navigation, assisted submissions and current SMS/USSD guidance.</p><strong>Mon–Fri · 08:00–16:30</strong><span>Chinsali District Civic Centre</span></div><div class="help-contact contact-orange"><p class="eyebrow">URGENT</p><h2>Emergency contacts</h2><div class="emergency-numbers"><strong>991 <small>Police</small></strong><strong>993 <small>Fire</small></strong><strong>992 <small>Ambulance</small></strong></div></div></aside></div><section class="access-strip"><div><p class="eyebrow">ACCESS CHANNELS</p><h2>Choose the channel that works for you.</h2></div><div class="access-item"><strong>Web</strong><span>Full public portal</span></div><div class="access-item"><strong>SMS</strong><span>Basic updates and reports</span></div><div class="access-item"><strong>*388*133#</strong><span>Feature-phone access</span></div></section></main>`; }
function renderAdmin() { return `<main class="container page-shell narrow-shell">${pageIntro("STAFF PORTAL / AUTHORISED ACCESS", "A separate workspace for the people who respond.", "The public portal stays open and simple. Authorised council and institutional teams use a separate role-based workspace to assign, moderate, update and audit records.", "")}<div class="admin-gate"><div class="admin-gate-mark">${icon("lock")}</div><div><p class="eyebrow">AUTHORISED PERSONNEL ONLY</p><h2>Sign in to the administration portal</h2><p>Role-based access levels are planned for council administrators, departmental officers, project officers, moderators and authorised agency personnel.</p><form id="admin-form" class="admin-form"><label class="field"><span>Work email</span><input type="email" name="email" placeholder="name@institution.gov.zm" required /></label><label class="field"><span>Password</span><input type="password" name="password" placeholder="••••••••" required /></label><button class="button button-dark button-large" type="submit">Continue to staff portal <span>→</span></button></form><p class="small-note">Demo surface only — production authentication, permissions and audit controls must be connected before operational use.</p></div></div><section class="role-grid"><div><span>01</span><strong>Review & assign</strong><p>Route incoming reports to the responsible department.</p></div><div><span>02</span><strong>Publish progress</strong><p>Keep project milestones, budgets and updates current.</p></div><div><span>03</span><strong>Listen & learn</strong><p>Read participation trends without exposing resident data.</p></div></section></main>`; }
function searchCatalog() {
    const pages = [
        ["Public services", "Find services, departments, permits, health, agriculture, education, emergency and public support.", "/services", "Page"],
        ["My community", "Ward projects, notices, community feedback and local development priorities.", "/community", "Page"],
        ["Propose a project", "Put a community need on the public record and suggest a practical solution.", "/propose", "Participation"],
        ["Report an issue", "Report roads, water, waste, streetlights, flooding, safety and infrastructure concerns.", "/report", "Participation"],
        ["Whistleblowing", "Confidential channel for suspected corruption, fraud, abuse of office and serious misconduct.", "/whistleblowing", "Participation"],
        ["Projects", "Browse public projects, reports, budgets, milestones and progress updates.", "/tracker", "Page"],
        ["Community map", "Explore approximate public markers for projects, facilities and reported issues.", "/map", "Page"],
        ["Chinsali gallery", "See Chinsali heritage, nature, town life, landmarks and community stories.", "/gallery", "Page"],
        ["Polls & consultations", "Vote on community priorities and public planning questions.", "/polls", "Participation"],
        ["News & notices", "Announcements, public meetings, opportunities and project updates.", "/news", "Page"],
        ["Help & information", "Answers about reports, proposals, privacy, public records and feature-phone access.", "/help", "Page"],
        ["Staff portal", "Authorised workspace for council and institutional teams.", "/admin", "Page"],
    ].map(([title, description, route, type]) => ({ title, description, route, type }));
    const servicesIndex = services.map((item) => ({ title: item.title, description: `${item.description} ${item.department} ${item.category}`, route: "/services", type: "Service" }));
    const projectsIndex = state.data.projects.map((item) => ({ title: item.title, description: `${item.summary} ${item.category} ${item.ward} ${item.status}`, route: "/tracker", type: "Project" }));
    const newsIndex = [...news, ...representativeUpdates].map((item) => ({ title: item.title, description: `${item.excerpt} ${item.tag}`, route: "/news", type: "News" }));
    const galleryIndex = [...galleryItems, ...storyItems].map((item) => ({ title: item.title, description: `${item.description} ${item.category} ${item.source}`, route: "/gallery", type: "Gallery" }));
    const pollIndex = state.data.polls.map((item) => ({ title: item.question, description: `${item.poll_options.map((option) => option.label).join(" ")} ${item.closes}`, route: "/polls", type: "Consultation" }));
    return [...pages, ...servicesIndex, ...projectsIndex, ...newsIndex, ...galleryIndex, ...pollIndex];
}
function renderSearch() {
    const query = state.searchQuery.trim().toLowerCase();
    const results = query ? searchCatalog().filter((item) => `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(query)) : [];
    return `<main class="container page-shell search-page">${pageIntro("GLOBAL SEARCH / PUBLIC PORTAL", query ? `Results for “${esc(state.searchQuery)}”` : "Search the public portal", "Find pages, services, projects, notices, consultations and Chinsali stories from one place.", "")}${query ? `<div class="search-results-meta"><strong>${results.length}</strong> matches found</div><div class="search-results">${results.map((item) => `<a class="search-result-card" href="#${item.route}" data-route="${item.route}"><span class="search-result-type">${esc(item.type)}</span><h2>${esc(item.title)}</h2><p>${esc(item.description)}</p><span class="text-button">Open ${esc(item.type.toLowerCase())} →</span></a>`).join("") || `<div class="empty-state"><h2>No matching content yet.</h2><p>Try a broader search such as “water”, “market”, “health” or “project”.</p></div>`}</div>` : `<div class="search-empty"><span class="search-empty-icon">${icon("search")}</span><h2>Search pages, services and stories.</h2><p>Try “boreholes”, “heritage”, “health”, “poll”, “road” or any topic you want to find.</p><form class="search-page-form" id="search-page-form"><label class="search-box">${icon("search")}<input name="query" placeholder="What are you looking for?" aria-label="Search the portal" required /><button class="button button-primary" type="submit">Search</button></label></form></div>`}</main>`;
}
function renderPage() { switch (state.route) {
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
    default: return renderHome();
} }
function render(options = {}) { const app = document.querySelector("#app"); if (!app)
    return; document.documentElement.dataset.theme = state.theme; document.body.classList.toggle("mobile-menu-open", state.mobileOpen); landmarkMap?.remove(); landmarkMap = null; document.title = `${state.route === "/" ? "My Chinsali" : `${state.route.slice(1).replaceAll("-", " ")} · My Chinsali`}`; app.innerHTML = `${renderHeader()}${renderPage()}${renderFooter()}${state.toastTimer ? "" : ""}`; initLandmarkMap(); if (options.transition) {
    app.classList.remove("route-exit");
    app.classList.add("route-enter");
    window.setTimeout(() => app.classList.remove("route-enter"), 360);
}
if (state.modalService)
    document.body.classList.add("modal-open");
else
    document.body.classList.remove("modal-open"); }
function showToast(message, tone = "success") { const existing = document.querySelector(".toast"); existing?.remove(); const toast = document.createElement("div"); toast.className = `toast toast-${tone}`; toast.innerHTML = `${tone === "success" ? icon("check") : icon("alert")}<span>${esc(message)}</span>`; document.body.append(toast); if (state.toastTimer)
    window.clearTimeout(state.toastTimer); state.toastTimer = window.setTimeout(() => toast.remove(), 4200); }
function navigate(route) { const next = normalizeRoute(route); if (next === state.route) {
    state.mobileOpen = false;
    render();
    return;
} const app = document.querySelector("#app"); const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; const commit = () => { state.route = next; state.mobileOpen = false; state.modalService = null; window.history.pushState({}, "", `#${next}`); render({ transition: !reducedMotion }); window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }); }; if (!app || reducedMotion) {
    commit();
    return;
} app.classList.remove("route-enter"); app.classList.add("route-exit"); window.setTimeout(commit, 150); }
function cycleWard() { const index = WARDS.indexOf(state.ward); state.ward = WARDS[(index + 1) % WARDS.length] ?? WARDS[0]; localStorage.setItem("my-chinsali-ward", state.ward); render(); showToast(`Community view changed to ${state.ward}.`); }
async function submitPublicRecord(payload) {
    const saveLocally = () => {
        const ref = randomRef(payload.kind === "proposal" ? "PROP" : "MC");
        const records = getStored("my-chinsali-references", {});
        records[ref] = { title: String(payload.title ?? payload.category ?? "Community submission"), status: "Saved in this browser · backend unavailable", kind: String(payload.kind ?? "report") };
        setStored("my-chinsali-references", records);
        return { ok: true, ref, local: true };
    };
    let response;
    try {
        response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    catch (error) {
        if (!(error instanceof TypeError))
            throw error;
        return saveLocally();
    }
    if ([404, 501].includes(response.status) && !response.headers.get("content-type")?.includes("application/json")) {
        return saveLocally();
    }
    let result;
    try {
        result = await response.json();
    }
    catch {
        throw new Error("The backend returned an invalid response.");
    }
    if (!response.ok)
        throw new Error(result.error ?? "The submission could not be saved.");
    if (typeof result.reference !== "string")
        throw new Error("The backend returned an invalid submission reference.");
    return { ok: true, ref: result.reference, local: false };
}
async function handleSubmit(form) { const formId = form.id; const submitButton = form.querySelector("button[type=submit]"); if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.original = submitButton.innerHTML;
    submitButton.textContent = "Sending…";
} try {
    if (formId === "report-form") {
        const details = readForm(form, "details");
        if (details.length < 5)
            throw new Error("Please add a few more details so the team can act.");
        const response = await submitPublicRecord({ kind: state.selectedReportKind, details: `${readForm(form, "location")} — ${details}`, ward: readForm(form, "ward"), category: readForm(form, "category"), phone: readForm(form, "anonymous") ? "" : readForm(form, "phone") });
        form.innerHTML = `<div class="success-state"><span class="success-mark">${icon("check")}</span><p class="eyebrow">REFERENCE CREATED</p><h2>Thank you for speaking up.</h2><p>${response.local ? "The backend is unavailable, so this reference is saved only in this browser." : "Your report was received by the local backend. Public status lookup is not enabled yet."}</p><strong class="reference-number">${esc(response.ref)}</strong><div class="success-actions">${response.local ? link("/tracker", "View local reference", "button button-primary") : ""} ${button("Send another", "reset-report", "button button-secondary")}</div>${response.local ? "" : '<p class="small-note">Keep this reference for future follow-up. No public submission details are exposed.</p>'}</div>`;
        showToast(`Your reference is ${response.ref}.`);
    }
    else if (formId === "proposal-form") {
        const title = readForm(form, "title");
        if (title.length < 5)
            throw new Error("Give your proposal a clear title.");
        const response = await submitPublicRecord({ kind: "proposal", title, details: `${readForm(form, "need")} Solution: ${readForm(form, "solution")}`, ward: readForm(form, "ward"), category: readForm(form, "category"), phone: "" });
        form.innerHTML = `<div class="success-state"><span class="success-mark">${icon("check")}</span><p class="eyebrow">${response.local ? "LOCAL PROPOSAL REFERENCE" : "PROPOSAL RECEIVED"}</p><h2>${esc(title)}</h2><p>${response.local ? "The backend is unavailable, so this reference is saved only in this browser." : "Your proposal was received by the local backend. Staff review and public status lookup are not connected yet."}</p><strong class="reference-number">${esc(response.ref)}</strong><div class="success-actions">${response.local ? link("/tracker", "View local reference", "button button-primary") : ""} ${button("Submit another idea", "reset-proposal", "button button-secondary")}</div></div>`;
        showToast(`Proposal ${response.ref} received.`);
    }
    else if (formId === "whistle-form") {
        const details = readForm(form, "details");
        if (details.length < 10)
            throw new Error("Please provide enough detail for a restricted review.");
        const ref = randomRef("SAFE");
        form.innerHTML = `<div class="success-state"><span class="success-mark success-mark-dark">${icon("lock")}</span><p class="eyebrow">CONFIDENTIAL CONCEPT REFERENCE</p><h2>Keep this reference safe.</h2><p>Your submission has been captured in this prototype as a restricted reference. Operational investigation and agency referral require the safeguards described above.</p><strong class="reference-number">${ref}</strong><div class="success-actions">${link("/help", "Read safety guidance", "button button-light")} ${button("Close", "reset-whistle", "button button-secondary")}</div></div>`;
        showToast("Confidential reference created.");
    }
    else if (formId === "community-feedback-form") {
        const details = readForm(form, "details");
        if (details.length < 10)
            throw new Error("Please add a little more detail so the feedback is useful.");
        const response = await submitPublicRecord({ kind: "community-feedback", title: readForm(form, "kind"), details: `${readForm(form, "location")} — ${details}`, ward: readForm(form, "ward"), contact: readForm(form, "contact") });
        form.innerHTML = `<div class="success-state"><span class="success-mark">${icon("check")}</span><p class="eyebrow">FEEDBACK RECEIVED</p><h2>Thank you for helping Chinsali improve.</h2><p>${response.local ? "The backend is unavailable, so this reference is saved only in this browser." : "Your feedback was received by the local backend. Public status lookup is not enabled yet."}</p><strong class="reference-number">${esc(response.ref)}</strong><div class="success-actions">${link("/community", "Back to community", "button button-primary")} ${button("Send another", "reset-community-feedback", "button button-secondary")}</div></div>`;
        showToast(`Feedback ${response.ref} received.`);
    }
    else if (formId === "memory-form") {
        const text = readForm(form, "text");
        if (text.length < 10)
            throw new Error("Please share a little more so the memory is useful to visitors.");
        if (!form.querySelector("input[name=consent]")?.checked)
            throw new Error("Please confirm that this memory can be shown publicly in this browser.");
        const memories = getMemories().filter((memory) => memory.date !== "Shared for illustration");
        memories.unshift({ name: readForm(form, "name") || "A visitor", ward: readForm(form, "ward"), category: readForm(form, "category"), text, date: "Just shared in this browser" });
        setStored("my-chinsali-memories", memories);
        form.reset();
        const list = document.querySelector("#memory-list");
        if (list) list.innerHTML = `<p class="eyebrow">RECENTLY SHARED</p>${memoryCards(memories)}`;
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = submitButton.dataset.original ?? "Share this memory <span>→</span>";
        }
        showToast("Your Chinsali memory is saved in this browser.");
    }
    else if (formId === "admin-form") {
        showToast("Staff authentication is not connected in this prototype.", "info");
    }
}
catch (error) {
    showToast(error instanceof Error ? error.message : "Please check the form and try again.", "error");
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.dataset.original ?? "Submit";
    }
} }
function vote(pollId, optionId) { const voted = getStored("my-chinsali-votes", {}); if (voted[pollId])
    return; const poll = state.data.polls.find((item) => item.id === pollId); const option = poll?.poll_options.find((item) => item.id === optionId); if (option)
    option.votes += 1; voted[pollId] = true; setStored("my-chinsali-votes", voted); render(); showToast("Thank you — your response is recorded."); }
function showTrackerResult(reference) { const target = document.querySelector("#tracker-result"); if (!target)
    return; const refs = getStored("my-chinsali-references", {}); const local = refs[reference.toUpperCase()]; if (local) {
    target.innerHTML = `<div class="tracker-result result-local"><div><p class="eyebrow">${esc(local.kind)} · ${esc(reference.toUpperCase())}</p><h2>${esc(local.title)}</h2><p>This browser has a locally stored fallback record. Live status updates appear when the connected service is available.</p></div><span class="status tone-orange">${esc(local.status)}</span></div>`;
    return;
} const project = state.data.projects.find((item) => item.id.toLowerCase().includes(reference.toLowerCase()) || item.title.toLowerCase().includes(reference.toLowerCase())); if (project) {
    target.innerHTML = `<div class="tracker-result"><div><p class="eyebrow">PUBLIC PROJECT RECORD</p><h2>${esc(project.title)}</h2><p>${esc(project.summary)}</p></div><span class="status ${statusTone(project.status)}">${statusLabel(project.status)} · ${project.progress}%</span></div>`;
    return;
} target.innerHTML = `<div class="tracker-result result-empty"><span>${icon("alert")}</span><div><h2>We could not find that reference.</h2><p>Check the number and try again, or browse the public project records below.</p></div></div>`; }
function handleClick(event) { const target = event.target.closest("[data-route], [data-action]"); if (!target)
    return; const route = target.dataset.route; if (route) {
    event.preventDefault();
    if (route === "/services" && target.dataset.category)
        state.serviceCategory = target.dataset.category;
    navigate(route);
    return;
} const action = target.dataset.action; if (!action)
    return; switch (action) {
    case "toggle-theme":
        state.theme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("my-chinsali-theme", state.theme);
        render();
        break;
    case "toggle-mobile":
        state.mobileOpen = !state.mobileOpen;
        render();
        document.querySelector(state.mobileOpen ? ".mobile-nav-close" : ".mobile-menu")?.focus();
        break;
    case "close-mobile":
        state.mobileOpen = false;
        render();
        document.querySelector(".mobile-menu")?.focus();
        break;
    case "open-more": {
        const menu = document.querySelector("#more-menu");
        if (menu)
            menu.hidden = !menu.hidden;
        break;
    }
    case "cycle-ward":
        cycleWard();
        break;
    case "service-category":
        state.serviceCategory = target.dataset.category ?? "All";
        render();
        break;
    case "service-details":
        state.modalService = target.dataset.id ?? null;
        render();
        break;
    case "close-modal":
        if (!(target.closest(".modal-card") && target.dataset.action !== "close-modal")) {
            state.modalService = null;
            render();
        }
        break;
    case "select-report-kind":
        state.selectedReportKind = target.dataset.kind ?? "issue";
        render();
        break;
    case "use-location": {
        const input = document.querySelector("input[name=location]");
        if (!navigator.geolocation || !input) {
            showToast("Location is not available. Add a landmark instead.", "info");
            break;
        }
        navigator.geolocation.getCurrentPosition((position) => { input.value = `GPS ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`; showToast("Location added to your report."); }, () => showToast("We could not read your location. Add a landmark instead.", "info"));
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
    case "map-marker": {
        const selection = document.querySelector("#map-selection");
        if (selection)
            selection.innerHTML = `<strong>${esc(target.dataset.title)}</strong><span>${esc(target.dataset.status)}</span>`;
        break;
    }
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
        state.galleryIndex = (state.galleryIndex + 1) % galleryItems.length;
        render();
        break;
    case "gallery-prev":
        state.galleryIndex = (state.galleryIndex - 1 + galleryItems.length) % galleryItems.length;
        render();
        break;
    case "vote":
        void vote(target.dataset.poll ?? "", target.dataset.option ?? "");
        break;
    case "toggle-faq": {
        const item = target.closest(".faq-item");
        if (!item)
            break;
        item.classList.toggle("open");
        const mark = target.querySelector("strong");
        if (mark)
            mark.textContent = item.classList.contains("open") ? "−" : "+";
        break;
    }
    case "notice-toast":
        showToast("Notice details are ready for publication by the council.", "info");
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
    case "reset-whistle":
        navigate("/whistleblowing");
        break;
    case "project-detail":
        showToast("Project record detail view is ready for the next data connection.", "info");
        break;
} }
document.addEventListener("click", handleClick);
document.addEventListener("keydown", (event) => {
    if (state.mobileOpen && event.key === "Escape") {
        state.mobileOpen = false;
        render();
        document.querySelector(".mobile-menu")?.focus();
        return;
    }
    if (state.mobileOpen && event.key === "Tab") {
        const focusable = [...document.querySelectorAll(".mobile-nav a[href], .mobile-nav button, .mobile-nav summary")].filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    }
    if (state.galleryIndex === null)
        return;
    if (event.key === "Escape") {
        state.galleryIndex = null;
        render();
    }
    if (event.key === "ArrowRight") {
        state.galleryIndex = (state.galleryIndex + 1) % galleryItems.length;
        render();
    }
    if (event.key === "ArrowLeft") {
        state.galleryIndex = (state.galleryIndex - 1 + galleryItems.length) % galleryItems.length;
        render();
    }
});
document.addEventListener("submit", (event) => { event.preventDefault(); const form = event.target; if (form.id === "global-search-form" || form.id === "search-page-form") {
    state.searchQuery = readForm(form, "query");
    navigate("/search");
    return;
} if (form.id === "tracker-form") {
    showTrackerResult(readForm(form, "reference"));
}
else {
    void handleSubmit(form);
} });
document.addEventListener("input", (event) => { const target = event.target; if (target.id === "service-search") {
    state.serviceQuery = target.value;
    render();
    const search = document.querySelector("#service-search");
    search?.focus();
    search?.setSelectionRange(target.value.length, target.value.length);
} });
function renderHistoryRoute() { const next = currentRoute(); const app = document.querySelector("#app"); const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; if (!app || reducedMotion) {
    state.route = next;
    render();
    return;
} app.classList.remove("route-enter"); app.classList.add("route-exit"); window.setTimeout(() => { state.route = next; render({ transition: true }); window.scrollTo({ top: 0, behavior: "smooth" }); }, 150); }
window.addEventListener("popstate", renderHistoryRoute);
window.addEventListener("hashchange", renderHistoryRoute);
render();
