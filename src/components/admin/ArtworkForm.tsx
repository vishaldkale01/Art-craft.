import { useEffect, useState } from 'react';
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
    featured: artwork?.featured ?? false,
  });
  const [filePreview, setFilePreview] = useState<string | null>(artwork?.imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'imageUrl') {
        setFilePreview(value);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setUploadError(null);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      console.log('Uploading file:', fileName);
      const { data, error } = await supabase.storage.from('chashmish').upload(fileName, file, { upsert: true });
      console.log('Upload response:', { data, error });
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('chashmish').getPublicUrl(fileName);
        console.log('Public URL:', urlData?.publicUrl);
        setFormData(prev => ({ ...prev, imageUrl: urlData.publicUrl }));
        setFilePreview(urlData.publicUrl);
      } else {
        setUploadError(error?.message || 'Unknown upload error');
      }
      setUploading(false);
    }
  };

  return (
<Modal title={artwork ? 'Edit Artwork' : 'Add Artwork'} onClose={onClose}>
  <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">

    {/* Scrollable Fields */}
    <div className="overflow-y-auto pr-1 space-y-6 flex-1">

      {/* Title */}
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Description */}
      <FormField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Image URL & Upload */}
      <div>
        <FormField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Paste image link or upload below"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Image Preview */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md aspect-[3/4] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {filePreview ? (
              <img
                src={filePreview}
                alt={formData.title || 'Artwork preview'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/384x512?text=No+Image';
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-medium bg-white bg-opacity-80">
                No Image Selected
              </div>
            )}
          </div>

          <label className="inline-block cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors font-medium">
            {uploading ? 'Uploading...' : 'Choose Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {uploadError && (
            <span className="text-sm text-red-500">{uploadError}</span>
          )}

          {formData.imageUrl && (
            <span className="text-xs text-gray-500 break-all max-w-xs text-center">
              {formData.imageUrl}
            </span>
          )}
        </div>
      </div>

      {/* Category Dropdown */}
      <FormField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        asDropdown
        options={categories}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Featured Checkbox */}
      <div className="flex items-center pt-1">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 focus:ring-indigo-500"
        />
        <label htmlFor="featured" className="text-sm text-gray-700">
          Featured
        </label>
      </div>
    </div>

    {/* Sticky Footer Buttons */}
    <div className="flex justify-end space-x-4 pt-4 border-t mt-4 bg-white sticky bottom-0 py-3 z-10">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        {artwork ? 'Update' : 'Create'}
      </button>
    </div>
  </form>
</Modal>

  );
}