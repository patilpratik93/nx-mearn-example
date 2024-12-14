import { useState, useCallback } from 'react';

interface FormData {
  title: string;
  description: string;
  price: string;
}

export const useGiftIdeaForm = (
  onSubmit: (idea: { title: string; description: string; price: number }) => void
) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: ''
  });

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price)
    });
    setFormData({ title: '', description: '', price: '' });
  }, [formData, onSubmit]);

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};