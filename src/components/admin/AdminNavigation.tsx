import { Link } from 'react-router-dom';
import { LayoutDashboard, Image, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminNavigation() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/admin" className="flex items-center px-4 text-gray-900">
              <LayoutDashboard className="h-6 w-6 mr-2" />
              Admin Panel
            </Link>
            <div className="hidden sm:flex sm:space-x-8 sm:ml-8">
              <Link to="/admin/gallery" className="flex items-center px-3 text-gray-600 hover:text-gray-900">
                <Image className="h-5 w-5 mr-2" />
                Gallery
              </Link>
              <Link to="/admin/blog" className="flex items-center px-3 text-gray-600 hover:text-gray-900">
                <FileText className="h-5 w-5 mr-2" />
                Blog
              </Link>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}