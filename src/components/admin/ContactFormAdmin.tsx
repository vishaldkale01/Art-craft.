import { useState } from 'react';
import Modal from './Modal';
import FormField from './FormField';

interface ContactFormAdminProps {
  address: string;
  phone: string;
  email: string;
  studioHours: string[];
  onSubmit: (data: { address: string; phone: string; email: string; studioHours: string[] }) => void;
  onClose: () => void;
}

export default function ContactFormAdmin({ address, phone, email, studioHours, onSubmit, onClose }: ContactFormAdminProps) {
  const [formData, setFormData] = useState({
    address,
    phone,
    email,
    studioHours: studioHours.join('\n'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      studioHours: formData.studioHours.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <Modal title="Edit Contact Section" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <FormField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Studio Hours (one per line)"
          name="studioHours"
          value={formData.studioHours}
          onChange={handleChange}
          multiline
          rows={3}
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
