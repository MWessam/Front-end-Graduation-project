/**
 * Mock data for teacher portal - Library
 */

import type { LibraryResource } from '../../types';

/**
 * Library resources
 */
export const libraryResources: LibraryResource[] = [
  {
    id: 'lib-1',
    title: 'Chemistry Basics',
    type: 'document',
    description: 'Introduction to chemistry fundamentals',
    iconType: 'document',
    uploadedAt: '2025-10-15',
    views: 45,
  },
  {
    id: 'lib-2',
    title: 'Physics Intro',
    type: 'video',
    description: 'Video lesson on physics basics',
    iconType: 'video',
    uploadedAt: '2025-10-10',
    views: 128,
  },
  {
    id: 'lib-3',
    title: 'Math Formulas Reference',
    type: 'document',
    description: 'Complete reference guide for math formulas',
    iconType: 'document',
    uploadedAt: '2025-10-05',
    views: 89,
  },
  {
    id: 'lib-4',
    title: 'Programming Best Practices',
    type: 'presentation',
    description: 'Slide deck on coding standards',
    iconType: 'document',
    uploadedAt: '2025-09-28',
    views: 67,
  },
];

/**
 * Get resources by type
 */
export const getResourcesByType = (type: LibraryResource['type']): LibraryResource[] => {
  return libraryResources.filter(r => r.type === type);
};

/**
 * Search resources by title
 */
export const searchResources = (query: string): LibraryResource[] => {
  const lowerQuery = query.toLowerCase();
  return libraryResources.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get resource by ID
 */
export const getResourceById = (id: string): LibraryResource | undefined => {
  return libraryResources.find(r => r.id === id);
};
