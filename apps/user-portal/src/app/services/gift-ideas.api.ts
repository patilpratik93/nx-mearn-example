const API_BASE_URL = 'http://localhost:3333/api';

export const fetchGiftIdeas = async () => {
  const response = await fetch(`${API_BASE_URL}/gift-ideas`);
  if (!response.ok) {
    throw new Error('Failed to fetch gift ideas');
  }
  return response.json();
};

export const submitGiftIdea = async (ideaData: {
  title: string;
  description: string;
  price: number;
}) => {
  const response = await fetch(`${API_BASE_URL}/gift-ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...ideaData,
      submittedBy: 'user@example.com', // In a real app, this would come from auth
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit gift idea');
  }
  return response.json();
};