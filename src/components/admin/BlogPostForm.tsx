import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';
import { BlogPost } from '../../types';

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (data: Omit<BlogPost, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export default function BlogPostForm({ post, onSubmit, onClose }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    imageUrl: post?.imageUrl || '',
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
    <Modal title={post ? 'Edit Post' : 'New Post'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <FormField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={8}
          required
        />
        <FormField
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
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
            {post ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
}