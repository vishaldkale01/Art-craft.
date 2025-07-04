import { useState, useEffect } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { supabase } from '../../supabaseClient';

interface BlogPostFormProps {
  post?: {
    description?: string;
    imageUrl?: string;
    date?: string;
    url?: string;
  };
  onSubmit: (data: { description?: string; imageUrl?: string; date?: string; url?: string }) => void;
  onClose: () => void;
}

export default function BlogPostForm({ post, onSubmit, onClose }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    description: post?.description || '',
    imageUrl: post?.imageUrl || '',
    date: post?.date || '',
    url: post?.url || '',
  });
  const [filePreview, setFilePreview] = useState<string | null>(post?.imageUrl || null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Update preview if editing and imageUrl changes (for edit mode)
  // This effect ensures preview updates if the post changes (edit mode)
  useEffect(() => {
    setFilePreview(formData.imageUrl || null);
  }, [formData.imageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return; // Prevent submit while uploading
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') {
      setFilePreview(value);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    debugger
    if (file) {
      setUploading(true);
      setUploadError(null);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('chashmish').upload(fileName, file, { upsert: true });
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('chashmish').getPublicUrl(fileName);
        setFormData(prev => ({ ...prev, imageUrl: urlData.publicUrl }));
        setFilePreview(urlData.publicUrl);
      } else {
        setUploadError(error?.message || 'Unknown upload error');
      }
      setUploading(false);
    }
  };

  return (
<Modal title={post ? 'Edit Post' : 'New Post'} onClose={onClose}>
  <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
    
    {/* Scrollable Fields */}
    <div className="overflow-y-auto pr-1 space-y-6 flex-1">
      
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Write a short description..."
        />
      </div>

      {/* Image URL + Upload */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste image link or upload below"
        />

        {/* Image Preview */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md aspect-video bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {filePreview ? (
              <img
                src={filePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/384x216?text=No+Image';
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
            <span className="text-xs text-gray-500 break-all max-w-xs text-center">{formData.imageUrl}</span>
          )}
        </div>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* External URL */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">External Link (Read more URL)</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://example.com/article"
        />
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
        {post ? 'Update' : 'Create'}
      </button>
    </div>
  </form>
</Modal>

  );
}