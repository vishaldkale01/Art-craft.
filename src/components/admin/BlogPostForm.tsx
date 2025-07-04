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
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
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
              disabled={uploading}
            />
            {filePreview && (
              <img src={filePreview} alt="Preview" className="h-16 w-16 object-cover rounded" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Image'; }} />
            )}
            {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
            {uploadError && <span className="text-sm text-red-500">{uploadError}</span>}
          </div>
        </div>
        <FormField
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <FormField
          label="External Link (Read more URL)"
          name="url"
          value={formData.url}
          onChange={handleChange}
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
            disabled={uploading}
          >
            {post ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}