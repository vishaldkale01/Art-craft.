import React, { useEffect } from 'react';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Blog() {
  const { posts, fetchPosts } = useBlogPosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight">
    Blog
  </h1>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    {posts.map((post, idx) => (
      <article
        key={post.id || idx}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {post.imageUrl && (
          <div className="w-full h-60 overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.description || 'Blog image'}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6 flex flex-col justify-between min-h-[180px]">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-2">
              {post.date ? new Date(post.date).toLocaleDateString() : ''}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 leading-snug line-clamp-3">
              {post.description || 'No description available.'}
            </h3>
          </div>

          {post.url && (
            <div className="mt-4">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition"
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