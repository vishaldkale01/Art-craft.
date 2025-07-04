import { useEffect } from 'react';
import { useContact } from '../hooks/useContact';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const { address, phone, email, studioHours, fetchContact } = useContact();

  useEffect(() => {
    fetchContact();
  }, []);

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight">
    Contact
  </h1>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
    {/* Contact Info */}
    <div>
      <p className="text-lg text-gray-600 mb-10">
        I'd love to hear from you. Please fill out the form below or reach out through any of the contact methods listed.
      </p>

      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
          <span className="text-gray-700 text-base">{address}</span>
        </div>
        <div className="flex items-start">
          <Phone className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
          <span className="text-gray-700 text-base">{phone}</span>
        </div>
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
          <span className="text-gray-700 text-base">{email}</span>
        </div>
      </div>

      {/* Studio Hours */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Studio Hours</h2>
        <div className="space-y-2 text-gray-600 text-base">
          {studioHours.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
      <ContactForm />
    </div>
  </div>
</div>

  );
}