import { useState, useRef, useEffect } from 'react';

export default function AutoScrollText({ text, className = '', title }) {
  const containerRef = useRef(null);
  const firstTextRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [shiftDistance, setShiftDistance] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && firstTextRef.current) {
        const textWidth = firstTextRef.current.scrollWidth;
        const containerWidth = containerRef.current.clientWidth;
        const diff = textWidth - containerWidth;
        if (diff > 4) {
          setIsOverflowing(true);
          // Khoảng cách cuộn = chiều rộng text + khoảng cách phân cách (28px)
          setShiftDistance(textWidth + 28);
        } else {
          setIsOverflowing(false);
          setShiftDistance(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  // Thời lượng cuộn mượt mà dựa theo độ dài chuỗi text
  const duration = Math.max(5.5, Math.min(10, shiftDistance * 0.038));

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap relative w-full group/marquee"
      title={title || text}
    >
      <div
        className={`inline-flex items-center w-max ${className} ${
          isOverflowing ? 'group-hover/marquee:[animation-play-state:paused]' : ''
        }`}
        style={
          isOverflowing
            ? {
                animation: `marqueeOneWay ${duration}s linear infinite`,
                '--marquee-shift': `-${shiftDistance}px`,
              }
            : {}
        }
      >
        <span ref={firstTextRef} className="shrink-0">
          {text}
        </span>
        {isOverflowing && (
          <>
            <span className="shrink-0 px-3 opacity-40 select-none">•</span>
            <span className="shrink-0">{text}</span>
          </>
        )}
      </div>
    </div>
  );
}
