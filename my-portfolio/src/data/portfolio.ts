// src/data/portfolio.ts
import { uweHome } from './projects/uwe-home';
import { smileJobs } from './projects/smile-jobs';


/* ── Types ──────────────────────────────────────────────────────── */


export interface SocialLink {
  label: string;
  url: string;
}


export interface Profile {
  name: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  availability?: string;
  portrait?: string;
  demoMode?: boolean;
  socialLinks: SocialLink[];
}


export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  items: string[];
}


export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}


export interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
}


export interface Credential {
  title: string;
  issuer: string;
  description: string;
  image?: string;
  url?: string;
}


export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}


/* ── Project rich-detail types ──────────────────────────────────── */


export interface ProjectStat {
  value: string;
  suffix?: string;
  label: string;
  description?: string;
}


export interface ProjectFlowStep {
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'done';
}


export interface ProjectFlow {
  title: string;
  steps: ProjectFlowStep[];
}


export interface ProjectArchNode {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'tertiary';
  description?: string;
}


export interface ProjectArchConnection {
  from: string;
  to: string;
  label?: string;
}


export interface ProjectArchitecture {
  title: string;
  description: string;
  nodes: ProjectArchNode[];
  connections?: ProjectArchConnection[];
}


export interface ProjectFeatureGroup {
  title: string;
  icon: string;
  features: string[];
}


export interface ProjectTechCategory {
  category: string;
  items: string[];
}


export interface ProjectGalleryItem {
  image: string;
  alt: string;
  caption?: string;
}


export interface MobilePreviewBrief {
  title: string;
  text: string;
}


export interface MobilePreviewScreenshot {
  url: string;
  caption: string;
}


export interface MobilePreview {
  enabled: boolean;
  appName?: string;
  appTagline?: string;
  appIcon?: string;
  appDeveloper?: string;
  appRating?: number;
  appDownloads?: string;
  appCategory?: string;
  appVersion?: string;
  appSize?: string;
  appReleaseDate?: string;
  appLocation?: string;
  appDescription?: string;
  playStoreUrl?: string;
  livePreviewUrl?: string;
  projectBrief?: MobilePreviewBrief[];
  featureHighlights?: string[];
  screenshots?: MobilePreviewScreenshot[];
}


export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  problemStatement?: string;
  solution?: string;
  year: string;
  color: string;
  image: string;
  imageSet?: string;
  imageAlt: string;
  url?: string;
  demo?: boolean;
  tags: string[];
  highlights?: string[];
  gallery?: ProjectGalleryItem[];
  stats?: ProjectStat[];
  architecture?: ProjectArchitecture;
  flows?: ProjectFlow[];
  featureGroups?: ProjectFeatureGroup[];
  techStack?: ProjectTechCategory[];
  clientValue?: string[];
  mobilePreview?: MobilePreview;
}


/* ── Profile ────────────────────────────────────────────────────── */


export const profile: Profile = {
  name: 'Bhavuk Deshmukh',
  role: 'Full-Stack Developer & Creative Technologist',
  location: 'Pune, India',
  timezone: 'Asia/Kolkata',
  email: 'bhavukdeshmukh@uweservices.com',
  phone: '+917389353999',
  whatsapp: '917389353999',
  bio: 'I build thoughtful digital products — from mobile apps that reach thousands of users to clean back-end systems that just work. My focus is on real-world impact: fast, accessible, and quietly elegant software.',
  availability: 'Available for new projects',
  portrait: '/images/profile.svg',
  demoMode: false,
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bhavuk-deshmukh-189739257/' },
    { label: 'GitHub', url: 'https://github.com/deshmukh2804' },
    { label: 'Instagram', url: 'https://www.instagram.com/bhavuk_2804/' },
  ],
};


/* ── Disciplines ────────────────────────────────────────────────── */


export const disciplines: string[] = [
  'Mobile App Development',
  'Backend Engineering',
  'UI / UX Design',
  'System Architecture',
  'React & React Native',
  'Node.js & MongoDB',
  'REST & GraphQL APIs',
  'Cloud Deployment',
  'Design Systems',
  'Accessibility',
];


/* ── Services ───────────────────────────────────────────────────── */


export const services: Service[] = [
  {
    id: 'mobile',
    icon: 'layers',
    title: 'Mobile\nApplications',
    description:
      'Cross-platform React Native apps built for speed, reliability, and great user experience.',
    items: ['React Native & Expo', 'Offline-first architecture', 'Payment integrations', 'Push notifications'],
  },
  {
    id: 'web',
    icon: 'code',
    title: 'Web\nPlatforms',
    description:
      'Modern full-stack web applications — from marketing sites to complex admin dashboards.',
    items: ['React & Next.js', 'Node.js backends', 'MongoDB & Postgres', 'REST & GraphQL APIs'],
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Product\nDesign',
    description:
      'Interface and experience design informed by real engineering constraints.',
    items: ['UI design systems', 'Interaction patterns', 'Accessibility audits', 'Design-to-code'],
  },
];


/* ── Process ────────────────────────────────────────────────────── */


export const process: ProcessStep[] = [
  { number: '01', icon: 'message', title: 'Discover', description: 'Understand goals, users, and real constraints before writing a single line.' },
  { number: '02', icon: 'list',    title: 'Define',   description: 'Scope, flows, and milestones. A clear plan everyone agrees on.' },
  { number: '03', icon: 'pen',     title: 'Design',   description: 'Interfaces that look polished and feel inevitable.' },
  { number: '04', icon: 'code',    title: 'Build',    description: 'Clean, maintainable code with tests, docs, and smooth handoffs.' },
  { number: '05', icon: 'arrow',   title: 'Ship',     description: 'Measured launches with monitoring and iteration from day one.' },
];


/* ── Expertise ──────────────────────────────────────────────────── */


export const expertise: ExpertiseItem[] = [
  { icon: 'layout',        title: 'Clean architecture',    description: 'Code that stays readable six months later.' },
  { icon: 'sparkles',      title: 'Attention to detail',   description: 'The small things that quietly improve experience.' },
  { icon: 'accessibility', title: 'Inclusive by default',  description: 'Keyboard, screen-reader, and motion considered from the start.' },
  { icon: 'orbit',         title: 'Performance minded',    description: 'Fast first paint, light bundles, smooth interactions.' },
];


/* ── Credentials ────────────────────────────────────────────────── */


export const credentials: Credential[] = [];


/* ── Testimonials ───────────────────────────────────────────────── */


export const testimonials: Testimonial[] = [];


/* ── Projects ───────────────────────────────────────────────────── */


export const projects: Project[] = [
  /* ─────────────────────────────────────────────────────────────── */
  /* 1. UWe Home Services — imported from ./projects/uwe-home       */
  /*    (all 19 markdown docs, 12 stats, 13 feature groups, etc.)   */
  /* ─────────────────────────────────────────────────────────────── */
  uweHome,


  /* ─────────────────────────────────────────────────────────────── */
  /* 2. UWe Service Partner (Partner App)                            */
  /* ─────────────────────────────────────────────────────────────── */
  {
    id: 'uwe-service-partner',
    title: 'UWe Service Partner',
    category: 'Mobile App · Partner Tools',
    description:
      'Companion app for verified service partners to manage bookings, track earnings, and run their day-to-day.',
    longDescription:
      'The partner-side of the UWe ecosystem. Service professionals accept jobs, navigate to customers, complete work, track earnings, and manage their availability — all from one app built around speed and clarity.',
    problemStatement:
      'Service partners were juggling multiple tools, missing bookings, and struggling to track earnings — leading to lost income and inconsistent service quality.',
    solution:
      'A focused partner app with one-tap job acceptance, built-in navigation, instant earnings view, and transparent settlement — so partners spend less time on admin and more time on work.',
    year: '2025',
    color: '#3b82f6',
    image: '/images/uwehomeservicepatnerapp.svg',
    imageAlt: 'UWe Service Partner mobile app preview',
    demo: false,
    tags: ['React Native', 'Node.js', 'MongoDB', 'Google Maps', 'Firebase', 'Razorpay Payouts'],
    highlights: [
      'One-tap booking acceptance with 30s window',
      'Turn-by-turn navigation to customers',
      'Daily, weekly, monthly earnings dashboard',
      'KYC with face verification',
      'In-app partner-to-customer calls',
      'Availability toggle with slot blocking',
    ],
    stats: [
      { value: '1.2', suffix: 'k+', label: 'Active partners',  description: 'Across 3 cities' },
      { value: '92',  suffix: '%',  label: 'Acceptance rate',  description: 'Within 30 seconds' },
      { value: '4.8', suffix: '★',  label: 'Partner rating',   description: 'Avg across platform' },
      { value: '₹35', suffix: 'k',  label: 'Avg monthly',      description: 'Top-tier earnings' },
    ],
    architecture: {
      title: 'Partner System Architecture',
      description: 'Event-driven architecture optimized for low-latency job dispatch and secure earnings settlement.',
      nodes: [
        { id: 'partner',   label: 'Partner App',       type: 'primary' },
        { id: 'admin',     label: 'Admin Panel',       type: 'primary' },
        { id: 'api',       label: 'Backend API',       type: 'secondary' },
        { id: 'match',     label: 'Partner Matching',  type: 'secondary' },
        { id: 'auth',      label: 'Auth Engine',       type: 'secondary' },
        { id: 'face',      label: 'Face Verification', type: 'secondary' },
        { id: 'pay',       label: 'Payment / Earnings',type: 'secondary' },
        { id: 'maps',      label: 'Maps/GPS',          type: 'secondary' },
        { id: 'push',      label: 'Firebase FCM',      type: 'secondary' },
        { id: 'db',        label: 'MongoDB',           type: 'tertiary' },
        { id: 'queue',     label: 'RabbitMQ',          type: 'tertiary' },
        { id: 'cache',     label: 'Redis Cache',       type: 'tertiary' },
      ],
    },
    flows: [
      {
        title: 'Booking Acceptance',
        steps: [
          { label: 'New Booking Alert',  description: 'Push with 30-second window',    status: 'done' },
          { label: 'Review Details',     description: 'Price, distance, service type', status: 'done' },
          { label: 'Accept or Decline',  description: 'One-tap decision',              status: 'active' },
          { label: 'Navigate',           description: 'Turn-by-turn to location',      status: 'pending' },
          { label: 'OTP Verify Arrival', description: 'Customer confirms arrival',     status: 'pending' },
          { label: 'Start Service',      description: 'Service timer begins',          status: 'pending' },
        ],
      },
      {
        title: 'Partner Onboarding',
        steps: [
          { label: 'Register',           description: 'Phone + OTP sign-up',           status: 'done' },
          { label: 'Personal Info',      description: 'Name, address, Aadhaar',        status: 'done' },
          { label: 'Face Verification',  description: 'Live selfie match',             status: 'active' },
          { label: 'Service Selection',  description: 'Pick skills and categories',    status: 'pending' },
          { label: 'Bank Details',       description: 'For earnings payout',           status: 'pending' },
          { label: 'Training Modules',   description: 'Mandatory quality training',    status: 'pending' },
          { label: 'Go Live',            description: 'Admin approval + activation',   status: 'pending' },
        ],
      },
      {
        title: 'Earnings Settlement',
        steps: [
          { label: 'Service Complete',   description: 'Customer confirms + rates',     status: 'done' },
          { label: 'Earnings Credited',  description: 'Instant balance update',        status: 'done' },
          { label: 'Daily Summary',      description: 'Earnings breakdown by job',     status: 'active' },
          { label: 'Weekly Payout',      description: 'Auto-transfer to bank',         status: 'pending' },
          { label: 'Tax & GST Report',   description: 'Monthly statement generated',   status: 'pending' },
        ],
      },
    ],
    featureGroups: [
      {
        title: 'Booking Management',
        icon: 'list',
        features: [
          'Real-time new booking alerts',
          'One-tap accept or decline',
          'Full booking history',
          'Upcoming jobs calendar',
          'Reschedule and reassign flow',
          'Multi-booking queue view',
          'Cancellation reason tracking',
        ],
      },
      {
        title: 'Navigation & Tracking',
        icon: 'orbit',
        features: [
          'Turn-by-turn Google Maps nav',
          'Live location sharing with customer',
          'Optimized multi-stop routing',
          'ETA auto-updates',
          'Traffic-aware re-routing',
          'Offline map caching',
        ],
      },
      {
        title: 'Earnings & Analytics',
        icon: 'sparkles',
        features: [
          'Live earnings balance',
          'Daily, weekly, monthly views',
          'Service-wise income breakdown',
          'Tip tracking',
          'Weekly auto-payout',
          'Downloadable GST statements',
          'Performance insights',
        ],
      },
      {
        title: 'Profile & Verification',
        icon: 'accessibility',
        features: [
          'KYC with Aadhaar upload',
          'Face verification (live selfie)',
          'Bank account linking',
          'Skill badges and ratings',
          'Training completion status',
          'Service radius controls',
        ],
      },
      {
        title: 'Communication',
        icon: 'message',
        features: [
          'In-app chat with customer',
          'One-tap masked phone call',
          'Push notifications',
          'Support chat with admin',
          'Issue reporting flow',
          'Broadcast announcements',
        ],
      },
      {
        title: 'Availability Control',
        icon: 'layout',
        features: [
          'Online / offline toggle',
          'Working hours scheduler',
          'Day-off blocking',
          'Service category toggle',
          'Max daily bookings cap',
          'Break mode (temporary pause)',
        ],
      },
    ],
    techStack: [
      { category: 'Mobile',          items: ['React Native', 'Expo', 'Redux Toolkit', 'MMKV', 'React Native Maps'] },
      { category: 'Backend',         items: ['Node.js', 'Express', 'TypeScript', 'Socket.IO', 'JWT'] },
      { category: 'Database & Cache',items: ['MongoDB', 'Mongoose', 'Redis', 'RabbitMQ'] },
      { category: 'Verification',    items: ['Face API', 'Aadhaar OCR', 'Document validation'] },
      { category: 'Maps & Push',     items: ['Google Maps SDK', 'Directions API', 'Firebase FCM', 'Expo Push'] },
      { category: 'Payouts',         items: ['Razorpay Payouts', 'Bank verification', 'GST invoicing'] },
    ],
    clientValue: [
      'Faster acceptance means better customer wait times and higher ratings',
      'Transparent earnings reduces partner churn significantly',
      'Face verification keeps the platform safe and trusted',
      'Auto-payouts eliminate weekly manual settlement work',
      'Availability controls give partners real work-life balance',
    ],
    mobilePreview: {
      enabled: true,
      appName: 'UWe Service Partner',
      appTagline: 'Your work, your schedule.',
      appIcon: '/images/uwe-partner-logo.png',
      appRating: 4.8,
      appDownloads: '1.2K+',
      appCategory: 'Business · Partner Tools',
      appVersion: '1.0.0',
      appSize: '32 MB',
      appReleaseDate: 'Oct 2025',
      appLocation: 'India',
      appDescription:
        'Accept bookings, navigate to customers, track earnings — the complete toolkit for service professionals on the UWe network.',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.uwe.partner',
      projectBrief: [
        { title: 'The Vision', text: 'The partner-side app that powers the entire UWe service network.' },
        { title: 'The Build',  text: 'Built for speed: one-tap acceptance, live navigation, instant earnings.' },
        { title: 'The Impact', text: '1,200+ active partners, 92% acceptance rate, 4.8-star partner rating.' },
      ],
      featureHighlights: [
        'One-tap booking acceptance',
        'Built-in turn-by-turn navigation',
        'Real-time earnings dashboard',
        'Weekly automatic payouts',
      ],
    },
  },


  /* ─────────────────────────────────────────────────────────────── */
  /* 3. UWe Admin Panel                                              */
  /* ─────────────────────────────────────────────────────────────── */
  {
    id: 'uwe-admin-panel',
    title: 'UWe Admin Panel',
    category: 'Web Dashboard · Operations',
    description:
      'Operations dashboard for managing bookings, partners, customers, pricing, and platform analytics in real time.',
    longDescription:
      'The command center for the UWe platform. Admins approve partners, monitor live bookings, resolve disputes, adjust pricing, run promotions, and view platform-wide analytics across all cities.',
    problemStatement:
      'Operations was running on spreadsheets, WhatsApp groups, and manual coordination — leading to slow partner approvals and delayed dispute resolution.',
    solution:
      'A unified web dashboard with role-based access, live operational views, and automated workflows that cut admin workload dramatically.',
    year: '2025',
    color: '#f59e0b',
    image: '/images/admin%20penal.svg',
    imageAlt: 'UWe Admin Panel web dashboard preview',
    demo: false,
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Chart.js', 'RBAC'],
    highlights: [
      'Role-based access control (RBAC)',
      'Live booking map across all cities',
      'Partner approval and KYC review flow',
      'Dynamic pricing and promo engine',
      'Real-time analytics dashboard',
      'Dispute resolution workspace',
    ],
    stats: [
      { value: '15',  suffix: '+',  label: 'Admin roles',       description: 'Granular permissions' },
      { value: '3',               label: 'Cities managed',    description: 'From one dashboard' },
      { value: '50', suffix: 'k+', label: 'Bookings/mo',       description: 'Processed in platform' },
      { value: '99.9', suffix: '%',label: 'Uptime',            description: 'Across last 6 months' },
    ],
    architecture: {
      title: 'Platform Architecture',
      description: 'React admin dashboard talking to the shared backend API with RBAC-enforced endpoints and live socket streams.',
      nodes: [
        { id: 'admin',  label: 'Admin Panel',      type: 'primary' },
        { id: 'api',    label: 'Backend Platform', type: 'secondary' },
        { id: 'auth',   label: 'Auth + RBAC',      type: 'secondary' },
        { id: 'db',     label: 'MongoDB',          type: 'tertiary' },
        { id: 'cache',  label: 'Redis',            type: 'tertiary' },
      ],
    },
    flows: [
      {
        title: 'Partner Approval Flow',
        steps: [
          { label: 'New Application',  description: 'Partner submits KYC',           status: 'done' },
          { label: 'Document Review',  description: 'Aadhaar + address verification',status: 'done' },
          { label: 'Background Check', description: 'Automated + manual review',     status: 'active' },
          { label: 'Approval Decision',description: 'Approve, reject, or request more info', status: 'pending' },
          { label: 'Partner Live',     description: 'Account activated',             status: 'pending' },
        ],
      },
    ],
    featureGroups: [
      {
        title: 'User Management',
        icon: 'accessibility',
        features: [
          'Admin user and role management',
          'Permission-based access control',
          'Audit log of every action',
          'Session management',
        ],
      },
      {
        title: 'Operations',
        icon: 'layout',
        features: [
          'Live booking monitor',
          'Partner approval workspace',
          'Customer support console',
          'Dispute resolution tool',
          'Pricing and promo engine',
        ],
      },
      {
        title: 'Analytics',
        icon: 'sparkles',
        features: [
          'Revenue dashboards',
          'Booking funnel analytics',
          'Partner performance leaderboard',
          'Customer retention metrics',
        ],
      },
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Chart.js'] },
      { category: 'Backend',  items: ['Node.js', 'Express', 'TypeScript', 'JWT', 'RBAC middleware'] },
      { category: 'Data',     items: ['MongoDB', 'Mongoose', 'Redis', 'Aggregation Pipelines'] },
      { category: 'DevOps',   items: ['Docker', 'GitHub Actions', 'AWS'] },
    ],
    clientValue: [
      'One dashboard replaces spreadsheets and ad-hoc tools',
      'RBAC lets you safely add many ops roles without risk',
      'Live views cut dispute resolution time by hours',
      'Analytics drives real pricing and marketing decisions',
    ],
  },


  /* ─────────────────────────────────────────────────────────────── */
  /* 4. Smile Jobs — Hyperlocal Hiring Platform                      */
  /*    imported from ./projects/smile-jobs                          */
  /* ─────────────────────────────────────────────────────────────── */
  smileJobs,
];