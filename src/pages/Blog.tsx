import React from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Blog() {
  const { posts } = useBlogPosts();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, idx) => (
          <article key={post.id || idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.description || 'Blog image'}
                className="h-48 w-full object-cover"
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
  );
}