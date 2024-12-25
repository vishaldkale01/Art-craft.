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
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium">{post.title}</h2>
                <p className="text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
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