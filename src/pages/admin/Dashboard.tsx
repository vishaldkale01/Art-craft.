import { Image, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
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
      </div>
    </div>
  );
}