'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface CourseHeroMediaProps {
  title: string;
  heroImage?: string | null;
  previewVideo?: string | null;
  children?: React.ReactNode;
}

export default function CourseHeroMedia({
  title,
  heroImage,
  previewVideo,
  children,
}: CourseHeroMediaProps) {
  const [playVideo, setPlayVideo] = useState(false);

  const imageSrc =
    heroImage && heroImage.trim() !== ''
      ? heroImage.startsWith('/')
        ? heroImage
        : `/${heroImage}`
      : '/images/courses/default-hero.jpg';

  const videoSrc =
    previewVideo && previewVideo.trim() !== ''
      ? previewVideo.startsWith('/')
        ? previewVideo
        : `/${previewVideo}`
      : null;

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-black">
      {videoSrc && playVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          autoPlay
          playsInline
          poster={imageSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (videoSrc) setPlayVideo(true);
          }}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={
            videoSrc ? `Play preview for ${title}` : `${title} hero image`
          }
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition duration-500 hover:scale-[1.02]"
          />

          {/* Cinematic dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

          {/* Play button */}
          {videoSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-[#661093] shadow-2xl transition hover:scale-105">
                <Play className="ml-1 h-12 w-12 fill-current" />
              </div>
            </div>
          )}
        </button>
      )}

      {/* Overlay content (title, subtitle, CTA, etc.) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}