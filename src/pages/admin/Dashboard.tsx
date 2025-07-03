import { useState } from 'react';
import { Image, FileText, User, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAbout } from '../../hooks/useAbout';
import { useContact } from '../../hooks/useContact';
import AboutForm from '../../components/admin/AboutForm';
import ContactFormAdmin from '../../components/admin/ContactFormAdmin';

export default function AdminDashboard() {
  const { aboutText, education, exhibitions, imageUrl, setAbout } = useAbout();
  const { address, phone, email, studioHours, setContact } = useContact();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/gallery"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <Image className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h2 className="text-lg font-medium">Manage Gallery</h2>
              <p className="text-gray-500">Add, edit, or remove artwork</p>
            </div>
          </div>
        </Link>
        <Link
          to="/admin/blog"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h2 className="text-lg font-medium">Manage Blog</h2>
              <p className="text-gray-500">Create and edit blog posts</p>
            </div>
          </div>
        </Link>
        <button
          onClick={() => setIsAboutOpen(true)}
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center w-full text-left"
        >
          <User className="h-8 w-8 text-indigo-600" />
          <div className="ml-4">
            <h2 className="text-lg font-medium">Manage About</h2>
            <p className="text-gray-500">Edit about section details</p>
          </div>
        </button>
        <button
          onClick={() => setIsContactOpen(true)}
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center w-full text-left"
        >
          <Mail className="h-8 w-8 text-indigo-600" />
          <div className="ml-4">
            <h2 className="text-lg font-medium">Manage Contact</h2>
            <p className="text-gray-500">Edit contact information</p>
          </div>
        </button>
        <Link
          to="/admin/messages"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center w-full text-left"
        >
          <MessageCircle className="h-8 w-8 text-indigo-600" />
          <div className="ml-4">
            <h2 className="text-lg font-medium">Manage Messages</h2>
            <p className="text-gray-500">View contact form messages</p>
          </div>
        </Link>
      </div>
      {isAboutOpen && (
        <AboutForm
          aboutText={aboutText}
          education={education}
          exhibitions={exhibitions}
          imageUrl={imageUrl}
          onSubmit={(data) => {
            setAbout(data);
            setIsAboutOpen(false);
          }}
          onClose={() => setIsAboutOpen(false)}
        />
      )}
      {isContactOpen && (
        <ContactFormAdmin
          address={address}
          phone={phone}
          email={email}
          studioHours={studioHours}
          onSubmit={(data) => {
            setContact(data);
            setIsContactOpen(false);
          }}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
}