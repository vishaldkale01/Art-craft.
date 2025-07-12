import { Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Art & Craft. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}