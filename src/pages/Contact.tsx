import { useContact } from '../hooks/useContact';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const { address, phone, email, studioHours } = useContact();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-600 mb-8">
            I'd love to hear from you. Please fill out the form below or reach out through any of the contact methods listed.
          </p>

          <div className="space-y-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-indigo-600 mr-4" />
              <span className="text-gray-600">{address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-indigo-600 mr-4" />
              <span className="text-gray-600">{phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-indigo-600 mr-4" />
              <span className="text-gray-600">{email}</span>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Studio Hours</h2>
            <div className="space-y-2 text-gray-600">
              {studioHours.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}