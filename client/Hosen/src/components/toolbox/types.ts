export type CategoryColor = "green" | "lime" | "orange" | "blue" | "yellow";

export interface Category {
  id: string;
  emoji: string;
  title: string;
  description: string;
  color: CategoryColor;
}

export interface Tool {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  tag: string;
  tagEmoji: string;
  emotions: string[];
  duration?: string;
  why?: string;
  howSteps?: string[];
  quote?: {
    title: string;
    text: string;
  };
}

export interface CommunityTip {
  id: string;
  text: string;
  category: string;
}
