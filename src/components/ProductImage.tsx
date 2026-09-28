import React, { useState } from 'react';
import { Package, BookOpen } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  containerClassName?: string;
}

// Curated Unsplash fallback images by category in case external CDN drops
const UNSPLASH_FALLBACKS: Record<string, string> = {
  Mobiles: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  Laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
  Electronics: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
  Fashion: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
  Shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  Beauty: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  Books: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
};

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category = '',
  className = 'w-full h-full object-contain',
  containerClassName = 'w-full h-full relative flex items-center justify-center',
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedUnsplash, setTriedUnsplash] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setTriedUnsplash(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    console.warn(`[ShopNest] Image failed to load for "${alt}" from: ${currentSrc}`);

    if (!triedUnsplash && UNSPLASH_FALLBACKS[category]) {
      setTriedUnsplash(true);
      setCurrentSrc(UNSPLASH_FALLBACKS[category]);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    if (category === 'Books') {
      return (
        <div
          className={`${containerClassName} bg-[#F7F7F5] border border-[#E5E5E2] p-3 text-center`}
          role="img"
          aria-label={alt}
        >
          <div className="flex flex-col items-center justify-center space-y-1 text-[#5C5C5C]">
            <BookOpen size={20} strokeWidth={1.5} className="text-[#5C5C5C]" />
            <span className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-3 leading-snug">
              {alt}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${containerClassName} bg-[#F7F7F5] border border-[#E5E5E2] p-3 text-center`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center justify-center space-y-1 text-[#5C5C5C]">
          <Package size={20} strokeWidth={1.5} className="text-[#5C5C5C]" />
          <span className="text-[11px] text-[#5C5C5C] line-clamp-1 leading-snug">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {/* Skeleton placeholder while loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#E5E5E2]/60 animate-pulse rounded-[4px]" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-150`}
      />
    </div>
  );
};
