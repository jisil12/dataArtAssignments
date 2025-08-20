// Shared types for the Timeline app

export type EventCategory = 'History' | 'Politics' | 'Exploration' | 'Science' | 'Technology';

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  imageURL: string;
  category: EventCategory;
} 