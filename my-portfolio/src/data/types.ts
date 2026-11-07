// src/data/types.ts

/* ── Profile / Site ─────────────────────────────────────────────── */

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
  status?: 'pending' | 'active' | 'done' | 'completed' | 'complete';
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
  appRating?: number;
  appDownloads?: string;
  appCategory?: string;
  appVersion?: string;
  appSize?: string;
  appReleaseDate?: string;
  appDeveloper?: string;
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
  description?: string;
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