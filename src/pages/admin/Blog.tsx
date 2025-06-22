import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import BlogPostForm from '../../components/admin/BlogPostForm';

export default function AdminBlog() {
  const { posts, addPost, updatePost, deletePost } = useBlogPosts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Blog Posts</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row md:items-center">
            <img
              src={post.imageUrl}
              alt={post.description}
              className="h-32 w-32 object-cover rounded mr-6 mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-lg font-medium mb-1">{post.description}</h2>
              <p className="text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Read more →
              </a>
            </div>
            <div className="flex flex-col space-y-2 ml-6">
              <button
                onClick={() => {
                  setEditingPost(post);
                  setIsFormOpen(true);
                }}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <BlogPostForm
          post={editingPost}
          onSubmit={(data) => {
            if (editingPost) {
              updatePost(editingPost.id, data);
            } else {
              addPost(data);
            }
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}