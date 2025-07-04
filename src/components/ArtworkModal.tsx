import React from 'react';
import { X } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">{artwork.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="h-32 w-44 object-cover rounded mx-auto"
          />
          <div className="mt-4">
            <p className="text-gray-600">{artwork.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Created: {new Date(artwork.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}