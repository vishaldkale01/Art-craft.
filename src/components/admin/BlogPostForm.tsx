import { useState, useEffect } from 'react';
import Modal from './Modal';
import FormField from './FormField';

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

  // Update preview if editing and imageUrl changes (for edit mode)
  // This effect ensures preview updates if the post changes (edit mode)
  useEffect(() => {
    setFilePreview(formData.imageUrl || null);
  }, [formData.imageUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') {
      setFilePreview(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
            />
            {filePreview && (
              <img src={filePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
            )}
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
          >
            {post ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}