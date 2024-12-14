import { GiftIdea } from '@secret-santa/shared/types';

// Mock database
let giftIdeas: GiftIdea[] = [];

export const GiftIdeasService = {
  getAllIdeas: async (): Promise<GiftIdea[]> => {
    return giftIdeas;
  },

  getIdeaById: async (id: string): Promise<GiftIdea | undefined> => {
    return giftIdeas.find(idea => idea.id === id);
  },

  createIdea: async (idea: Omit<GiftIdea, 'id' | 'status' | 'submittedAt' | 'updatedAt'>): Promise<GiftIdea> => {
    const newIdea: GiftIdea = {
      ...idea,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    giftIdeas.push(newIdea);
    return newIdea;
  },

  updateIdeaStatus: async (id: string, status: GiftIdea['status']): Promise<GiftIdea | undefined> => {
    const ideaIndex = giftIdeas.findIndex(idea => idea.id === id);
    if (ideaIndex === -1) return undefined;

    giftIdeas[ideaIndex] = {
      ...giftIdeas[ideaIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    return giftIdeas[ideaIndex];
  }
};