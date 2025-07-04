import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useArtworks } from '../hooks/useArtworks';

export default function Home() {
  const { posts, fetchPosts } = useBlogPosts();
  const { artworks, fetchArtworks } = useArtworks();
  useEffect(() => {
    fetchPosts();
    fetchArtworks();
  }, [fetchPosts, fetchArtworks]);
  const featuredArtworks = artworks.filter(a => a.featured);
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
          {featuredArtworks.length === 0 ? (
            <div className="text-gray-500">No featured artworks yet.</div>
          ) : (
            featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="group relative">
                <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{artwork.title}</h3>
                <p className="text-sm text-gray-500">{artwork.category}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, idx) => (
              <article key={post.id || idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.description || 'Blog image'}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {post.date ? new Date(post.date).toLocaleDateString() : ''}
                    </div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black">
                      {post.description || 'No description'}
                    </div>
                  </div>
                  {post.url && (
                    <div className="mt-4">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
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