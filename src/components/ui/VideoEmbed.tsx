import React, { useState, useRef, useEffect } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface VideoEmbedProps {
  videoId?: string;
  videoUrl?: string;
  thumbnail?: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  lazyLoad?: boolean;
  className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  videoId,
  videoUrl,
  thumbnail,
  title = 'Video',
  aspectRatio = '16:9',
  lazyLoad = true,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
  };

  const getVideoSrc = () => {
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    if (videoUrl) {
      // Handle Vimeo, etc.
      if (videoUrl.includes('vimeo.com')) {
        const vimeoId = videoUrl.split('/').pop();
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
      }
    }
    return videoUrl;
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!lazyLoad) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl shadow-lg ${aspectRatioClasses[aspectRatio]} ${className}`}
      role="region"
      aria-label={`${title} video player`}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full group">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={lazyLoad ? 'lazy' : 'eager'}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center w-full h-full group/play"
            aria-label={t('a11y.video')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover/play:opacity-40" />
              <div className="relative bg-gradient-to-r from-chili-500 to-orange-500 rounded-full p-4 shadow-2xl transform transition-transform duration-200 group-hover/play:scale-110">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
              <p className="text-white/80 text-sm">Click to play video</p>
            </div>
          </button>
        </div>
      ) : isLoaded ? (
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <Loader2 className="w-8 h-8 text-chili-500 animate-spin" />
              <span className="sr-only">Loading video...</span>
            </div>
          )}
          <iframe
            src={getVideoSrc()}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            loading={lazyLoad ? 'lazy' : 'eager'}
          />
        </div>
      ) : null}
    </div>
  );
};

export default VideoEmbed;
