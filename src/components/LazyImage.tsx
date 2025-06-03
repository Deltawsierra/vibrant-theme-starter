
import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sources?: Array<{
    srcSet: string;
    type?: string;
    media?: string;
  }>;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sources = [],
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const shouldLoad = loading === 'eager' || isInView;

  if (sources.length > 0) {
    return (
      <picture ref={imgRef} className={className}>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={shouldLoad ? source.srcSet : undefined}
            type={source.type}
            media={source.media}
          />
        ))}
        <img
          src={shouldLoad ? src : placeholder}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-50'
          }`}
        />
      </picture>
    );
  }

  return (
    <img
      ref={imgRef}
      src={shouldLoad ? src : placeholder}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-50'
      } ${className}`}
    />
  );
};

export default LazyImage;
