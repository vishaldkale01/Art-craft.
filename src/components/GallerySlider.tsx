import { useArtworks } from '../hooks/useArtworks';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function GallerySlider() {
  const { artworks } = useArtworks();
  const [index, setIndex] = useState(0);
  if (!artworks.length) return null;

  const prev = () => setIndex((i) => (i === 0 ? artworks.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === artworks.length - 1 ? 0 : i + 1));

  const current = artworks[index];

  return (
    <div className="w-full max-w-2xl mx-auto my-12">
      <div className="relative bg-white rounded-lg shadow overflow-hidden">
        <img
          src={current.imageUrl}
          alt={current.title}
          className="h-32 w-44 object-cover rounded mx-auto"
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
          aria-label="Next"
        >
          <ArrowRight />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="text-lg font-semibold">{current.title}</h3>
          <p className="text-sm">{current.category}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {artworks.map((a, i) => (
          <button
            key={a.id}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
