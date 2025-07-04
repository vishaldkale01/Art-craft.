import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useArtworks } from '../../hooks/useArtworks';
import { useGalleryCategories } from '../../hooks/useGalleryCategories';
import ArtworkForm from '../../components/admin/ArtworkForm';

export default function AdminGallery() {
  const { artworks, fetchArtworks, addArtwork, updateArtwork, deleteArtwork } = useArtworks();
  const { categories, fetchCategories, addCategory, deleteCategory } = useGalleryCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<any>(null);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchArtworks();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Gallery</h1>
        <button
          onClick={() => {
            setEditingArtwork(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Artwork
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="h-32 w-44 object-cover rounded mx-auto"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{artwork.title}</h3>
              <p className="text-gray-500">{artwork.category}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setEditingArtwork(artwork);
                    setIsFormOpen(true);
                  }}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteArtwork(artwork.id)}
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

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Manage Categories</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((cat) => (
            <span key={cat} className="inline-flex items-center bg-gray-100 rounded px-3 py-1 text-sm font-medium">
              {cat}
              <button
                onClick={() => deleteCategory(cat)}
                className="ml-2 text-red-500 hover:text-red-700"
                title="Delete category"
                disabled={artworks.some(a => a.category === cat)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newCategory.trim()) {
              addCategory(newCategory.trim());
              setNewCategory('');
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="border rounded px-2 py-1 text-sm"
          />
          <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
            Add
          </button>
        </form>
      </div>

      {isFormOpen && (
        <ArtworkForm
          artwork={editingArtwork}
          onSubmit={(data) => {
            if (editingArtwork) {
              updateArtwork(editingArtwork.id, data);
            } else {
              addArtwork(data);
            }
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}