// src/data/projects/field-notes.ts
import type { Project } from '../types';

export const fieldNotes: Project = {
  id: 'field',
  title: 'Field Notes',
  category: 'E-commerce experience',
  description:
    'An original design concept exploring how a lifestyle stationery brand could translate its tactile, craft-focused identity into a digital storefront. Warm editorial storytelling meets thoughtful product presentation.',
  image: '/images/project-field.svg',
  imageAlt: 'Original Field Notes lifestyle storefront concept with olive and cream colors',
  color: '#8b916b',
  tags: ['E-commerce', 'UI design', 'Development', 'Figma', 'Motion Design'],
  year: 'Concept',
  demo: true,
  highlights: [
    'Original visual concept for portfolio demonstration',
    'Editorial storytelling approach over catalog-style listing',
    'Muted olive and cream palette reflecting craft identity',
    'Product card micro-interactions mimicking physical touch',
    'Full responsive design system',
    'Brand content integration with "Field Stories" section',
  ],
};