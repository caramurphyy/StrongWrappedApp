import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useSpring, animated } from '@react-spring/web';
import { Smile, Heart, Star } from 'lucide-react';

const icons = [
  './bench.svg',
  './press.svg',
  './deadlift.svg',
  './clean.svg',
  './squat.svg',
];

export const ConveyorBelt: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, []);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  useEffect(() => {
    if (!containerRef.current || itemWidth === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    const itemsNeeded = Math.ceil(containerWidth / itemWidth) + 1;
    const totalWidth = itemWidth * itemsNeeded;

    const animate = () => {
      api.start({
        from: { x: 0 },
        to: { x: -itemWidth },
        reset: true,
        loop: true,
        config: { duration: 3000 },
        onRest: () => {
          api.set({ x: 0 });
        },
      });
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      api.stop();
      animate();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [api, itemWidth]);

  const IconSet = () => (
    <Box
      ref={itemRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {icons.map((Icon, index) => (
        <Box
          key={index}
          component="img"
          src={Icon}
          style={{
            width: '2rem',
            height: '2rem',
            margin: '0 1rem',
            flexShrink: 0,
            color: 'white',
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        overflow: 'hidden',
        width: '100%',
        background: '#042C46',
        padding: '0.5rem',
      }}
    >
      <animated.div
        style={{
          display: 'flex',
          transform: x.to((value) => `translateX(${value}px)`),
        }}
      >
        {[...Array(10)].map((_, index) => (
          <IconSet key={index} />
        ))}
      </animated.div>
    </Box>
  );
};
