// src/App.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties, FormEvent, KeyboardEvent, RefObject } from 'react';
import {
  Accessibility, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight,
  Check, CheckCheck, Code2, Copy, Layers3, LayoutGrid,
  ListChecks, Mail, Menu, MessageSquare, Orbit, PenTool, Plus,
  Sparkles, X, Server, Database, Zap, Shield, Smartphone, Monitor,
  Globe, Activity, BarChart3, TrendingUp, Users, Settings, CreditCard,
  Bell, Lock, Eye, FileCheck, Workflow, Boxes, CircuitBoard,
  AlertCircle, Home as HomeIcon, ChevronUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  credentials, disciplines, expertise, process, profile, projects,
  services, testimonials,
} from './data/portfolio';
import type {
  Project, ProjectFlow, ProjectArchitecture, ProjectFeatureGroup,
  ProjectTechCategory, ProjectStat,
} from './data/portfolio';
import SmokeCursor from './components/SmokeCursor';
import { usePortfolioMotion } from './hooks/usePortfolioMotion';
import MobilePreviewPage from './components/MobilePreviewPage';

/* ── Professional Email Helper ───────────────────────────────────── */
function openEmail() {
  const to = profile.email;
  const subject = encodeURIComponent(
    `Collaboration Inquiry — ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
  );
  const body = encodeURIComponent(
    [
      `Dear ${profile.name.split(' ')[0]},`,
      ``,
      `I came across your portfolio and was impressed by your work. I'd like to explore a potential collaboration.`,
      ``,
      `— Project Overview —`,
      `Project Type: [e.g., Web App / Mobile App / Landing Page / Dashboard]`,
      `Industry: [e.g., FinTech / HealthCare / E-Commerce / SaaS]`,
      `Brief Description: [A short summary of your project vision]`,
      ``,
      `— Scope & Requirements —`,
      `Key Features: [List 2-3 core features you need]`,
      `Design Preferences: [Any reference sites, style guides, or branding assets?]`,
      `Target Audience: [Who are the primary users?]`,
      ``,
      `— Timeline & Budget —`,
      `Estimated Timeline: [e.g., 4-6 weeks / 2-3 months / Flexible]`,
      `Budget Range: [e.g., ₹50K-1L / $1K-5K / Open to discussion]`,
      `Start Date: [e.g., Immediately / Next month / Specific date]`,
      ``,
      `— Additional Context —`,
      `[Any other details, links, documents, or questions you'd like to share]`,
      ``,
      `I look forward to hearing from you and discussing how we can work together.`,
      ``,
      `Best regards,`,
      `[Your Full Name]`,
      `[Your Company / Organization]`,
      `[Your Phone Number]`,
      `[Your Website or LinkedIn Profile]`,
    ].join('\n')
  );
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

/* ── Platform Logo SVGs ──────────────────────────────────────────── */
function AndroidLogo({ size = 20, color = '#3DDC84' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V7H6v11zM3.5 7C2.67 7 2 7.67 2 8.5v7c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-7C5 7.67 4.33 7 3.5 7zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 0c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.98 5.98 0 0 0 6 6h12c0-2.21-1.24-4.13-3.47-5.84zM10 4H9V3h1v1zm5 0h-1V3h1v1z" fill={color} />
    </svg>
  );
}
function ReactLogo({ size = 20, color = '#61DAFB' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill={color} />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1" fill="none">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="12s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(60 12 12)">
        <animateTransform attributeName="transform" type="rotate" from="60 12 12" to="420 12 12" dur="12s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1" fill="none" transform="rotate(120 12 12)">
        <animateTransform attributeName="transform" type="rotate" from="120 12 12" to="480 12 12" dur="12s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

/* ── Brand Logos ──────────────────────────────────────────────────── */
function WhatsAppLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#25D366" d="M16.001 0C7.164 0 .003 7.161.003 15.998c0 2.823.741 5.586 2.149 8.019L0 32l8.164-2.139a15.93 15.93 0 0 0 7.837 2.004h.007C24.845 31.865 32 24.705 32 15.868 32 11.595 30.33 7.577 27.3 4.56 24.272 1.541 20.26 0 16.001 0z" />
      <path fill="#FFF" d="M23.472 19.314c-.397-.198-2.35-1.16-2.713-1.292-.364-.133-.629-.199-.894.198-.265.397-1.026 1.292-1.258 1.557-.232.265-.464.298-.861.1-.397-.199-1.676-.618-3.192-1.97-1.18-1.053-1.977-2.354-2.209-2.751-.232-.397-.025-.611.174-.809.179-.178.397-.464.596-.696.199-.232.265-.397.397-.662.133-.265.066-.496-.033-.695-.099-.199-.894-2.154-1.225-2.949-.322-.774-.65-.669-.894-.681-.231-.012-.496-.015-.761-.015-.265 0-.695.099-1.059.496-.364.397-1.389 1.357-1.389 3.311 0 1.953 1.422 3.84 1.621 4.105.199.265 2.798 4.273 6.779 5.991.948.409 1.687.653 2.263.836.95.302 1.814.26 2.498.158.762-.114 2.35-.96 2.681-1.888.331-.927.331-1.722.232-1.887-.099-.165-.364-.265-.761-.463z" />
    </svg>
  );
}
function LinkedInLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#0A66C2" />
      <path fill="#FFF" d="M11.6 12.9H7.9V25h3.7V12.9zM9.75 7a2.15 2.15 0 1 0 0 4.3 2.15 2.15 0 0 0 0-4.3zM25 25h-3.7v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33V25h-3.7V12.9h3.55v1.66h.05c.5-.94 1.7-1.94 3.5-1.94 3.75 0 4.44 2.47 4.44 5.68V25z" />
    </svg>
  );
}
function GmailLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 24" aria-hidden="true">
      <path fill="#4285F4" d="M2 24h5V12L0 7v15c0 1.105.895 2 2 2z" />
      <path fill="#34A853" d="M25 24h5c1.105 0 2-.895 2-2V7l-7 5" />
      <path fill="#FBBC04" d="M25 2v10l7-5V3c0-1.84-2.1-2.89-3.58-1.79" />
      <path fill="#EA4335" d="M7 12V2l9 6.75L25 2v10l-9 6.75" />
      <path fill="#C5221F" d="M0 3v4l7 5V2L3.58.21C2.1-.89 0 .16 0 3z" />
    </svg>
  );
}
function PhoneLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#34C759" />
      <path fill="#FFF" d="M22.74 20.4c-.9-.07-1.78-.3-2.6-.68a1.47 1.47 0 0 0-1.55.33l-1.7 1.7a13.4 13.4 0 0 1-6.2-6.2l1.7-1.7c.42-.4.55-1.02.33-1.55a9.47 9.47 0 0 1-.68-2.6 1.47 1.47 0 0 0-1.47-1.3H8.07a1.47 1.47 0 0 0-1.47 1.6c.47 4.46 2.4 8.63 5.56 11.78 3.15 3.16 7.32 5.1 11.78 5.56a1.47 1.47 0 0 0 1.6-1.47V22.9c0-.78-.6-1.43-1.37-1.47z" />
    </svg>
  );
}
function GitHubLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#FFF" fillRule="evenodd" clipRule="evenodd" d="M16 0C7.16 0 0 7.16 0 16c0 7.07 4.58 13.07 10.94 15.19.8.15 1.09-.35 1.09-.77 0-.38-.01-1.39-.02-2.72-4.45.97-5.39-2.14-5.39-2.14-.73-1.85-1.78-2.34-1.78-2.34-1.45-.99.11-.97.11-.97 1.61.11 2.46 1.65 2.46 1.65 1.43 2.45 3.75 1.74 4.66 1.33.14-1.04.56-1.74 1.01-2.14-3.55-.4-7.29-1.78-7.29-7.9 0-1.75.62-3.17 1.65-4.29-.17-.4-.72-2.03.15-4.23 0 0 1.34-.43 4.4 1.64a15.3 15.3 0 0 1 8.01 0c3.05-2.07 4.4-1.64 4.4-1.64.87 2.2.32 3.83.16 4.23a6.2 6.2 0 0 1 1.65 4.29c0 6.14-3.75 7.49-7.32 7.89.58.49 1.09 1.47 1.09 2.96 0 2.14-.02 3.86-.02 4.39 0 .43.29.93 1.1.77A16.01 16.01 0 0 0 32 16c0-8.84-7.16-16-16-16z" />
    </svg>
  );
}
function InstagramLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <radialGradient id="ig-g" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#ig-g)" />
      <path fill="none" stroke="#FFF" strokeWidth="2" d="M11 7h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4z" />
      <circle cx="16" cy="16" r="4.2" fill="none" stroke="#FFF" strokeWidth="2" />
      <circle cx="21.6" cy="10.4" r="1.3" fill="#FFF" />
    </svg>
  );
}

/* ── Icon registries ─────────────────────────────────────────────── */
const icons: Record<string, LucideIcon> = {
  code: Code2, layers: Layers3, orbit: Orbit, message: MessageSquare,
  list: ListChecks, pen: PenTool, arrow: ArrowUpRight, layout: LayoutGrid,
  sparkles: Sparkles, accessibility: Accessibility,
};
const archIcons: Record<string, LucideIcon> = {
  'Customer App': Smartphone, 'Partner App': Smartphone, 'Admin Panel': Monitor,
  'Admin Dashboard': Monitor, 'Backend API': Server, 'Backend Platform': Server,
  MongoDB: Database, Database: Database, 'Redis Cache': Zap, Redis: Zap,
  'Redis (OTP Store)': Zap, RabbitMQ: Workflow, Storage: Boxes,
  Razorpay: CreditCard, 'Payment / Earnings': CreditCard, Firebase: Bell,
  'Firebase FCM': Bell, 'Maps/GPS': Globe, 'Auth + RBAC': Shield,
  'Auth Engine': Shield, User: Users, 'Face Verification': Eye,
  'OTP Verification': Lock, 'Secure Session': Shield, Application: Globe,
  'Service Booking': FileCheck, 'Partner Matching': Activity,
  'Service Provider': Settings, 'Service Completion': Check,
  'Seeker App': Smartphone, 'Employer App': Smartphone,
  'Cloudinary CDN': Globe, 'Socket.IO': Zap,
};
const navLinks = [
  ['Work', 'work'], ['Capabilities', 'capabilities'],
  ['Process', 'process'], ['About', 'about'],
];
const personalProjects = projects.filter(p => !p.demo);

/* ── Mobile detection hook ───────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

/* ── Touch-friendly ripple effect ────────────────────────────────── */
export function useTouchRipple(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleTouch(e: TouchEvent) {
      const rect = el!.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      el!.style.setProperty('--ripple-x', `${x}px`);
      el!.style.setProperty('--ripple-y', `${y}px`);
    }
    el.addEventListener('touchstart', handleTouch, { passive: true });
    return () => el.removeEventListener('touchstart', handleTouch);
  }, [ref]);
}

/* ── Platform icon helper ────────────────────────────────────────── */
function ProjectPlatformIcon({ project }: { project: Project }) {
  const cat = (project.category || '').toLowerCase();
  if (cat.includes('mobile') || cat.includes('app')) {
    return <AndroidLogo size={18} color={project.color} />;
  }
  if (cat.includes('web') || cat.includes('dashboard') || cat.includes('panel')) {
    return <ReactLogo size={18} color={project.color} />;
  }
  return <Code2 size={18} strokeWidth={1.5} color={project.color} />;
}

/* ── Shared ──────────────────────────────────────────────────────── */
function Heading({ children, className = '' }: { children: string; className?: string }) {
  return (
    <h2 className={className}>
      {children.split('\n').map((line, i) => (
        <span className="heading-line" key={i}>
          <span data-line>{line}</span>
        </span>
      ))}
    </h2>
  );
}

/* ── Animated section ────────────────────────────────────────────── */
function AnimatedSection({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05, root: el.closest('.dialog-body') });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`animated-section ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--anim-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

/* ── Back to Top Button ──────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
        right: '20px',
        zIndex: 90,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <ChevronUp size={20} />
    </button>
  );
}

/* ── Project detail sub-components ───────────────────────────────── */
function ProjectStats({ stats }: { stats: ProjectStat[] }) {
  return (
    <div className="project-stats-grid">
      {stats.map((stat, i) => (
        <AnimatedSection key={i} delay={i * 80} className="project-stat-card">
          <div className="stat-value">
            <span className="stat-number">{stat.value}</span>
            {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
          </div>
          <div className="stat-label">{stat.label}</div>
          {stat.description && <div className="stat-desc">{stat.description}</div>}
          <div className="stat-glow" aria-hidden="true" />
        </AnimatedSection>
      ))}
    </div>
  );
}

function ArchitectureDiagram({ architecture }: { architecture: ProjectArchitecture }) {
  const primary = architecture.nodes.filter(n => n.type === 'primary');
  const secondary = architecture.nodes.filter(n => n.type === 'secondary');
  const tertiary = architecture.nodes.filter(n => n.type === 'tertiary');
  function Node({ node, index }: { node: (typeof architecture.nodes)[0]; index: number }) {
    const Icon = archIcons[node.label] || CircuitBoard;
    return (
      <AnimatedSection delay={index * 60} className={`arch-node arch-node-${node.type}`}>
        <div className="arch-node-icon"><Icon size={18} strokeWidth={1.5} /></div>
        <span>{node.label}</span>
        <div className="arch-node-pulse" aria-hidden="true" />
      </AnimatedSection>
    );
  }
  return (
    <div className="project-architecture">
      <h3 className="detail-section-title">
        <CircuitBoard size={18} strokeWidth={1.5} />{architecture.title}
      </h3>
      <p className="detail-section-desc">{architecture.description}</p>
      <div className="arch-diagram">
        {primary.length > 0 && (
          <div className="arch-layer">
            <span className="arch-layer-label">Application Layer</span>
            <div className="arch-nodes">
              {primary.map((n, i) => <Node key={n.id} node={n} index={i} />)}
            </div>
          </div>
        )}
        <div className="arch-connector-animated" aria-hidden="true">
          <div className="connector-line-animated" />
          <div className="connector-data-flow"><span /><span /><span /></div>
        </div>
        {secondary.length > 0 && (
          <div className="arch-layer">
            <span className="arch-layer-label">Service Layer</span>
            <div className="arch-nodes">
              {secondary.map((n, i) => <Node key={n.id} node={n} index={i + primary.length} />)}
            </div>
          </div>
        )}
        {tertiary.length > 0 && (
          <>
            <div className="arch-connector-animated" aria-hidden="true">
              <div className="connector-line-animated" />
              <div className="connector-data-flow"><span /><span /></div>
            </div>
            <div className="arch-layer">
              <span className="arch-layer-label">Infrastructure Layer</span>
              <div className="arch-nodes">
                {tertiary.map((n, i) => (
                  <Node key={n.id} node={n} index={i + primary.length + secondary.length} />
                ))}
              </div>
            </div>
          </>
        )}
        <div className="arch-legend">
          <span className="legend-item"><span className="legend-dot legend-primary" />Primary</span>
          <span className="legend-item"><span className="legend-dot legend-secondary" />Service</span>
          <span className="legend-item"><span className="legend-dot legend-tertiary" />Infrastructure</span>
        </div>
      </div>
    </div>
  );
}

function FlowDiagram({ flow, index }: { flow: ProjectFlow; index: number }) {
  const steps = flow.steps || [];
  return (
    <AnimatedSection delay={index * 120} className="project-flow">
      <h4 className="flow-title"><Workflow size={16} strokeWidth={1.5} />{flow.title}</h4>
      <div className="flow-steps">
        {steps.map((step, i) => (
          <div className={`flow-step flow-step-${step.status || 'pending'}`} key={i}
            style={{ '--step-delay': `${i * 100}ms` } as CSSProperties}>
            <div className="flow-step-indicator">
              <span className="flow-step-number">{String(i + 1).padStart(2, '0')}</span>
              {i < steps.length - 1 && (
                <div className="flow-step-line"><div className="flow-step-line-fill" /></div>
              )}
            </div>
            <div className="flow-step-content">
              <strong>{step.label}</strong>
              {step.description && <span>{step.description}</span>}
            </div>
            {step.status === 'active' && <div className="flow-step-active-ping" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

function FeatureGroupCard({ group, index }: { group: ProjectFeatureGroup; index: number }) {
  const Icon = icons[group.icon] || Code2;
  const [expanded, setExpanded] = useState(false);
  const features = group.features || [];
  const visibleFeatures = expanded ? features : features.slice(0, 5);
  return (
    <AnimatedSection delay={index * 100} className="feature-group-card">
      <h4>
        <Icon size={18} strokeWidth={1.5} />{group.title}
        <span className="feature-count">{features.length}</span>
      </h4>
      <ul>
        {visibleFeatures.map((f, i) => (
          <li key={i} style={{ '--feat-delay': `${i * 50}ms` } as CSSProperties}>
            <Check size={13} strokeWidth={2.5} /><span>{f}</span>
          </li>
        ))}
      </ul>
      {features.length > 5 && (
        <button className="feature-expand" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : `+${features.length - 5} more`}
          <ArrowDown size={13}
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      )}
    </AnimatedSection>
  );
}

function TechStackGrid({ techStack }: { techStack: ProjectTechCategory[] }) {
  return (
    <div className="tech-stack-grid">
      {techStack.map((cat, i) => {
        const items = cat.items || [];
        return (
          <AnimatedSection key={i} delay={i * 70} className="tech-category">
            <h5>{cat.category}</h5>
            <div className="tech-items">
              {items.map((item, j) => (
                <span className="tech-tag" key={j}
                  style={{ '--tag-delay': `${j * 40}ms` } as CSSProperties}>
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}

/* ── Navbar — Mobile-first responsive ────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const btnRef = useRef<HTMLButtonElement>(null);
  const hdrRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const onS = () => {
      setScrolled(window.scrollY > 60);
      hdrRef.current?.style.setProperty('--scroll-progress',
        String(Math.min(window.scrollY /
          Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1)));
    };
    onS();
    window.addEventListener('scroll', onS, { passive: true });
    const obs = new IntersectionObserver(es =>
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(s => obs.observe(s));
    return () => { window.removeEventListener('scroll', onS); obs.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const p = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const preventScroll = (e: TouchEvent) => {
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    hdrRef.current?.querySelector<HTMLAnchorElement>('#mobile-menu a')?.focus();
    const r = () => { if (window.innerWidth >= 1000) setOpen(false); };
    window.addEventListener('resize', r);
    return () => {
      document.body.style.overflow = p;
      window.removeEventListener('resize', r);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [open]);
  const nav = () => setOpen(false);
  function hk(e: KeyboardEvent<HTMLElement>) {
    if (!open) return;
    if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    if (e.key === 'Tab') {
      const it = Array.from(hdrRef.current?.querySelectorAll<HTMLElement>('a,button') ?? [])
        .filter(el => el.offsetParent !== null);
      if (e.shiftKey && document.activeElement === it[0]) {
        e.preventDefault(); it[it.length - 1]?.focus();
      } else if (!e.shiftKey && document.activeElement === it[it.length - 1]) {
        e.preventDefault(); it[0]?.focus();
      }
    }
  }
  return (
    <>
      <header ref={hdrRef}
        className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}
        onKeyDown={hk}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}>
        <a href="#home" className="brand" aria-label={`${profile.name}, home`} onClick={nav}>
          <span className="brand-mark"><Code2 size={isMobile ? 18 : 20} strokeWidth={1.7} /></span>
          <span className="brand-copy">
            <strong>{profile.name}<span className="brand-dot">.</span></strong>
            {!isMobile && <span>{profile.demoMode ? 'Creative portfolio' : profile.role}</span>}
          </span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {navLinks.map(([l, id]) => (
            <a className={active === id ? 'is-active' : ''} key={id} href={`#${id}`}>{l}</a>
          ))}
        </nav>
        <button className="nav-cta" onClick={openEmail}>
          {isMobile ? 'Talk' : "Let's talk"} <ArrowUpRight size={isMobile ? 14 : 16} />
        </button>
        <button ref={btnRef} className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          style={{ WebkitTapHighlightColor: 'transparent' }}>
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile navigation"
            style={{
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}>
            {[...navLinks, ['Testimonials', 'testimonials'], ['Contact', 'contact']].map(
              ([l, id], i) => (
                <a key={id} href={`#${id}`}
                  style={{
                    '--menu-index': i,
                    padding: '18px 0',
                    fontSize: 'clamp(18px, 5vw, 24px)',
                  } as CSSProperties}
                  onClick={nav}>
                  {l}<ArrowUpRight size={22} />
                </a>
              )
            )}
            <button
              className="mobile-menu-cta"
              onClick={() => { setOpen(false); openEmail(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px 24px',
                marginTop: '16px',
                background: 'var(--accent, #54b978)',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>
              Get in Touch <ArrowUpRight size={18} />
            </button>
            <p>Thoughtful design. Carefully built.</p>
          </nav>
        )}
      </header>
      {open && (
        <div className="menu-backdrop"
          onClick={() => { setOpen(false); btnRef.current?.focus(); }}
          aria-hidden="true" />
      )}
    </>
  );
}

/* ── Hero — Mobile-first responsive ──────────────────────────────── */
function Hero() {
  const isMobile = useIsMobile();
  return (
    <section id="home" className="hero" data-hero
      style={{
        paddingTop: isMobile ? 'calc(env(safe-area-inset-top, 0px) + 80px)' : undefined,
        minHeight: isMobile ? 'calc(100dvh - env(safe-area-inset-top, 0px))' : undefined,
      }}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content container">
        <p className="hero-role" data-reveal>
          <span className="status-dot" />{profile.role}
        </p>
        <h1>
          {['Thoughtful design.', 'Exceptional', 'experiences.'].map((l, i) => (
            <span className="heading-line" key={l}>
              <span data-line>{i === 1 ? <em>{l}</em> : l}</span>
            </span>
          ))}
        </h1>
        <p className="hero-description" data-reveal>
          Turning ambitious ideas into memorable digital experiences.
          {!isMobile && <br className="desktop-break" />}
          {isMobile ? ' ' : ''}
          A little creativity. A lot of care. Every detail considered.
        </p>
        <div className="hero-actions" data-reveal
          style={isMobile ? {
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          } : undefined}>
          <a className="button button-green" href="#work"
            style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
            Explore my work <ArrowDownRight size={19} />
          </a>
          <button className="button button-dark" onClick={openEmail}
            style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
            Let's collaborate <ArrowUpRight size={19} />
          </button>
        </div>
        <div className="hero-proof" data-reveal>
          <div className="proof-avatars" aria-hidden="true">
            {projects.map((p, i) => (
              <span key={p.id} className="proof-avatar"
                style={{ '--avatar-color': p.color, '--avatar-index': i } as CSSProperties}>
                <ProjectPlatformIcon project={p} />
              </span>
            ))}
          </div>
          <div className="proof-copy">
            <span className="proof-count">
              {personalProjects.length} successful projects delivered
            </span>
            <a href="#work" className="proof-link">
              View all work <ArrowRight size={13} />
            </a>
          </div>
        </div>
        {!isMobile && (
          <div className="hero-annotation" aria-hidden="true">
            <svg viewBox="0 0 100 60" fill="none">
              <path d="M90 8C72 8 50 14 44 32C40 44 26 48 6 42M6 42L20 37M6 42L16 54"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 4" />
            </svg>
            <span>Made with intention.</span>
          </div>
        )}
      </div>
      <div className="hero-object object-code" data-depth="9" aria-hidden="true">
            <div className="floating-inner">
              <span className="object-small-cross"><Plus size={16} /></span>
              <div className="code-tile"><Code2 size={50} strokeWidth={1.2} /></div>
              <span className="object-caption">DESIGN MEETS CODE</span>
            </div>
          </div>
          <div className="hero-object object-orbit" data-depth="-10" aria-hidden="true">
            <div className="floating-inner">
              <div className="orbit-ring"><span /></div>
              <span className="orbit-spark"><Plus size={18} strokeWidth={1} /></span>
            </div>
          </div>
      <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"
        style={isMobile ? { bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' } : undefined}>
        <span>{isMobile ? 'SCROLL' : 'SCROLL TO EXPLORE'}</span><ArrowDown size={15} />
      </a>
    </section>
  );
}

/* ── Project Card — Touch-optimized ──────────────────────────────── */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [imgError, setImgError] = useState(false);
  const isMobile = useIsMobile();
  function mv(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== 'mouse' ||
      !window.matchMedia('(min-width:1000px) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches)
      return;
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--tilt-x',
      `${-(((e.clientY - b.top) / b.height) - 0.5) * 1.8}deg`);
    e.currentTarget.style.setProperty('--tilt-y',
      `${(((e.clientX - b.left) / b.width) - 0.5) * 1.8}deg`);
  }
  function rs() {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  }
  const hasMobilePreview = project.mobilePreview?.enabled;
  const labelText = project.demo ? 'ORIGINAL CONCEPT' : 'Client PROJECT';
  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
      <defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='${project.color}' stop-opacity='0.15'/>
        <stop offset='100%' stop-color='#0a0a0a' stop-opacity='1'/>
      </linearGradient></defs>
      <rect width='800' height='600' fill='#111'/>
      <rect width='800' height='600' fill='url(#g)'/>
      <text x='400' y='295' font-family='system-ui,sans-serif' font-size='32' font-weight='600' fill='${project.color}' text-anchor='middle'>${project.title}</text>
      <text x='400' y='330' font-family='system-ui,sans-serif' font-size='14' fill='#9f9f9a' text-anchor='middle'>${project.category}</text>
    </svg>`
  )}`;
  return (
    <article className="project-item">
      <button ref={ref} data-project-trigger className="project-card"
        style={{
          '--project-color': project.color,
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        } as CSSProperties}
        onPointerMove={isMobile ? undefined : mv}
        onPointerLeave={isMobile ? undefined : rs}
        onBlur={rs}
        onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}>
        <img src={imgError ? placeholder : project.image}
          srcSet={imgError ? undefined : project.imageSet}
          sizes="(max-width:479px) 100vw, (max-width:767px) 100vw, (max-width:1199px) 50vw, 25vw"
          alt={project.imageAlt} width="800" height="600"
          loading="lazy" decoding="async" onError={() => setImgError(true)} />
        <div className="project-badge-row">
          <span className={`project-badge-compact ${project.demo ? 'is-demo' : 'is-personal'}`}>
            {isMobile ? (project.demo ? 'CONCEPT' : 'PROJECT') : labelText}
          </span>
          {hasMobilePreview && (
            <span className="project-badge-compact is-live">
              <span className="live-dot" />LIVE
            </span>
          )}
        </div>
        <div className="project-hover-compact">
          <span>
            {hasMobilePreview ? (isMobile ? 'View app' : 'View mobile preview') : (isMobile ? 'Details' : 'View project')}
            <ArrowUpRight size={14} />
          </span>
        </div>
      </button>
      <div className="project-caption-compact">
        <div><h3>{project.title}</h3><p>{project.category}</p></div>
      </div>
    </article>
  );
}

/* ── Work — Responsive grid ──────────────────────────────────────── */
function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const isMobile = useIsMobile();
  return (
    <section id="work" className="section work-section container-wide">
      <div className="section-heading work-heading"
        style={isMobile ? { flexDirection: 'column', gap: '16px', textAlign: 'center' } : undefined}>
        <div>
          <Heading>{'Less talk.\nMore good work.'}</Heading>
          <p data-reveal>A selection of digital experiences, made with purpose.</p>
        </div>
        <span className="section-side-note" data-reveal
          style={isMobile ? { alignSelf: 'center' } : undefined}>
          <span className="status-dot" />
          {String(projects.length).padStart(2, '0')} PROJECTS
        </span>
      </div>
      <div className="projects-grid projects-grid-compact" data-stagger>
        {projects.map(p => <ProjectCard key={p.id} project={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

/* ── Capabilities ────────────────────────────────────────────────── */
function Capabilities() {
  return (
    <section id="capabilities" className="section container">
      <div className="section-heading">
        <Heading>{'Your vision.\nA thoughtful execution.'}</Heading>
        <p data-reveal>
          From the first sketch to the final interaction.<br />
          The right blend of design and development.
        </p>
      </div>
      <div className="services-grid" data-stagger>
        {services.map((s, i) => {
          const I = icons[s.icon];
          return (
            <article className="service-card" key={s.id}
              style={{ touchAction: 'manipulation' } as CSSProperties}>
              <div className={`service-visual service-visual-${i}`} aria-hidden="true">
                <div className="service-icon"><I size={45} strokeWidth={1.2} /></div>
                <span className="visual-orbit" />
                <span className="visual-detail"><Plus size={13} /></span>
              </div>
              <h3>{s.title.split('\n').map((l, j) => <span key={j}>{l}</span>)}</h3>
              <p>{s.description}</p>
              <ul>
                {s.items.map(it => <li key={it}><Check size={14} />{it}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ── Process ─────────────────────────────────────────────────────── */
function Process() {
  return (
    <section id="process" className="section process-section container">
      <div className="section-heading centered">
        <Heading>{'Great outcomes.\nA simple process.'}</Heading>
        <p data-reveal>Five steps. Clear communication. No unnecessary complexity.</p>
      </div>
      <ol className="process-grid" data-stagger>
        {process.map(s => {
          const I = icons[s.icon];
          return (
            <li className="process-card" key={s.number}>
              <div className="process-top">
                <I size={25} strokeWidth={1.4} /><span>{s.number}</span>
              </div>
              <h3>{s.title}</h3><p>{s.description}</p>
            </li>
          );
        })}
      </ol>
      <div className="process-note" data-reveal>
        <span className="status-dot" />Good collaboration is part of the craft.
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials-section container">
      <div className="section-heading">
        <Heading>{'The people make\nthe difference.'}</Heading>
        <p data-reveal>
          Thoughtful work starts with trust.<br />
          A space for the stories behind the projects.
        </p>
      </div>
      {testimonials.length > 0 ? (
        <div className="testimonials-grid" data-stagger>
          {testimonials.map((t, i) => (
            <figure className="quote-card" key={`${t.name}-${i}`}>
              <span className="quote-mark" aria-hidden="true">"</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                {t.avatar ? (
                  <img src={t.avatar} alt="" width="44" height="44"
                    loading="lazy" decoding="async" />
                ) : (
                  <span className="quote-avatar" aria-hidden="true">
                    {t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                )}
                <span><strong>{t.name}</strong><span>{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="testimonial-empty" data-reveal>
          <div className="quote-empty-art" aria-hidden="true">
            <MessageSquare size={45} strokeWidth={1} /><span>"</span>
          </div>
          <div>
            <h3>The next chapter,<br />written together.</h3>
            <p>Client stories will appear here when real feedback is shared.</p>
            <span className="empty-label">NO ENDORSEMENTS ADDED YET</span>
          </div>
          <a href="#contact" className="round-link" aria-label="Start a conversation">
            <ArrowUpRight size={26} />
          </a>
        </div>
      )}
    </section>
  );
}

/* ── About — Mobile optimized layout ─────────────────────────────── */
function About() {
  const [src, setSrc] = useState(profile.portrait || '/images/profile.svg');
  const [err, setErr] = useState(false);
  useEffect(() => {
    setSrc(profile.portrait || '/images/profile.svg');
    setErr(false);
  }, []);
  function onE() {
    if (!err && src !== '/images/profile.svg') {
      setSrc('/images/profile.svg'); setErr(true); return;
    }
    setSrc('data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1100'><rect width='900' height='1100' fill='%23111'/><circle cx='450' cy='380' r='120' fill='%23242424'/><ellipse cx='450' cy='680' rx='160' ry='200' fill='%23242424'/><text x='450' y='980' fill='%239f9f9a' font-family='system-ui' font-size='32' text-anchor='middle'>${profile.name.split(' ')[0]}</text></svg>`
    ));
  }
  return (
    <section id="about" className="section about-section container">
      <div className="about-image" data-reveal>
        <img src={src} alt={`Portrait of ${profile.name}`}
          width="900" height="1100" loading="lazy" decoding="async" onError={onE}
          style={{ display: 'block', width: '100%', height: 'auto',
            objectFit: 'cover', minHeight: '250px', maxHeight: '500px',
            background: 'var(--surface,#111)', borderRadius: '16px' }} />
        <div className="portrait-caption">
          <span className="status-dot" />CREATIVE DEV IN PUNE
        </div>
        <div className="about-floating" data-parallax="8" aria-hidden="true">
          <Code2 size={30} strokeWidth={1.5} />
        </div>
      </div>
      <div className="about-copy">
        <Heading>{"A creative mind.\nA developer's\nattention to detail."}</Heading>
        <p className="about-intro" data-reveal>{`Hi, I'm ${profile.name}.`}</p>
        <p data-reveal>{profile.bio}</p>
        <div className="about-signature" data-reveal>
          <span>{profile.name}<span className="accent">.</span></span>
          {profile.availability && (
            <span className="availability">
              <span className="status-dot" />{profile.availability}
            </span>
          )}
        </div>
        <a href="#contact" className="button button-green" data-reveal>
          Start a project with me <ArrowUpRight size={18} />
        </a>
        {profile.socialLinks.length > 0 && (
          <div className="social-links">
            {profile.socialLinks.map(l => (
              <a href={l.url} key={l.label} target="_blank" rel="noopener noreferrer">
                {l.label}<ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Expertise ───────────────────────────────────────────────────── */
function Expertise() {
  return (
    <section id="expertise" className="section expertise-section container">
      <div className="section-heading">
        <Heading>{'Craft, in every detail.'}</Heading>
        <p data-reveal>A few things that shape the work.</p>
      </div>
      <div className="expertise-grid" data-stagger>
        {expertise.map(it => {
          const I = icons[it.icon];
          return (
            <article className="expertise-card" key={it.title}>
              <I size={25} strokeWidth={1.4} />
              <h3>{it.title}</h3>
              <p>{it.description}</p>
            </article>
          );
        })}
      </div>
      {credentials.length > 0 ? (
        <div className="credentials-grid" data-stagger>
          {credentials.map(c => (
            <article className="credential-card" key={c.title}>
              {c.image ? (
                <img src={c.image} alt={`${c.title} cert`}
                  width="400" height="280" loading="lazy" decoding="async" />
              ) : <CheckCheck size={28} />}
              <span>{c.issuer}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  View credential <ArrowUpRight size={15} />
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="credential-note" data-reveal>
          <CheckCheck size={16} />
          Certificates will be shown here once verified credentials are added.
        </p>
      )}
    </section>
  );
}

/* ── Contact — Touch-optimized cards ─────────────────────────────── */
function Contact({ onContact }: { onContact: () => void }) {
  const [copied, setCopied] = useState(false);
  const [cErr, setCErr] = useState('');
  const tmr = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => () => { if (tmr.current) clearTimeout(tmr.current); }, []);
  async function cp() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true); setCErr('');
      if (tmr.current) clearTimeout(tmr.current);
      tmr.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      if (isMobile) {
        window.location.href = `mailto:${profile.email}`;
        return;
      }
      setCErr('Copy unavailable. Please copy manually.');
      if (tmr.current) clearTimeout(tmr.current);
      tmr.current = setTimeout(() => setCErr(''), 3500);
    }
  }
  return (
    <section id="contact" className="section contact-section container">
      <div className="contact-cross" aria-hidden="true"><Plus size={30} strokeWidth={1} /></div>
      <p className="contact-intro" data-reveal>HAVE A GOOD IDEA?</p>
      <Heading>{"Let's make\nsomething matter."}</Heading>
      <p className="contact-description" data-reveal>
        Based in Pune, India. Always open to creative concepts and custom web projects.
        {!isMobile && <br />}
        {isMobile ? ' ' : ''}Let's bring your vision to life.
      </p>
      <div className="contact-premium-grid" data-stagger>
        <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="contact-premium-card whatsapp"
          style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className="premium-card-icon"><WhatsAppLogo size={isMobile ? 24 : 28} /></div>
          <h3>Chat on WhatsApp</h3>
          <p>{isMobile ? 'Quick chat & briefs' : 'Instant conversation and quick briefs'}</p>
          <span className="premium-card-action">Message me <ArrowUpRight size={14} /></span>
        </a>
        <a href="https://www.linkedin.com/in/bhavuk-deshmukh-189739257/"
          target="_blank" rel="noopener noreferrer"
          className="contact-premium-card linkedin"
          style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className="premium-card-icon"><LinkedInLogo size={isMobile ? 24 : 28} /></div>
          <h3>Connect on LinkedIn</h3>
          <p>{isMobile ? 'Professional profile' : 'Professional background and work history'}</p>
          <span className="premium-card-action">Connect profile <ArrowUpRight size={14} /></span>
        </a>
        <div className="contact-premium-card email" onClick={cp}
          style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' } as CSSProperties}
          role="button" tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cp(); } }}
          aria-label={`Copy email ${profile.email}`}>
          <div className="premium-card-icon"><GmailLogo size={isMobile ? 24 : 28} /></div>
          <h3>Drop an Email</h3>
          <p style={{
            fontSize: isMobile ? '12px' : undefined,
            wordBreak: 'break-all',
          }}>{profile.email}</p>
          <span className="premium-card-action"
            style={{ color: cErr ? 'var(--error)' : copied ? 'var(--accent)' : undefined }}>
            {copied ? 'Email copied!' : cErr || (isMobile ? 'Tap to copy' : 'Click to copy email')}
            {copied ? <Check size={14} /> : cErr ? <AlertCircle size={14} /> : <Copy size={14} />}
          </span>
        </div>
        <a href={`tel:${profile.phone}`} className="contact-premium-card call"
          style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className="premium-card-icon"><PhoneLogo size={isMobile ? 24 : 28} /></div>
          <h3>Direct Phone Call</h3>
          <p>{isMobile ? 'Immediate inquiries' : 'Call for immediate inquiries'}</p>
          <span className="premium-card-action">Call now <ArrowUpRight size={14} /></span>
        </a>
        <a href="https://github.com/deshmukh2804" target="_blank" rel="noopener noreferrer"
          className="contact-premium-card github"
          style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className="premium-card-icon"><GitHubLogo size={isMobile ? 24 : 28} /></div>
          <h3>GitHub Workspace</h3>
          <p>{isMobile ? 'Open source & scripts' : 'Open source files and creative scripts'}</p>
          <span className="premium-card-action">Explore repos <ArrowUpRight size={14} /></span>
        </a>
        <a href="https://www.instagram.com/bhavuk_2804/" target="_blank" rel="noopener noreferrer"
          className="contact-premium-card instagram"
          style={{ WebkitTapHighlightColor: 'transparent' } as CSSProperties}>
          <div className="premium-card-icon"><InstagramLogo size={isMobile ? 24 : 28} /></div>
          <h3>Follow Instagram</h3>
          <p>{isMobile ? 'Life & design cues' : 'Personal life, artwork, and design cues'}</p>
          <span className="premium-card-action">View profile <ArrowUpRight size={14} /></span>
        </a>
      </div>
      <button className="button button-green contact-button" onClick={onContact}
        data-contact-trigger data-reveal
        style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
        Send a project brief <ArrowUpRight size={21} />
      </button>
    </section>
  );
}

/* ── Footer — Mobile responsive ──────────────────────────────────── */
function Footer() {
  const [time, setTime] = useState('');
  const isMobile = useIsMobile();
  useEffect(() => {
    const u = () => setTime(new Intl.DateTimeFormat('en-GB', {
      timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: true,
    }).format(new Date()));
    u();
    const t = setInterval(u, 30_000);
    return () => clearInterval(t);
  }, []);
  const strip = credentials.length
    ? credentials.map(c => ({ title: c.title, url: c.url }))
    : disciplines.map(t => ({ title: t, url: undefined }));
  return (
    <footer className="site-footer"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}>
      <div className="footer-top container">
        <a className="footer-brand" href="#home">
          {profile.name}<span className="accent">.</span>
        </a>
        <div className="footer-time">
          <span className="status-dot" />
          <span>
            {isMobile ? profile.location.split(',')[0] : profile.location}
            <time>{time || '—'} <span>IST</span></time>
          </span>
        </div>
        <div className="footer-question">
          <span>Got something in mind?</span>
          <a href={`mailto:${profile.email}`}>
            {isMobile ? 'Email me' : profile.email}<ArrowUpRight size={16} />
          </a>
        </div>
        {profile.phone && (
          <a className="footer-phone" href={`tel:${profile.phone}`}>
            {profile.phone}<ArrowUpRight size={16} />
          </a>
        )}
        {profile.whatsapp && (
          <a className="footer-whatsapp" href={`https://wa.me/${profile.whatsapp}`}
            target="_blank" rel="noopener noreferrer">
            {isMobile ? 'WhatsApp' : 'Chat on WhatsApp'} <ArrowUpRight size={16} />
          </a>
        )}
      </div>
      <div className="marquee" aria-label="Creative disciplines">
        <div className="marquee-track" data-marquee>
          {[0, 1].map(c => (
            <div className="marquee-group" key={c} aria-hidden={c === 1 ? true : undefined}>
              {strip.map((it, i) => (
                <div className="marquee-item" key={`${c}-${i}`}>
                  <span className="marquee-symbol"><Plus size={isMobile ? 16 : 20} strokeWidth={1.1} /></span>
                  {it.url ? (
                    <a href={it.url} target="_blank" rel="noopener noreferrer"
                      tabIndex={c === 1 ? -1 : undefined}>{it.title}</a>
                  ) : <span>{it.title}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} {profile.name}{isMobile ? '' : '. All rights reserved.'}</span>
        {!isMobile && <span>Thoughtfully designed. Carefully built.</span>}
        <a href="#home">Back to top <ArrowUpRight size={15} /></a>
      </div>
    </footer>
  );
}

/* ── 404 Page — Mobile responsive ────────────────────────────────── */
function NotFoundPage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile();
  useEffect(() => {
    document.title = `404 — Page not found | ${profile.name}`;
  }, []);
  return (
    <div className="not-found-page"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
      <div className="not-found-grid" aria-hidden="true" />
      <div className="not-found-content"
        style={isMobile ? { padding: '24px 20px', textAlign: 'center' } : undefined}>
        <div className="not-found-icon">
          <AlertCircle size={isMobile ? 48 : 60} strokeWidth={1.2} />
        </div>
        <h1 className="not-found-code"
          style={isMobile ? { fontSize: 'clamp(80px, 20vw, 120px)' } : undefined}>404</h1>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
          {!isMobile && <br />}
          {isMobile ? ' ' : ''}Let's get you back on track.
        </p>
        <div className="not-found-actions"
          style={isMobile ? { flexDirection: 'column', width: '100%', gap: '12px' } : undefined}>
          <button className="button button-green" onClick={onBack}
            style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
            <HomeIcon size={18} />
            Back to home
          </button>
          <a className="button button-dark" href={`mailto:${profile.email}`}
            style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
            Report an issue <Mail size={16} />
          </a>
        </div>
        <div className="not-found-footer">
          <span>Or jump directly to:</span>
          <div className="not-found-links">
            <a href="#" onClick={onBack}>Home</a>
            <span>·</span>
            <a href="#" onClick={() => { window.location.hash = ''; setTimeout(() => { document.getElementById('work')?.scrollIntoView(); }, 100); }}>Work</a>
            <span>·</span>
            <a href="#" onClick={() => { window.location.hash = ''; setTimeout(() => { document.getElementById('contact')?.scrollIntoView(); }, 100); }}>Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dialogs — Mobile-optimized ──────────────────────────────────── */
function useNativeDialog(
  ref: RefObject<HTMLDialogElement | null>, open: boolean, onClose: () => void
) {
  useEffect(() => {
    const d = ref.current;
    if (!d || !open) return;
    const p = document.body.style.overflow;
    const o = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    if (!d.open) d.showModal();
    const c = (e: Event) => { e.preventDefault(); onClose(); };
    d.addEventListener('cancel', c);
    return () => {
      d.removeEventListener('cancel', c);
      if (d.open) d.close();
      document.body.style.overflow = p;
      o?.focus({ preventScroll: true });
    };
  }, [ref, open, onClose]);
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dlgRef = useRef<HTMLDialogElement>(null);
  const [dialogImgError, setDialogImgError] = useState(false);
  const isMobile = useIsMobile();
  useNativeDialog(dlgRef, true, onClose);
  const stats = project.stats || [];
  const flows = project.flows || [];
  const featureGroups = project.featureGroups || [];
  const techStack = project.techStack || [];
  const clientValue = project.clientValue || [];
  const highlights = project.highlights || [];
  const tags = project.tags || [];
  const gallery = project.gallery || [];
  const rich = stats.length > 0 || project.architecture || flows.length > 0 ||
    featureGroups.length > 0 || techStack.length > 0;
  const dialogPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 850'>
      <defs><linearGradient id='dg' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='${project.color}' stop-opacity='0.2'/>
        <stop offset='100%' stop-color='#0a0a0a' stop-opacity='1'/>
      </linearGradient></defs>
      <rect width='1200' height='850' fill='#111'/>
      <rect width='1200' height='850' fill='url(#dg)'/>
      <text x='600' y='410' font-family='system-ui,sans-serif' font-size='42' font-weight='600' fill='${project.color}' text-anchor='middle'>${project.title}</text>
      <text x='600' y='460' font-family='system-ui,sans-serif' font-size='18' fill='#9f9f9a' text-anchor='middle'>${project.category}</text>
    </svg>`
  )}`;
  return (
    <dialog ref={dlgRef} className="project-dialog"
      aria-labelledby="project-title" aria-describedby="project-description"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={isMobile ? {
        maxWidth: '100vw',
        maxHeight: '100dvh',
        width: '100vw',
        margin: 0,
        borderRadius: 0,
        padding: 0,
      } : undefined}>
      <div className="dialog-body"
        style={isMobile ? {
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
        } : undefined}>
        <button className="dialog-close" onClick={onClose} aria-label="Close project"
          style={isMobile ? {
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: 44,
            height: 44,
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } : undefined}>
          <X size={21} />
        </button>
        <img className="dialog-project-image"
          src={dialogImgError ? dialogPlaceholder : project.image}
          alt={project.imageAlt} width="1200" height="850"
          style={isMobile ? { borderRadius: 0, maxHeight: '35vh', objectFit: 'cover' } : undefined}
          onError={() => setDialogImgError(true)} />
        <div className="dialog-project-copy"
          style={isMobile ? { padding: '20px 16px' } : undefined}>
          <p className="dialog-meta">
            {project.demo ? 'ORIGINAL CONCEPT' : 'PERSONAL PROJECT'}
            <span>{project.year}</span>
          </p>
          <div className="dialog-copy-grid"
            style={isMobile ? { gridTemplateColumns: '1fr', gap: '24px' } : undefined}>
            <div>
              <h2 id="project-title"
                style={isMobile ? { fontSize: 'clamp(24px, 6vw, 32px)' } : undefined}>
                {project.title}
              </h2>
              <p className="dialog-category">{project.category}</p>
              <p id="project-description">{project.longDescription || project.description}</p>
              {project.problemStatement && (
                <div className="project-problem-solution"
                  style={isMobile ? { flexDirection: 'column' } : undefined}>
                  <AnimatedSection className="ps-card ps-problem">
                    <h4><Activity size={16} /> Problem</h4>
                    <p>{project.problemStatement}</p>
                  </AnimatedSection>
                  {project.solution && (
                    <AnimatedSection delay={100} className="ps-card ps-solution">
                      <h4><Zap size={16} /> Solution</h4>
                      <p>{project.solution}</p>
                    </AnimatedSection>
                  )}
                </div>
              )}
              {tags.length > 0 && (
                <div className="project-tags"
                  style={isMobile ? { gap: '6px' } : undefined}>
                  {tags.map(t => <span key={t}
                    style={isMobile ? { fontSize: '11px', padding: '4px 8px' } : undefined}>{t}</span>)}
                </div>
              )}
            </div>
            {highlights.length > 0 && (
              <div className="project-highlights">
                <span>PROJECT HIGHLIGHTS</span>
                <ul>
                  {highlights.map(h => (
                    <li key={h}><Check size={15} />{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {rich && (
            <div className="project-deep-dive">
              {stats.length > 0 && (
                <AnimatedSection className="detail-section">
                  <h3 className="detail-section-title">
                    <BarChart3 size={18} strokeWidth={1.5} /> Key Metrics
                  </h3>
                  <ProjectStats stats={stats} />
                </AnimatedSection>
              )}
              {project.architecture && (
                <AnimatedSection delay={100} className="detail-section">
                  <ArchitectureDiagram architecture={project.architecture} />
                </AnimatedSection>
              )}
              {flows.length > 0 && (
                <AnimatedSection delay={150} className="detail-section">
                  <h3 className="detail-section-title">
                    <Workflow size={18} strokeWidth={1.5} /> System Flows
                  </h3>
                  <div className="flows-grid"
                    style={isMobile ? { gridTemplateColumns: '1fr' } : undefined}>
                    {flows.map((f, i) => <FlowDiagram key={i} flow={f} index={i} />)}
                  </div>
                </AnimatedSection>
              )}
              {featureGroups.length > 0 && (
                <AnimatedSection delay={200} className="detail-section">
                  <h3 className="detail-section-title">
                    <Boxes size={18} strokeWidth={1.5} /> Feature Breakdown
                  </h3>
                  <div className="feature-groups-grid"
                    style={isMobile ? { gridTemplateColumns: '1fr' } : undefined}>
                    {featureGroups.map((g, i) => <FeatureGroupCard key={i} group={g} index={i} />)}
                  </div>
                </AnimatedSection>
              )}
              {techStack.length > 0 && (
                <AnimatedSection delay={250} className="detail-section">
                  <h3 className="detail-section-title">
                    <CircuitBoard size={18} strokeWidth={1.5} /> Technology Stack
                  </h3>
                  <TechStackGrid techStack={techStack} />
                </AnimatedSection>
              )}
              {clientValue.length > 0 && (
                <AnimatedSection delay={300} className="detail-section client-value-section">
                  <h3 className="detail-section-title">
                    <TrendingUp size={18} strokeWidth={1.5} /> Why This Matters
                  </h3>
                  <ul className="client-value-list">
                    {clientValue.map((v, i) => (
                      <li key={i}><ArrowRight size={14} /><span>{v}</span></li>
                    ))}
                  </ul>
                </AnimatedSection>
              )}
            </div>
          )}
          {gallery.length > 0 && (
            <div className="project-gallery">
              {gallery.map(g => (
                <figure key={g.image}>
                  <img src={g.image} alt={g.alt}
                    width="1672" height="941" loading="lazy" decoding="async"
                    style={isMobile ? { borderRadius: '8px' } : undefined} />
                  {g.caption && <figcaption>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
          {project.url ? (
            <a className="button button-green" href={project.url}
              target="_blank" rel="noopener noreferrer"
              style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
              Visit live project <ArrowUpRight size={17} />
            </a>
          ) : (
            <p className="dialog-demo-note">
              {project.demo
                ? 'An original visual concept for this portfolio preview.'
                : 'Clint project case study.'}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}

/* ── Contact Dialog — Mobile-optimized ───────────────────────────── */
function ContactDialog({ onClose }: { onClose: () => void }) {
  const dlgRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | ''; msg: string }>({
    type: '', msg: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const isMobile = useIsMobile();
  useNativeDialog(dlgRef, true, onClose);
  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function sub(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const n = String(d.get('name') || '').trim();
    const em = String(d.get('email') || '').trim();
    const m = String(d.get('message') || '').trim();
    if (!n) { setStatus({ type: 'error', msg: 'Please enter your name.' }); return; }
    if (n.length < 2) { setStatus({ type: 'error', msg: 'Name must be at least 2 characters.' }); return; }
    if (!em) { setStatus({ type: 'error', msg: 'Please enter your email address.' }); return; }
    if (!validateEmail(em)) { setStatus({ type: 'error', msg: 'Please enter a valid email address.' }); return; }
    if (!m) { setStatus({ type: 'error', msg: 'Please tell me about your project idea.' }); return; }
    if (m.length < 10) { setStatus({ type: 'error', msg: 'Please add more detail (at least 10 characters).' }); return; }
    setSubmitting(true);
    const b = [
      `Project Inquiry — via ${profile.name}'s Portfolio`,
      ``,
      `From: ${n}`,
      `Email: ${em}`,
      `Date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      ``,
      `— Message —`,
      m,
      ``,
      `---`,
      `This inquiry was sent via the portfolio contact form.`,
    ].join('\n');
    try {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Project Inquiry from ${n}`
      )}&body=${encodeURIComponent(b)}`;
      setStatus({ type: 'success', msg: 'Email draft ready. Check your mail client to send it.' });
    } catch {
      setStatus({
        type: 'error',
        msg: 'Could not open your email client. Please email me directly at ' + profile.email,
      });
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <dialog ref={dlgRef} className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={isMobile ? {
        maxWidth: '100vw',
        maxHeight: '100dvh',
        width: '100vw',
        margin: 0,
        borderRadius: 0,
        padding: 0,
      } : undefined}>
      <div className="contact-dialog-body"
        style={isMobile ? {
          padding: '24px 20px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
          maxHeight: '100dvh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        } : undefined}>
        <button className="dialog-close" onClick={onClose} aria-label="Close"
          style={isMobile ? { width: 44, height: 44 } : undefined}>
          <X size={21} />
        </button>
        <span className="contact-dialog-icon"><Mail size={isMobile ? 24 : 28} strokeWidth={1.3} /></span>
        <h2 id="contact-dialog-title"
          style={isMobile ? { fontSize: 'clamp(22px, 5.5vw, 28px)' } : undefined}>
          Every good project<br />starts somewhere.
        </h2>
        <p>Tell me a little about what you have in mind.</p>
        <form data-contact-form onSubmit={sub} noValidate>
          <label htmlFor="contact-name">
            Your name
            <input id="contact-name" name="name" autoComplete="name"
              maxLength={100} required placeholder="How should I call you?"
              style={isMobile ? { fontSize: '16px' } : undefined} />
          </label>
          <label htmlFor="contact-email">
            Email address
            <input id="contact-email" name="email" type="email"
              autoComplete="email" maxLength={254} required
              placeholder="you@company.com"
              style={isMobile ? { fontSize: '16px' } : undefined} />
          </label>
          <label htmlFor="contact-message">
            What are you thinking?
            <textarea id="contact-message" name="message"
              rows={isMobile ? 3 : 4} maxLength={4000} required
              placeholder="Your idea, timeline, and goals…"
              style={isMobile ? { fontSize: '16px' } : undefined} />
          </label>
          <button className="button button-green" type="submit" disabled={submitting}
            style={isMobile ? { width: '100%', justifyContent: 'center' } : undefined}>
            {submitting ? 'Preparing…' : 'Prepare email'}
            {status.type === 'success' ? <Check size={18} /> : <ArrowUpRight size={18} />}
          </button>
          {status.msg && (
            <p role="status" aria-live="polite"
              className={`form-status form-status-${status.type}`}
              style={{
                color: status.type === 'error'
                  ? 'var(--error, #ef4444)'
                  : 'var(--accent, #54b978)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                background: status.type === 'error'
                  ? 'rgba(239, 68, 68, 0.08)'
                  : 'rgba(84, 185, 120, 0.08)',
                border: `1px solid ${status.type === 'error'
                  ? 'rgba(239, 68, 68, 0.25)'
                  : 'rgba(84, 185, 120, 0.25)'}`,
                borderRadius: 8,
                fontSize: 13,
                marginTop: 8,
              }}>
              {status.type === 'error' ? <AlertCircle size={14} /> : <Check size={14} />}
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </dialog>
  );
}

/* ── Portfolio Home ──────────────────────────────────────────────── */
function PortfolioHome({
  onOpenProject, onContact,
}: { onOpenProject: (p: Project) => void; onContact: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  usePortfolioMotion(rootRef);
  return (
    <div ref={rootRef} className="portfolio-app">
      <a className="skip-link" href="#work">Skip to selected work</a>
      {!isMobile && <SmokeCursor />}
      <Navbar />
      <main>
        <Hero />
        <Work onOpen={onOpenProject} />
        <Capabilities />
        <Process />
        <Testimonials />
        <About />
        <Expertise />
        <Contact onContact={onContact} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ── App with Hash Router + 404 ──────────────────────────────────── */
type PageType = 'home' | 'mobile-preview' | 'not-found';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [selProject, setSelProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  /* ── Viewport meta for mobile ────────────────────────────── */
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5';
    let theme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!theme) {
      theme = document.createElement('meta');
      theme.name = 'theme-color';
      document.head.appendChild(theme);
    }
    theme.content = '#060608';
  }, []);

  /* ── Hash-based routing with 404 detection ───────────────── */
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash;
      if (!hash || hash === '#' || hash === '#home') {
        setCurrentPage('home');
        setPreviewProject(null);
        return;
      }
      const projectMatch = hash.match(/^#\/project\/(.+)$/);
      if (projectMatch) {
        const projectId = projectMatch[1];
        const project = projects.find(p => p.id === projectId);
        if (project?.mobilePreview?.enabled) {
          setPreviewProject(project);
          setCurrentPage('mobile-preview');
          setSelProject(null);
          return;
        }
        setCurrentPage('not-found');
        setPreviewProject(null);
        return;
      }
      const knownAnchors = ['home', 'work', 'capabilities', 'process',
        'testimonials', 'about', 'expertise', 'contact'];
      const anchor = hash.replace('#', '');
      if (knownAnchors.includes(anchor)) {
        setCurrentPage('home');
        setPreviewProject(null);
        return;
      }
      if (hash.startsWith('#/')) {
        setCurrentPage('not-found');
        setPreviewProject(null);
        return;
      }
      setCurrentPage('home');
      setPreviewProject(null);
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  /* ── Page title management ────────────────────────────────── */
  useEffect(() => {
    if (currentPage === 'mobile-preview' && previewProject) {
      document.title = `${previewProject.title} — Mobile Preview | ${profile.name}`;
    } else if (currentPage === 'not-found') {
      document.title = `404 — Page not found | ${profile.name}`;
    } else {
      document.title = `${profile.name} — ${profile.role}`;
    }
  }, [currentPage, previewProject]);

  const handleOpenProject = useCallback((project: Project) => {
    if (project.mobilePreview?.enabled) {
      window.location.hash = `/project/${project.id}`;
    } else {
      setSelProject(project);
    }
  }, []);

  const handleBackToHome = useCallback(() => {
    window.location.hash = '';
    setCurrentPage('home');
    setPreviewProject(null);
  }, []);

  const closePrj = useCallback(() => setSelProject(null), []);
  const closeCtc = useCallback(() => setContactOpen(false), []);

  /* ── Render ────────────────────────────────────────────────── */
  if (currentPage === 'not-found') {
    return <NotFoundPage onBack={handleBackToHome} />;
  }
  if (currentPage === 'mobile-preview' && previewProject) {
    return <MobilePreviewPage project={previewProject} onBack={handleBackToHome} />;
  }
  return (
    <>
      <PortfolioHome onOpenProject={handleOpenProject}
        onContact={() => setContactOpen(true)} />
      {selProject && <ProjectDialog project={selProject} onClose={closePrj} />}
      {contactOpen && <ContactDialog onClose={closeCtc} />}
    </>
  );
}