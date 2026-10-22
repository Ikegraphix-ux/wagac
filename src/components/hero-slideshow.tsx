'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type HeroSlideshowProps = {
  images: { src: string; alt: string }[];
  className?: string;
};

export function HeroSlideshow({
  images,
  className = '',
}: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [images.length, reducedMotion]);

  if (images.length === 0) {
    return null;
  }

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  }

  return (
    <div
      className={`hero-slideshow absolute inset-0 overflow-hidden ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous hero image"
            className="focus-ring absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-8"
          >
            <ChevronLeft size={23} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next hero image"
            className="focus-ring absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-8"
          >
            <ChevronRight size={23} />
          </button>
          <div
            aria-label="Choose hero image"
            className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
            role="group"
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-pressed={index === activeIndex}
                className={`focus-ring h-2.5 rounded-full border border-white transition-all ${
                  index === activeIndex
                    ? 'w-7 bg-white'
                    : 'w-2.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
