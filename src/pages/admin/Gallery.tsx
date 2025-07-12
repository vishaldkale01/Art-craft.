import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useArtworks } from '../../hooks/useArtworks';
import { useGalleryCategories } from '../../hooks/useGalleryCategories';
import ArtworkForm from '../../components/admin/ArtworkForm';
import BulkArtworkUpload from '../../components/admin/BulkArtworkUpload';
import Modal from '../../components/admin/Modal';
import BulkActions from '../../components/admin/BulkActions';

export default function AdminGallery() {
  const { artworks, fetchArtworks, addArtwork, updateArtwork, deleteArtwork } = useArtworks();
  const { categories, fetchCategories, addCategory, deleteCategory } = useGalleryCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<any>(null);
  const [newCategory, setNewCategory] = useState('');
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [isBulkUpdateOpen, setIsBulkUpdateOpen] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [confirmation, setConfirmation] = useState<{ type: 'delete' | 'update' | null, count: number }>({ type: null, count: 0 });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  useEffect(() => {
    fetchArtworks();
    fetchCategories();
  }, []);

  // Main render
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Gallery</h1>
        <div className="flex gap-2">
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
      </div>

      <BulkActions
        selectedCount={selectedArtworks.length}
        onBulkUpload={() => setIsBulkOpen(true)}
        onBulkUpdate={() => {
          if (selectedArtworks.length === 0) {
            setShowSelection(true);
            setToast({ message: 'Please select artworks to update.', type: 'error' });
            setTimeout(() => setToast({ message: '', type: null }), 3000);
            return;
          }
          setConfirmation({ type: 'update', count: selectedArtworks.length });
        }}
        onBulkDelete={() => {
          if (selectedArtworks.length === 0) {
            setShowSelection(true);
            setToast({ message: 'Please select artworks to delete.', type: 'error' });
            setTimeout(() => setToast({ message: '', type: null }), 3000);
            return;
          }
          setConfirmation({ type: 'delete', count: selectedArtworks.length });
        }}
        disableBulkUpdate={false}
        disableBulkDelete={false}
      />
      {showSelection && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setSelectedArtworks(artworks.map(a => a.id))}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Select All
          </button>
          <button
            onClick={() => setSelectedArtworks([])}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Deselect All
          </button>
          <button
            onClick={() => { setShowSelection(false); setSelectedArtworks([]); setConfirmation({ type: null, count: 0 }); }}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className={`bg-white rounded-lg shadow-sm overflow-hidden relative${showSelection ? ' pt-6' : ''}`}
          >
            {showSelection && (
              <input
                type="checkbox"
                checked={selectedArtworks.includes(artwork.id)}
                onChange={e => {
                  setSelectedArtworks(prev =>
                    e.target.checked
                      ? [...prev, artwork.id]
                      : prev.filter(id => id !== artwork.id)
                  );
                }}
                className="absolute top-2 left-2 h-4 w-4 z-10"
              />
            )}
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
              setIsFormOpen(false);
            } else {
              addArtwork(data);
              setIsFormOpen(false);
            }
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isBulkOpen && (
        <Modal title="Bulk Upload Artworks" onClose={() => setIsBulkOpen(false)}>
          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <BulkArtworkUpload
              onComplete={() => { setIsBulkOpen(false); fetchArtworks(); }}
              onArtworkAdded={(data) => addArtwork(data)}
            />
          </div>
        </Modal>
      )}

      {toast.message && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-50 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          style={{ minWidth: '200px', textAlign: 'center' }}>
          {toast.message}
        </div>
      )}

      {(confirmation.type === 'delete' || confirmation.type === 'update') && (
        <Modal title={confirmation.type === 'delete' ? "Confirm Bulk Delete" : "Bulk Update Artworks"} onClose={() => { setConfirmation({ type: null, count: 0 }); setShowSelection(false); }}>
          {confirmation.type === 'delete' ? (
            <div>
              <div className="mb-4">Are you sure you want to delete {confirmation.count} selected artworks?</div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setConfirmation({ type: null, count: 0 }); setShowSelection(false); }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    selectedArtworks.forEach(id => deleteArtwork(id));
                    setSelectedArtworks([]);
                    setConfirmation({ type: null, count: 0 });
                    setShowSelection(false);
                    setToast({ message: 'Bulk delete successful!', type: 'success' });
                    setTimeout(() => setToast({ message: '', type: null }), 3000);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">You are updating {confirmation.count} selected artworks.</div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                  const featured = (form.elements.namedItem('featured') as HTMLInputElement).checked;
                  selectedArtworks.forEach(id => updateArtwork(id, { category, featured }));
                  setConfirmation({ type: null, count: 0 });
                  setSelectedArtworks([]);
                  setShowSelection(false);
                  setToast({ message: 'Bulk update successful!', type: 'success' });
                  setTimeout(() => setToast({ message: '', type: null }), 3000);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="font-medium">Category</label>
                  <select name="category" className="border rounded px-2 py-1 w-full">
                    <option value="">No Change</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="featured" />
                  <label className="font-medium">Featured</label>
                </div>
                <button type="submit" className="px-4 py-2 bg-yellow-600 text-white rounded"
                  onClick={() => {
                    setToast({ message: 'Bulk update successful!', type: 'success' });
                    setTimeout(() => setToast({ message: '', type: null }), 3000);
                  }}
                >
                  Update Selected
                </button>
              </form>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}