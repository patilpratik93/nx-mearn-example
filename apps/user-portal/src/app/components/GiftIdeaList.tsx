import React from 'react';
import { GiftIdea } from '@secret-santa/shared/types';
import { Card } from '@secret-santa/shared/ui';

interface GiftIdeaListProps {
  ideas: GiftIdea[];
}

export const GiftIdeaList: React.FC<GiftIdeaListProps> = ({ ideas }) => {
  const approvedIdeas = ideas.filter(idea => idea.status === 'approved');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Approved Gift Ideas</h2>
      {approvedIdeas.length === 0 ? (
        <p>No approved gift ideas yet.</p>
      ) : (
        approvedIdeas.map(idea => (
          <Card key={idea.id}>
            <h3 className="text-lg font-medium">{idea.title}</h3>
            <p className="text-gray-600">{idea.description}</p>
            <p className="text-sm text-gray-500 mt-2">Price: ${idea.price}</p>
          </Card>
        ))
      )}
    </div>
  );
};