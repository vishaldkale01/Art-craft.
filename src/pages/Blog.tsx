import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Journey of Creating "Abstract Harmony"',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
  },
  {
    id: '1',
    title: 'The Journey of Creating "Abstract Harmony"',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
  },
  {
    id: '1',
    title: 'The Journey of Creating "Abstract Harmony"',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
  },
  {
    id: '1',
    title: 'The Journey of Creating "Abstract Harmony"',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
  },
  // Add more sample posts here
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

      <div className="grid gap-8">
        {samplePosts.map(post => (
          <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-48 w-full md:w-48 object-cover"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-gray-500">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="mt-4">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}