import React, { useState } from 'react';
import { useMessages } from '../hooks/useMessages';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save message to store
    useMessages.getState().addMessage(formData);
    setFormData({ name: '', email: '', message: '' });
    // Optionally show a success message
    alert('Message sent!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  {/* Name */}
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
      Name
    </label>
    <input
      type="text"
      name="name"
      id="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-400"
      placeholder="Your full name"
    />
  </div>

  {/* Email */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input
      type="email"
      name="email"
      id="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-400"
      placeholder="you@example.com"
    />
  </div>

  {/* Message */}
  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
      Message
    </label>
    <textarea
      name="message"
      id="message"
      rows={5}
      value={formData.message}
      onChange={handleChange}
      required
      className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-400 resize-none"
      placeholder="Write your message..."
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full inline-flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Send Message
  </button>
</form>

  );
}