import { GiftIdea } from '@secret-santa/shared/types';

export class GiftIdeaRepository {
  private ideas: GiftIdea[] = [];

  async findAll(): Promise<GiftIdea[]> {
    return [...this.ideas];
  }

  async findById(id: string): Promise<GiftIdea | undefined> {
    return this.ideas.find(idea => idea.id === id);
  }

  async create(idea: GiftIdea): Promise<GiftIdea> {
    this.ideas.push(idea);
    return idea;
  }

  async update(id: string, updatedIdea: GiftIdea): Promise<GiftIdea> {
    const index = this.ideas.findIndex(idea => idea.id === id);
    if (index !== -1) {
      this.ideas[index] = updatedIdea;
    }
    return updatedIdea;
  }
}