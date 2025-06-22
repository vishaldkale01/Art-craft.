import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';

interface AboutFormProps {
  aboutText: string;
  education: string[];
  exhibitions: string[];
  imageUrl: string;
  onSubmit: (data: { aboutText: string; education: string[]; exhibitions: string[]; imageUrl: string }) => void;
  onClose: () => void;
}

export default function AboutForm({ aboutText, education, exhibitions, imageUrl, onSubmit, onClose }: AboutFormProps) {
  const [formData, setFormData] = useState({
    aboutText,
    education: education.join('\n'),
    exhibitions: exhibitions.join('\n'),
    imageUrl,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      aboutText: formData.aboutText,
      education: formData.education.split('\n').map(s => s.trim()).filter(Boolean),
      exhibitions: formData.exhibitions.split('\n').map(s => s.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
    });
  };

  return (
    <Modal title="Edit About Section" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="About Text"
          name="aboutText"
          value={formData.aboutText}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <FormField
          label="Education (one per line)"
          name="education"
          value={formData.education}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        <FormField
          label="Exhibitions (one per line)"
          name="exhibitions"
          value={formData.exhibitions}
          onChange={handleChange}
          multiline
          rows={3}
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
