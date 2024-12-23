import * as motion from 'motion/react-client';

const transition = { duration: 2, yoyo: Infinity, ease: 'easeInOut', delay: 2 };

export default function MotionPath() {
  return (
    <div style={{ position: 'relative' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350">
        <motion.path
          d="
      M 270 110 
      C 350 200, 300 250, 200 200 
      C 100 150, 150 100, 250 150 
      C 300 175, 275 250, 250 300"
          fill="transparent"
          strokeWidth="12"
          stroke="white"
          strokeLinecap="round"
          initial={{ pathLength: 0.001 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />{' '}
        <motion.line
          x1="250"
          y1="300"
          x2="230"
          y2="250"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
        <motion.line
          x1="250"
          y1="300"
          x2="305"
          y2="270"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        />
      </svg>
      <motion.div
        style={box}
        initial={{ offsetDistance: '0%', scale: 2.5 }}
        animate={{ offsetDistance: '100%', scale: 1 }}
        transition={transition}
      />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
  width: 50,
  height: 50,
  backgroundColor: 'var(--hue-6)',
  borderRadius: 10,
  position: 'absolute',
  top: 0,
  left: 0,
  offsetPath: `path("
      M 50 50 
      C 150 100, 250 100, 300 150 
      C 350 200, 300 250, 200 200 
      C 100 150, 150 100, 250 150 
      C 300 175, 275 250, 250 300")`,
};
