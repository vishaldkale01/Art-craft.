import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import NavLink from './NavLink';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/admin/login', label: 'Admin Login' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-gray-900">
            Art & Craft
            </NavLink>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {routes.map(route => (
              <NavLink key={route.path} to={route.path}>
                {route.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {routes.map(route => (
              <NavLink
                key={route.path}
                to={route.path}
                className="block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}