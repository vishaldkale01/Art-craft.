import { useState, useEffect } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { Artwork } from '../../types';
import { useGalleryCategories } from '../../hooks/useGalleryCategories';
import { supabase } from '../../supabaseClient';

interface ArtworkFormProps {
  artwork?: Artwork;
  onSubmit: (data: Omit<Artwork, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function ArtworkForm({ artwork, onSubmit, onClose }: ArtworkFormProps) {
  const { categories, fetchCategories } = useGalleryCategories();
  const [formData, setFormData] = useState({
    title: artwork?.title || '',
    description: artwork?.description || '',
    imageUrl: artwork?.imageUrl || '',
    category: artwork?.category || '',
  });
  const [filePreview, setFilePreview] = useState<string | null>(artwork?.imageUrl || null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') {
      setFilePreview(value);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('artwork-images').upload(fileName, file);
      if (!error && data) {
        // Get public URL
        const { data: urlData } = supabase.storage.from('artwork-images').getPublicUrl(fileName);
        setFormData(prev => ({ ...prev, imageUrl: urlData.publicUrl }));
        setFilePreview(urlData.publicUrl);
      }
    }
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
        <div>
          <FormField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Paste image link or upload below"
          />
          <div className="mt-2 flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block"
            />
            {filePreview && (
              <img src={filePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
            )}
          </div>
        </div>
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          asDropdown
          options={categories}
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