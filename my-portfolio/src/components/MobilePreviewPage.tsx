import { useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../data/portfolio';
import '../styles/mobile-preview.css';

interface MobilePreviewPageProps {
  project: Project;
  onBack: () => void;
}

type SectionId =
  | 'overview'
  | 'stats'
  | 'highlights'
  | 'architecture'
  | 'flows'
  | 'features'
  | 'tech'
  | 'value'
  | 'brief'
  | 'launch';

interface NavItem {
  id: SectionId;
  label: string;
}

export default function MobilePreviewPage({ project, onBack }: MobilePreviewPageProps) {
  const mp = project.mobilePreview;
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [activeFlow, setActiveFlow] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoHover, setLogoHover] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Map<SectionId, HTMLElement>>(new Map());

  /* ── Set page title ─────────────────────────────── */
  useEffect(() => {
    const prev = document.title;
    document.title = `${project.title} — Developer Deep Dive`;
    return () => {
      document.title = prev;
    };
  }, [project.title]);

  /* ── Scroll progress bar (window scroll, not inner) */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Intersection observer for sticky nav active state ──── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section') as SectionId | null;
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll-reveal observer for staggered animations ──── */
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mp-reveal-in');
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const nodes = document.querySelectorAll('.mp-reveal');
    nodes.forEach((n) => reveal.observe(n));
    return () => reveal.disconnect();
  }, [project.id]);

  /* ── Register section refs ──────────────────────── */
  const registerSection = (id: SectionId) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el);
    else sectionsRef.current.delete(id);
  };

  /* ── Nav items (dynamic based on content) ──────── */
  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [{ id: 'overview', label: 'Overview' }];
    if (project.stats?.length) items.push({ id: 'stats', label: 'Stats' });
    if (project.highlights?.length) items.push({ id: 'highlights', label: 'Highlights' });
    if (project.architecture) items.push({ id: 'architecture', label: 'Architecture' });
    if (project.flows?.length) items.push({ id: 'flows', label: 'Flows' });
    if (project.featureGroups?.length) items.push({ id: 'features', label: 'Features' });
    if (project.techStack?.length) items.push({ id: 'tech', label: 'Tech' });
    if (project.clientValue?.length) items.push({ id: 'value', label: 'Value' });
    if (mp?.projectBrief?.length) items.push({ id: 'brief', label: 'Brief' });
    items.push({ id: 'launch', label: 'Launch' });
    return items;
  }, [project, mp]);

  /* ── Smooth scroll to section ───────────────────── */
  const scrollToSection = (id: SectionId) => {
    const el = sectionsRef.current.get(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  /* ── Logo 3D tilt on mouse move ─────────────────── */
  const handleLogoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -20;
    const rotY = ((x - rect.width / 2) / rect.width) * 20;
    e.currentTarget.style.setProperty('--rot-x', `${rotX}deg`);
    e.currentTarget.style.setProperty('--rot-y', `${rotY}deg`);
  };

  const resetLogoTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rot-x', '0deg');
    e.currentTarget.style.setProperty('--rot-y', '0deg');
    setLogoHover(false);
  };

  if (!mp?.enabled) {
    return (
      <div className="mobile-preview-page">
        <div className="mp-empty">
          <h2>Mobile preview not available for this project.</h2>
          <button className="mp-back-btn" onClick={onBack}>← Back to portfolio</button>
        </div>
      </div>
    );
  }

  const accent = project.color || '#f39a42';
  const flows = project.flows || [];

  return (
    <div
      className="mobile-preview-page"
      style={{ '--project-color': accent, '--mp-accent': accent } as React.CSSProperties}
    >
      {/* ── Top progress bar ─────────────────────── */}
      <div className="mp-progress-bar">
        <div className="mp-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── Fixed top bar ────────────────────────── */}
      <header className="mp-header">
        <button className="mp-back-btn" onClick={onBack} aria-label="Back to portfolio">
          <span className="mp-back-arrow">←</span>
          <span>Back to portfolio</span>
        </button>
        <div className="mp-header-right">
          <span className="mp-header-live">
            <span className="live-dot" />
            {project.title}
          </span>
        </div>
      </header>

      {/* ── Sticky section nav ───────────────────── */}
      <nav className="mp-section-nav" aria-label="Section navigation">
        <div className="mp-section-nav-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mp-section-nav-btn ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main scrollable area ─────────────────── */}
      <main className="mp-main" ref={mainRef}>
        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ HERO: Logo + Title + App Meta         ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        <section
          className="mp-hero"
          ref={registerSection('overview')}
          data-section="overview"
        >
          <div className="mp-hero-bg">
            <div className="mp-hero-gradient" />
            <div className="mp-hero-pattern" />
            <div className="mp-hero-orb mp-orb-1" />
            <div className="mp-hero-orb mp-orb-2" />
          </div>

          <div className="mp-hero-content">
            {/* ── LEFT: Textual content ───────────── */}
            <div className="mp-hero-left">
              <div className="mp-hero-badge mp-reveal">
                <span className="mp-badge-dot" />
                Full-Stack Production Application — Developer Deep Dive
              </div>

              <h1 className="mp-app-title mp-reveal">{project.title}</h1>

              {mp.appTagline && (
                <p className="mp-app-tagline mp-reveal">{mp.appTagline}</p>
              )}

              {mp.appCategory && (
                <p className="mp-app-category mp-reveal">{mp.appCategory}</p>
              )}

              {/* App meta pills */}
              <div className="mp-app-meta mp-reveal">
                {mp.appVersion && (
                  <span className="mp-meta-pill">Version {mp.appVersion}</span>
                )}
                {mp.appRating && (
                  <span className="mp-meta-pill">{mp.appRating} ★</span>
                )}
                {mp.appDownloads && (
                  <span className="mp-meta-pill">{mp.appDownloads} installs</span>
                )}
                {mp.appSize && (
                  <span className="mp-meta-pill">{mp.appSize}</span>
                )}
                {mp.appReleaseDate && (
                  <span className="mp-meta-pill">Released {mp.appReleaseDate}</span>
                )}
                {mp.appLocation && (
                  <span className="mp-meta-pill">{mp.appLocation}</span>
                )}
                {mp.appDeveloper && (
                  <span className="mp-meta-pill">by {mp.appDeveloper}</span>
                )}
              </div>

              {mp.appDescription && (
                <p className="mp-app-desc mp-reveal">{mp.appDescription}</p>
              )}

              {/* CTA buttons */}
              <div className="mp-cta-group mp-reveal">
                {mp.playStoreUrl && (
                  <a
                    href={mp.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mp-download-btn"
                  >
                    <span>Google Play</span>
                    <span className="mp-cta-arrow">↗</span>
                  </a>
                )}
                {mp.livePreviewUrl && (
                  <a
                    href={mp.livePreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mp-try-live-btn"
                  >
                    <span>Launch Live Preview</span>
                    <span className="mp-cta-arrow">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* ── RIGHT: Animated logo in showcase card ──── */}
            <div className="mp-hero-showcase">
              <div className="mp-showcase-card">
                <div className="mp-showcase-bg" />
                <div className="mp-showcase-glow" />

                {mp.appIcon && (
                  <div
                    className={`mp-logo-wrap ${logoHover ? 'is-hover' : ''}`}
                    onMouseMove={handleLogoMove}
                    onMouseEnter={() => setLogoHover(true)}
                    onMouseLeave={resetLogoTilt}
                  >
                    <div className="mp-logo-aura" />
                    <div className="mp-logo-ring mp-logo-ring-1" />
                    <div className="mp-logo-ring mp-logo-ring-2" />
                    <div className="mp-logo-ring mp-logo-ring-3" />
                    <div className="mp-logo-inner">
                      <img
                        src={mp.appIcon}
                        alt={`${project.title} logo`}
                        className="mp-logo-img"
                      />
                      <div className="mp-logo-shine" />
                    </div>
                    <div className="mp-logo-shadow" />
                  </div>
                )}

                <h3 className="mp-showcase-title">{project.title}</h3>
                {mp.appTagline && (
                  <p className="mp-showcase-tagline">{mp.appTagline}</p>
                )}

                {/* Tags inside showcase */}
                {project.tags?.length > 0 && (
                  <div className="mp-showcase-badges">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span key={tag} className="mp-showcase-badge">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* All tags cloud below hero */}
          {project.tags?.length > 0 && (
            <div className="mp-tags-cloud mp-reveal" style={{ marginTop: '48px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="mp-tag"
                  style={{ ['--tag-delay' as any]: `${i * 30}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ STATS                                 ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.stats && project.stats.length > 0 && (
          <section
            className="mp-stats-section"
            ref={registerSection('stats')}
            data-section="stats"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">By the numbers</span>
              <h2>Production Metrics</h2>
              <p>Real-world data from the deployed codebase and infrastructure</p>
            </div>
            <div className="mp-stats-grid">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="mp-stat-tile mp-reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="mp-stat-value">
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <div className="mp-stat-label">{stat.label}</div>
                  {stat.description && (
                    <div className="mp-stat-desc">{stat.description}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ HIGHLIGHTS                            ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.highlights && project.highlights.length > 0 && (
          <section
            className="mp-highlights-section"
            ref={registerSection('highlights')}
            data-section="highlights"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">Engineering wins</span>
              <h2>Technical Highlights</h2>
              <p>Notable architectural decisions and implementation details</p>
            </div>
            <div className="mp-highlights-grid">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="mp-highlight-card mp-reveal"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="mp-highlight-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ ARCHITECTURE                          ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.architecture && (
          <section
            className="mp-architecture-section"
            ref={registerSection('architecture')}
            data-section="architecture"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">System design</span>
              <h2>{project.architecture.title}</h2>
              <p>{project.architecture.description}</p>
            </div>

            <div className="mp-arch-diagram">
              {/* Nodes grouped by type */}
              {(['primary', 'secondary', 'tertiary'] as const).map((type) => {
                const nodes = project.architecture!.nodes.filter((n) => n.type === type);
                if (!nodes.length) return null;
                const typeLabel =
                  type === 'primary' ? 'Client Applications' :
                  type === 'secondary' ? 'Services & Middleware' :
                  'Data & Infrastructure';
                return (
                  <div key={type} className="mp-arch-layer mp-reveal">
                    <div className="mp-arch-layer-label">
                      <span className={`mp-legend-dot mp-legend-${type}`} />
                      {typeLabel}
                      <span className="mp-arch-layer-count">{nodes.length}</span>
                    </div>
                    <div className="mp-arch-nodes-grid">
                      {nodes.map((node, i) => (
                        <div
                          key={node.id}
                          className={`mp-arch-node mp-arch-node-${type} mp-reveal`}
                          style={{ transitionDelay: `${i * 30}ms` }}
                        >
                          <div className="mp-arch-node-label">{node.label}</div>
                          {node.description && (
                            <div className="mp-arch-node-desc">{node.description}</div>
                          )}
                          <span className="mp-arch-node-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Connections */}
              {project.architecture.connections && project.architecture.connections.length > 0 && (
                <div className="mp-arch-connections mp-reveal">
                  <h3 className="mp-arch-connections-title">
                    <span className="mp-legend-dot mp-legend-primary" />
                    Data Flow Connections
                    <span className="mp-arch-layer-count">
                      {project.architecture.connections.length}
                    </span>
                  </h3>
                  <div className="mp-arch-connections-grid">
                    {project.architecture.connections.map((c, i) => {
                      const fromNode = project.architecture!.nodes.find((n) => n.id === c.from);
                      const toNode = project.architecture!.nodes.find((n) => n.id === c.to);
                      return (
                        <div
                          key={i}
                          className="mp-arch-connection-item mp-reveal"
                          style={{ transitionDelay: `${i * 20}ms` }}
                        >
                          <code>{fromNode?.label || c.from}</code>
                          <span className="mp-conn-arrow">→</span>
                          <code>{toNode?.label || c.to}</code>
                          {c.label && <span className="mp-conn-label">{c.label}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="mp-arch-legend">
                <div className="mp-legend-item">
                  <span className="mp-legend-dot mp-legend-primary" />
                  Clients
                </div>
                <div className="mp-legend-item">
                  <span className="mp-legend-dot mp-legend-secondary" />
                  Services
                </div>
                <div className="mp-legend-item">
                  <span className="mp-legend-dot mp-legend-tertiary" />
                  Data & Infra
                </div>
                <div className="mp-legend-total">
                  Total nodes: {project.architecture.nodes.length}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ FLOWS (tabbed)                        ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {flows.length > 0 && (
          <section
            className="mp-flows-section"
            ref={registerSection('flows')}
            data-section="flows"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">User & system journeys</span>
              <h2>Core Flows</h2>
              <p>End-to-end lifecycles that drive the platform</p>
            </div>

            <div className="mp-flow-tabs mp-reveal">
              {flows.map((flow, i) => (
                <button
                  key={i}
                  className={`mp-flow-tab ${activeFlow === i ? 'active' : ''}`}
                  onClick={() => setActiveFlow(i)}
                >
                  <span className="mp-flow-tab-count">0{i + 1}</span>
                  <span>{flow.title}</span>
                </button>
              ))}
            </div>

            <div className="mp-flow-detail mp-reveal">
              <div className="mp-flow-steps">
                {flows[activeFlow]?.steps.map((step, i) => (
                  <div
                    key={i}
                    className={`mp-flow-step mp-flow-step-${step.status || 'pending'}`}
                    style={{ ['--step-delay' as any]: `${i * 80}ms` }}
                  >
                    <div className="mp-flow-step-indicator">
                      <div className="mp-flow-step-number">{i + 1}</div>
                      {i < (flows[activeFlow]?.steps.length || 0) - 1 && (
                        <div className="mp-flow-step-line">
                          <div className="mp-flow-step-line-fill" />
                        </div>
                      )}
                    </div>
                    <div className="mp-flow-step-content">
                      <strong>{step.label}</strong>
                      {step.description && <span>{step.description}</span>}
                      {step.status === 'active' && <span className="mp-flow-step-active-ping" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ FEATURE GROUPS (all expanded)         ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.featureGroups && project.featureGroups.length > 0 && (
          <section
            className="mp-feature-groups-section"
            ref={registerSection('features')}
            data-section="features"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">Complete feature set</span>
              <h2>Features Deep Dive</h2>
              <p>Every capability built into the platform — grouped by domain</p>
            </div>
            <div className="mp-feature-groups-grid">
              {project.featureGroups.map((group, i) => (
                <div
                  key={i}
                  className="mp-feature-group-card mp-reveal"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="mp-fg-header">
                    <div className="mp-fg-icon">{group.icon}</div>
                    <div className="mp-fg-header-text">
                      <h3>{group.title}</h3>
                      <span className="mp-fg-count">
                        {group.features.length} feature{group.features.length === 1 ? '' : 's'}
                      </span>
                    </div>
                  </div>
                  <ul className="mp-fg-features">
                    {group.features.map((f, j) => (
                      <li
                        key={j}
                        style={{ ['--feat-delay' as any]: `${j * 30}ms` }}
                      >
                        <span className="mp-fg-check">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ TECH STACK                            ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.techStack && project.techStack.length > 0 && (
          <section
            className="mp-tech-section"
            ref={registerSection('tech')}
            data-section="tech"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">Technology stack</span>
              <h2>Tech & Infrastructure</h2>
              <p>Every library, framework, and service powering the platform</p>
            </div>
            <div className="mp-tech-stack-grid">
              {project.techStack.map((cat, i) => (
                <div
                  key={i}
                  className="mp-tech-group mp-reveal"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <h4>
                    <span className="mp-tech-group-dot" style={{ background: accent }} />
                    {cat.category}
                    <span className="mp-tech-group-count">{cat.items.length}</span>
                  </h4>
                  <div className="mp-tech-tags">
                    {cat.items.map((item, j) => (
                      <span
                        key={j}
                        className="mp-tech-tag"
                        style={{ ['--tag-delay' as any]: `${j * 20}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ CLIENT VALUE                          ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {project.clientValue && project.clientValue.length > 0 && (
          <section
            className="mp-value-section"
            ref={registerSection('value')}
            data-section="value"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">Business impact</span>
              <h2>Value Delivered</h2>
              <p>Why these engineering decisions matter in production</p>
            </div>
            <div className="mp-value-grid">
              {project.clientValue.map((v, i) => (
                <div
                  key={i}
                  className="mp-value-item mp-reveal"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="mp-value-check">→</span>
                  <p>{v}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ PROJECT BRIEF                         ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        {mp.projectBrief && mp.projectBrief.length > 0 && (
          <section
            className="mp-brief-section"
            ref={registerSection('brief')}
            data-section="brief"
          >
            <div className="mp-section-header mp-reveal">
              <span className="mp-section-tag">The story</span>
              <h2>Project Brief</h2>
            </div>
            <div className="mp-brief-grid">
              {mp.projectBrief.map((b, i) => (
                <div
                  key={i}
                  className="mp-brief-card mp-reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="mp-brief-icon">
                    <span className="mp-brief-num">0{i + 1}</span>
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>

            {/* Feature highlights sub-grid */}
            {mp.featureHighlights && mp.featureHighlights.length > 0 && (
              <div className="mp-fh-wrap mp-reveal" style={{ marginTop: '48px' }}>
                <h3 className="mp-fh-title">
                  <span className="mp-legend-dot mp-legend-primary" />
                  Developer Feature Highlights
                  <span className="mp-arch-layer-count">{mp.featureHighlights.length}</span>
                </h3>
                <div className="mp-features-showcase-grid">
                  {mp.featureHighlights.map((h, i) => (
                    <div
                      key={i}
                      className="mp-feature-showcase-card mp-reveal"
                      style={{ transitionDelay: `${i * 25}ms` }}
                    >
                      <div className="mp-feature-showcase-icon">✦</div>
                      <div className="mp-feature-showcase-content">
                        <span className="mp-feature-showcase-number">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p>{h}</p>
                      </div>
                      <span className="mp-feature-showcase-arrow">→</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ╔═══════════════════════════════════════╗ */}
        {/* ║ LAUNCH / FINAL CTA                    ║ */}
        {/* ╚═══════════════════════════════════════╝ */}
        <section
          className="mp-bottom-cta"
          ref={registerSection('launch')}
          data-section="launch"
        >
          <div className="mp-cta-content mp-reveal">
            {mp.appIcon && (
              <div className="mp-cta-icon">
                <img src={mp.appIcon} alt={project.title} className="mp-cta-icon-img" />
              </div>
            )}
            <h2>Try it live</h2>
            <p>Install from Google Play or launch the live preview in your browser</p>
            <div className="mp-cta-buttons">
              {mp.playStoreUrl && (
                <a
                  href={mp.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-final-cta"
                >
                  <span>Download on Google Play</span>
                  <span className="mp-cta-arrow">↗</span>
                </a>
              )}
              {mp.livePreviewUrl && (
                <a
                  href={mp.livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-back-cta"
                >
                  <span>Launch Appetize Preview</span>
                  <span className="mp-cta-arrow">↗</span>
                </a>
              )}
            </div>
            <button className="mp-back-cta" onClick={onBack} style={{ marginTop: '24px' }}>
              ← Back to portfolio
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}