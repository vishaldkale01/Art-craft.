import { useState, useEffect } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { supabase } from '../../supabaseClient';

interface BlogPostFormProps {
  post?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    date?: string;
    url?: string;
  };
  onSubmit: (data: { title?: string; description?: string; imageUrl?: string; date?: string; url?: string }) => void;
  onClose: () => void;
}

export default function BlogPostForm({ post, onSubmit, onClose }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
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
    <div className="overflow-y-auto pr-1 space-y-6 flex-1" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border, #ccc)' }}
        />
      </div>
      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2"
          placeholder="Write a short description..."
          style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border, #ccc)' }}
        />
      </div>
      {/* Image URL + Upload */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2"
          placeholder="Paste image link or upload below"
          style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border, #ccc)' }}
        />
        {/* Image Preview */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md aspect-video border rounded-lg overflow-hidden shadow-sm" style={{ background: 'var(--bg)', borderColor: 'var(--border, #ccc)' }}>
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
              <div className="absolute inset-0 flex items-center justify-center text-lg font-medium" style={{ color: 'var(--muted-text, #888)', background: 'var(--bg)', opacity: 0.8 }}>
                No Image Selected
              </div>
            )}
          </div>
          <label className="inline-block cursor-pointer px-5 py-2 rounded-md shadow transition-colors font-medium" style={{ background: 'var(--accent, #6366f1)', color: 'var(--accent-text, #fff)' }}>
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
            <span className="text-sm" style={{ color: 'var(--error, #ef4444)' }}>{uploadError}</span>
          )}
          {formData.imageUrl && (
            <span className="text-xs break-all max-w-xs text-center" style={{ color: 'var(--muted-text, #888)' }}>{formData.imageUrl}</span>
          )}
        </div>
      </div>
      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2"
          style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border, #ccc)' }}
        />
      </div>
      {/* External URL */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium" style={{ color: 'var(--text)' }}>External Link (Read more URL)</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2"
          placeholder="https://example.com/article"
          style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border, #ccc)' }}
        />
      </div>
    </div>
    {/* Sticky Footer Buttons */}
    <div className="flex justify-end space-x-4 pt-4 border-t mt-4 sticky bottom-0 py-3 z-10" style={{ background: 'var(--bg)', borderColor: 'var(--border, #ccc)' }}>
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 transition"
        style={{ color: 'var(--muted-text, #888)' }}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 rounded-md transition-colors"
        style={{ background: 'var(--accent, #6366f1)', color: 'var(--accent-text, #fff)' }}
      >
        {post ? 'Update' : 'Create'}
      </button>
    </div>
  </form>
</Modal>

  );
}