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
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight text-center drop-shadow-sm">Gallery</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-200 shadow-sm border focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
              ${selectedCategory === category
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50 hover:text-indigo-700'}
            `}
            aria-pressed={selectedCategory === category}
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
            className="cursor-pointer group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden relative hover:-translate-y-1"
            tabIndex={0}
            role="button"
            aria-label={`View details for ${artwork.title}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedArtwork(artwork); }}
          >
            <div className="w-full h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 truncate mb-1 group-hover:text-indigo-700 transition">{artwork.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{artwork.category}</p>
            </div>
            <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-10 transition-all duration-300 pointer-events-none" />
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
  </div>
  );
}