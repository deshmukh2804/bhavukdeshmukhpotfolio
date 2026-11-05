// src/data/profile.ts
export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  demoMode: boolean;
  name: string;
  initials: string;
  role: string;
  email: string;
  whatsapp: string;
  phone: string;
  location: string;
  timezone: string;
  portrait: string;
  bio: string;
  availability: string;
  socialLinks: SocialLink[];
}

export const profile: Profile = {
  demoMode: false,
  name: 'Bhavuk Deshmukh',
  initials: 'B',
  role: 'Creative developer & designer',
  email: 'bhavukdeshmukh@gmail.com',
  whatsapp: '917389353999',
  phone: '+917389353999',
  location: 'Pune, India',
  timezone: 'Asia/Kolkata',
  portrait: '/images/bhavuk.jpg',
  bio: 'I design and build thoughtful digital experiences, bringing interface design, front-end development, and purposeful motion together. Over the past 3 years, I have focused on writing clean, accessible code and crafting layouts that are exceptionally simple and delightful to use.',
  availability: 'Available for freelance / Open to opportunities',
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bhavuk-deshmukh-189739257/' },
    { label: 'Instagram', url: 'https://www.instagram.com/bhavuk_2804/' },
    { label: 'GitHub', url: 'https://github.com/deshmukh2804' },
  ],
};