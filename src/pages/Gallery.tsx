import { useState, useEffect } from 'react';
import { useArtworks } from '../hooks/useArtworks';
import ArtworkModal from '../components/ArtworkModal';
import { Artwork } from '../types';
import { useGalleryCategories } from '../hooks/useGalleryCategories';

export default function Gallery() {
  const { artworks, fetchArtworks } = useArtworks();
  const { categories, fetchCategories } = useGalleryCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    fetchArtworks();
    fetchCategories();
  }, []);

  const filteredArtworks = selectedCategory === 'All'
    ? artworks
    : artworks.filter(artwork => artwork.category === selectedCategory);

  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 tracking-tight">
    Gallery
  </h1>

  {/* Category Filter */}
  <div className="flex flex-wrap gap-4 mb-10">
    {["All", ...categories].map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition duration-200 ${
          selectedCategory === category
            ? 'bg-indigo-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {category}
      </button>
    ))}
  </div>

  {/* Artwork Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {filteredArtworks.map((artwork) => (
      <div
        key={artwork.id}
        onClick={() => setSelectedArtwork(artwork)}
        className="cursor-pointer group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <div className="w-full h-80 overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{artwork.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{artwork.category}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Artwork Modal */}
  {selectedArtwork && (
    <ArtworkModal
      artwork={selectedArtwork}
      onClose={() => setSelectedArtwork(null)}
    />
  )}
</div>



  );
}