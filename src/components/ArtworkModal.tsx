import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lastTouch = useRef<{ x1: number; y1: number; x2: number; y2: number; dist: number; zoom: number } | null>(null);
  const lastTap = useRef(0);

  // Prevent page scroll/zoom when modal is open
  React.useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current || zoom !== 1) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    imgRef.current.style.transform = `perspective(800px) scale(1.04) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
    if (imgRef.current && zoom === 1) {
      imgRef.current.style.transform = 'perspective(800px) scale(1)';
    }
  };

  // Zoom in/out with wheel (centered on mouse)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    let newZoom = zoom - e.deltaY * 0.0015;
    newZoom = Math.max(1, Math.min(3, newZoom));
    // Calculate new offset to keep zoom centered on mouse
    if (newZoom !== zoom) {
      const scaleChange = newZoom / zoom;
      setOffset(prev => ({
        x: (prev.x - mouseX) * scaleChange + mouseX,
        y: (prev.y - mouseY) * scaleChange + mouseY
      }));
    }
    if (newZoom === 1) setOffset({ x: 0, y: 0 });
    setZoom(newZoom);
  };

  // Pan logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleMouseUp = () => setDragging(false);
  // Clamp pan so image stays in view
  const clampOffset = (offset: { x: number; y: number }, zoom: number, rect: DOMRect) => {
    const maxX = ((rect.width * (zoom - 1)) / 2);
    const maxY = ((rect.height * (zoom - 1)) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, offset.x)),
      y: Math.max(-maxY, Math.min(maxY, offset.y)),
    };
  };
  const handleMouseMovePan = (e: React.MouseEvent) => {
    if (!dragging || zoom === 1 || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const rawOffset = { x: e.clientX - (dragStart?.x ?? 0), y: e.clientY - (dragStart?.y ?? 0) };
    setOffset(clampOffset(rawOffset, zoom, rect));
  };

  // Double click or double tap to close modal
  const handleDoubleClickOrTap = (e: React.MouseEvent | React.TouchEvent) => {
    if ('detail' in e && (e as React.MouseEvent).detail === 2) {
      onClose();
      return;
    }
    if ('touches' in e) {
      const now = Date.now();
      if (now - lastTap.current < 350) {
        onClose();
      }
      lastTap.current = now;
    }
  };

  // Double click to reset zoom
  const handleDoubleClick = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  // Touch pinch-to-zoom support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && imgRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      lastTouch.current = {
        x1: t1.clientX,
        y1: t1.clientY,
        x2: t2.clientX,
        y2: t2.clientY,
        dist,
        zoom,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && imgRef.current && lastTouch.current) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const newDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      let newZoom = lastTouch.current.zoom * (newDist / lastTouch.current.dist);
      newZoom = Math.max(1, Math.min(3, newZoom));
      // Center zoom on midpoint
      const rect = imgRef.current.getBoundingClientRect();
      const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
      const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
      if (newZoom !== zoom) {
        const scaleChange = newZoom / zoom;
        setOffset(prev => ({
          x: (prev.x - midX) * scaleChange + midX,
          y: (prev.y - midY) * scaleChange + midY
        }));
      }
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastTouch.current = null;
      if (zoom === 1) setOffset({ x: 0, y: 0 });
    }
  };

  return (
    // Modal overlay: full viewport, no white space, no padding/margin
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-95 p-0 m-0" onClick={onClose}>
      <div
        className="w-screen h-screen flex items-center justify-center overflow-hidden p-0 m-0 bg-transparent"
        style={{ width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', margin: 0, padding: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={e => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={artwork.imageUrl}
          alt={artwork.title}
          draggable={false}
          className="w-full h-full object-contain select-none"
          style={{
            cursor: zoom > 1 ? 'grab' : 'zoom-in',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
            borderRadius: 0,
            background: 'transparent',
            boxShadow: 'none',
            transform: zoom === 1
              ? undefined
              : `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`
          }}
          onMouseMove={zoom === 1 ? handleMouseMove : handleMouseMovePan}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClickOrTap}
          onTouchEnd={handleDoubleClickOrTap}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          aria-label="Zoom artwork image"
        />
        {/* Optionally, show instructions only if zoom === 1 */}
        {zoom === 1 && (
          <div className="absolute bottom-4 right-4 bg-white/80 text-xs px-3 py-2 rounded shadow">Scroll or pinch to zoom, double click to reset</div>
        )}
      </div>
    </div>
  );
}