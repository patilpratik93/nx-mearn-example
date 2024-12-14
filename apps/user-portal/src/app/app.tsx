import React, { useEffect } from 'react';
import { GiftIdeaForm } from './components/GiftIdeaForm';
import { GiftIdeaList } from './components/GiftIdeaList';
import { useGiftIdeas } from './hooks/useGiftIdeas';

export function App() {
  const { ideas, loading, error, loadIdeas, submitIdea } = useGiftIdeas();

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Secret Santa Gift Ideas</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Submit a Gift Idea</h2>
          <GiftIdeaForm onSubmit={submitIdea} />
        </div>
        <div>
          {loading ? (
            <p>Loading gift ideas...</p>
          ) : (
            <GiftIdeaList ideas={ideas} />
          )}
        </div>
      </div>
    </div>
  );
}