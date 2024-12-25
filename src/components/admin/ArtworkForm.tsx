import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { Artwork } from '../../types';

interface ArtworkFormProps {
  artwork?: Artwork;
  onSubmit: (data: Omit<Artwork, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function ArtworkForm({ artwork, onSubmit, onClose }: ArtworkFormProps) {
  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    description: artwork?.description || '',
    imageUrl: artwork?.imageUrl || '',
    category: artwork?.category || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal title={artwork ? 'Edit Artwork' : 'Add Artwork'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          required
        />
        <FormField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {artwork ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}