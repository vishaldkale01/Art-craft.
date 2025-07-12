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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');

  useEffect(() => {
    fetchArtworks();
    fetchCategories();
  }, []);

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingArtwork(null);
              setIsFormOpen(true);
            }}
            className="flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all duration-150 font-semibold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Artwork
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-stretch mb-8">
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
        />
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="px-5 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150 h-full shadow"
          style={{ minWidth: '150px' }}
        >
          Manage Categories
        </button>
      </div>

      {showSelection && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setSelectedArtworks(artworks.map(a => a.id))}
            className="px-4 py-1 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 transition"
          >
            Select All
          </button>
          <button
            onClick={() => setSelectedArtworks([])}
            className="px-4 py-1 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 transition"
          >
            Deselect All
          </button>
          <button
            onClick={() => { setShowSelection(false); setSelectedArtworks([]); setConfirmation({ type: null, count: 0 }); }}
            className="px-4 py-1 bg-gray-300 rounded text-sm font-medium hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative group transition-all duration-200 hover:shadow-xl border border-gray-100"
          >
            {showSelection && (
              <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
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
                  className="h-5 w-5 accent-indigo-600 border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="h-40 w-full object-cover rounded-t-xl transition group-hover:scale-105"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{artwork.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{artwork.category}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {
                    setEditingArtwork(artwork);
                    setIsFormOpen(true);
                  }}
                  className="flex items-center text-gray-600 hover:text-indigo-700 font-medium transition"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteArtwork(artwork.id)}
                  className="flex items-center text-red-600 hover:text-red-800 font-medium transition"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCategoryModalOpen && (
        <Modal title="Manage Categories" onClose={() => setIsCategoryModalOpen(false)}>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((cat) => (
              <span key={cat} className="inline-flex items-center bg-gray-100 rounded px-3 py-1 text-sm font-medium">
                {editingCategory === cat ? (
                  <>
                    <input
                      type="text"
                      value={editingCategoryValue}
                      onChange={e => setEditingCategoryValue(e.target.value)}
                      className="border rounded px-2 py-1 text-sm mr-2"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (editingCategoryValue.trim() && editingCategoryValue !== cat) {
                          // Update category logic
                          const oldName = cat;
                          const newName = editingCategoryValue.trim();
                          // Remove old, add new
                          deleteCategory(oldName);
                          addCategory(newName);
                        }
                        setEditingCategory(null);
                        setEditingCategoryValue('');
                      }}
                      className="text-green-600 hover:text-green-800 font-bold mr-1"
                      title="Save"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => { setEditingCategory(null); setEditingCategoryValue(''); }}
                      className="text-gray-500 hover:text-gray-700 font-bold"
                      title="Cancel"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    {cat}
                    <button
                      onClick={() => { setEditingCategory(cat); setEditingCategoryValue(cat); }}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      title="Edit category"
                      disabled={artworks.some(a => a.category === cat)}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => deleteCategory(cat)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Delete category"
                      disabled={artworks.some(a => a.category === cat)}
                    >
                      ×
                    </button>
                  </>
                )}
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
        </Modal>
      )}

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