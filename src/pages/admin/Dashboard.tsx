import { useState, useEffect } from 'react';
import { Image, FileText, User, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAbout } from '../../hooks/useAbout';
import { useContact } from '../../hooks/useContact';
import { useTheme } from '../../hooks/useTheme';
import AboutForm from '../../components/admin/AboutForm';
import ContactFormAdmin from '../../components/admin/ContactFormAdmin';
import AdminThemeEditor from '../../components/admin/AdminThemeEditor';

export default function AdminDashboard() {
  const { aboutText, education, exhibitions, imageUrl, setAbout } = useAbout();
  const { address, phone, email, studioHours, setContact } = useContact();
  const { adminDefault, setAdminDefault, fetchAdminDefault } = useTheme();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showThemeEditor, setShowThemeEditor] = useState(false);

  useEffect(() => {
    fetchAdminDefault();
  }, []);

  return (
    <div>
      
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Link
          to="/admin/gallery"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <Image className="h-8 w-10 text-indigo-600" />
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
        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center w-full text-left">
          <MessageCircle className="h-8 w-8 text-indigo-600" />
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-medium">Custom Theme</h2>
            <p className="text-gray-500">Edit and apply a custom theme for the site</p>
          </div>
          <button
            onClick={() => setShowThemeEditor(v => !v)}
            className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          >
            {showThemeEditor ? 'Close' : 'Edit'}
          </button>
        </div>
        {showThemeEditor && (
          <div className="col-span-1 md:col-span-2">
            <AdminThemeEditor />
          </div>
        )}
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