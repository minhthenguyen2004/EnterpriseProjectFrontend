import { useState, useRef, useEffect } from 'react';

export default function AutoScrollText({ text, className = '', title }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowDistance, setOverflowDistance] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const diff = textRef.current.scrollWidth - containerRef.current.clientWidth;
        if (diff > 4) {
          setIsOverflowing(true);
          setOverflowDistance(diff);
        } else {
          setIsOverflowing(false);
          setOverflowDistance(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  const duration = Math.max(3.5, Math.min(8, overflowDistance * 0.08));

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap relative w-full group/marquee"
      title={title || text}
    >
      <div
        ref={textRef}
        className={`inline-block transition-transform ${className} ${
          isOverflowing ? 'group-hover/marquee:[animation-play-state:paused]' : ''
        }`}
        style={
          isOverflowing
            ? {
                animation: `marqueeScroll ${duration}s ease-in-out 1s infinite alternate`,
                '--marquee-dist': `-${overflowDistance + 6}px`,
              }
            : {}
        }
      >
        {text}
      </div>
    </div>
  );
}
