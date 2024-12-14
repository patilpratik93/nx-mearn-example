import React from 'react';
import { useGiftIdeaForm } from './useGiftIdeaForm';
import { Button } from '@secret-santa/shared/ui';
import { FormField } from './FormField';

interface GiftIdeaFormProps {
  onSubmit: (idea: { title: string; description: string; price: number }) => void;
}

export const GiftIdeaForm: React.FC<GiftIdeaFormProps> = ({ onSubmit }) => {
  const { 
    formData, 
    handleInputChange, 
    handleSubmit 
  } = useGiftIdeaForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="title"
        label="Gift Title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <FormField
        id="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        type="textarea"
        required
      />
      <FormField
        id="price"
        label="Price ($)"
        value={formData.price}
        onChange={handleInputChange}
        type="number"
        min="0"
        step="0.01"
        required
      />
      <Button type="submit" variant="primary">
        Submit Gift Idea
      </Button>
    </form>
  );
};