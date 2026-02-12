import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: 85 | 90;
}

/**
 * OptimizedImage component that serves WebP images with fallbacks using picture elements.
 * Implements lazy loading for non-priority images and preserves social media/token images uncompressed.
 * Supports quality settings: 85 (default) for standard images, 90 for hero/LCP images.
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  loading,
  priority = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  // Check if this is a social media or token image that should remain uncompressed
  const isSocialOrToken = src.includes('og-cover') || 
                          src.includes('bgkd-token-logo') || 
                          src.includes('bgkd-hero-banner');

  // Determine loading strategy: priority images load eagerly, others lazy
  const loadingStrategy = loading || (priority ? 'eager' : 'lazy');

  // Generate WebP path by replacing extension with .webp
  const getWebPPath = (path: string): string => {
    return path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // If social/token image or error occurred, use original image without WebP conversion
  if (isSocialOrToken || imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loadingStrategy}
        onError={() => setImageError(true)}
      />
    );
  }

  // Use picture element for WebP with fallback to original format for legacy browsers
  return (
    <picture>
      <source srcSet={getWebPPath(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loadingStrategy}
        sizes={sizes}
        onError={() => setImageError(true)}
      />
    </picture>
  );
}
