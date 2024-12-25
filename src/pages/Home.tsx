import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
          alt="Artist at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Art & Craft</h1>
            <p className="text-xl md:text-2xl mb-8">Contemporary Artist & Sculptor</p>
            <Link
              to="/gallery"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Gallery
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative">
              <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={`https://images.unsplash.com/photo-151336477614${i}-60967b0f800f?auto=format&fit=crop&q=80`}
                  alt={`Featured artwork ${i}`}
                  className="object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Artwork Title {i}</h3>
              <p className="text-sm text-gray-500">Medium, Year</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={`https://images.unsplash.com/photo-151336477614${i}-60967b0f800f?auto=format&fit=crop&q=80`}
                  alt={`Blog post ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Blog Post Title {i}</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <Link
                    to={`/blog/post-${i}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}