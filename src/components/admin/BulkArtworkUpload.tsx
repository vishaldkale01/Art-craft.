import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useGalleryCategories } from '../../hooks/useGalleryCategories';

interface BulkUploadArtwork {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

interface BulkArtworkUploadProps {
  onComplete?: () => void;
  onArtworkAdded?: (artwork: BulkUploadArtwork) => void;
}

export default function BulkArtworkUpload({ onComplete, onArtworkAdded }: BulkArtworkUploadProps) {
  const { categories, fetchCategories } = useGalleryCategories();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [artworksData, setArtworksData] = useState<BulkUploadArtwork[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setUploadedUrls([]);
    setArtworksData([]);
    setError(null);
    setUploading(true);
    const urls: string[] = [];
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('chashmish').upload(fileName, file, { upsert: true });
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('chashmish').getPublicUrl(fileName);
        urls.push(urlData.publicUrl);
      } else {
        setError(error?.message || 'Upload error');
      }
    }
    setUploadedUrls(urls);
    setArtworksData(urls.map(url => ({ imageUrl: url, title: '', description: '', category: '', featured: false })));
    setUploading(false);
  };

  const handleArtworkChange = (idx: number, field: keyof BulkUploadArtwork, value: any) => {
    setArtworksData(prev => prev.map((art, i) => i === idx ? { ...art, [field]: value } : art));
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    artworksData.forEach(artwork => {
      if (onArtworkAdded) onArtworkAdded(artwork);
    });
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Bulk Upload Artworks</h2>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} disabled={uploading} className="mb-4" />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {artworksData.length > 0 && (
        <form onSubmit={handleSubmitAll} className="space-y-8">
          {artworksData.map((art, idx) => (
            <div key={art.imageUrl} className="border rounded p-4 mb-2">
              <div className="flex gap-4 items-center mb-4">
                <img src={art.imageUrl} alt={`Bulk ${idx + 1}`} className="h-20 w-20 object-cover rounded border" />
                <span className="text-sm text-gray-500">Image {idx + 1}</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Title</label>
                <input name="title" value={art.title} onChange={e => handleArtworkChange(idx, 'title', e.target.value)} className="border rounded px-2 py-1" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Description</label>
                <textarea name="description" value={art.description} onChange={e => handleArtworkChange(idx, 'description', e.target.value)} className="border rounded px-2 py-1" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Category</label>
                <select name="category" value={art.category} onChange={e => handleArtworkChange(idx, 'category', e.target.value)} className="border rounded px-2 py-1">
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="featured" checked={art.featured} onChange={e => handleArtworkChange(idx, 'featured', e.target.checked)} />
                <label className="font-medium">Featured</label>
              </div>
            </div>
          ))}
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Submit All</button>
        </form>
      )}
    </div>
  );
}
