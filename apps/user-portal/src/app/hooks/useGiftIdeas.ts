import { useState, useCallback } from 'react';
import { GiftIdea } from '@secret-santa/shared/types';
import { fetchGiftIdeas, submitGiftIdea } from '../services/gift-ideas.api';

export const useGiftIdeas = () => {
  const [ideas, setIdeas] = useState<GiftIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadIdeas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGiftIdeas();
      setIdeas(data);
    } catch (err) {
      setError('Failed to load gift ideas');
      console.error('Error loading ideas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitIdea = useCallback(async (ideaData: { 
    title: string; 
    description: string; 
    price: number 
  }) => {
    try {
      setError(null);
      await submitGiftIdea(ideaData);
      await loadIdeas();
    } catch (err) {
      setError('Failed to submit gift idea');
      console.error('Error submitting idea:', err);
    }
  }, [loadIdeas]);

  return {
    ideas,
    loading,
    error,
    loadIdeas,
    submitIdea
  };
};