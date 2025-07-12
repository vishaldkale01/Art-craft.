import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useArtworks } from '../hooks/useArtworks';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const { posts, fetchPosts } = useBlogPosts();
  const { artworks, fetchArtworks } = useArtworks();
  const { theme, setTheme, fetchAdminDefault } = useTheme();

  useEffect(() => {
    fetchPosts();
    fetchArtworks();
  }, [fetchPosts, fetchArtworks]);

  useEffect(() => {
    // On mount, fetch admin default if user has no theme
    if (!localStorage.getItem('theme')) {
      fetchAdminDefault();
    }
  }, [fetchAdminDefault]);

  const featuredArtworks = artworks.filter(a => a.featured);
  return (
    <div>
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <select
          value={theme}
          onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          className="rounded px-3 py-1 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-sm shadow focus:outline-none"
          aria-label="Select theme"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
          alt="Artist at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Art & Craft</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">Contemporary Artist & Sculptor</p>
            <Link
              to="/gallery"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg"
            >
              View Gallery
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Featured Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredArtworks.length === 0 ? (
            <div className="text-gray-500">No featured artworks yet.</div>
          ) : (
            featuredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group relative bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
              >
                <div className="aspect-w-7 aspect-h-5 bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{artwork.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.slice(0, 3).map((post, idx) => (
              <article
                key={post.id || idx}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.description || 'Blog image'}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6 flex flex-col justify-between min-h-[180px]">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
                      {post.date ? new Date(post.date).toLocaleDateString() : ''}
                    </div>
                    <div className="text-lg leading-snug font-medium text-gray-800 line-clamp-3">
                      {post.description || 'No description'}
                    </div>
                  </div>
                  {post.url && (
                    <div className="mt-4">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center transition"
                      >
                        Read more →
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}