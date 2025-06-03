
import React, { useState, useRef } from 'react';

export interface VideoSource {
  type: 'youtube' | 'vimeo' | 'self-hosted';
  url: string;
  title: string;
  thumbnail?: string;
  qualities?: string[];
}

interface SpotlightVideoProps {
  video: VideoSource;
  autoplayOnHover?: boolean;
  className?: string;
}

const SpotlightVideo: React.FC<SpotlightVideoProps> = ({ 
  video, 
  autoplayOnHover = false,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(video.qualities?.[0] || 'HD');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (video.type === 'self-hosted' && videoRef.current) {
      videoRef.current.play();
    } else {
      setShowLightbox(true);
    }
  };

  const handleMouseEnter = () => {
    if (autoplayOnHover && video.type === 'self-hosted' && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoplayOnHover && video.type === 'self-hosted' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const getEmbedUrl = () => {
    switch (video.type) {
      case 'youtube':
        return `https://www.youtube.com/embed/${video.url}?autoplay=1&mute=${isMuted ? 1 : 0}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${video.url}?autoplay=1&muted=${isMuted ? 1 : 0}`;
      default:
        return video.url;
    }
  };

  const VideoLightbox = () => {
    if (!showLightbox) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div className="relative w-full max-w-6xl mx-4">
          {/* Quality Selector */}
          {video.qualities && video.qualities.length > 1 && (
            <div className="absolute top-4 right-16 z-10">
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="px-3 py-1 bg-black bg-opacity-70 text-white rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {video.qualities.map((quality) => (
                  <option key={quality} value={quality}>{quality}</option>
                ))}
              </select>
            </div>
          )}

          {/* Video Container */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {video.type === 'self-hosted' ? (
              <video
                ref={videoRef}
                src={video.url}
                controls
                autoPlay
                muted={isMuted}
                className="w-full h-full"
                onEnded={() => setIsPlaying(false)}
              />
            ) : (
              <iframe
                src={getEmbedUrl()}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            )}
          </div>

          {/* Controls */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <button
              onClick={toggleMute}
              className="px-3 py-1 bg-black bg-opacity-70 text-white rounded text-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white text-xl hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close video"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {video.type === 'self-hosted' ? (
          <video
            ref={videoRef}
            src={video.url}
            muted={isMuted}
            loop={autoplayOnHover}
            className="w-full h-full object-cover"
            poster={video.thumbnail}
          />
        ) : (
          <img
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl hover:bg-opacity-40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label={`Play ${video.title}`}
          >
            ▶
          </button>
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 w-8 h-8 bg-black bg-opacity-50 rounded flex items-center justify-center text-white text-sm hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      <VideoLightbox />
    </>
  );
};

export default SpotlightVideo;
