import { GiftIdea } from '@secret-santa/shared/types';
import { generateId, getCurrentTimestamp } from '../utils/id-generator';
import { GiftIdeaRepository } from '../repositories/gift-idea.repository';

export class GiftIdeasService {
  private repository: GiftIdeaRepository;

  constructor() {
    this.repository = new GiftIdeaRepository();
  }

  async getAllIdeas(): Promise<GiftIdea[]> {
    return this.repository.findAll();
  }

  async getIdeaById(id: string): Promise<GiftIdea | undefined> {
    return this.repository.findById(id);
  }

  async createIdea(idea: Omit<GiftIdea, 'id' | 'status' | 'submittedAt' | 'updatedAt'>): Promise<GiftIdea> {
    const newIdea: GiftIdea = {
      ...idea,
      id: generateId(),
      status: 'pending',
      submittedAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };
    return this.repository.create(newIdea);
  }

  async updateIdeaStatus(id: string, status: GiftIdea['status']): Promise<GiftIdea | undefined> {
    const idea = await this.repository.findById(id);
    if (!idea) return undefined;

    const updatedIdea: GiftIdea = {
      ...idea,
      status,
      updatedAt: getCurrentTimestamp()
    };
    return this.repository.update(id, updatedIdea);
  }
}