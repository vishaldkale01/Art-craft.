import { useState } from 'react';
import { useArtworks } from '../hooks/useArtworks';
import ArtworkModal from '../components/ArtworkModal';
import { Artwork } from '../types';

const categories = ['All', 'Paintings', 'Sculptures', 'Digital Art'];

export default function Gallery() {
  const { artworks } = useArtworks();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const filteredArtworks = selectedCategory === 'All'
    ? artworks
    : artworks.filter(artwork => artwork.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gallery</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArtworks.map(artwork => (
          <div
            key={artwork.id}
            onClick={() => setSelectedArtwork(artwork)}
            className="cursor-pointer group"
          >
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{artwork.title}</h3>
            <p className="text-sm text-gray-500">{artwork.category}</p>
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